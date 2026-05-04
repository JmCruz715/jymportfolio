import { useState } from "react";
import { Camera, X, Image as ImageIcon } from "lucide-react";
import { useProfileMedia, type AlbumPhoto } from "@/hooks/useProfileMedia";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const AlbumGrid = () => {
  const { album } = useProfileMedia();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [active, setActive] = useState<AlbumPhoto | null>(null);

  const photos = album.slice(0, 9);

  return (
    <div className="liquid-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Photos</h3>
          <span className="text-[10px] text-muted-foreground">({album.length})</span>
        </div>
        <button
          onClick={() => navigate(isAdmin ? "/admin" : "/admin/login")}
          className="liquid-icon-button"
          aria-label="Add photo"
          title="Add photo"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {photos.length === 0 ? (
        <button
          onClick={() => navigate(isAdmin ? "/admin" : "/admin/login")}
          className="w-full aspect-[3/2] rounded-xl border-2 border-dashed border-primary/40 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-primary/5 transition"
        >
          <Camera className="w-7 h-7 text-primary" />
          <span className="text-xs">Add your first photo</span>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-1.5">
          {photos.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="aspect-square rounded-lg overflow-hidden bg-card border border-border/40 hover:opacity-80 transition"
            >
              <img src={p.image_url} alt={p.caption ?? ""} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {active && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in" onClick={() => setActive(null)}>
          <button className="absolute top-4 right-4 liquid-icon-button" onClick={() => setActive(null)}>
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-lg w-full">
            <img src={active.image_url} alt={active.caption ?? ""} className="w-full max-h-[80vh] object-contain rounded-xl" />
            {active.caption && <p className="text-center text-sm text-white mt-3">{active.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumGrid;
