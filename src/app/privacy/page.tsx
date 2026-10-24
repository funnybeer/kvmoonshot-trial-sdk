import { GameShell } from '@/components/game/GameShell';

export default function PrivacyPage() {
  return (
    <GameShell>
      <article className="mx-auto max-w-[720px] px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold uppercase tracking-tight">Privacy</h1>
        <p className="mt-6 text-sm leading-relaxed text-kv-muted">
          KVMoonShot Labs processes account and support data needed to operate downloads, authentication, and
          service health checks. We do not sell personal data. Contact support@kvmoonshot.cc for data requests.
        </p>
      </article>
    </GameShell>
  );
}
