const STATS = [
  { label: 'Active squads', value: '2.4M+' },
  { label: 'Maps & missions', value: '48' },
  { label: 'Avg. match rating', value: '4.8/5' },
  { label: 'Platforms', value: 'Windows' },
];

export function HomeTrustBar() {
  return (
    <section className="border-y border-kv-rule/25 bg-gradient-to-b from-kv-panel/40 to-kv-bg/80">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-display text-2xl font-bold tracking-tight text-kv-text sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-kv-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
