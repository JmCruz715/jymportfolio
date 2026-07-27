import { useEffect, useRef, useState } from "react";
import { Music2, Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import track1 from "@/assets/music/12_51_-_Krissy_Ericka_Lyric_Video.mp3.asset.json";
import track2 from "@/assets/music/Shawn_Mendes_-_Treat_You_Better_Lyrics.mp3.asset.json";
import track3 from "@/assets/music/Taylor_Swift_-_Enchanted.mp3.asset.json";
import track4 from "@/assets/music/Justin_Bieber_-_That_Should_Be_Me.mp3.asset.json";
import track5 from "@/assets/music/Maldita_-_Porque_Lyrics.mp3.asset.json";

type Track = { title: string; artist: string; url: string; lyrics: string[] };

const PLAYLIST: Track[] = [
  {
    title: "12:51",
    artist: "Krissy & Ericka",
    url: track1.url,
    lyrics: ["It's 12:51...", "Feel like you're playing w me", "Hold me a little longer", "Stay just a while more"],
  },
  {
    title: "Treat You Better",
    artist: "Shawn Mendes",
    url: track2.url,
    lyrics: ["I know I can treat you better", "Better than he can", "Tell me why are we wasting time", "You should be with me"],
  },
  {
    title: "Enchanted",
    artist: "Taylor Swift",
    url: track3.url,
    lyrics: ["This night is sparkling", "Don't you let it go", "Wonderstruck, blushing", "Enchanted to meet you"],
  },
  {
    title: "That Should Be Me",
    artist: "Justin Bieber",
    url: track4.url,
    lyrics: ["That should be me", "Holdin' your hand", "That should be me", "Makin' you laugh"],
  },
  {
    title: "Porque",
    artist: "Maldita",
    url: track5.url,
    lyrics: ["Bakit ba ganito?", "Sadyang mahirap", "Ang magmahal ng tulad mo", "Sana'y maramdaman mo"],
  },
];

const MusicNote = () => {
  const { settings } = useSiteSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [line, setLine] = useState(0);

  const track = PLAYLIST[index];

  useEffect(() => {
    const audio = new Audio(track.url);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => {
      setProgress(audio.currentTime);
      if (audio.duration) {
        const per = audio.duration / track.lyrics.length;
        setLine(Math.min(track.lyrics.length - 1, Math.floor(audio.currentTime / per)));
      }
    };
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => setIndex((i) => (i + 1) % PLAYLIST.length);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
      audioRef.current = null;
    };
  }, [track.url, track.lyrics.length]);

  // autoplay next track when index changes after first interaction
  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) return;
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [index]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    startedRef.current = true;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else {
      a.pause();
      setPlaying(false);
    }
  };

  const skip = (dir: number) => {
    startedRef.current = true;
    setPlaying(false);
    setProgress(0);
    setLine(0);
    setIndex((i) => (i + dir + PLAYLIST.length) % PLAYLIST.length);
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="music-note relative flex flex-col items-center gap-3 rounded-3xl px-5 py-6">
      {/* Bubble with animated lyrics */}
      <div className="music-note__bubble">
        <p key={`${index}-${line}`} className="lyric-line">
          {track.lyrics[line]}
        </p>
        <span className="music-note__tail" />
      </div>

      {/* Avatar */}
      <div className="relative">
        <div className={`w-24 h-24 rounded-full overflow-hidden border-2 border-border/60 bg-secondary ${playing ? "animate-float" : ""}`}>
          <img
            src={settings?.avatar_url ?? "/lovable-uploads/f77014f9-190b-49ff-902d-3d1981b8391e.jpg"}
            alt={settings?.name ?? "profile"}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        {playing && <span className="absolute -inset-1 rounded-full border border-primary/40 animate-ping" />}
      </div>

      <p className="text-[11px] text-muted-foreground tabular-nums">
        {fmt(progress)}/{duration ? fmt(duration) : "0:00"}
      </p>

      <div className="flex items-center gap-3">
        <button onClick={() => skip(-1)} aria-label="Previous song" className="note-ctrl">
          <SkipBack className="w-4 h-4" />
        </button>
        <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="note-ctrl note-ctrl--main">
          {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-[1px]" />}
        </button>
        <button onClick={() => skip(1)} aria-label="Next song" className="note-ctrl">
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Music2 className="w-3.5 h-3.5 text-primary" />
        <span className="font-medium text-foreground">{track.title}</span>
        <span>· {track.artist}</span>
      </div>

      <p className="text-[10px] text-muted-foreground">
        Playlist {index + 1}/{PLAYLIST.length}
      </p>
    </div>
  );
};

export default MusicNote;
