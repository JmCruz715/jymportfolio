import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ExternalLink, ShoppingBag } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import SocialLinks from "@/components/SocialLinks";
import StatsRow from "@/components/StatsRow";
import LiveClock from "@/components/LiveClock";
import BatteryIndicator from "@/components/BatteryIndicator";
import LinkSection from "@/components/LinkSection";

const tools = [
{ title: "Auto Share", description: "Spam share tool", href: "https://mysteriousq-autoshare.onrender.com/" },
{ title: "Get Cookie Token", description: "Tutorial how to get cookie", href: "https://mysteriousq-get-cookie.onrender.com/" },
{ title: "SMS Bomber", description: "Spam any PH number", href: "https://mysteriousq-sms-bomber.onrender.com/" },
{ title: "TempMail", description: "Generate temporary email", href: "https://mysteriousq-tempmail.onrender.com/" },
{ title: "Website Screenshot", description: "Capture any website", href: "https://mysteriousq-website-screenshot.onrender.com/" },
{ title: "V2LMlbb", description: "V2LMlbb tool", href: "https://website-replica--hunterzeno88.replit.app/" },
{ title: "All in One Tools", description: "All-in-one social media downloader", href: "https://all-social-media-downloader-seven.vercel.app/" }];


const downloaders = [
{ title: "Spotify Downloader", description: "Download music from Spotify", href: "https://mysteriousq-spotifydl.onrender.com/" },
{ title: "YouTube Downloader", description: "Download video from YouTube", href: "https://mysteriousq-ytdl.onrender.com/" },
{ title: "Instagram Downloader", description: "Download video from Instagram", href: "https://mysteriousq-igdl.onrender.com/" },
{ title: "Facebook Downloader", description: "Download video from Facebook", href: "https://mysteriousq-fbdl.onrender.com/" },
{ title: "TikTok Downloader", description: "Download TikTok without watermark", href: "https://mysteriousq-tiktokdl.onrender.com/" },
{ title: "X Downloader", description: "Download video from Twitter", href: "https://mysteriousq-xdownloader.onrender.com/" }];


const Index = () => {
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

  return (
    <div className="min-h-screen bg-background relative">
      {/* Top bar */}
      <div className="fixed top-0 right-0 p-4 flex items-center gap-3 z-30 animate-fade-in">
        <button
          onClick={() => setIsDark(!isDark)}
          className="text-accent hover:text-accent/80 transition-colors active:scale-95">
          {isDark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-foreground hover:text-muted-foreground transition-colors active:scale-95">
          
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Slide-out menu */}
      {menuOpen &&
      <div className="fixed inset-0 z-20 animate-fade-in" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300" />
          <div
          className="absolute right-0 top-0 h-full w-72 bg-card border-l border-border p-6 pt-16 overflow-y-auto animate-slide-in-right"
          onClick={(e) => e.stopPropagation()}>

            {/* Shop */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
              <a
                href="https://sociabuzz.com/zenoshin1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group active:scale-[0.98]">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Shop</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Visit my store</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-auto" />
              </a>
            </div>
          
            {/* Tools */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
                <span>🛠️</span> Tools
                <span className="text-[10px] bg-primary/20 text-primary font-mono px-1.5 py-0.5 rounded">{tools.length}</span>
              </p>
              <div className="flex flex-col gap-2">
                {tools.map((t) =>
              <a
                key={t.title}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group active:scale-[0.98]">
                
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide">{t.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{t.description}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </a>
              )}
              </div>
            </div>

            {/* Downloaders */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
                <span>⬇️</span> Downloader
                <span className="text-[10px] bg-primary/20 text-primary font-mono px-1.5 py-0.5 rounded">{downloaders.length}</span>
              </p>
              <div className="flex flex-col gap-2">
                {downloaders.map((d) =>
              <a
                key={d.title}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group active:scale-[0.98]">
                
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide">{d.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{d.description}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </a>
              )}
              </div>
            </div>
          </div>
        </div>
      }

      {/* Main content */}
      <main className="max-w-md mx-auto px-5 py-20 flex flex-col gap-8">

        {/* Profile */}
        <ProfileCard />

        {/* Social links */}
        <SocialLinks />

        {/* Stats */}
        <StatsRow />

        {/* Clock */}
        <LiveClock />

        {/* Battery */}
        <BatteryIndicator />

        {/* YouTube Music Player */}
        <div className="animate-fade-up" style={{ animationDelay: "0.55s" }}>
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://music.youtube.com/embed/nyuo9-OjNNg"
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media"
            loading="lazy"
            title="Arctic Monkeys - I Wanna Be Yours"
          />
        </div>

        {/* Footer */}
        <footer className="text-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-xs text-muted-foreground">
            © 2026 | Developed by: <span className="text-primary">​jmcruz
 </span>
          </p>
        </footer>
      </main>
    </div>);
};

export default Index;