import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfileMedia } from "@/hooks/useProfileMedia";
import { Camera, Plus, Trash2, Loader2, StickyNote, Image as ImageIcon, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const NOTE_COLORS = [
  "from-pink-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500",
  "from-purple-600 to-indigo-600",
];

export const AdminMediaManager = () => {
  const { album, highlights, notes, reload } = useProfileMedia();

  // Album upload
  const albumRef = useRef<HTMLInputElement>(null);
  const [albumBusy, setAlbumBusy] = useState(false);
  const [albumCaption, setAlbumCaption] = useState("");

  const uploadAlbum = async (file: File) => {
    setAlbumBusy(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `album/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("profile-media").upload(path, file, { contentType: file.type, upsert: false });
    if (upErr) { toast({ title: "Upload failed", description: upErr.message, variant: "destructive" }); setAlbumBusy(false); return; }
    const { data: pub } = supabase.storage.from("profile-media").getPublicUrl(path);
    const { error } = await supabase.from("album_photos").insert({ image_url: pub.publicUrl, caption: albumCaption || null });
    setAlbumBusy(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { setAlbumCaption(""); reload(); toast({ title: "Photo added!" }); }
  };

  const deleteAlbum = async (id: string) => {
    const { error } = await supabase.from("album_photos").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else reload();
  };

  // Highlights
  const hlRef = useRef<HTMLInputElement>(null);
  const [hlBusy, setHlBusy] = useState(false);
  const [hlTitle, setHlTitle] = useState("");

  const uploadHighlight = async (file: File) => {
    setHlBusy(true);
    const ext = file.name.split(".").pop() || "jpg";
    const isVideo = file.type.startsWith("video");
    const path = `highlights/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("profile-media").upload(path, file, { contentType: file.type });
    if (upErr) { toast({ title: "Upload failed", description: upErr.message, variant: "destructive" }); setHlBusy(false); return; }
    const { data: pub } = supabase.storage.from("profile-media").getPublicUrl(path);
    const { error } = await supabase.from("highlights").insert({
      media_url: pub.publicUrl, media_type: isVideo ? "video" : "image", title: hlTitle || null,
    });
    setHlBusy(false);
    if (error) toast({ title: "Save failed", description: error.message, variant: "destructive" });
    else { setHlTitle(""); reload(); toast({ title: "Highlight added!" }); }
  };

  const deleteHighlight = async (id: string) => {
    const { error } = await supabase.from("highlights").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else reload();
  };

  // Notes
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteColor, setNoteColor] = useState(NOTE_COLORS[0]);
  const [noteBusy, setNoteBusy] = useState(false);

  const postNote = async () => {
    if (!noteContent.trim()) { toast({ title: "Sumulat ng content" }); return; }
    setNoteBusy(true);
    const { error } = await supabase.from("notes").insert({ title: noteTitle || null, content: noteContent, color: noteColor });
    setNoteBusy(false);
    if (error) toast({ title: "Post failed", description: error.message, variant: "destructive" });
    else { setNoteTitle(""); setNoteContent(""); reload(); toast({ title: "Note posted!" }); }
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else reload();
  };

  return (
    <>
      {/* HIGHLIGHTS */}
      <div className="liquid-panel p-5 flex flex-col gap-3 animate-liquid-in">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Highlights / My Day</h2>
        </div>
        <Input placeholder="Title (optional)" value={hlTitle} onChange={(e) => setHlTitle(e.target.value)} />
        <button
          onClick={() => hlRef.current?.click()}
          disabled={hlBusy}
          className="liquid-button liquid-button-primary h-12 gap-2"
        >
          {hlBusy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          Mag-add ng Highlight (image/video)
        </button>
        <input ref={hlRef} type="file" accept="image/*,video/*" hidden onChange={(e) => e.target.files?.[0] && uploadHighlight(e.target.files[0])} />
        {highlights.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pt-2">
            {highlights.map((h) => (
              <div key={h.id} className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50">
                  {h.media_type === "video"
                    ? <video src={h.media_url} className="w-full h-full object-cover" muted />
                    : <img src={h.media_url} className="w-full h-full object-cover" alt="" />}
                </div>
                <button onClick={() => deleteHighlight(h.id)} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ALBUM */}
      <div className="liquid-panel p-5 flex flex-col gap-3 animate-liquid-in">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Album / Photos</h2>
        </div>
        <Input placeholder="Caption (optional)" value={albumCaption} onChange={(e) => setAlbumCaption(e.target.value)} />
        <button
          onClick={() => albumRef.current?.click()}
          disabled={albumBusy}
          className="liquid-button liquid-button-primary h-12 gap-2"
        >
          {albumBusy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Camera className="w-5 h-5" />}
          Mag-upload ng Photo
        </button>
        <input ref={albumRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && uploadAlbum(e.target.files[0])} />
        {album.length > 0 && (
          <div className="grid grid-cols-3 gap-1.5 pt-2">
            {album.map((p) => (
              <div key={p.id} className="relative aspect-square rounded-lg overflow-hidden">
                <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                <button onClick={() => deleteAlbum(p.id)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NOTES */}
      <div className="liquid-panel p-5 flex flex-col gap-3 animate-liquid-in">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Create Note</h2>
        </div>
        <Input placeholder="Title (optional)" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
        <Textarea rows={4} placeholder="Anong nasa isip mo?" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
        <div className="flex gap-2 flex-wrap">
          {NOTE_COLORS.map((c) => (
            <button key={c} onClick={() => setNoteColor(c)}
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${c} ${noteColor === c ? "ring-2 ring-offset-2 ring-offset-background ring-primary" : ""}`}
              aria-label="Pick color"
            />
          ))}
        </div>
        <button onClick={postNote} disabled={noteBusy} className="liquid-button liquid-button-primary h-11 gap-2">
          {noteBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          I-post ang Note
        </button>
        {notes.length > 0 && (
          <div className="flex flex-col gap-2 pt-2">
            {notes.map((n) => (
              <div key={n.id} className={`relative rounded-xl p-3 bg-gradient-to-br ${n.color} text-white pr-10`}>
                {n.title && <h4 className="font-bold text-sm">{n.title}</h4>}
                <p className="text-xs whitespace-pre-wrap">{n.content}</p>
                <button onClick={() => deleteNote(n.id)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
