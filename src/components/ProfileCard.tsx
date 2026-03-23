import { Check } from "lucide-react";

const ProfileCard = () =>
<div className="flex flex-col items-center gap-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
    {/* Avatar */}
    <div className="relative animate-float">
      <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-primary to-pink-400 animate-pulse-glow">
        <img
          alt="Siegfried Samá"
          className="w-full h-full rounded-full object-cover bg-card"
          src="/lovable-uploads/f77014f9-190b-49ff-902d-3d1981b8391e.jpg"
        />
      </div>
    </div>

    {/* Name & Role */}
    <div className="text-center">
      <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-1.5 leading-tight">
        jmcruz
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[hsl(214,89%,52%)] shrink-0">
          <Check className="w-3 h-3 text-white stroke-[3]" />
        </span>
      </h1>
      <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mt-1.5">Developer</p>
      <p className="text-xs text-muted-foreground mt-2 italic">(beta)</p>
      <p className="text-sm text-muted-foreground mt-1">Stay consistent.</p>
    </div>
  </div>;


export default ProfileCard;