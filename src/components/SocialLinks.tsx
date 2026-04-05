import { Facebook, Github } from "lucide-react";

const MessengerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2.16.15.26.36.27.58l.05 1.81c.02.56.6.93 1.11.7l2.02-.8c.17-.07.36-.09.54-.05.89.24 1.84.37 2.86.37 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm5.89 7.55-2.89 4.58c-.46.73-1.44.91-2.13.39l-2.3-1.72a.53.53 0 0 0-.64 0l-3.1 2.35c-.41.31-.95-.18-.67-.62l2.89-4.58c.46-.73 1.44-.91 2.13-.39l2.3 1.72a.53.53 0 0 0 .64 0l3.1-2.35c.41-.31.95.18.67.62z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
  </svg>
);

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/jm.born67", label: "Facebook" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@kaizenjym", label: "TikTok" },
  { icon: Github, href: "https://github.com/JmCruz715", label: "GitHub" },
  { icon: MessengerIcon, href: "https://m.me/jm.born67", label: "Messenger" },
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
        className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-95 hover:scale-110 hover:shadow-lg"
      >
        <Icon className="w-[18px] h-[18px]" />
      </a>
    ))}
  </div>
);

export default SocialLinks;
