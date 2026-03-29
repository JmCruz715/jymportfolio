import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, ExternalLink, ShoppingBag } from "lucide-react";
import ProfileCard from "@/components/ProfileCard";
import SocialLinks from "@/components/SocialLinks";
import StatsRow from "@/components/StatsRow";
import LiveClock from "@/components/LiveClock";
import BatteryIndicator from "@/components/BatteryIndicator";
import MenuSection from "@/components/MenuSection";
import VisitorCounter from "@/components/VisitorCounter";

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
{ title: "Instagram Downloader", description: "Download video from Instagram", href: "https://mysteriousq-igdl.onrender.com/" },
{ title: "Facebook Downloader", description: "Download video from Facebook", href: "https://mysteriousq-fbdl.onrender.com/" },
{ title: "TikTok Downloader", description: "Download TikTok without watermark", href: "https://mysteriousq-tiktokdl.onrender.com/" },
{ title: "X Downloader", description: "Download video from Twitter", href: "https://mysteriousq-xdownloader.onrender.com/" }];


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

  return (
    <div className="min-h-screen bg-background relative">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-30 animate-fade-in">
        <VisitorCounter />
        <div className="flex items-center gap-3">
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
              <button
                onClick={() => { setMenuOpen(false); navigate("/shop"); }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group active:scale-[0.98]">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <div className="min-w-0 text-left">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Shop</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Visit my store</p>
                </div>
              </button>
            </div>
          
            <MenuSection
              title="Tools"
              emoji="🛠️"
              count={tools.length}
              links={tools}
              delay="0.2s"
            />

            <MenuSection
              title="Downloader"
              emoji="⬇️"
              count={downloaders.length}
              links={downloaders}
              delay="0.3s"
            />

            <MenuSection
              title="Premium Tools"
              emoji="⭐"
              count={1}
              links={[{ title: "AnimeHaven", description: "Premium anime streaming", href: "https://animehaven-next.vercel.app/" }]}
              delay="0.4s"
            />
          </div>
        </div>
      }

      {/* Main content */}
      <main className="max-w-md mx-auto px-5 py-20 flex flex-col gap-8">

        {/* Profile */}
        <ProfileCard />

        {/* Social links */}
        <div className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <SocialLinks />
        </div>

        {/* Stats */}
        <div className="animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <StatsRow />
        </div>

        {/* Clock */}
        <div className="animate-slide-in-left" style={{ animationDelay: "0.45s" }}>
          <LiveClock />
        </div>

        {/* Battery */}
        <div className="animate-slide-in-left" style={{ animationDelay: "0.55s" }}>
          <BatteryIndicator />
        </div>


        {/* Background Music */}
        <audio autoPlay loop src="/audio/I_Wanna_Be_Yours.mp3" />

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