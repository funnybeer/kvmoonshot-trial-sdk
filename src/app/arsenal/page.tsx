'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowCta } from '@/components/game/ArrowCta';
import { GameShell } from '@/components/game/GameShell';
import { PageBackdrop } from '@/components/game/PageBackdrop';
import { StatBars } from '@/components/game/StatBars';
import { MARKETING, WEAPONS } from '@/lib/game-content';

const SLOTS = ['Primary', 'Secondary', 'Utility'] as const;

export default function ArsenalPage() {
  const [selected, setSelected] = useState<string>(WEAPONS[0].id);
  const weapon = WEAPONS.find((w) => w.id === selected) ?? WEAPONS[0];
  const stats = [
    { label: 'Control', value: weapon.stats.control },
    { label: 'Range', value: weapon.stats.range },
    { label: 'Handling', value: weapon.stats.handling },
  ];

  return (
    <GameShell header="hud" prepFlow>
      <PageBackdrop src="/game/backgrounds/armory.png" alt="" overlay="hud">
        <div className="mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-[1400px] flex-col px-4 py-6 lg:px-8">
          <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(260px,32%)_1fr]">
            <div>
              <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">Build your loadout.</h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-kv-muted">{MARKETING.arsenalIntro}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {SLOTS.map((slot) => (
                  <span
                    key={slot}
                    className={clsx(
                      'px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]',
                      slot === 'Primary' ? 'bg-kv-amber text-[#101216]' : 'border border-kv-rule text-kv-muted',
                    )}
                  >
                    {slot}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-kv-amber">{weapon.class}</p>
              <p className="font-display text-3xl font-bold uppercase">{weapon.name}</p>
              <p className="mt-2 text-sm text-kv-muted">{weapon.description}</p>
              <div className="mt-8 max-w-xs">
                <StatBars stats={stats} />
              </div>
            </div>
            <div className="relative min-h-[280px]">
              <Image src={weapon.image} alt={weapon.name} fill className="kv-cutout object-contain p-4" sizes="(max-width:1024px) 100vw, 60vw" />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-kv-rule/40 pt-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {WEAPONS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  aria-pressed={selected === w.id}
                  onClick={() => setSelected(w.id)}
                  className={clsx('kv-choice min-w-[7rem] px-3 py-2 text-left', selected === w.id && 'border-kv-amber')}
                >
                  <span className="block text-xs font-bold uppercase">{w.name}</span>
                  <span className="block text-[10px] text-kv-muted">{w.description}</span>
                </button>
              ))}
            </div>
            <ArrowCta href="/missions/">Equip weapon</ArrowCta>
          </div>
        </div>
      </PageBackdrop>
    </GameShell>
  );
}
