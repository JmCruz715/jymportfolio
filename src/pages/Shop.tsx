import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, ShoppingBag, Star, ExternalLink } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Premium Account Boost",
    description: "Get your account boosted with premium features",
    price: "₱149",
    badge: "Popular",
    link: "https://sociabuzz.com/zenoshin1",
  },
  {
    id: 2,
    name: "Custom Bot Setup",
    description: "Personalized bot configuration for your needs",
    price: "₱299",
    badge: "New",
    link: "https://sociabuzz.com/zenoshin1",
  },
  {
    id: 3,
    name: "Social Media Package",
    description: "Complete social media growth package",
    price: "₱499",
    badge: "Best Value",
    link: "https://sociabuzz.com/zenoshin1",
  },
  {
    id: 4,
    name: "Website Development",
    description: "Custom website design and development",
    price: "₱999",
    badge: null,
    link: "https://sociabuzz.com/zenoshin1",
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
      <div className="fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-30 animate-fade-in">
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
          <h1 className="text-xl font-bold text-foreground tracking-tight">My Shop</h1>
          <p className="text-xs text-muted-foreground mt-1">Browse services & products</p>
        </div>

        {/* Products */}
        <div className="flex flex-col gap-3">
          {products.map((product, i) => (
            <a
              key={product.id}
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface p-4 flex items-start gap-3 group hover:border-primary/40 transition-all duration-200 active:scale-[0.98] animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.08}s`, animationFillMode: "backwards" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground">{product.name}</p>
                  {product.badge && (
                    <span className="text-[10px] bg-primary/20 text-primary font-mono font-medium px-1.5 py-0.5 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{product.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-primary">{product.price}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-accent fill-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-up" style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}>
          <a
            href="https://sociabuzz.com/zenoshin1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            View Full Store
          </a>
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
