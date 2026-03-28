import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem("visitor_count") || "0", 10);
    const newCount = stored + 1;
    localStorage.setItem("visitor_count", String(newCount));
    setCount(newCount);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 animate-fade-up" style={{ animationDelay: "0.55s" }}>
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50">
        <Eye className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs font-mono text-muted-foreground">
          {count.toLocaleString()} visits
        </span>
      </div>
    </div>
  );
};

export default VisitorCounter;
