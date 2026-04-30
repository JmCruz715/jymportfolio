import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Lock, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdmin();
  const [email, setEmail] = useState("kaizenjym12@gmail.com");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate("/admin", { replace: true });
  }, [loading, session, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    // Try sign in
    let { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error && error.message.toLowerCase().includes("invalid")) {
      // First-time setup: create the admin account
      const { error: signUpErr } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (signUpErr) {
        toast({ title: "Login failed", description: signUpErr.message, variant: "destructive" });
        setBusy(false);
        return;
      }
      const retry = await supabase.auth.signInWithPassword({ email, password });
      error = retry.error;
    }
    setBusy(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back, admin" });
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm liquid-panel p-6 animate-liquid-in">
        <button onClick={() => navigate("/")} className="liquid-icon-button mb-4">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 mb-6 text-primary">
          <Lock className="w-5 h-5" />
          <h1 className="text-lg font-bold">Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={busy} className="liquid-button liquid-button-primary mt-2">
            {busy ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground mt-4 text-center">
          Restricted area for portfolio owner only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
