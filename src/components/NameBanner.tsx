import { useState } from "react";
import { Palette } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import VipBadge from "@/components/VipBadge";

export type BannerStyle = "galaxy" | "neon" | "gold" | "chrome" | "fire" | "aurora";

const STYLES: { id: BannerStyle; label: string }[] = [
  { id: "galaxy", label: "Galaxy" },
  { id: "neon", label: "Neon" },
  { id: "gold", label: "Gold" },
  { id: "chrome", label: "Chrome" },
  { id: "fire", label: "Fire" },
  { id: "aurora", label: "Aurora" },
];

const NameBanner = ({ name }: { name: string }) => {
  const [style, setStyle] = useState<BannerStyle>(() => {
    if (typeof window === "undefined") return "galaxy";
    return (localStorage.getItem("bannerStyle") as BannerStyle) || "galaxy";
  });
  const [open, setOpen] = useState(false);

  const pick = (s: BannerStyle) => {
    setStyle(s);
    localStorage.setItem("bannerStyle", s);
    setOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className={`name-banner name-banner--${style}`}>
        <span className="name-banner__inner">
          <VipBadge size={18} />
          <span className="name-banner__text">{name}</span>
          <VerifiedBadge size={18} className="shrink-0 drop-shadow" />
        </span>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="smooth-btn inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-border/60 hover:bg-secondary transition"
      >
        <Palette className="w-3 h-3 text-primary" /> Banner style
      </button>

      {open && (
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs animate-fade-in">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => pick(s.id)}
              className={`name-banner name-banner--${s.id} !py-1.5 !px-2 text-[10px] ${
                style === s.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <span className="name-banner__inner">
                <span className="name-banner__text !text-[11px]">{s.label}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NameBanner;
