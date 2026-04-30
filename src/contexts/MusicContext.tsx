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
    audioRef.current = audio;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => {
      audio.pause();
      audioRef.current = null;
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
