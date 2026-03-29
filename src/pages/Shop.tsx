import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, ShoppingBag, Gamepad2, Coffee, Hand } from "lucide-react";
import account1 from "@/assets/account1.jpg";
import account2 from "@/assets/account2.jpg";
import account3 from "@/assets/account3.jpg";
import account4 from "@/assets/account4.jpg";
import account5 from "@/assets/account5.jpg";
import coffeeMenu from "@/assets/coffee-menu.jpg";
import fingersleeveImg from "@/assets/fingersleeve.jpeg";

const accounts = [
  {
    id: 1,
    name: "Let down",
    gameId: "1149587234",
    server: "11495",
    rank: "Mythical Glory",
    matches: 6994,
    likes: 3826,
    heroes: 116,
    skins: 242,
    price: 500,
    image: account1,
  },
  {
    id: 2,
    name: "양말",
    gameId: "370198453",
    server: "3701",
    rank: "Mythic",
    matches: 10683,
    likes: 7328,
    heroes: 87,
    skins: 156,
    price: 700,
    image: account2,
  },
  {
    id: 3,
    name: "shorennn",
    gameId: "1053921847",
    server: "10539",
    rank: "Mythic",
    matches: 5468,
    likes: 3009,
    heroes: 96,
    skins: 179,
    price: 600,
    image: account3,
  },
  {
    id: 4,
    name: "Second option",
    gameId: "1181245672",
    server: "11812",
    rank: "Mythic",
    matches: 3031,
    likes: 1309,
    heroes: 72,
    skins: 98,
    price: 500,
    image: account4,
  },
  {
    id: 5,
    name: "Angga Basikal.",
    gameId: "11173928456",
    server: "111739",
    rank: "Mythic",
    matches: 6767,
    likes: 5707,
    heroes: 120,
    skins: 379,
    price: 1100,
    image: account5,
  },
];

const coffeeItems = [
  { name: "Black White Coffee", price: 40, tag: "Classic" },
  { name: "Coffee Cocoa", price: 60, tag: "Popular" },
  { name: "Cappuccino", price: 65, tag: "Best Seller" },
  { name: "Orange Americano", price: 65, tag: "New" },
  { name: "Caramel Macchiato", price: 75, tag: "Premium" },
  { name: "Coffee White Cream", price: 80, tag: "Special" },
  { name: "Latte", price: 80, tag: "Classic" },
];

type ShopTab = "mlbb" | "coffee" | "fingersleeve";

const Shop = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ShopTab>("mlbb");
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

  const messengerUrl = "https://m.me/jm.born67";

  const tabs: { key: ShopTab; label: string; icon: React.ReactNode }[] = [
    { key: "mlbb", label: "MLBB Account", icon: <Gamepad2 className="w-4 h-4" /> },
    { key: "coffee", label: "Coffee Shop", icon: <Coffee className="w-4 h-4" /> },
    { key: "fingersleeve", label: "Fingersleeve", icon: <Hand className="w-4 h-4" /> },
  ];

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
          <h1 className="text-xl font-bold text-foreground tracking-tight">jmcruz Shop</h1>
          <p className="text-xs text-muted-foreground mt-1">Premium products for sale</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-secondary/50 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* MLBB Accounts */}
        {activeTab === "mlbb" && (
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
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground mb-2">
                    ID: {account.gameId} | Server: {account.server}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[10px] bg-primary/20 text-primary font-mono font-medium px-1.5 py-0.5 rounded">
                      {account.rank}
                    </span>
                    <span className="text-[10px] bg-accent/20 text-accent font-mono font-medium px-1.5 py-0.5 rounded">
                      {account.matches} Matches
                    </span>
                    <span className="text-[10px] bg-muted text-muted-foreground font-mono font-medium px-1.5 py-0.5 rounded">
                      {account.heroes} Heroes
                    </span>
                    <span className="text-[10px] bg-muted text-muted-foreground font-mono font-medium px-1.5 py-0.5 rounded">
                      {account.skins} Skins
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">₱{account.price.toLocaleString()}</span>
                    <a
                      href={messengerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors active:scale-95"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Coffee Shop */}
        {activeTab === "coffee" && (
          <div className="flex flex-col gap-4 animate-fade-up">
            <img
              src={coffeeMenu}
              alt="Coffee Menu"
              className="w-full rounded-xl"
            />
            <div className="flex flex-col gap-3">
              {coffeeItems.map((item, i) => (
                <div
                  key={item.name}
                  className="card-surface rounded-xl p-4 flex items-center justify-between animate-fade-up"
                  style={{ animationDelay: `${0.1 + i * 0.06}s`, animationFillMode: "backwards" }}
                >
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{item.name}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary">₱{item.price}</span>
                    <a
                      href={messengerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors active:scale-95"
                    >
                      Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fingersleeve */}
        {activeTab === "fingersleeve" && (
          <div className="flex flex-col gap-4 animate-fade-up">
            <div className="card-surface rounded-xl overflow-hidden">
              <img
                src={fingersleeveImg}
                alt="Gaming Fingersleeve"
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground mb-2">Gaming Fingersleeve</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Premium anti-sweat gaming fingersleeves for mobile gaming.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-xs font-semibold text-foreground">1 Pair</p>
                      <p className="text-[10px] text-muted-foreground">Standard</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary">₱50</span>
                      <a
                        href={messengerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors active:scale-95"
                      >
                        Buy
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-xs font-semibold text-foreground">Buy 1 Take 1</p>
                      <p className="text-[10px] text-muted-foreground">2 Pairs</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary">₱80</span>
                      <a
                        href={messengerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors active:scale-95"
                      >
                        Buy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
