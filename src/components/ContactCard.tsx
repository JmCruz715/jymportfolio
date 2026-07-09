import { Mail, MessageCircle, Info } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const ContactCard = () => {
  const { settings } = useSiteSettings();
  const bio =
    settings?.bio ??
    "jmcruz builds clean tools, curated links, shop drops, and anime picks in one smooth space.";

  return (
    <div className="smooth-card p-4 animate-fade-up">
      <div className="flex items-center gap-2 mb-2 text-primary">
        <Info className="w-4 h-4" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em]">About</p>
      </div>
      <p className="text-xs leading-6 text-muted-foreground">{bio}</p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href="https://m.me/jm.born67"
          target="_blank"
          rel="noopener noreferrer"
          className="smooth-btn justify-center !py-2.5"
        >
          <MessageCircle className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">Message</span>
        </a>
        <a
          href="mailto:kaizenjym12@gmail.com"
          className="smooth-btn justify-center !py-2.5"
        >
          <Mail className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold">Email</span>
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
