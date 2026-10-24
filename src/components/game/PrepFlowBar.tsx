'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const STEPS = [
  { label: 'Operators', href: '/operators/' },
  { label: 'Loadout', href: '/arsenal/' },
  { label: 'Missions', href: '/missions/' },
  { label: 'Download', href: '/download/' },
] as const;

function activeStepIndex(pathname: string) {
  for (let i = STEPS.length - 1; i >= 0; i--) {
    const base = STEPS[i].href.replace(/\/$/, '');
    if (pathname === STEPS[i].href || pathname === base || pathname.startsWith(`${base}/`)) return i;
  }
  return -1;
}

/** Onboarding strip: operator → loadout → mission → install */
export function PrepFlowBar() {
  const pathname = usePathname();
  const idx = activeStepIndex(pathname);

  return (
    <nav aria-label="Prepare for deploy" className="border-b border-kv-rule/30 bg-kv-bg/90">
      <ol className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] sm:px-8">
        {STEPS.map((step, i) => {
          const active = i === idx;
          const done = idx > i;
          return (
            <li key={step.href} className="flex items-center gap-2">
              {i > 0 ? <span className="text-kv-muted/50">/</span> : null}
              <Link
                href={step.href}
                className={clsx(
                  'rounded px-2 py-1 transition-colors',
                  active && 'bg-kv-amber/15 text-kv-amber',
                  done && !active && 'text-kv-text hover:text-kv-amber',
                  !active && !done && 'text-kv-muted hover:text-kv-text',
                )}
                aria-current={active ? 'step' : undefined}
              >
                {step.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
