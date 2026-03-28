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
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/50">
      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-[10px] font-mono text-muted-foreground">
        {count.toLocaleString()} visits
      </span>
    </div>
  );
};

export default VisitorCounter;
