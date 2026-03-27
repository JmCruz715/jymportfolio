import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Copy, Check, ShieldCheck } from "lucide-react";
import account1 from "@/assets/account1.jpg";
import account2 from "@/assets/account2.jpg";
import account3 from "@/assets/account3.jpg";
import account4 from "@/assets/account4.jpg";
import account5 from "@/assets/account5.jpg";

const accounts: Record<string, { name: string; image: string }> = {
  "1": { name: "Let down", image: account1 },
  "2": { name: "양말", image: account2 },
  "3": { name: "shorennn", image: account3 },
  "4": { name: "Second option", image: account4 },
  "5": { name: "Angga Basikal.", image: account5 },
};

const Payment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const account = accounts[id || ""];
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light";
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const gcashNumber = "09938588474";

  const handleCopy = () => {
    navigator.clipboard.writeText(gcashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground font-bold mb-2">Account not found</p>
          <button onClick={() => navigate("/shop")} className="text-primary text-sm">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-30 bg-background/80 backdrop-blur-sm animate-fade-in">
        <button
          onClick={() => navigate("/shop")}
          className="text-foreground hover:text-muted-foreground transition-colors active:scale-95 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Shop</span>
        </button>
        <button
          onClick={() => setIsDark(!isDark)}
          className="text-accent hover:text-accent/80 transition-colors active:scale-95"
        >
          {isDark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
      </div>

      <main className="max-w-md mx-auto px-5 py-20 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-3">
            <ShieldCheck className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Payment</h1>
          <p className="text-xs text-muted-foreground mt-1">Complete your purchase</p>
        </div>

        {/* Account Preview */}
        <div className="card-surface rounded-xl overflow-hidden animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
          <img src={account.image} alt={account.name} className="w-full h-40 object-cover object-center" />
          <div className="p-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">{account.name}</h3>
            <span className="text-lg font-bold text-primary">₱600</span>
          </div>
        </div>

        {/* GCash Payment */}
        <div className="card-surface rounded-xl p-5 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
          <h2 className="text-sm font-bold text-foreground mb-1">Pay via GCash</h2>
          <p className="text-xs text-muted-foreground mb-4">Send ₱600 to the GCash number below to complete your purchase.</p>

          <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3 mb-4">
            <div>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-0.5">GCash Number</p>
              <p className="text-base font-bold text-foreground font-mono tracking-wider">{gcashNumber}</p>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>📌 <span className="text-foreground font-medium">Steps:</span></p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>Open your GCash app</li>
              <li>Send ₱600 to <span className="text-primary font-mono font-medium">{gcashNumber}</span></li>
              <li>Take a screenshot of your payment receipt</li>
              <li>Send the screenshot to confirm your purchase</li>
            </ol>
          </div>
        </div>

        {/* Warning */}
        <div className="card-surface rounded-xl p-4 border-primary/30 animate-fade-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
          <p className="text-xs text-muted-foreground text-center">
            ⚠️ Account will be delivered after payment confirmation. Please allow up to <span className="text-foreground font-medium">24 hours</span> for processing.
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-xs text-muted-foreground">
            © 2026 | Developed by: <span className="text-primary">jmcruz</span>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Payment;
