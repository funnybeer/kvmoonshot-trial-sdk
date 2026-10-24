'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND, HUD_NAV, NAV } from '@/lib/game-content';

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt={BRAND}
        width={148}
        height={48}
        className="h-9 w-auto max-w-[200px] object-contain object-left sm:h-10"
        priority
      />
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/' || pathname === '';
  const base = href.replace(/\/$/, '');
  return pathname === href || pathname === `${base}/` || pathname.startsWith(`${base}/`);
}

type Props = { variant?: 'site' | 'hud' };

export function GameHeader({ variant = 'site' }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = variant === 'hud' ? HUD_NAV : NAV;

  return (
    <header className="kv-site-header sticky top-0 z-50 border-b border-kv-rule/30 bg-kv-bg/92 backdrop-blur-lg">
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-8 lg:h-[4.75rem]">
        <BrandMark />

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'relative py-2 text-[11px] font-semibold uppercase tracking-[0.2em]',
                  active ? 'text-kv-amber' : 'text-kv-muted hover:text-kv-text',
                )}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
                {active ? (
                  <span className="absolute -bottom-0.5 left-0 right-0 mx-auto h-0.5 max-w-[2rem] bg-kv-amber" />
                ) : null}
              </Link>
            );
          })}
          {variant === 'hud' ? (
            <Link
              href="/"
              className="py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-kv-muted hover:text-kv-text"
            >
              Overview
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/download/" className="kv-cta-outline hidden sm:inline-flex">
            Download
          </Link>
          <button
            type="button"
            className="rounded border border-kv-rule/50 p-2 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-kv-rule/30 bg-kv-bg px-4 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'block py-2 text-sm font-semibold uppercase tracking-wider',
                    isActive(pathname, item.href) ? 'text-kv-amber' : 'text-kv-text',
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
