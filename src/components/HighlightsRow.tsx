import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useProfileMedia, type Highlight } from "@/hooks/useProfileMedia";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const HighlightsRow = () => {
  const { highlights } = useProfileMedia();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [active, setActive] = useState<Highlight | null>(null);

  return (
    <div className="liquid-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Highlights</h3>
        <span className="text-[10px] text-muted-foreground">My Day</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
        <button
          onClick={() => navigate(isAdmin ? "/admin" : "/admin/login")}
          className="shrink-0 flex flex-col items-center gap-1.5 group"
          aria-label="Add highlight"
        >
          <span className="w-16 h-16 rounded-full border-2 border-dashed border-primary/60 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition">
            <Plus className="w-6 h-6 text-primary" />
          </span>
          <span className="text-[10px] text-muted-foreground">Add</span>
        </button>

        {highlights.map((h) => (
          <button key={h.id} onClick={() => setActive(h)} className="shrink-0 flex flex-col items-center gap-1.5">
            <span
              className="w-16 h-16 rounded-full p-[2px] animate-spin"
              style={{
                background: "conic-gradient(from 0deg, hsl(340,75%,55%), hsl(280,70%,60%), hsl(45,95%,55%), hsl(340,75%,55%))",
                animationDuration: "6s",
              }}
            >
              <span className="block w-full h-full rounded-full overflow-hidden bg-card border-2 border-background">
                {h.media_type === "video" ? (
                  <video src={h.media_url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={h.media_url} alt={h.title ?? ""} className="w-full h-full object-cover" />
                )}
              </span>
            </span>
            <span className="text-[10px] text-foreground/80 max-w-[64px] truncate">{h.title || "Story"}</span>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in" onClick={() => setActive(null)}>
          <button className="absolute top-4 right-4 liquid-icon-button" onClick={() => setActive(null)}>
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-md w-full max-h-[85vh] rounded-2xl overflow-hidden">
            {active.media_type === "video" ? (
              <video src={active.media_url} controls autoPlay className="w-full h-full object-contain" />
            ) : (
              <img src={active.media_url} alt={active.title ?? ""} className="w-full h-full object-contain" />
            )}
            {active.title && <p className="text-center text-sm text-white mt-3">{active.title}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightsRow;
