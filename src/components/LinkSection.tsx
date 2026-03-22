import { useState } from "react";
import { ChevronDown } from "lucide-react";
import LinkCard from "./LinkCard";

interface LinkSectionProps {
  title: string;
  count: number;
  emoji: string;
  links: { title: string; description: string; href: string }[];
  defaultOpen?: boolean;
}

const LinkSection = ({ title, count, emoji, links, defaultOpen = false }: LinkSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="animate-fade-up" style={{ animationDelay: "0.55s" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-1 py-2 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{emoji}</span>
          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">{title}</span>
          <span className="text-[10px] bg-primary/20 text-primary font-mono font-medium px-1.5 py-0.5 rounded">
            {count}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="grid gap-2 mt-1">
          {links.map((link) => (
            <LinkCard key={link.title} {...link} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkSection;
