import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const ChatGPTProModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  if (!open) return null;

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
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in" onClick={onClose}>
      <div className="liquid-panel w-full max-w-md h-[85vh] flex flex-col overflow-hidden animate-liquid-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-3 border-b border-border/40 bg-gradient-to-r from-primary/20 to-purple-500/20">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-foreground">ChatGPT Pro</h3>
              <p className="text-[10px] text-muted-foreground">Powered by Lovable AI</p>
            </div>
          </div>
          <button onClick={onClose} className="liquid-icon-button"><X className="w-4 h-4" /></button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-xs text-muted-foreground py-8">
              Magtanong ka kahit ano! 💬
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border/40 text-foreground"}`}>
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
          className="p-3 border-t border-border/40 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mag-type ng mensahe..."
            disabled={busy}
            className="flex-1 h-10 rounded-full border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" disabled={busy || !input.trim()} className="liquid-button liquid-button-primary h-10 w-10 p-0 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatGPTProModal;
