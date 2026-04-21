import { useState } from "react";
import { ExternalLink, ChevronDown } from "lucide-react";

interface MenuSectionProps {
  title: string;
  emoji: string;
  count: number;
  links: { title: string; description: string; href: string }[];
  delay?: string;
  defaultOpen?: boolean;
}

const MenuSection = ({ title, emoji, count, links, delay = "0.2s", defaultOpen = false }: MenuSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 animate-fade-in" style={{ animationDelay: delay, animationFillMode: "backwards" }}>
      <button
        onClick={() => setOpen(!open)}
        className="liquid-button w-full justify-between px-3 py-3 group"
      >
        <div className="flex items-center gap-2">
          <span>{emoji}</span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">{title}</span>
          <span className="text-[10px] bg-primary/20 text-primary font-mono px-1.5 py-0.5 rounded">{count}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="flex flex-col gap-2 mt-1 animate-fade-in">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-button w-full justify-between gap-2 px-3 py-3 group"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">{link.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{link.description}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSection;
