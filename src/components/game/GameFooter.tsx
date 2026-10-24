import Link from 'next/link';
import { BRAND } from '@/lib/game-content';

const LINKS = [
  { label: 'Download', href: '/download/' },
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Support', href: '/download/#support' },
];

export function GameFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-kv-rule/30 bg-kv-panel/30">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold uppercase tracking-wide text-kv-text">{BRAND}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-kv-muted">
              Cinema-grade lunar combat. Built for PC players who want premium visuals and squad-based missions.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-kv-amber">Navigate</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-kv-muted">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-kv-amber">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-kv-amber">Platform</p>
            <p className="mt-4 text-sm text-kv-muted">Windows PC client available now.</p>
            <p className="mt-2 text-sm text-kv-muted">macOS coming soon.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-kv-rule/20 pt-6 text-[11px] text-kv-muted">
          <span>© {year} {BRAND}. All rights reserved.</span>
          <span className="uppercase tracking-[0.16em]">Rated for mature sci-fi combat themes</span>
        </div>
      </div>
    </footer>
  );
}
