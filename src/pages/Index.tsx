import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, ShoppingBag, Download, Sparkles, Lock, Bot, Menu as MenuIcon } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import SocialLinks from "@/components/SocialLinks";
import StatsRow from "@/components/StatsRow";
import MenuSection from "@/components/MenuSection";
import MusicButton from "@/components/MusicButton";
import LocationMap from "@/components/LocationMap";
import TopNav from "@/components/TopNav";
import StatusStrip from "@/components/StatusStrip";
import ContactCard from "@/components/ContactCard";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const tools = [
  { title: "Auto Share", description: "Spam share tool", href: "https://mysteriousq-autoshare.onrender.com/" },
  { title: "Get Cookie Token", description: "Tutorial how to get cookie", href: "https://mysteriousq-get-cookie.onrender.com/" },
  { title: "SMS Bomber", description: "Spam any PH number", href: "https://mysteriousq-sms-bomber.onrender.com/" },
  { title: "TempMail", description: "Generate temporary email", href: "https://mysteriousq-tempmail.onrender.com/" },
  { title: "Website Screenshot", description: "Capture any website", href: "https://mysteriousq-website-screenshot.onrender.com/" },
  { title: "V2LMlbb", description: "V2LMlbb tool", href: "https://website-replica--hunterzeno88.replit.app/" },
  { title: "All in One Tools", description: "All-in-one social media downloader", href: "https://all-social-media-downloader-seven.vercel.app/" },
];

const downloaders = [
  { title: "Spotify Downloader", description: "Download music from Spotify", href: "https://mysteriousq-spotifydl.onrender.com/" },
  { title: "YouTube Downloader", description: "Download video from YouTube", href: "https://mysteriousq-ytdl.onrender.com/" },
  { title: "Facebook Downloader", description: "Download video from Facebook", href: "https://mysteriousq-fbdl.onrender.com/" },
  { title: "TikTok Downloader", description: "Download TikTok without watermark", href: "https://mysteriousq-tiktokdl.onrender.com/" },
  { title: "X Downloader", description: "Download video from Twitter", href: "https://mysteriousq-xdownloader.onrender.com/" },
];

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

type RevealVariant = "fade-up" | "slide-left" | "slide-right" | "scale" | "zoom-rotate";
const variantStyles: Record<RevealVariant, { hidden: string; visible: string }> = {
  "fade-up": { hidden: "opacity-0 translate-y-8", visible: "opacity-100 translate-y-0" },
  "slide-left": { hidden: "opacity-0 -translate-x-12", visible: "opacity-100 translate-x-0" },
  "slide-right": { hidden: "opacity-0 translate-x-12", visible: "opacity-100 translate-x-0" },
  "scale": { hidden: "opacity-0 scale-75", visible: "opacity-100 scale-100" },
  "zoom-rotate": { hidden: "opacity-0 scale-50 -rotate-6", visible: "opacity-100 scale-100 rotate-0" },
};

const ScrollReveal = ({ children, className = "", delay = "0s", variant = "fade-up" }: { children: React.ReactNode; className?: string; delay?: string; variant?: RevealVariant }) => {
  const { ref, isVisible } = useScrollReveal();
  const styles = variantStyles[variant];
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? styles.visible : styles.hidden} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light";
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const { settings } = useSiteSettings();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating music (bottom-right so it never overlaps the top nav) */}
      <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
        <MusicButton />
      </div>

      {/* Top nav */}
      <TopNav
        onProfile={() => scrollTo("profile")}
        onMenu={() => setMenuOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Slide-out menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-0 h-full w-[78vw] max-w-xs sm:w-72 liquid-panel rounded-none border-l p-4 sm:p-6 pt-6 overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-3">
              <button onClick={() => setMenuOpen(false)} className="smooth-btn !p-2" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/shop"); }}
                className="liquid-button w-full justify-start gap-3 px-3 py-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Shop</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Visit my store</p>
                </div>
              </button>
            </div>

            <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/downloads"); }}
                className="liquid-button w-full justify-start gap-3 px-3 py-3"
              >
                <Download className="w-5 h-5 text-primary" />
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Downloads</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Open the APK apps page</p>
                </div>
              </button>
            </div>

            <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.17s", animationFillMode: "backwards" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/chatgpt"); }}
                className="liquid-button w-full justify-start gap-3 px-3 py-3"
              >
                <Bot className="w-5 h-5 text-primary" />
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">ChatGPT Pro</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Magtanong sa AI assistant</p>
                </div>
              </button>
            </div>

            <div className="mb-4 animate-fade-in" style={{ animationDelay: "0.18s", animationFillMode: "backwards" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/admin/login"); }}
                className="liquid-button w-full justify-start gap-3 px-3 py-3"
              >
                <Lock className="w-5 h-5 text-primary" />
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Admin</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Edit profile, links & bio</p>
                </div>
              </button>
            </div>

            {(settings?.menu_sections?.length
              ? settings.menu_sections
              : [
                  { title: "Tools", emoji: "🛠️", links: tools },
                  { title: "Downloader", emoji: "⬇️", links: downloaders },
                  {
                    title: "Anime/Manga",
                    emoji: "🎌",
                    links: [
                      { title: "AnimeHaven", description: "Premium anime streaming", href: "https://animehaven-next.vercel.app/" },
                      { title: "GlobalComix Manga", description: "Browse manga online", href: "https://globalcomix.com/browse/manga" },
                    ],
                  },
                ]
            ).map((section, i) => (
              <MenuSection
                key={section.title}
                title={section.title}
                emoji={section.emoji}
                count={section.links.length}
                links={section.links}
                delay={`${0.2 + i * 0.1}s`}
              />
            ))}

            <div className="mt-6 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}>
              <div className="liquid-panel px-4 py-4">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em]">About</p>
                </div>
                <p className="text-xs leading-6 text-muted-foreground">
                  {settings?.bio ?? "jmcruz — clean tools, curated links, shop drops, and anime picks in one smooth space."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main id="home" className="max-w-md mx-auto px-5 pt-20 pb-16 flex flex-col gap-6">

        {/* Status strip */}
        <ScrollReveal variant="fade-up">
          <StatusStrip />
        </ScrollReveal>

        {/* Profile */}
        <div id="profile" className="scroll-mt-20 flex flex-col gap-6">
          <ScrollReveal variant="scale">
            <ProfileCard />
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal delay="0.1s" variant="zoom-rotate">
            <SocialLinks />
          </ScrollReveal>

          {/* Menu button below social buttons */}
          <ScrollReveal delay="0.12s" variant="fade-up">
            <button
              onClick={() => setMenuOpen(true)}
              className="smooth-card w-full flex items-center justify-center gap-2 py-3 hover:bg-secondary/60 transition-colors"
            >
              <MenuIcon className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase">Open Menu</span>
            </button>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay="0.15s" variant="slide-left">
            <StatsRow />
          </ScrollReveal>

          {/* Location map */}
          <ScrollReveal delay="0.13s" variant="fade-up">
            <LocationMap />
          </ScrollReveal>

          {/* Contact / About */}
          <ScrollReveal delay="0.15s" variant="slide-right">
            <ContactCard />
          </ScrollReveal>
        </div>

        {/* Footer */}
        <ScrollReveal delay="0.2s" variant="fade-up">
          <footer className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2026 | Developed by: <span className="text-primary font-semibold">JM Cruz</span>
            </p>
          </footer>
        </ScrollReveal>
      </main>
    </div>
  );
};

export default Index;
