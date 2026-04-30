import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { useSiteSettings, type Phrase, type Social, type WebsiteLink } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, LogOut, Plus, Trash2, Save, Eye } from "lucide-react";

const AdminEditor = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdmin();
  const { settings, reload } = useSiteSettings();

  const [name, setName] = useState("");
  const [roleLabel, setRoleLabel] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [websites, setWebsites] = useState<WebsiteLink[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) navigate("/admin/login", { replace: true });
  }, [loading, session, isAdmin, navigate]);

  useEffect(() => {
    if (settings) {
      setName(settings.name);
      setRoleLabel(settings.role_label);
      setBio(settings.bio);
      setAvatarUrl(settings.avatar_url);
      setPhrases(settings.phrases ?? []);
      setSocials(settings.socials ?? []);
      setWebsites(settings.websites ?? []);
    }
  }, [settings]);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        name,
        role_label: roleLabel,
        bio,
        avatar_url: avatarUrl,
        phrases: phrases as never,
        socials: socials as never,
        websites: websites as never,
      })
      .eq("id", settings.id);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Profile updated successfully." });
      reload();
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  if (loading || !settings) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/")} className="liquid-icon-button">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="liquid-icon-button" title="Preview">
              <Eye className="w-5 h-5" />
            </button>
            <button onClick={logout} className="liquid-icon-button" title="Sign out">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="liquid-panel p-5 animate-liquid-in">
          <h1 className="text-xl font-bold text-gradient mb-1">Admin Editor</h1>
          <p className="text-xs text-muted-foreground">Update your portfolio profile and links live.</p>
        </div>

        <Section title="Profile">
          <Field label="Name"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field label="Role / Title"><Input value={roleLabel} onChange={(e) => setRoleLabel(e.target.value)} /></Field>
          <Field label="Avatar URL"><Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} /></Field>
          <Field label="Bio"><Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} /></Field>
        </Section>

        <Section
          title="Typewriter Phrases"
          onAdd={() => setPhrases([...phrases, { text: "New phrase", color: "text-primary" }])}
        >
          {phrases.map((p, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input
                value={p.text}
                onChange={(e) => setPhrases(phrases.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                placeholder="Phrase text"
              />
              <Input
                className="w-40"
                value={p.color}
                onChange={(e) => setPhrases(phrases.map((x, j) => (j === i ? { ...x, color: e.target.value } : x)))}
                placeholder="text-primary"
              />
              <button onClick={() => setPhrases(phrases.filter((_, j) => j !== i))} className="liquid-icon-button shrink-0">
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))}
        </Section>

        <Section
          title="Social Links"
          onAdd={() => setSocials([...socials, { label: "New", icon: "globe", href: "https://" }])}
        >
          {socials.map((s, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <Input
                className="col-span-3"
                placeholder="Label"
                value={s.label}
                onChange={(e) => setSocials(socials.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
              />
              <Input
                className="col-span-3"
                placeholder="Icon (facebook, tiktok, github, messenger, instagram, youtube, twitter, linkedin, telegram, globe)"
                value={s.icon}
                onChange={(e) => setSocials(socials.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)))}
              />
              <Input
                className="col-span-5"
                placeholder="URL"
                value={s.href}
                onChange={(e) => setSocials(socials.map((x, j) => (j === i ? { ...x, href: e.target.value } : x)))}
              />
              <button onClick={() => setSocials(socials.filter((_, j) => j !== i))} className="liquid-icon-button col-span-1">
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))}
        </Section>

        <Section
          title="My Websites"
          onAdd={() => setWebsites([...websites, { title: "New site", description: "", href: "https://" }])}
        >
          {websites.map((w, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 rounded-xl border border-border/60">
              <Input
                placeholder="Title"
                value={w.title}
                onChange={(e) => setWebsites(websites.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
              />
              <Input
                placeholder="Description"
                value={w.description}
                onChange={(e) => setWebsites(websites.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))}
              />
              <Input
                placeholder="URL"
                value={w.href}
                onChange={(e) => setWebsites(websites.map((x, j) => (j === i ? { ...x, href: e.target.value } : x)))}
              />
              <button onClick={() => setWebsites(websites.filter((_, j) => j !== i))} className="liquid-button self-end gap-2">
                <Trash2 className="w-4 h-4 text-destructive" /> Remove
              </button>
            </div>
          ))}
        </Section>

        <div className="sticky bottom-4">
          <Button onClick={save} disabled={saving} className="liquid-button liquid-button-primary w-full h-12 text-base">
            <Save className="w-5 h-5" /> {saving ? "Saving..." : "Save all changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, onAdd, children }: { title: string; onAdd?: () => void; children: React.ReactNode }) => (
  <div className="liquid-panel p-5 flex flex-col gap-3 animate-liquid-in">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">{title}</h2>
      {onAdd && (
        <button onClick={onAdd} className="liquid-button h-9 px-3 text-xs gap-1">
          <Plus className="w-4 h-4" /> Add
        </button>
      )}
    </div>
    <div className="flex flex-col gap-2">{children}</div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

export default AdminEditor;
