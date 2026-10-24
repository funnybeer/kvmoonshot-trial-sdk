import Image from 'next/image';
import Link from 'next/link';
import { ArrowCta } from '@/components/game/ArrowCta';
import { GameShell } from '@/components/game/GameShell';
import { PageBackdrop } from '@/components/game/PageBackdrop';
import { DOWNLOAD, MARKETING } from '@/lib/game-content';

export default function DownloadPage() {
  return (
    <GameShell prepFlow>
      <PageBackdrop src="/game/backgrounds/hangar.png" alt="" priority overlay="hero">
        <div className="mx-auto grid min-h-[min(92vh,900px)] max-w-[1400px] grid-cols-1 items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-kv-amber">{MARKETING.download.eyebrow}</p>
            <h1 className="font-display mt-3 text-4xl font-bold uppercase tracking-tight sm:text-5xl">{MARKETING.download.title}</h1>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-kv-muted sm:text-lg">{MARKETING.download.lead}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <article className="kv-panel kv-panel-3d p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-kv-muted">{DOWNLOAD.windows.platform}</p>
                <p className="mt-1 font-display text-xl font-bold uppercase">Download for PC</p>
                <p className="mt-2 text-sm text-kv-muted">{DOWNLOAD.windows.label}</p>
                <ArrowCta href={DOWNLOAD.windows.href} download className="mt-6 w-full text-sm">
                  Download for Windows
                </ArrowCta>
                <Link href="#requirements" className="mt-3 inline-block text-[11px] uppercase tracking-wide text-kv-muted hover:text-kv-amber">
                  System requirements →
                </Link>
              </article>
              <article className="kv-panel kv-panel-3d p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-kv-muted">{DOWNLOAD.mac.platform}</p>
                <p className="mt-1 font-display text-xl font-bold uppercase">Download for Mac</p>
                <p className="mt-2 text-sm text-kv-muted">{DOWNLOAD.mac.label}</p>
                {DOWNLOAD.mac.comingSoon ? (
                  <p className="mt-6 w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-kv-muted">
                    macOS build (coming soon)
                  </p>
                ) : (
                  <ArrowCta href={DOWNLOAD.mac.href} download variant="secondary" className="mt-6 w-full text-sm">
                    Download for macOS
                  </ArrowCta>
                )}
                <Link href="#requirements" className="mt-3 inline-block text-[11px] uppercase tracking-wide text-kv-muted hover:text-kv-amber">
                  System requirements →
                </Link>
              </article>
            </div>
          </div>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-sm lg:max-w-md">
            <Image
              src="/game/operators/vega.png"
              alt="Vega operator"
              fill
              className="kv-cutout object-contain object-bottom"
              sizes="400px"
              priority
            />
          </div>
        </div>
      </PageBackdrop>

      <section className="border-y border-kv-rule/30 bg-kv-panel/30">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 sm:grid-cols-3 sm:px-8">
          {DOWNLOAD.steps.map((step) => (
            <article key={step.n}>
              <p className="font-display text-4xl font-bold text-white/15">{step.n}</p>
              <h2 className="mt-2 text-sm font-bold uppercase tracking-wide">{step.title}</h2>
              <p className="mt-2 text-sm text-kv-muted">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="support" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/game/scenes/lunar-hero.png" alt="" fill className="kv-scene object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-kv-bg/85" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-kv-amber">Need a hand?</p>
          <h2 className="font-display mt-2 text-3xl font-bold uppercase">We&apos;re here to help.</h2>
          <Link href="mailto:support@kvmoonshot.cc" className="kv-cta-outline mt-6 inline-flex">
            Contact support →
          </Link>
        </div>
      </section>

      <section id="requirements" className="mx-auto max-w-[1400px] px-4 py-12 sm:px-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-kv-amber">System requirements</h3>
        <ul className="mt-4 grid gap-2 text-sm text-kv-muted sm:grid-cols-2">
          <li>Windows 10 or 11 (64-bit)</li>
          <li>macOS 12 Monterey or later</li>
          <li>8 GB system memory recommended</li>
          <li>DirectX 12–compatible GPU (Windows)</li>
        </ul>
      </section>
    </GameShell>
  );
}
