import { Play, Pause } from "lucide-react";
import { useMusic } from "@/contexts/MusicContext";

const MusicButton = () => {
  const { playing, toggle } = useMusic();
  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="liquid-icon-button group relative"
    >
      {playing ? (
        <Pause className="w-5 h-5" />
      ) : (
        <Play className="w-5 h-5 translate-x-[1px]" />
      )}
      {playing && (
        <span className="pointer-events-none absolute -inset-1 rounded-full border border-primary/40 animate-ping opacity-60" />
      )}
    </button>
  );
};

export default MusicButton;
