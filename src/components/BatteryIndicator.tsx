import { useState, useEffect } from "react";
import { Battery, BatteryLow, BatteryMedium, BatteryFull, BatteryCharging } from "lucide-react";

const BatteryIndicator = () => {
  const [level, setLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    const nav = navigator as any;
    if (nav.getBattery) {
      nav.getBattery().then((battery: any) => {
        const update = () => {
          setLevel(Math.round(battery.level * 100));
          setCharging(battery.charging);
        };
        update();
        battery.addEventListener("levelchange", update);
        battery.addEventListener("chargingchange", update);
        return () => {
          battery.removeEventListener("levelchange", update);
          battery.removeEventListener("chargingchange", update);
        };
      });
    }
  }, []);

  const getIcon = () => {
    if (charging) return <BatteryCharging className="w-5 h-5 text-green-400" />;
    if (level === null) return <Battery className="w-5 h-5 text-muted-foreground" />;
    if (level <= 20) return <BatteryLow className="w-5 h-5 text-red-400" />;
    if (level <= 50) return <BatteryMedium className="w-5 h-5 text-yellow-400" />;
    return <BatteryFull className="w-5 h-5 text-green-400" />;
  };

  return (
    <div
      className="card-surface px-5 py-3 flex items-center justify-center gap-2 animate-fade-up hover:scale-[1.02] transition-transform duration-300"
      style={{ animationDelay: "0.55s" }}
    >
      {getIcon()}
      <span className="text-sm font-mono text-foreground">
        {level !== null ? `${level}%` : "N/A"}
      </span>
      {charging && <span className="text-[10px] text-green-400 font-mono">CHARGING</span>}
    </div>
  );
};

export default BatteryIndicator;
