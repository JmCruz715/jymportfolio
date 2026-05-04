import { MapPin, ExternalLink } from "lucide-react";

const LocationMap = () => {
  const place = "Maronong, Sta. Barbara, Pangasinan, Philippines";
  // Maronong, Sta. Barbara, Pangasinan approx coords
  const lat = 15.9722;
  const lng = 120.4361;
  const delta = 0.012;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const openHref = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;

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
          aria-label="Open in maps"
          title="Open in maps"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-border/40 aspect-[4/3] bg-card">
        <iframe
          title="Map of Maronong, Sta. Barbara, Pangasinan"
          src={src}
          loading="lazy"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
        <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/85 backdrop-blur border border-border/50">
          <MapPin className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-medium text-foreground truncate">📍 Maronong, Sta. Barbara, Pangasinan 🇵🇭</span>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
