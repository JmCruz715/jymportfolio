import { ExternalLink, Globe } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const WebsitesSection = () => {
  const { settings } = useSiteSettings();
  const sites = settings?.websites ?? [];
  if (!sites.length) return null;

  return (
    <div className="liquid-panel p-4 animate-liquid-in">
      <div className="flex items-center gap-2 mb-3 text-primary">
        <Globe className="w-4 h-4" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em]">My Websites</p>
      </div>
      <div className="flex flex-col gap-2">
        {sites.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-button w-full justify-between gap-3 px-4 py-3 group"
          >
            <div className="min-w-0 text-left">
              <p className="text-sm font-semibold text-foreground truncate">{s.title}</p>
              {s.description && (
                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{s.description}</p>
              )}
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default WebsitesSection;
