// ChatGPT Pro - public AI chat with basic per-IP rate limiting and input validation
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Ikaw ang ChatGPT Pro ni jmcruz — isang friendly, smart na AI assistant na naka-embed sa portfolio ng developer na si jmcruz. Sagutin lahat ng tanong, tumulong sa code, mag-translate, mag-summarize, at mag-explain ng mga topic. Mag-reply sa wika ng tanong (Tagalog/English/Taglish). Maging clear, concise, at helpful.`;

// Simple in-memory sliding-window rate limiter (per edge instance)
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8; // 8 messages / minute / IP
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_PER_DAY = 80;
const hits = new Map<string, number[]>();
const daily = new Map<string, number[]>();

function allow(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const dayArr = (daily.get(ip) ?? []).filter((t) => now - t < DAILY_WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - arr[0])) / 1000) };
  if (dayArr.length >= MAX_PER_DAY) return { ok: false, retryAfter: Math.ceil((DAILY_WINDOW_MS - (now - dayArr[0])) / 1000) };
  arr.push(now); dayArr.push(now);
  hits.set(ip, arr); daily.set(ip, dayArr);
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    const rl = allow(ip);
    if (!rl.ok) {
      return new Response(
        JSON.stringify({ error: "Sobrang bilis ng requests. Subukan ulit mamaya." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": String(rl.retryAfter ?? 60) },
        },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 30) {
      return new Response(JSON.stringify({ error: "Invalid request." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const messages = body.messages
      .filter((m: any) => m && typeof m.content === "string" && typeof m.role === "string")
      .map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content).slice(0, 4000),
      }));
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Sobrang dami ng requests, subukan mamaya." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "Walang AI credits, magdagdag sa workspace." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI error", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chatgpt-pro error", e);
    return new Response(JSON.stringify({ error: "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
