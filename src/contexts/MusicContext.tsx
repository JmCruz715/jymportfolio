import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

type MusicCtx = {
  playing: boolean;
  toggle: () => void;
};

const Ctx = createContext<MusicCtx | null>(null);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/I_Wanna_Be_Yours.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";
    (audio as any).playsInline = true;
    audioRef.current = audio;

    const tryPlay = () =>
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

    tryPlay();

    // Mobile browsers block autoplay until a user gesture — unlock on first tap/scroll
    const unlock = () => {
      if (audio.paused) tryPlay();
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("scroll", unlock);
    };
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("scroll", unlock, { once: true, passive: true });

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return <Ctx.Provider value={{ playing, toggle }}>{children}</Ctx.Provider>;
};

export const useMusic = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMusic must be inside MusicProvider");
  return v;
};
