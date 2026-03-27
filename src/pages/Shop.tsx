import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, ShoppingBag } from "lucide-react";
import account1 from "@/assets/account1.jpg";
import account2 from "@/assets/account2.jpg";
import account3 from "@/assets/account3.jpg";
import account4 from "@/assets/account4.jpg";
import account5 from "@/assets/account5.jpg";

const accounts = [
  {
    id: 1,
    name: "Let down",
    server: "11495",
    rank: "Mythical Glory",
    matches: 6994,
    likes: 3826,
    heroes: 116,
    skins: 242,
    image: account1,
  },
  {
    id: 2,
    name: "양말",
    server: "3701",
    rank: "Mythic",
    matches: 10683,
    likes: 7328,
    heroes: 0,
    skins: 0,
    image: account2,
  },
  {
    id: 3,
    name: "shorennn",
    server: "10539",
    rank: "Mythic",
    matches: 5468,
    likes: 3009,
    heroes: 96,
    skins: 179,
    image: account3,
  },
  {
    id: 4,
    name: "Second option",
    server: "11812",
    rank: "Mythic",
    matches: 3031,
    likes: 1309,
    heroes: 0,
    skins: 0,
    image: account4,
  },
  {
    id: 5,
    name: "Angga Basikal.",
    server: "111739",
    rank: "Mythic",
    matches: 6767,
    likes: 5707,
    heroes: 120,
    skins: 379,
    image: account5,
  },
];

const Shop = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-background relative">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-30 bg-background/80 backdrop-blur-sm animate-fade-in">
        <button
          onClick={() => navigate("/")}
          className="text-foreground hover:text-muted-foreground transition-colors active:scale-95 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
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
            <ShoppingBag className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">MLBB Account Shop</h1>
          <p className="text-xs text-muted-foreground mt-1">Premium Mobile Legends accounts for sale</p>
        </div>

        {/* Accounts */}
        <div className="flex flex-col gap-4">
          {accounts.map((account, i) => (
            <div
              key={account.id}
              className="card-surface rounded-xl overflow-hidden animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.08}s`, animationFillMode: "backwards" }}
            >
              <img
                src={account.image}
                alt={account.name}
                className="w-full h-40 object-cover object-center"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-foreground">{account.name}</h3>
                  <span className="text-xs font-mono text-muted-foreground">Server: {account.server}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[10px] bg-primary/20 text-primary font-mono font-medium px-1.5 py-0.5 rounded">
                    {account.rank}
                  </span>
                  <span className="text-[10px] bg-accent/20 text-accent font-mono font-medium px-1.5 py-0.5 rounded">
                    {account.matches} Matches
                  </span>
                  {account.heroes > 0 && (
                    <span className="text-[10px] bg-muted text-muted-foreground font-mono font-medium px-1.5 py-0.5 rounded">
                      {account.heroes} Heroes
                    </span>
                  )}
                  {account.skins > 0 && (
                    <span className="text-[10px] bg-muted text-muted-foreground font-mono font-medium px-1.5 py-0.5 rounded">
                      {account.skins} Skins
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">₱600</span>
                  <button
                    onClick={() => navigate(`/payment/${account.id}`)}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors active:scale-95"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center animate-fade-up" style={{ animationDelay: "0.55s" }}>
          <p className="text-xs text-muted-foreground">
            © 2026 | Developed by: <span className="text-primary">jmcruz</span>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Shop;
