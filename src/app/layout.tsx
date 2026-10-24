import type { Metadata } from 'next';
import { AppProviders } from '@/app/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'KV Moonshot | Cinema-Grade Lunar FPS',
  description:
    'KV Moonshot delivers cinema-grade 3D visuals, premium lunar combat, and mission-scale worlds. Download for Windows.',
  keywords: [
    'kv moonshot',
    'lunar fps',
    '3d game',
    'cinema graphics',
    'sci-fi shooter',
    'operators',
    'missions',
  ],
  metadataBase: new URL('https://kvmoonshot.cc'),
  openGraph: {
    title: 'KV Moonshot | Cinema-Grade Lunar FPS',
    description: 'Best-in-class 3D combat on the Moon. Cinema-grade visuals. Download and deploy.',
    url: 'https://kvmoonshot.cc',
    siteName: 'KV Moonshot',
    type: 'website',
    images: [{ url: '/game/scenes/lunar-hero.png', width: 1672, height: 941, alt: 'KV Moonshot lunar operations' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/game/scenes/lunar-hero.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-kv-bg text-kv-text antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
