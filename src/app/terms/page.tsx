import { GameShell } from '@/components/game/GameShell';

export default function TermsPage() {
  return (
    <GameShell>
      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Terms</h1>
        <p className="mt-6 text-sm leading-relaxed text-kv-muted">
          KV Moonshot marketing materials, artwork, and fiction are provided for promotional use. Gameplay features,
          operators, and weapons may change. By downloading the client bundle you agree to applicable software license
          terms shipped with the installer.
        </p>
      </article>
    </GameShell>
  );
}
