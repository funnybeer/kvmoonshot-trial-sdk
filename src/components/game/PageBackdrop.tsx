import Image from 'next/image';
import clsx from 'clsx';

type Props = {
  src: string;
  alt?: string;
  priority?: boolean;
  overlay?: 'hero' | 'hud' | 'dark';
  className?: string;
  children: React.ReactNode;
};

export function PageBackdrop({ src, alt = '', priority, overlay = 'hero', className, children }: Props) {
  return (
    <div className={clsx('kv-page relative min-h-[calc(100vh-4.25rem)] overflow-hidden bg-kv-bg', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="kv-scene object-cover object-center"
        sizes="100vw"
      />
      <div
        className={clsx(
          'pointer-events-none absolute inset-0',
          overlay === 'hero' && 'bg-gradient-to-r from-kv-bg/95 via-kv-bg/55 to-kv-bg/25',
          overlay === 'hud' && 'bg-gradient-to-r from-kv-bg/92 via-kv-bg/70 to-kv-bg/45',
          overlay === 'dark' && 'bg-kv-bg/75',
        )}
      />
      <div className="kv-page-foreground relative z-10">
        {children}
      </div>
    </div>
  );
}
