import { Facebook, Instagram, Github } from "lucide-react";

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/jm.born67", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/zenoshin11/", label: "Instagram" },
  { icon: Github, href: "https://github.com/JmCruz715", label: "GitHub" },
];

const SocialLinks = () => (
  <div className="flex items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.35s" }}>
    {socials.map(({ icon: Icon, href, label }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={label}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95"
      >
        <Icon className="w-[18px] h-[18px]" />
      </a>
    ))}
  </div>
);

export default SocialLinks;
