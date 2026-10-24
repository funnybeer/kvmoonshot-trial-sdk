'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowCta } from '@/components/game/ArrowCta';
import { GameShell } from '@/components/game/GameShell';
import { PageBackdrop } from '@/components/game/PageBackdrop';
import { MARKETING, MISSIONS } from '@/lib/game-content';

export default function MissionsPage() {
  const [selected, setSelected] = useState<string>(MISSIONS[0].id);
  const mission = MISSIONS.find((m) => m.id === selected) ?? MISSIONS[0];

  return (
    <GameShell header="hud" prepFlow>
      <PageBackdrop src="/game/backgrounds/command.png" alt="" overlay="hud">
        <div className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-[1400px] grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-[1fr_min(400px,38%)] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-kv-amber">Mission selection</p>
            <h1 className="font-display mt-2 text-3xl font-bold uppercase leading-tight sm:text-4xl">
              Choose your next mission.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-kv-muted">{MARKETING.missionsIntro}</p>
            <div className="relative mx-auto mt-8 aspect-square w-full max-w-lg lg:mx-0">
              <Image src="/game/world/mission-globe.png" alt="" fill className="kv-cutout object-contain" sizes="500px" priority />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="kv-panel overflow-hidden p-0">
              <div className="relative aspect-[16/10]">
                <Image src={mission.image} alt={mission.title} fill className="kv-scene" sizes="400px" />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-kv-amber">Selected mission</p>
                <p className="font-display text-2xl font-bold uppercase">{mission.title}</p>
                <p className="text-sm text-kv-muted">{mission.subtitle}</p>
                <p className="mt-3 text-xs text-kv-muted">Mission briefing: prepare your loadout before deploy.</p>
              </div>
            </div>
            <ul className="space-y-2">
              {MISSIONS.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    aria-pressed={selected === m.id}
                    onClick={() => setSelected(m.id)}
                    className={clsx(
                      'kv-choice flex w-full items-center justify-between px-4 py-3 text-left text-xs font-bold uppercase tracking-wide',
                      selected === m.id ? 'text-kv-amber' : 'text-kv-muted',
                    )}
                  >
                    {m.title}
                    <span>→</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-2">
              <Link href="/arsenal/" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-kv-muted hover:text-kv-text">
                Back
              </Link>
              <ArrowCta href="/download/">Deploy</ArrowCta>
            </div>
          </div>
        </div>
      </PageBackdrop>
    </GameShell>
  );
}
