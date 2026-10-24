import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowCta } from '@/components/game/ArrowCta';
import { GameShell } from '@/components/game/GameShell';
import { PageBackdrop } from '@/components/game/PageBackdrop';
import { MARKETING } from '@/lib/game-content';

export const metadata: Metadata = {
  title: 'Media | KV Moonshot',
  description: 'Cinematic key art and concept visuals from KV Moonshot, the premium lunar FPS.',
};

export default function MediaPage() {
  const { media } = MARKETING;

  return (
    <GameShell>
      <PageBackdrop src="/game/backgrounds/gameplay-clean.png" alt="" overlay="dark">
        <div className="mx-auto flex min-h-[min(80vh,720px)] max-w-[1400px] flex-col justify-center px-4 py-16 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-kv-amber">{media.eyebrow}</p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            {media.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-kv-muted sm:text-base">{media.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ArrowCta href="/download/">Download game</ArrowCta>
            <Link href="/missions/" className="kv-cta-ghost text-sm uppercase tracking-[0.14em]">
              View missions →
            </Link>
          </div>
        </div>
      </PageBackdrop>
    </GameShell>
  );
}
