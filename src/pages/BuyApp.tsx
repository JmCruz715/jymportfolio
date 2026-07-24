import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy, Check, ShieldCheck, Upload, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import abbysTools from "@/assets/abbys-tools.png";

const orderSchema = z.object({
  buyerName: z.string().trim().min(1, "Pangalan ay required").max(80),
  buyerEmail: z.string().trim().email("Invalid email").max(120),
  gcashRef: z.string().trim().max(64).optional().or(z.literal("")),
});

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const MAX_FILE_BYTES = 5 * 1024 * 1024;


type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  downloadUrl: string;
};

const PRODUCTS: Record<string, Product> = {
  "abbys-tools": {
    id: "abbys-tools",
    name: "Abby's Tools",
    price: 90,
    image: abbysTools,
    description: "Premium all-in-one tools APK by jmcruz.",
    downloadUrl:
      "https://www.mediafire.com/file/8ympnzbfw0gc2hu/Abby%2527s_tools.apks/file",
  },
};

const GCASH_NUMBER = "09938588474";
const GCASH_NAME = "JM Cruz";

const BuyApp = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = PRODUCTS[productId ?? ""];

  const [copied, setCopied] = useState(false);
  const [paymentSent, setPaymentSent] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [gcashRef, setGcashRef] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground font-bold mb-2">Product not found</p>
          <button
            onClick={() => navigate("/shop")}
            className="liquid-button liquid-button-primary text-sm"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(GCASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = orderSchema.safeParse({ buyerName, buyerEmail, gcashRef });
    if (!parsed.success) {
      toast({ title: "Kulang o mali", description: parsed.error.issues[0]?.message ?? "Ayusin ang form.", variant: "destructive" });
      return;
    }
    if (!receipt) {
      toast({ title: "Kulang pa", description: "I-upload ang receipt.", variant: "destructive" });
      return;
    }
    if (!ALLOWED_MIME.includes(receipt.type)) {
      toast({ title: "Hindi allowed", description: "JPG/PNG/WEBP lang.", variant: "destructive" });
      return;
    }
    if (receipt.size > MAX_FILE_BYTES) {
      toast({ title: "Sobrang laki", description: "Max 5MB ang receipt.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      // Upload receipt
      const ext = receipt.name.split(".").pop() ?? "jpg";
      const path = `${product.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("receipts")
        .upload(path, receipt, { upsert: false });
      if (upErr) throw upErr;

      const { data: orderData, error: dbErr } = await supabase
        .from("orders")
        .insert({
          product_name: product.name,
          price: product.price,
          buyer_name: buyerName.trim(),
          buyer_email: buyerEmail.trim(),
          gcash_ref: gcashRef.trim() || null,
          receipt_url: path,
        })
        .select("id")
        .single();
      if (dbErr) throw dbErr;

      setOrderId(orderData.id);
      toast({
        title: "Salamat! Order received.",
        description: "Ico-confirm namin agad pagkatapos ma-verify ang bayad.",
      });
    } catch (err: any) {
      toast({ title: "Error", description: err.message ?? "Subukan ulit.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-sm w-full card-surface rounded-2xl p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-3">
            <Check className="w-7 h-7 text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">Order Received</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Order ID: <span className="font-mono text-foreground">{orderId.slice(0, 8)}</span>
            <br />
            Aabisuhan ka sa email mo pagkatapos ma-verify ang bayad.
          </p>
          <a
            href={product.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-button liquid-button-primary w-full justify-center py-2.5 text-xs mb-2"
          >
            Preview Download Link
          </a>
          <button
            onClick={() => navigate("/shop")}
            className="liquid-button w-full justify-center py-2.5 text-xs"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed top-0 left-0 right-0 p-4 flex items-center z-30 bg-background/80 backdrop-blur-sm">
        <button
          onClick={() => navigate("/shop")}
          className="liquid-button gap-2 px-4 py-2 text-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <main className="max-w-md mx-auto px-5 py-20 flex flex-col gap-5">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
            <ShieldCheck className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Buy {product.name}</h1>
          <p className="text-xs text-muted-foreground mt-1">Payment first, then send your receipt.</p>
        </div>

        {/* Product */}
        <div className="card-surface rounded-xl overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded-lg bg-muted/40 p-1" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground">{product.name}</h3>
              <p className="text-[11px] text-muted-foreground">{product.description}</p>
            </div>
            <span className="text-lg font-bold text-primary">₱{product.price}</span>
          </div>
        </div>

        {/* Step 1: Pay via GCash */}
        <div className="card-surface rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">Step 1 · Pay via GCash</h2>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${paymentSent ? "bg-green-500/15 text-green-500" : "bg-primary/15 text-primary"}`}>
              {paymentSent ? "Paid" : "Pending"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Ipadala ang <span className="text-primary font-semibold">₱{product.price}</span> sa GCash number sa ibaba.
          </p>

          <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3 mb-3">
            <div>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-0.5">
                GCash · {GCASH_NAME}
              </p>
              <p className="text-base font-bold text-foreground font-mono tracking-wider">
                {GCASH_NUMBER}
              </p>
            </div>
            <button onClick={handleCopy} className="liquid-icon-button h-10 w-10" aria-label="Copy GCash number">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={() => setPaymentSent(true)}
            disabled={paymentSent}
            className={`liquid-button w-full justify-center py-2.5 text-xs ${paymentSent ? "opacity-70" : "liquid-button-primary"}`}
          >
            {paymentSent ? "Marked as Paid ✓" : "I've sent the payment"}
          </button>
        </div>

        {/* Step 2: Submit receipt */}
        <form
          onSubmit={handleSubmit}
          className={`card-surface rounded-xl p-5 transition-opacity ${paymentSent ? "opacity-100" : "opacity-60 pointer-events-none"}`}
        >
          <h2 className="text-sm font-bold text-foreground mb-1">Step 2 · Send Receipt</h2>
          <p className="text-xs text-muted-foreground mb-3">
            I-fill up para ma-verify at ma-send sa email mo ang app.
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Pangalan</label>
              <input
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
                maxLength={80}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground outline-none focus:border-primary"
                placeholder="Iyong full name"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                required
                type="email"
                maxLength={120}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground outline-none focus:border-primary"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">GCash Ref # (optional)</label>
              <input
                value={gcashRef}
                onChange={(e) => setGcashRef(e.target.value)}
                maxLength={40}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground outline-none focus:border-primary"
                placeholder="e.g. 1234567890123"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Screenshot ng Receipt</label>
              <label className="mt-1 flex items-center gap-2 px-3 py-3 rounded-lg bg-muted/50 border border-dashed border-border/60 cursor-pointer hover:border-primary transition">
                <Upload className="w-4 h-4 text-primary" />
                <span className="text-xs text-foreground truncate">
                  {receipt ? receipt.name : "Pumili ng larawan (JPG/PNG)"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setReceipt(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="liquid-button liquid-button-primary w-full justify-center py-2.5 text-xs gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {submitting ? "Sending..." : "Send Receipt"}
            </button>
          </div>
        </form>

        <p className="text-[10px] text-muted-foreground text-center">
          ⚠️ Aabot ng hanggang 24 oras ang manual verification. Salamat sa suporta!
        </p>
      </main>
    </div>
  );
};

export default BuyApp;
