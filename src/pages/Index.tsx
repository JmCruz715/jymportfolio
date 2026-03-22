import { Moon, Menu } from "lucide-react";
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
];

const downloaders = [
  { title: "Spotify Downloader", description: "Download music from Spotify", href: "https://mysteriousq-spotifydl.onrender.com/" },
  { title: "YouTube Downloader", description: "Download video from YouTube", href: "https://mysteriousq-ytdl.onrender.com/" },
  { title: "Instagram Downloader", description: "Download video from Instagram", href: "https://mysteriousq-igdl.onrender.com/" },
  { title: "Facebook Downloader", description: "Download video from Facebook", href: "https://mysteriousq-fbdl.onrender.com/" },
  { title: "TikTok Downloader", description: "Download TikTok without watermark", href: "https://mysteriousq-tiktokdl.onrender.com/" },
  { title: "X Downloader", description: "Download video from Twitter", href: "https://mysteriousq-xdownloader.onrender.com/" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Top bar */}
      <div className="fixed top-0 right-0 p-4 flex items-center gap-3 z-10 animate-fade-in">
        <button className="text-accent hover:text-accent/80 transition-colors active:scale-95">
          <Moon className="w-6 h-6" />
        </button>
        <button className="text-foreground hover:text-muted-foreground transition-colors active:scale-95">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <main className="max-w-md mx-auto px-5 py-20 flex flex-col gap-8">
        {/* Link sections at top */}
        <div className="flex flex-col gap-4">
          <LinkSection title="Tools" count={5} emoji="🛠️" links={tools} />
          <LinkSection title="Downloader" count={6} emoji="⬇️" links={downloaders} />
        </div>

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

        {/* Footer */}
        <footer className="text-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-xs text-muted-foreground">
            © 2026 | Developed by: <span className="text-primary">Siegfried Samá</span>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
