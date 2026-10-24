type Stat = { readonly label: string; readonly value: number };

export function StatBars({ stats }: { stats: readonly Stat[] }) {
  return (
    <dl className="kv-stat-bars space-y-3">
      {stats.map(({ label, value }) => (
        <div key={label}>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-kv-muted">{label}</dt>
          <dd className="mt-1.5 h-[3px] bg-white/10">
            <div className="h-full bg-kv-amber transition-all duration-300" style={{ width: `${value}%` }} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
