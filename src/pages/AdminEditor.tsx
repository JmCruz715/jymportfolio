import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import {
  useSiteSettings,
  type Phrase,
  type Social,
  type WebsiteLink,
  type MenuSectionData,
  type MenuLink,
} from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, LogOut, Plus, Trash2, Save, Eye, Camera, Loader2 } from "lucide-react";
import { AdminAIChat } from "@/components/AdminAIChat";
import { AdminMediaManager } from "@/components/AdminMediaManager";

// Mga preset color para sa phrases (label + tailwind class + hex preview)
const COLOR_OPTIONS: { label: string; value: string; hex: string }[] = [
  { label: "Pink", value: "text-primary", hex: "#ec4899" },
  { label: "Berde", value: "text-green-400", hex: "#4ade80" },
  { label: "Rosas", value: "text-pink-400", hex: "#f472b6" },
  { label: "Dilaw", value: "text-yellow-400", hex: "#facc15" },
  { label: "Pula", value: "text-red-400", hex: "#f87171" },
  { label: "Cyan", value: "text-cyan-400", hex: "#22d3ee" },
  { label: "Bughaw", value: "text-blue-400", hex: "#60a5fa" },
  { label: "Lila", value: "text-purple-400", hex: "#c084fc" },
  { label: "Puti", value: "text-foreground", hex: "#ffffff" },
];

const ICON_OPTIONS = [
  "facebook", "tiktok", "github", "messenger", "instagram",
  "youtube", "twitter", "linkedin", "telegram", "globe",
];

const AdminEditor = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdmin();
  const { settings, reload } = useSiteSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [roleLabel, setRoleLabel] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [websites, setWebsites] = useState<WebsiteLink[]>([]);
  const [menuSections, setMenuSections] = useState<MenuSectionData[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) navigate("/admin/login", { replace: true });
  }, [loading, session, isAdmin, navigate]);

  useEffect(() => {
    if (settings) {
      setName(settings.name);
      setRoleLabel(settings.role_label);
      setBio(settings.bio);
      setAvatarUrl(settings.avatar_url);
      setCoverUrl(settings.cover_url ?? "");
      setPhrases(settings.phrases ?? []);
      setSocials(settings.socials ?? []);
      setWebsites(settings.websites ?? []);
      setMenuSections(settings.menu_sections ?? []);
    }
  }, [settings]);

  const onPickAvatar = () => fileInputRef.current?.click();

  const onAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });
    if (upErr) {
      setUploading(false);
      toast({ title: "Hindi nai-upload", description: upErr.message, variant: "destructive" });
      return;
    }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    setAvatarUrl(pub.publicUrl);
    setUploading(false);
    toast({ title: "Picture handa na", description: "Pindutin ang Save para itago." });
  };

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
        cover_url: coverUrl,
        phrases: phrases as never,
        socials: socials as never,
        websites: websites as never,
        menu_sections: menuSections as never,
      })
      .eq("id", settings.id);
    setSaving(false);
    if (error) {
      toast({ title: "May error sa pag-save", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Na-save na!", description: "Updated na ang profile mo." });
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
            <button onClick={() => navigate("/")} className="liquid-icon-button" title="Tingnan">
              <Eye className="w-5 h-5" />
            </button>
            <button onClick={logout} className="liquid-icon-button" title="Mag-logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="liquid-panel p-5 animate-liquid-in">
          <h1 className="text-xl font-bold text-gradient mb-1">Admin Editor</h1>
          <p className="text-xs text-muted-foreground">I-edit ang lahat sa portfolio mo dito.</p>
        </div>

        {/* AI ASSISTANT (inline, sa taas ng profile) */}
        <AdminAIChat onChanged={reload} inline />

        {/* PROFILE */}
        <Section title="Profile">
          {/* Avatar uploader */}
          <div className="flex flex-col items-center gap-2 py-2">
            <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Profile Picture</label>
            <button
              type="button"
              onClick={onPickAvatar}
              disabled={uploading}
              className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary/40 bg-card group"
            >
              {avatarUrl && (
                <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {uploading ? (
                  <Loader2 className="w-7 h-7 text-white animate-spin" />
                ) : (
                  <Camera className="w-7 h-7 text-white" />
                )}
              </div>
              <span className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                <Plus className="w-4 h-4" />
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarFile}
            />
            <p className="text-[10px] text-muted-foreground">Pindutin ang larawan para palitan</p>
          </div>

          {/* Cover photo uploader */}
          <CoverUploader value={coverUrl} onChange={setCoverUrl} />

          <Field label="Pangalan"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field label="Title / Tungkulin"><Input value={roleLabel} onChange={(e) => setRoleLabel(e.target.value)} placeholder="Halimbawa: Developer" /></Field>
          <Field label="Bio (tungkol sa iyo)">
            <Textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Sumulat ng maikling kwento tungkol sa iyo" />
          </Field>
        </Section>

        {/* MEDIA: Highlights, Album, Notes */}
        <AdminMediaManager />

        {/* ORDERS */}
        <OrdersPanel />



        {/* PHRASES */}
        <Section
          title="Mga Quote / Phrases (typewriter)"
          onAdd={() => setPhrases([...phrases, { text: "Bagong quote", color: "text-primary" }])}
        >
          <p className="text-[11px] text-muted-foreground -mt-1">Pumili ng kulay sa kaliwa, isulat ang text sa kanan.</p>
          {phrases.map((p, i) => (
            <div key={i} className="flex gap-2 items-center">
              <ColorPicker
                value={p.color}
                onChange={(c) => setPhrases(phrases.map((x, j) => (j === i ? { ...x, color: c } : x)))}
              />
              <Input
                className="flex-1"
                value={p.text}
                onChange={(e) => setPhrases(phrases.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                placeholder="Isulat ang quote"
              />
              <button
                onClick={() => setPhrases(phrases.filter((_, j) => j !== i))}
                className="liquid-icon-button shrink-0"
                title="Tanggalin"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))}
        </Section>

        {/* SOCIALS */}
        <Section
          title="Social Media Links"
          onAdd={() => setSocials([...socials, { label: "Bago", icon: "globe", href: "https://" }])}
        >
          {socials.map((s, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 rounded-xl border border-border/60">
              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  placeholder="Pangalan (Halimbawa: Facebook)"
                  value={s.label}
                  onChange={(e) => setSocials(socials.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                />
                <select
                  value={s.icon}
                  onChange={(e) => setSocials(socials.map((x, j) => (j === i ? { ...x, icon: e.target.value } : x)))}
                  className="h-10 rounded-md border border-input bg-background px-2 text-sm"
                >
                  {ICON_OPTIONS.map((ic) => (
                    <option key={ic} value={ic}>{ic}</option>
                  ))}
                </select>
              </div>
              <Input
                placeholder="Link (https://...)"
                value={s.href}
                onChange={(e) => setSocials(socials.map((x, j) => (j === i ? { ...x, href: e.target.value } : x)))}
              />
              <button
                onClick={() => setSocials(socials.filter((_, j) => j !== i))}
                className="liquid-button self-end gap-2 h-9 px-3 text-xs"
              >
                <Trash2 className="w-4 h-4 text-destructive" /> Tanggalin
              </button>
            </div>
          ))}
        </Section>

        {/* WEBSITES */}
        <Section
          title="Mga Website ko"
          onAdd={() => setWebsites([...websites, { title: "Bagong site", description: "", href: "https://" }])}
        >
          {websites.map((w, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 rounded-xl border border-border/60">
              <Input placeholder="Pamagat" value={w.title}
                onChange={(e) => setWebsites(websites.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
              <Input placeholder="Maikling description" value={w.description}
                onChange={(e) => setWebsites(websites.map((x, j) => (j === i ? { ...x, description: e.target.value } : x)))} />
              <Input placeholder="Link (https://...)" value={w.href}
                onChange={(e) => setWebsites(websites.map((x, j) => (j === i ? { ...x, href: e.target.value } : x)))} />
              <button
                onClick={() => setWebsites(websites.filter((_, j) => j !== i))}
                className="liquid-button self-end gap-2 h-9 px-3 text-xs"
              >
                <Trash2 className="w-4 h-4 text-destructive" /> Tanggalin
              </button>
            </div>
          ))}
        </Section>

        {/* MENU SECTIONS */}
        <Section
          title="Menu (Tools, Downloader, atbp.)"
          onAdd={() => setMenuSections([...menuSections, { title: "Bagong Section", emoji: "✨", links: [] }])}
        >
          <p className="text-[11px] text-muted-foreground -mt-1">Mga grupo ng links na lalabas sa hamburger menu.</p>
          {menuSections.map((sec, si) => (
            <div key={si} className="flex flex-col gap-2 p-3 rounded-xl border border-border/60 bg-card/40">
              <div className="flex gap-2 items-center">
                <Input
                  className="w-16 text-center"
                  value={sec.emoji}
                  onChange={(e) => {
                    const next = [...menuSections];
                    next[si] = { ...sec, emoji: e.target.value };
                    setMenuSections(next);
                  }}
                  placeholder="🛠️"
                />
                <Input
                  className="flex-1"
                  value={sec.title}
                  onChange={(e) => {
                    const next = [...menuSections];
                    next[si] = { ...sec, title: e.target.value };
                    setMenuSections(next);
                  }}
                  placeholder="Pangalan ng section"
                />
                <button
                  onClick={() => setMenuSections(menuSections.filter((_, j) => j !== si))}
                  className="liquid-icon-button shrink-0"
                  title="Tanggalin ang section"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>

              <div className="flex flex-col gap-2 pl-2 border-l-2 border-primary/30">
                {sec.links.map((link, li) => (
                  <div key={li} className="flex flex-col gap-1.5 p-2 rounded-lg bg-background/60">
                    <Input placeholder="Pamagat" value={link.title}
                      onChange={(e) => {
                        const next = [...menuSections];
                        const links = [...sec.links];
                        links[li] = { ...link, title: e.target.value };
                        next[si] = { ...sec, links };
                        setMenuSections(next);
                      }}
                    />
                    <Input placeholder="Description" value={link.description}
                      onChange={(e) => {
                        const next = [...menuSections];
                        const links = [...sec.links];
                        links[li] = { ...link, description: e.target.value };
                        next[si] = { ...sec, links };
                        setMenuSections(next);
                      }}
                    />
                    <div className="flex gap-2">
                      <Input placeholder="Link (https://...)" value={link.href}
                        onChange={(e) => {
                          const next = [...menuSections];
                          const links = [...sec.links];
                          links[li] = { ...link, href: e.target.value };
                          next[si] = { ...sec, links };
                          setMenuSections(next);
                        }}
                      />
                      <button
                        onClick={() => {
                          const next = [...menuSections];
                          next[si] = { ...sec, links: sec.links.filter((_, j) => j !== li) };
                          setMenuSections(next);
                        }}
                        className="liquid-icon-button shrink-0"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const next = [...menuSections];
                    const newLink: MenuLink = { title: "Bagong link", description: "", href: "https://" };
                    next[si] = { ...sec, links: [...sec.links, newLink] };
                    setMenuSections(next);
                  }}
                  className="liquid-button h-9 px-3 text-xs gap-1 self-start"
                >
                  <Plus className="w-4 h-4" /> Magdagdag ng link
                </button>
              </div>
            </div>
          ))}
        </Section>

        <div className="sticky bottom-4 z-10">
          <Button
            onClick={save}
            disabled={saving}
            className="liquid-button liquid-button-primary w-full h-12 text-base"
          >
            <Save className="w-5 h-5" /> {saving ? "Sini-save..." : "I-save lahat"}
          </Button>
        </div>
      </div>

      
    </div>
  );
};

const Section = ({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd?: () => void;
  children: React.ReactNode;
}) => (
  <div className="liquid-panel p-5 flex flex-col gap-3 animate-liquid-in">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">{title}</h2>
      {onAdd && (
        <button onClick={onAdd} className="liquid-button h-9 px-3 text-xs gap-1">
          <Plus className="w-4 h-4" /> Magdagdag
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

const ColorPicker = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);
  const current = COLOR_OPTIONS.find((c) => c.value === value) ?? COLOR_OPTIONS[0];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-md border border-input shrink-0"
        style={{ backgroundColor: current.hex }}
        title={current.label}
      />
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-12 left-0 z-50 grid grid-cols-3 gap-1.5 p-2 rounded-lg liquid-panel min-w-[140px]">
            {COLOR_OPTIONS.map((c) => (
              <button
                type="button"
                key={c.value}
                onClick={() => { onChange(c.value); setOpen(false); }}
                className={`w-8 h-8 rounded-md border-2 ${value === c.value ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CoverUploader = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `cover-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, {
      cacheControl: "3600", upsert: true, contentType: file.type,
    });
    if (upErr) {
      setBusy(false);
      toast({ title: "Hindi nai-upload", description: upErr.message, variant: "destructive" });
      return;
    }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    onChange(pub.publicUrl);
    setBusy(false);
    toast({ title: "Cover handa na", description: "Pindutin ang Save para itago." });
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Cover Photo</label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-primary/40 bg-card group"
      >
        {value && <img src={value} alt="cover" className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {busy ? <Loader2 className="w-7 h-7 text-white animate-spin" /> : <Camera className="w-7 h-7 text-white" />}
        </div>
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            Pindutin para mag-upload ng cover
          </div>
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
    </div>
  );
};

type OrderRow = {
  id: string;
  product_name: string;
  price: number;
  buyer_name: string;
  buyer_email: string;
  gcash_ref: string | null;
  receipt_url: string;
  status: string;
  created_at: string;
};

const OrdersPanel = () => {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Hindi ma-load ang orders", description: error.message, variant: "destructive" });
    } else {
      setOrders((data ?? []) as OrderRow[]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const viewReceipt = async (path: string) => {
    if (signedUrls[path]) {
      window.open(signedUrls[path], "_blank");
      return;
    }
    const { data, error } = await supabase.storage.from("receipts").createSignedUrl(path, 3600);
    if (error || !data) {
      toast({ title: "Error", description: error?.message ?? "Hindi mabuksan ang receipt", variant: "destructive" });
      return;
    }
    setSignedUrls((s) => ({ ...s, [path]: data.signedUrl }));
    window.open(data.signedUrl, "_blank");
  };

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  return (
    <section className="liquid-panel p-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-foreground">📦 Orders / Buyers</h2>
        <button onClick={load} className="liquid-icon-button" title="Refresh">
          <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
      {orders.length === 0 && !loading && (
        <p className="text-xs text-muted-foreground">Wala pang orders.</p>
      )}
      <div className="flex flex-col gap-2">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl border border-border/60 p-3 text-xs bg-card/60">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-foreground">{o.product_name}</span>
              <span className="text-primary font-bold">₱{Number(o.price).toFixed(0)}</span>
            </div>
            <div className="text-[11px] text-muted-foreground space-y-0.5">
              <div><span className="text-foreground">{o.buyer_name}</span> · {o.buyer_email}</div>
              {o.gcash_ref && <div>Ref: <span className="font-mono">{o.gcash_ref}</span></div>}
              <div>{new Date(o.created_at).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => viewReceipt(o.receipt_url)}
                className="liquid-button px-3 py-1 text-[11px]"
              >
                View Receipt
              </button>
              <select
                value={o.status}
                onChange={(e) => setStatus(o.id, e.target.value)}
                className="h-8 rounded-md border border-input bg-background px-2 text-[11px]"
              >
                <option value="pending">pending</option>
                <option value="verified">verified</option>
                <option value="delivered">delivered</option>
                <option value="rejected">rejected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminEditor;

