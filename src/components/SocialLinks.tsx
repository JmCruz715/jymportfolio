import { Facebook, Instagram, Github } from "lucide-react";

const MessengerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.2.16.15.26.36.27.58l.05 1.81c.02.56.6.93 1.11.7l2.02-.8c.17-.07.36-.09.54-.05.89.24 1.84.37 2.86.37 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm5.89 7.55-2.89 4.58c-.46.73-1.44.91-2.13.39l-2.3-1.72a.53.53 0 0 0-.64 0l-3.1 2.35c-.41.31-.95-.18-.67-.62l2.89-4.58c.46-.73 1.44-.91 2.13-.39l2.3 1.72a.53.53 0 0 0 .64 0l3.1-2.35c.41-.31.95.18.67.62z" />
  </svg>
);

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/jm.born67", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/zenoshin11/", label: "Instagram" },
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
