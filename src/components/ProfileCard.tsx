import { Check, Camera } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAdmin } from "@/hooks/useAdmin";

const ProfileCard = () => {
  const { settings } = useSiteSettings();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const phrases = settings?.phrases?.length
    ? settings.phrases
    : [{ text: "Loading...", color: "text-primary" }];

  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const currentPhrase = phrases[phraseIndex % phrases.length];

  useEffect(() => {
    setPhraseIndex(0);
    setCharIndex(0);
    setDisplayText("");
    setIsDeleting(false);
  }, [settings?.phrases]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.text.length) {
          setDisplayText(currentPhrase.text.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentPhrase.text.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentPhrase, phrases.length]);

  const goEdit = () => navigate(isAdmin ? "/admin" : "/admin/login");
  const cover = settings?.cover_url;

  return (
    <div className="flex flex-col items-center animate-scale-in" style={{ animationDelay: "0.15s" }}>
      {/* Cover photo (Facebook style) */}
      <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/30 border border-border/40">
        {cover ? (
          <img src={cover} alt="cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            {isAdmin ? "Mag-add ng cover photo sa admin" : ""}
          </div>
        )}
        <button
          onClick={goEdit}
          className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-lg border border-border/60 hover:bg-background transition"
          aria-label="Change cover photo"
          title="Change cover photo"
        >
          <Camera className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Avatar overlapping cover */}
      <div className="relative -mt-14 animate-float">
        <div
          className="absolute -inset-1.5 rounded-full opacity-60 blur-md animate-spin"
          style={{
            background: "conic-gradient(from 0deg, hsl(340,75%,55%), hsl(280,70%,60%), hsl(200,80%,55%), hsl(340,75%,55%))",
            animationDuration: "4s",
          }}
        />
        <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-primary to-pink-400 relative">
          <img
            alt={settings?.name ?? "profile"}
            className="w-full h-full rounded-full object-cover bg-card"
            src={settings?.avatar_url ?? "/lovable-uploads/f77014f9-190b-49ff-902d-3d1981b8391e.jpg"}
          />
        </div>
        <button
          onClick={goEdit}
          className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-lg border border-border/60 hover:bg-background transition z-10"
          aria-label="Change profile photo"
          title="Change profile photo"
        >
          <Camera className="w-4 h-4 text-foreground" />
        </button>
        <span className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-background z-10">
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
        </span>
      </div>

      <div className="text-center mt-3">
        <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-1.5 leading-tight animate-fade-up" style={{ animationDelay: "0.25s" }}>
          {settings?.name ?? "..."}
          <VerifiedBadge size={20} className="shrink-0 drop-shadow" />
        </h1>
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mt-1.5 animate-fade-up" style={{ animationDelay: "0.35s" }}>
          {settings?.role_label ?? "Developer"}
        </p>
        <p className={`text-sm mt-2 h-6 ${currentPhrase.color} transition-colors duration-300`}>
          {displayText}
          <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 animate-pulse align-middle" />
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
