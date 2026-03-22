const stats = [
  { value: "2009", label: "Year of birth" },
  { value: "+1M", label: "Likes" },
  { value: "Philippines", label: "Location" },
];

const StatsRow = () => (
  <div
    className="flex items-center justify-center gap-8 animate-fade-up"
    style={{ animationDelay: "0.4s" }}
  >
    {stats.map((stat) => (
      <div key={stat.label} className="text-center">
        <p className="text-lg font-semibold text-foreground">{stat.value}</p>
        <p className="text-[11px] text-muted-foreground tracking-wide uppercase">{stat.label}</p>
      </div>
    ))}
  </div>
);

export default StatsRow;
