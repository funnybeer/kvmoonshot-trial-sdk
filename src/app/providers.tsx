'use client';

import { SiteEffects } from '@/components/game/SiteEffects';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteEffects />
      {children}
    </>
  );
}
