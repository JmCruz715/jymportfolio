import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Moon, Smartphone, Sun } from "lucide-react";
import capcutLogo from "@/assets/capcut-logo.png";
import gamebaseCover from "@/assets/gamebase-cover.jpeg";

const apps = [
  {
    name: "CapCut Premium",
    description: "APK download for CapCut Premium tools and editing features.",
    href: "https://www.mediafire.com/file/yct8x3rrsde9xrs/CapCut_Premium_Apps_Free_19.9.0.apk/file",
    image: capcutLogo,
  },
  {
    name: "GameBase",
    description: "APK download for GameBase April 15 build.",
    href: "https://www.mediafire.com/file/i1ikjc5ixopggt6/GameBase+_april15.apk/file?dkey=2ito1bgga2l&r=1955",
    image: gamebaseCover,
  },
];

const DownloadApps = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("theme") !== "light";
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
      <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-30 bg-background/80 backdrop-blur-sm animate-fade-in">
        <button onClick={() => navigate("/")} className="liquid-button gap-2 px-4 py-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button onClick={() => setIsDark(!isDark)} className="liquid-icon-button" aria-label="Toggle theme">
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>

      <main className="max-w-md mx-auto px-5 py-20 flex flex-col gap-5">
        <header className="text-center animate-fade-up">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl liquid-panel">
            <Smartphone className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Download Apps</h1>
          <p className="text-xs text-muted-foreground mt-1">Direct APK links for your featured apps</p>
        </header>

        <section className="flex flex-col gap-4">
          {apps.map((app, index) => (
            <article
              key={app.name}
              className="liquid-panel overflow-hidden animate-fade-up"
              style={{ animationDelay: `${0.08 + index * 0.08}s`, animationFillMode: "backwards" }}
            >
              <div className="aspect-[16/10] overflow-hidden bg-secondary/30">
                <img src={app.image} alt={app.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">{app.name}</h2>
                  <p className="text-xs text-muted-foreground mt-1">{app.description}</p>
                </div>
                <a href={app.href} target="_blank" rel="noopener noreferrer" className="liquid-button liquid-button-primary w-full">
                  <Download className="w-4 h-4" />
                  <span>Download APK</span>
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DownloadApps;