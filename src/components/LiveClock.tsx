import { useState, useEffect } from "react";

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });

  return (
    <div className="card-surface p-5 text-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
      <p className="font-mono text-2xl font-medium tracking-tight text-foreground">{formatted}</p>
      <p className="text-xs text-primary font-medium mt-1 tracking-widest uppercase">Local Time</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">PHT (GMT+8)</p>
    </div>
  );
};

export default LiveClock;
