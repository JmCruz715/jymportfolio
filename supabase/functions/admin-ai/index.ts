// Admin AI Assistant - kayang mag-edit ng site_settings via tool calls
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ikaw ang AI Assistant ng admin sa portfolio ni jmcruz. Para kang second owner — kaya mong baguhin LAHAT sa site.

Mga kaya mong gawin gamit ang tools:
- update_profile: palitan ang name, role_label, bio, avatar_url
- update_phrases: palitan/dagdagan ang typewriter quotes (may color)
- update_socials: i-edit ang social media links (Facebook, TikTok, GitHub, atbp.)
- update_websites: i-edit ang "Mga Website ko"
- update_menu_sections: i-edit ang hamburger menu (Tools, Downloader, Anime, etc.) — pwede mag-add ng buong bagong section o links
- get_current_settings: tingnan kung ano ang kasalukuyang settings bago mag-edit

MGA RULES:
1. Mag-reply sa Tagalog/Taglish, friendly at malinaw.
2. Bago mag-edit, kung kulang ang detalye, magtanong muna.
3. Kapag may "ipagpalit", "palitan", "i-update" — kunin muna ang current settings tapos i-merge ang changes (huwag burahin ang ibang items maliban kung sinabi ng user).
4. Sa colors ng phrases, gamitin lamang ang: text-primary, text-green-400, text-pink-400, text-yellow-400, text-red-400, text-cyan-400, text-blue-400, text-purple-400, text-foreground.
5. Sa social icons gamitin: facebook, tiktok, github, messenger, instagram, youtube, twitter, linkedin, telegram, globe.
6. Pagkatapos mag-tool call, i-summarize sa user kung ano ang nabago.
7. Walang limit — kaya mong gawin ang gusto ng admin sa portfolio.`;

const tools = [
  {
    type: "function",
    function: {
      name: "get_current_settings",
      description: "Kunin ang lahat ng kasalukuyang settings ng site",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
  {
    type: "function",
    function: {
      name: "update_profile",
      description: "I-update ang profile fields. Lahat optional — ilagay lang ang gusto baguhin.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          role_label: { type: "string" },
          bio: { type: "string" },
          avatar_url: { type: "string" },
        },
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_phrases",
      description: "Palitan ang buong listahan ng typewriter phrases.",
      parameters: {
        type: "object",
        properties: {
          phrases: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                color: { type: "string" },
              },
              required: ["text", "color"],
              additionalProperties: false,
            },
          },
        },
        required: ["phrases"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_socials",
      description: "Palitan ang buong listahan ng social media links.",
      parameters: {
        type: "object",
        properties: {
          socials: {
            type: "array",
            items: {
              type: "object",
              properties: {
                label: { type: "string" },
                icon: { type: "string" },
                href: { type: "string" },
              },
              required: ["label", "icon", "href"],
              additionalProperties: false,
            },
          },
        },
        required: ["socials"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_websites",
      description: "Palitan ang buong listahan ng personal websites.",
      parameters: {
        type: "object",
        properties: {
          websites: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                href: { type: "string" },
              },
              required: ["title", "description", "href"],
              additionalProperties: false,
            },
          },
        },
        required: ["websites"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "update_menu_sections",
      description: "Palitan ang buong menu sections (Tools, Downloader, Anime, atbp.) ng hamburger menu.",
      parameters: {
        type: "object",
        properties: {
          menu_sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                emoji: { type: "string" },
                links: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      href: { type: "string" },
                    },
                    required: ["title", "description", "href"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["title", "emoji", "links"],
              additionalProperties: false,
            },
          },
        },
        required: ["menu_sections"],
        additionalProperties: false,
      },
    },
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify admin
    const authHeader = req.headers.get("Authorization") ?? "";
    const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await userClient.auth.getUser();
    if (!userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: roleData } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();

    const conversation = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    // Agent loop with tool calling
    const changesApplied: string[] = [];
    for (let iter = 0; iter < 8; iter++) {
      const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: conversation,
          tools,
        }),
      });

      if (aiResp.status === 429) {
        return new Response(JSON.stringify({ error: "Sobrang dami ng requests, subukan mamaya." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResp.status === 402) {
        return new Response(JSON.stringify({ error: "Walang credits sa AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!aiResp.ok) {
        const t = await aiResp.text();
        console.error("AI error", aiResp.status, t);
        throw new Error("AI gateway error");
      }

      const data = await aiResp.json();
      const choice = data.choices?.[0];
      const msg = choice?.message;
      if (!msg) throw new Error("No message");

      conversation.push(msg);

      const toolCalls = msg.tool_calls;
      if (!toolCalls || toolCalls.length === 0) {
        return new Response(
          JSON.stringify({ reply: msg.content ?? "", changes: changesApplied }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get site settings row id
      const { data: settingsRow } = await admin.from("site_settings").select("*").limit(1).maybeSingle();
      if (!settingsRow) throw new Error("No site_settings row");

      for (const call of toolCalls) {
        const fnName = call.function?.name;
        let args: any = {};
        try { args = JSON.parse(call.function?.arguments ?? "{}"); } catch {}
        let result: any = { ok: true };

        if (fnName === "get_current_settings") {
          result = settingsRow;
        } else if (fnName === "update_profile") {
          const patch: any = {};
          for (const k of ["name", "role_label", "bio", "avatar_url"]) {
            if (args[k] !== undefined) patch[k] = args[k];
          }
          if (Object.keys(patch).length) {
            const { error } = await admin.from("site_settings").update(patch).eq("id", settingsRow.id);
            if (error) result = { ok: false, error: error.message };
            else changesApplied.push(`Profile: ${Object.keys(patch).join(", ")}`);
          }
        } else if (fnName === "update_phrases") {
          const { error } = await admin.from("site_settings").update({ phrases: args.phrases }).eq("id", settingsRow.id);
          if (error) result = { ok: false, error: error.message };
          else changesApplied.push(`Phrases (${args.phrases.length})`);
        } else if (fnName === "update_socials") {
          const { error } = await admin.from("site_settings").update({ socials: args.socials }).eq("id", settingsRow.id);
          if (error) result = { ok: false, error: error.message };
          else changesApplied.push(`Socials (${args.socials.length})`);
        } else if (fnName === "update_websites") {
          const { error } = await admin.from("site_settings").update({ websites: args.websites }).eq("id", settingsRow.id);
          if (error) result = { ok: false, error: error.message };
          else changesApplied.push(`Websites (${args.websites.length})`);
        } else if (fnName === "update_menu_sections") {
          const { error } = await admin.from("site_settings").update({ menu_sections: args.menu_sections }).eq("id", settingsRow.id);
          if (error) result = { ok: false, error: error.message };
          else changesApplied.push(`Menu sections (${args.menu_sections.length})`);
        } else {
          result = { ok: false, error: "Unknown tool" };
        }

        conversation.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(result),
        });
      }
    }

    return new Response(
      JSON.stringify({ reply: "Tapos na ang changes.", changes: changesApplied }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("admin-ai error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
