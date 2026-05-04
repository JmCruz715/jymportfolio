import { Play } from "lucide-react";
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
        // Custom solid pause bars (mas malinaw kaysa sa default Pause icon)
        <span className="flex items-center gap-[3px]">
          <span className="block w-[4px] h-[14px] rounded-sm bg-current" />
          <span className="block w-[4px] h-[14px] rounded-sm bg-current" />
        </span>
      ) : (
        <Play className="w-5 h-5 translate-x-[1px] fill-current" />
      )}
      {playing && (
        <span className="pointer-events-none absolute -inset-1 rounded-full border border-primary/40 animate-ping opacity-60" />
      )}
    </button>
  );
};

export default MusicButton;
