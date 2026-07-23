import { MapPin, ExternalLink } from "lucide-react";

const LocationMap = () => {
  const place = "Maronong, Sta. Barbara, Pangasinan, Philippines";
  const query = encodeURIComponent("Maronong, Santa Barbara, Pangasinan, Philippines");
  // Google Maps embed (no API key required, accurate digital map)
  const src = `https://www.google.com/maps?q=${query}&z=16&output=embed`;
  const openHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="liquid-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground leading-tight">Location</h3>
            <p className="text-[10px] text-muted-foreground truncate">{place}</p>
          </div>
        </div>
        <a
          href={openHref}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-icon-button shrink-0"
          aria-label="Open in Google Maps"
          title="Open in Google Maps"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-border/40 aspect-[4/3] bg-card">
        <iframe
          title="Google Map — Maronong, Sta. Barbara, Pangasinan"
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
        <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur border border-border/50">
          <MapPin className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-medium text-foreground truncate">
            📍 Maronong, Sta. Barbara, Pangasinan 🇵🇭
          </span>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
