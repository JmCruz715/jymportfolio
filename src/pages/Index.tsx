import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, ShoppingBag, Download, Sparkles, Lock, Bot } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import SocialLinks from "@/components/SocialLinks";
import StatsRow from "@/components/StatsRow";
import LiveClock from "@/components/LiveClock";
import BatteryIndicator from "@/components/BatteryIndicator";
import MenuSection from "@/components/MenuSection";
import MusicButton from "@/components/MusicButton";
import WebsitesSection from "@/components/WebsitesSection";
import HighlightsRow from "@/components/HighlightsRow";
import AlbumGrid from "@/components/AlbumGrid";
import NotesFeed from "@/components/NotesFeed";
import LocationMap from "@/components/LocationMap";
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
{ title: "X Downloader", description: "Download video from Twitter", href: "https://mysteriousq-xdownloader.onrender.com/" }];


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

type RevealVariant = "fade-up" | "slide-left" | "slide-right" | "scale" | "flip" | "zoom-rotate";

const variantStyles: Record<RevealVariant, { hidden: string; visible: string }> = {
  "fade-up": { hidden: "opacity-0 translate-y-8", visible: "opacity-100 translate-y-0" },
  "slide-left": { hidden: "opacity-0 -translate-x-12", visible: "opacity-100 translate-x-0" },
  "slide-right": { hidden: "opacity-0 translate-x-12", visible: "opacity-100 translate-x-0" },
  "scale": { hidden: "opacity-0 scale-75", visible: "opacity-100 scale-100" },
  "flip": { hidden: "opacity-0 rotate-x-90", visible: "opacity-100 rotate-x-0" },
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
  const [chatOpen, setChatOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-background relative">
      {/* Top-left music button */}
      <div className="fixed top-0 left-0 p-4 z-30 animate-fade-in">
        <MusicButton />
      </div>
      {/* Top-right controls */}
      <div className="fixed top-0 right-0 p-4 flex items-center justify-end z-30 animate-fade-in">
        <div className="flex items-center gap-3">
        <button
          onClick={() => setIsDark(!isDark)}
          className="liquid-icon-button">
          {isDark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="liquid-icon-button">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        </div>
      </div>

      {/* Slide-out menu */}
      {menuOpen &&
      <div className="fixed inset-0 z-20 animate-fade-in" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300" />
          <div
          className="absolute right-0 top-0 h-full w-[78vw] max-w-xs sm:w-72 liquid-panel rounded-none border-l p-4 sm:p-6 pt-16 overflow-y-auto animate-slide-in-right"
          onClick={(e) => e.stopPropagation()}>

            {/* Shop */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/shop"); }}
                className="liquid-button w-full justify-start gap-3 px-3 py-3 group">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Shop</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Visit my store</p>
                </div>
              </button>
            </div>

            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "backwards" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/downloads"); }}
                className="liquid-button w-full justify-start gap-3 px-3 py-3 group"
              >
                <Download className="w-5 h-5 text-primary" />
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Downloads</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Open the APK apps page</p>
                </div>
              </button>
            </div>

            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.17s", animationFillMode: "backwards" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/chatgpt"); }}
                className="liquid-button w-full justify-start gap-3 px-3 py-3 group"
              >
                <Bot className="w-5 h-5 text-primary" />
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">ChatGPT Pro</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Magtanong sa AI assistant</p>
                </div>
              </button>
            </div>

            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.18s", animationFillMode: "backwards" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/admin/login"); }}
                className="liquid-button w-full justify-start gap-3 px-3 py-3 group"
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
                  {settings?.bio ?? "jmcruz builds clean tools, curated links, shop drops, and anime picks in one smooth liquid-glass space."}
                </p>
              </div>
            </div>
          </div>
        </div>
      }

      {/* Main content */}
      <main className="max-w-md mx-auto px-5 py-20 flex flex-col gap-8">

        {/* Notes - on top of profile (Facebook-style status) */}
        <ScrollReveal delay="0.04s" variant="fade-up">
          <NotesFeed />
        </ScrollReveal>

        {/* Profile (cover + avatar) */}
        <ScrollReveal variant="scale">
          <ProfileCard />
        </ScrollReveal>

        {/* Album */}
        <ScrollReveal delay="0.08s" variant="fade-up">
          <AlbumGrid />
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay="0.1s" variant="zoom-rotate">
          <SocialLinks />
        </ScrollReveal>

        {/* Connected websites */}
        <ScrollReveal delay="0.12s" variant="fade-up">
          <WebsitesSection />
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay="0.15s" variant="slide-left">
          <StatsRow />
        </ScrollReveal>

        {/* Location map */}
        <ScrollReveal delay="0.13s" variant="fade-up">
          <LocationMap />
        </ScrollReveal>

        {/* Clock */}
        <ScrollReveal delay="0.1s" variant="slide-right">
          <LiveClock />
        </ScrollReveal>

        {/* Battery */}
        <ScrollReveal delay="0.15s" variant="slide-left">
          <BatteryIndicator />
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay="0.2s" variant="fade-up">
          <footer className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2026 | Developed by: <span className="text-primary">​{settings?.name ?? "jmcruz"}</span>
            </p>
          </footer>
        </ScrollReveal>
      </main>
    </div>);
};

export default Index;