import { Battery } from "lucide-react";

const BatteryIndicator = () => (
  <div
    className="card-surface px-5 py-3 flex items-center justify-center gap-2 animate-fade-up"
    style={{ animationDelay: "0.55s" }}
  >
    <Battery className="w-5 h-5 text-green-400" />
    <span className="text-sm font-mono text-foreground">100%</span>
  </div>
);

export default BatteryIndicator;
