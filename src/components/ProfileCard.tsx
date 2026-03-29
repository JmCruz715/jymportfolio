import { Check } from "lucide-react";
import { useState, useEffect } from "react";

const phrases = [
  { text: "Stay consistent.", color: "text-primary" },
  { text: "Protect your energy.", color: "text-green-400" },
  { text: "Mahalin moko.", color: "text-pink-400" },
  { text: "Focus on your life.", color: "text-yellow-400" },
  { text: "Never beg someone to love you.", color: "text-red-400" },
  { text: "pinaka pogi sa balat ng lupa.", color: "text-cyan-400" },
];

const ProfileCard = () => {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [avatarHover, setAvatarHover] = useState(false);

  const currentPhrase = phrases[phraseIndex];

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
  }, [charIndex, isDeleting, currentPhrase]);

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
      {/* Avatar with animation */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setAvatarHover(true)}
        onMouseLeave={() => setAvatarHover(false)}
      >
        {/* Spinning glow ring */}
        <div
          className="absolute -inset-1.5 rounded-full opacity-60 blur-md animate-spin"
          style={{
            background: "conic-gradient(from 0deg, hsl(340,75%,55%), hsl(280,70%,60%), hsl(200,80%,55%), hsl(340,75%,55%))",
            animationDuration: "4s",
          }}
        />
        <div
          className={`w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-primary to-pink-400 relative transition-transform duration-300 ${avatarHover ? "scale-110" : ""}`}
        >
          <img
            alt="jmcruz"
            className="w-full h-full rounded-full object-cover bg-card"
            src="/lovable-uploads/f77014f9-190b-49ff-902d-3d1981b8391e.jpg"
          />
        </div>
        {/* Online indicator with pulse */}
        <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background z-10">
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
        </span>
      </div>

      {/* Name & Role */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-1.5 leading-tight animate-fade-up" style={{ animationDelay: "0.25s" }}>
          jmcruz
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[hsl(214,89%,52%)] shrink-0 animate-bounce" style={{ animationDuration: "2s" }}>
            <Check className="w-3 h-3 text-white stroke-[3]" />
          </span>
        </h1>
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mt-1.5 animate-fade-up" style={{ animationDelay: "0.35s" }}>Developer</p>
        <p className={`text-sm mt-2 h-6 ${currentPhrase.color} transition-colors duration-300`}>
          {displayText}
          <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 animate-pulse align-middle" />
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
