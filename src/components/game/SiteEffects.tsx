'use client';

import { useEffect } from 'react';

/** Subtle cursor spotlight + parallax for a premium game-site feel */
export function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        const px = (e.clientX / window.innerWidth - 0.5) * 2;
        const py = (e.clientY / window.innerHeight - 0.5) * 2;
        root.style.setProperty('--kv-pointer-x', `${x}%`);
        root.style.setProperty('--kv-pointer-y', `${y}%`);
        root.style.setProperty('--kv-tilt-x', `${(-py * 2.5).toFixed(2)}deg`);
        root.style.setProperty('--kv-tilt-y', `${(px * 3).toFixed(2)}deg`);
        root.style.setProperty('--kv-parallax-x', `${(px * 12).toFixed(1)}px`);
        root.style.setProperty('--kv-parallax-y', `${(py * 8).toFixed(1)}px`);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-soft-light"
      style={{
        background:
          'radial-gradient(520px circle at var(--kv-pointer-x, 50%) var(--kv-pointer-y, 40%), rgba(241,184,75,0.07), transparent 58%)',
      }}
    />
  );
}
