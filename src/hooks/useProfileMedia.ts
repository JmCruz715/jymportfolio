import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AlbumPhoto = { id: string; image_url: string; caption: string | null; sort_order: number; created_at: string };
export type Highlight = { id: string; media_url: string; media_type: string; title: string | null; sort_order: number; created_at: string };
export type Note = { id: string; title: string | null; content: string; color: string; created_at: string };

export const useProfileMedia = () => {
  const [album, setAlbum] = useState<AlbumPhoto[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [a, h, n] = await Promise.all([
      supabase.from("album_photos").select("*").order("sort_order").order("created_at", { ascending: false }),
      supabase.from("highlights").select("*").order("sort_order").order("created_at", { ascending: false }),
      supabase.from("notes").select("*").order("created_at", { ascending: false }),
    ]);
    if (a.data) setAlbum(a.data as AlbumPhoto[]);
    if (h.data) setHighlights(h.data as Highlight[]);
    if (n.data) setNotes(n.data as Note[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const ch = supabase
      .channel(`profile_media_${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "album_photos" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "highlights" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "notes" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [load]);

  return { album, highlights, notes, loading, reload: load };
};
