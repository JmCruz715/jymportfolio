import { useEffect, useState } from "react";
import { Clock, BatteryFull, BatteryLow, BatteryMedium, BatteryCharging, Wifi, Code2 } from "lucide-react";

const StatusStrip = () => {
  const [time, setTime] = useState(new Date());
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState(false);
  const [ping, setPing] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const nav = navigator as any;
    if (nav.getBattery) {
      nav.getBattery().then((b: any) => {
        const upd = () => {
          setLevel(Math.round(b.level * 100));
          setCharging(b.charging);
        };
        upd();
        b.addEventListener("levelchange", upd);
        b.addEventListener("chargingchange", upd);
      });
    }
  }, []);

  useEffect(() => {
    let stop = false;
    const measure = async () => {
      try {
        const start = performance.now();
        await fetch(`/favicon.ico?_=${Date.now()}`, { cache: "no-store" });
        const ms = Math.round(performance.now() - start);
        if (!stop) setPing(ms);
      } catch {
        if (!stop) setPing(null);
      }
    };
    measure();
    const i = setInterval(measure, 8000);
    return () => {
      stop = true;
      clearInterval(i);
    };
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });

  const BatIcon = charging
    ? BatteryCharging
    : level === null
    ? BatteryFull
    : level <= 20
    ? BatteryLow
    : level <= 50
    ? BatteryMedium
    : BatteryFull;
  const batColor = charging
    ? "text-green-500"
    : level !== null && level <= 20
    ? "text-red-500"
    : level !== null && level <= 50
    ? "text-yellow-500"
    : "text-green-500";

  const pingColor =
    ping === null
      ? "text-muted-foreground"
      : ping < 120
      ? "text-green-500"
      : ping < 300
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="smooth-card px-3 py-2.5 animate-fade-up">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1 text-foreground">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-[11px] font-semibold">{timeStr}</span>
          </div>
          <span className="text-[9px] text-muted-foreground tracking-wider">PHT</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 border-x border-border/50">
          <div className="flex items-center gap-1">
            <BatIcon className={`w-3.5 h-3.5 ${batColor}`} />
            <span className="font-mono text-[11px] font-semibold text-foreground">
              {level !== null ? `${level}%` : "—"}
            </span>
          </div>
          <span className="text-[9px] text-muted-foreground tracking-wider">
            {charging ? "CHARGING" : "BATTERY"}
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1">
            <Wifi className={`w-3.5 h-3.5 ${pingColor}`} />
            <span className={`font-mono text-[11px] font-semibold ${pingColor}`}>
              {ping !== null ? `${ping}ms` : "—"}
            </span>
          </div>
          <span className="text-[9px] text-muted-foreground tracking-wider">NETWORK</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
        <Code2 className="w-3 h-3 text-primary" />
        Developed by <span className="text-primary font-semibold">Kaizen</span>
      </div>
    </div>
  );
};

export default StatusStrip;
