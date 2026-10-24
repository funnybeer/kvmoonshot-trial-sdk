'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowCta } from '@/components/game/ArrowCta';
import { GameShell } from '@/components/game/GameShell';
import { PageBackdrop } from '@/components/game/PageBackdrop';
import { StatBars } from '@/components/game/StatBars';
import { MARKETING, OPERATORS } from '@/lib/game-content';

export default function OperatorsPage() {
  const [selected, setSelected] = useState<string>(OPERATORS[0].id);
  const active = OPERATORS.find((o) => o.id === selected) ?? OPERATORS[0];

  return (
    <GameShell header="hud" prepFlow>
      <PageBackdrop src="/game/backgrounds/hangar.png" alt="" overlay="hud">
        <div className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-[1400px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[minmax(280px,36%)_1fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-kv-muted">Choose your</p>
            <h1 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">Operator</h1>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-kv-amber">{active.role}</p>
            <p className="font-display text-4xl font-bold uppercase">{active.name}</p>
            <p className="mt-2 text-sm text-kv-muted">{active.tagline}</p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-kv-muted/90">{MARKETING.operatorsIntro}</p>
            <div className="mt-8 max-w-xs">
              <StatBars stats={active.stats} />
            </div>
          </div>

          <div className="relative flex min-h-[420px] flex-col justify-end lg:min-h-[520px]">
            <div className="relative mx-auto aspect-[2/3] w-full max-w-md flex-1">
              <Image src={active.image} alt={active.name} fill priority className="kv-cutout object-contain object-bottom" sizes="400px" />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {OPERATORS.map((op) => (
                <button
                  key={op.id}
                  type="button"
                  aria-pressed={selected === op.id}
                  aria-label={`Select ${op.name}`}
                  onClick={() => setSelected(op.id)}
                  className={clsx(
                    'kv-choice relative h-20 w-[4.5rem] overflow-hidden sm:h-24 sm:w-24',
                    selected === op.id && 'ring-1 ring-kv-amber',
                  )}
                >
                  <Image src={op.image} alt="" fill className="object-contain object-bottom p-1" sizes="96px" />
                  {selected === op.id ? (
                    <span className="absolute bottom-0 left-0 right-0 bg-kv-amber py-0.5 text-center text-[8px] font-bold uppercase text-[#101216]">
                      Selected
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
            <ArrowCta href="/arsenal/" className="mt-6 self-end">
              Confirm operator
            </ArrowCta>
          </div>
        </div>
      </PageBackdrop>
    </GameShell>
  );
}
