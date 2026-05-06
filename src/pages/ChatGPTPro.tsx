import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const ChatGPTPro = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatgpt-pro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({}));
        setMessages([...next, { role: "assistant", content: err.error || "May error sa AI." }]);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      setMessages([...next, { role: "assistant", content: "" }]);

      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const j = line.slice(6).trim();
          if (j === "[DONE]") { done = true; break; }
          try {
            const p = JSON.parse(j);
            const c = p.choices?.[0]?.delta?.content;
            if (c) {
              acc += c;
              setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: acc } : m));
            }
          } catch { buf = line + "\n" + buf; break; }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages([...next, { role: "assistant", content: "May error sa connection." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 backdrop-blur bg-background/80 border-b border-border/40 p-3 flex items-center gap-2">
        <button onClick={() => navigate("/")} className="liquid-icon-button">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </span>
        <div>
          <h1 className="text-sm font-bold text-foreground">ChatGPT Pro</h1>
          <p className="text-[10px] text-muted-foreground">Powered by Lovable AI</p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-w-2xl w-full mx-auto">
        {messages.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-16">
            Magtanong ka kahit ano! 💬
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border/40 text-foreground"}`}>
              {m.role === "assistant" ? (
                <div className="prose prose-sm prose-invert max-w-none text-foreground [&_p]:my-1 [&_pre]:text-xs [&_code]:text-xs">
                  <ReactMarkdown>{m.content || "..."}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
          </div>
        ))}
        {busy && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start"><Loader2 className="w-4 h-4 animate-spin text-primary" /></div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="sticky bottom-0 backdrop-blur bg-background/80 border-t border-border/40 p-3 flex gap-2 max-w-2xl w-full mx-auto"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mag-type ng mensahe..."
          disabled={busy}
          className="flex-1 h-11 rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" disabled={busy || !input.trim()} className="liquid-button liquid-button-primary h-11 w-11 p-0 flex items-center justify-center">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatGPTPro;
