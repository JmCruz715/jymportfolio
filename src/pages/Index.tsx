import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, ShoppingBag, Download, Bot, Wrench, Gamepad2, Coffee, Hand,
  Sparkles, Newspaper, Moon, Sun, Menu as MenuIcon, X,
  ExternalLink, Film, BookOpen, Shield, FileText, Mail, Info, Lock, Zap,
} from "lucide-react";
import MusicButton from "@/components/MusicButton";
import capcutLogo from "@/assets/capcut-logo.png";
import gamebaseCover from "@/assets/gamebase-cover.jpeg";
import abbysTools from "@/assets/abbys-tools.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

// Static links (kept minimal; moved from Open Menu into the Dashboard)
const tools = [
  { title: "Auto Share", desc: "Spam share tool", href: "https://mysteriousq-autoshare.onrender.com/" },
  { title: "SMS Bomber", desc: "Spam any PH number", href: "https://mysteriousq-sms-bomber.onrender.com/" },
  { title: "TempMail", desc: "Temporary email", href: "https://mysteriousq-tempmail.onrender.com/" },
  { title: "Website Screenshot", desc: "Capture any site", href: "https://mysteriousq-website-screenshot.onrender.com/" },
  { title: "All-in-One Tools", desc: "Social downloader", href: "https://all-social-media-downloader-seven.vercel.app/" },
];
const downloaders = [
  { title: "Spotify", href: "https://mysteriousq-spotifydl.onrender.com/" },
  { title: "YouTube", href: "https://mysteriousq-ytdl.onrender.com/" },
  { title: "Facebook", href: "https://mysteriousq-fbdl.onrender.com/" },
  { title: "TikTok", href: "https://mysteriousq-tiktokdl.onrender.com/" },
  { title: "X / Twitter", href: "https://mysteriousq-xdownloader.onrender.com/" },
];
const anime = [
  { title: "AnimeHaven", desc: "Anime streaming", icon: Film, href: "https://animehaven-next.vercel.app/" },
  { title: "GlobalComix", desc: "Read manga online", icon: BookOpen, href: "https://globalcomix.com/browse/manga" },
];
const apkApps = [
  { name: "CapCut Premium", desc: "Video editor unlocked", image: capcutLogo, href: "https://www.mediafire.com/file/yct8x3rrsde9xrs/CapCut_Premium_Apps_Free_19.9.0.apk/file" },
  { name: "GameBase", desc: "Game launcher April build", image: gamebaseCover, href: "https://www.mediafire.com/file/i1ikjc5ixopggt6/GameBase+_april15.apk/file?dkey=2ito1bgga2l&r=1955" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") !== "light" : true
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const latest = (settings?.menu_sections ?? []).slice(0, 3);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating music */}
      <div className="fixed bottom-4 right-4 z-40"><MusicButton /></div>

      {/* Top nav — simplified */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent grid place-items-center shadow-glow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold tracking-tight text-sm sm:text-base">jmcruz<span className="text-primary">.</span></span>
          </div>
          <nav className="flex items-center gap-1">
            <button onClick={() => navigate("/profile")} className="smooth-btn text-xs sm:text-sm">
              <User className="w-4 h-4" /><span className="hidden sm:inline">Profile</span>
            </button>
            <button onClick={() => setMenuOpen(true)} className="smooth-btn text-xs sm:text-sm">
              <MenuIcon className="w-4 h-4" /><span className="hidden sm:inline">Menu</span>
            </button>
            <button onClick={() => setIsDark(!isDark)} className="smooth-btn !px-2" aria-label="Toggle theme">
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </div>

      {/* Secondary open-menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          <aside
            className="absolute right-0 top-0 h-full w-[78vw] max-w-xs bg-card border-l border-border p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Menu</h2>
              <button onClick={() => setMenuOpen(false)} className="smooth-btn !p-2"><X className="w-4 h-4" /></button>
            </div>
            <ul className="flex flex-col gap-1 text-sm">
              {[
                { label: "About", icon: Info, action: () => navigate("/profile") },
                { label: "Contact", icon: Mail, action: () => (window.location.href = "https://m.me/jm.born67") },
                { label: "Feedback", icon: Sparkles, action: () => (window.location.href = "mailto:kaizenjym12@gmail.com?subject=Feedback") },
                { label: "Privacy Policy", icon: Shield, action: () => navigate("/privacy") },
                { label: "Terms of Service", icon: FileText, action: () => navigate("/terms") },
                { label: "Admin", icon: Lock, action: () => navigate("/admin/login") },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => { setMenuOpen(false); item.action(); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[10px] text-muted-foreground text-center">© 2026 jmcruz</p>
          </aside>
        </div>
      )}

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-hero p-6 sm:p-10 animate-fade-up">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-primary bg-primary/10 rounded-full px-2 py-1 mb-3">
              <Sparkles className="w-3 h-3" /> Dashboard
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2">
              Welcome to <span className="text-gradient-accent">jmcruz</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-md">
              Central hub for APKs, tools, apps to buy, and the portfolio. Everything, one tap away.
            </p>
          </div>
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -right-20 bottom-0 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        </section>

        {/* Quick Access */}
        <SectionTitle title="Quick Access" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <QuickCard icon={User} label="Portfolio" onClick={() => navigate("/profile")} />
          <QuickCard icon={Bot} label="ChatGPT Pro" onClick={() => navigate("/chatgpt")} />
          <QuickCard icon={ShoppingBag} label="Shop" onClick={() => navigate("/shop")} />
          <QuickCard icon={Download} label="Downloads" onClick={() => navigate("/downloads")} />
        </div>

        {/* Featured Apps */}
        <SectionTitle title="Featured Apps" subtitle="Premium products from jmcruz" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeaturedCard
            image={abbysTools}
            title="Abby's Tools"
            desc="Premium all-in-one tools APK. Pay via GCash."
            price="₱90"
            cta="Buy Now"
            onClick={() => navigate("/buy/abbys-tools")}
          />
          <QuickBigCard
            icon={Gamepad2}
            title="MLBB Accounts"
            desc="Mythic ranks, ready to use. Chat via Messenger."
            cta="Browse"
            onClick={() => navigate("/shop")}
          />
          <QuickBigCard
            icon={Coffee}
            title="Coffee & Sleeve"
            desc="Coffee menu + gaming fingersleeve deals."
            cta="Open Shop"
            onClick={() => navigate("/shop")}
          />
        </div>

        {/* APK Downloads */}
        <SectionTitle title="APK Downloads" subtitle="Direct install links" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {apkApps.map((a) => (
            <article key={a.name} className="smooth-card overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="aspect-[16/9] overflow-hidden bg-secondary">
                <img src={a.image} alt={a.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <a href={a.href} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-accent text-white px-3 py-2 rounded-lg shadow-glow hover:opacity-90 transition">
                  <Download className="w-3.5 h-3.5" /> APK
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Tools & Downloaders */}
        <SectionTitle title="Tools & Downloaders" subtitle="Free web utilities" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {tools.map((t) => (
            <LinkTile key={t.title} icon={Wrench} title={t.title} desc={t.desc} href={t.href} />
          ))}
          {downloaders.map((d) => (
            <LinkTile key={d.title} icon={Download} title={d.title} desc="Media downloader" href={d.href} />
          ))}
        </div>

        {/* Anime / Manga */}
        <SectionTitle title="Anime / Manga" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {anime.map((a) => (
            <LinkTile key={a.title} icon={a.icon} title={a.title} desc={a.desc} href={a.href} large />
          ))}
        </div>

        {/* Latest Updates */}
        {latest.length > 0 && (
          <>
            <SectionTitle title="Latest Updates" subtitle="Fresh from the site owner" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {latest.map((s) => (
                <div key={s.title} className="smooth-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{s.emoji}</span>
                    <h4 className="font-semibold text-sm">{s.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.links.length} link{s.links.length !== 1 && "s"} available</p>
                </div>
              ))}
            </div>
          </>
        )}

        <footer className="text-center py-6 text-xs text-muted-foreground">
          © 2026 · Developed by <span className="text-primary font-semibold">JM Cruz</span>
        </footer>
      </main>
    </div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex items-end justify-between -mb-4">
    <div>
      <h2 className="text-lg sm:text-xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  </div>
);

const QuickCard = ({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
  <button onClick={onClick}
    className="smooth-card p-4 flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform group">
    <span className="w-10 h-10 rounded-xl bg-gradient-accent grid place-items-center shadow-glow group-hover:scale-110 transition">
      <Icon className="w-5 h-5 text-white" />
    </span>
    <span className="text-xs font-semibold">{label}</span>
  </button>
);

const QuickBigCard = ({ icon: Icon, title, desc, cta, onClick }: { icon: any; title: string; desc: string; cta: string; onClick: () => void }) => (
  <button onClick={onClick}
    className="smooth-card p-5 text-left hover:-translate-y-1 transition-transform">
    <div className="w-12 h-12 rounded-xl bg-primary/15 grid place-items-center mb-3">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="font-bold mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground mb-3">{desc}</p>
    <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
      {cta} <ExternalLink className="w-3 h-3" />
    </span>
  </button>
);

const FeaturedCard = ({ image, title, desc, price, cta, onClick }:
  { image: string; title: string; desc: string; price: string; cta: string; onClick: () => void }) => (
  <div className="smooth-card overflow-hidden hover:-translate-y-1 transition-transform">
    <div className="aspect-video bg-secondary grid place-items-center p-6">
      <img src={image} alt={title} loading="lazy" className="max-h-full w-auto object-contain" />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-sm">{title}</h3>
        <span className="text-primary font-bold">{price}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{desc}</p>
      <button onClick={onClick}
        className="w-full bg-gradient-accent text-white text-xs font-semibold py-2 rounded-lg shadow-glow hover:opacity-90 transition">
        {cta}
      </button>
    </div>
  </div>
);

const LinkTile = ({ icon: Icon, title, desc, href, large }: { icon: any; title: string; desc?: string; href: string; large?: boolean }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className={`smooth-card ${large ? "p-4" : "p-3"} flex items-center gap-3 hover:-translate-y-0.5 transition-transform group`}>
    <span className="w-9 h-9 shrink-0 rounded-lg bg-primary/15 grid place-items-center">
      <Icon className="w-4 h-4 text-primary" />
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold truncate">{title}</p>
      {desc && <p className="text-[10px] text-muted-foreground truncate">{desc}</p>}
    </div>
    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition" />
  </a>
);

export default Dashboard;
