export default function MetricCard({ title, value, change, isPositive }: { title: string, value: string, change: string, isPositive: boolean }) {
  return (
    <div className="glass-card flex flex-col gap-2 relative overflow-hidden group cursor-pointer">
      {/* Decorative background element that scales on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full translate-x-8 -translate-y-8 transition-transform duration-700 ease-out group-hover:scale-125 group-hover:bg-brand-500/10" />
      
      <h3 className="text-zinc-400 font-medium text-sm relative z-10">{title}</h3>
      <p className="text-3xl font-bold tracking-tight text-white relative z-10">{value}</p>
      
      <div className="flex items-center gap-2 mt-1 relative z-10">
        <span className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors ${isPositive ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' : 'bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20'}`}>
          {change}
        </span>
        <span className="text-xs text-zinc-500">vs last month</span>
      </div>
    </div>
  );
}
