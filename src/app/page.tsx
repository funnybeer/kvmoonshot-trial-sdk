import Image from 'next/image';
import Link from 'next/link';
import { ArrowCta } from '@/components/game/ArrowCta';
import { GameShell } from '@/components/game/GameShell';
import { PageBackdrop } from '@/components/game/PageBackdrop';
import { HomeTrustBar } from '@/components/game/HomeTrustBar';
import { MARKETING, WORLD_CARDS } from '@/lib/game-content';

export default function HomePage() {
  const { hero, divider, discover, pillars } = MARKETING;

  return (
    <GameShell>
      <PageBackdrop src="/game/scenes/lunar-hero.png" alt="" priority overlay="hero">
        <div className="mx-auto flex min-h-[min(88vh,820px)] max-w-[1400px] flex-col justify-end px-4 pb-16 pt-8 sm:px-8 lg:justify-center lg:pb-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-kv-amber">{hero.eyebrow}</p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold uppercase leading-[1.02] sm:text-5xl lg:text-[4.5rem]">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-kv-muted sm:text-lg">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ArrowCta href="/download/">{hero.ctaPrimary}</ArrowCta>
            <Link href="/media/" className="kv-cta-ghost uppercase tracking-[0.12em]">
              {hero.ctaSecondary} →
            </Link>
          </div>
        </div>
      </PageBackdrop>

      <HomeTrustBar />

      <div className="kv-divider-label mx-auto max-w-[1400px] px-4 sm:px-8">
        <span>{divider}</span>
      </div>

      <section className="border-b border-kv-rule/20 bg-kv-panel/20 px-4 py-14 sm:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="kv-panel p-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-kv-text">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-kv-muted">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="discover" className="bg-kv-bg px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-kv-amber">{discover.eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl">
            {discover.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-kv-muted sm:text-base">{discover.body}</p>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {WORLD_CARDS.map((card) => (
              <Link key={card.title} href={card.href} className="group kv-panel overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    className="kv-scene transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold uppercase tracking-wide">{card.title}</span>
                    <span className="shrink-0 text-kv-amber">→</span>
                  </div>
                  <p className="mt-2 text-sm text-kv-muted">{card.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/operators/" className="kv-cta-ghost text-sm uppercase tracking-[0.14em]">
              Meet the operators
            </Link>
            <Link href="/arsenal/" className="kv-cta-ghost text-sm uppercase tracking-[0.14em]">
              Explore the arsenal
            </Link>
          </div>
        </div>
      </section>
    </GameShell>
  );
}
