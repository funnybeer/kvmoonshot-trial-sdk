import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  download?: boolean;
};

export function ArrowCta({ href, children, variant = 'primary', className, download }: Props) {
  const base =
    'inline-flex min-h-[46px] items-center justify-center gap-2 px-6 text-[13px] font-bold uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5';
  const styles = {
    primary: 'bg-kv-amber text-[#101216] hover:shadow-kv-glow',
    secondary: 'border border-kv-text/90 bg-[#f5f2eb] text-[#101216]',
    ghost: 'border border-white/35 bg-black/25 text-kv-text backdrop-blur-sm hover:border-kv-amber',
  };

  const cn = clsx(base, styles[variant], className);

  if (download) {
    return (
      <a href={href} download className={cn}>
        {children}
        <span aria-hidden>→</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cn}>
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
