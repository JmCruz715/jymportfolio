import { StickyNote, Plus } from "lucide-react";
import { useProfileMedia } from "@/hooks/useProfileMedia";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const NotesFeed = () => {
  const { notes } = useProfileMedia();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  return (
    <div className="liquid-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Notes</h3>
        </div>
        <button
          onClick={() => navigate(isAdmin ? "/admin" : "/admin/login")}
          className="liquid-button h-8 px-2.5 text-[11px] gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Create
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">Wala pang notes. Mag-create sa admin!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl p-4 bg-gradient-to-br ${n.color} text-white shadow-md`}
            >
              {n.title && <h4 className="font-bold text-base mb-1">{n.title}</h4>}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{n.content}</p>
              <p className="text-[10px] opacity-70 mt-2">{new Date(n.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesFeed;
