import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Phrase = { text: string; color: string };
export type Social = { label: string; icon: string; href: string };
export type WebsiteLink = { title: string; description: string; href: string };
export type MenuLink = { title: string; description: string; href: string };
export type MenuSectionData = { title: string; emoji: string; links: MenuLink[] };

export interface SiteSettings {
  id: string;
  name: string;
  role_label: string;
  bio: string;
  avatar_url: string;
  cover_url: string;
  phrases: Phrase[];
  socials: Social[];
  websites: WebsiteLink[];
  menu_sections: MenuSectionData[];
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (!error && data) setSettings(data as unknown as SiteSettings);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel(`site_settings_changes_${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => load()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  return { settings, loading, reload: load };
};
