import { ExternalLink } from "lucide-react";

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
}

const LinkCard = ({ title, description, href }: LinkCardProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="card-surface p-4 flex items-center justify-between gap-3 group hover:border-primary/40 transition-all duration-200 active:scale-[0.98]"
  >
    <div className="min-w-0">
      <p className="text-sm font-semibold text-foreground uppercase tracking-wide">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </div>
    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
  </a>
);

export default LinkCard;
