export const BRAND = 'KV Moonshot';

export const NAV = [
  { label: 'Overview', href: '/' },
  { label: 'Operators', href: '/operators/' },
  { label: 'Arsenal', href: '/arsenal/' },
  { label: 'Missions', href: '/missions/' },
  { label: 'Media', href: '/media/' },
  { label: 'Download', href: '/download/' },
] as const;

export const HUD_NAV = [
  { label: 'Operators', href: '/operators/' },
  { label: 'Loadout', href: '/arsenal/' },
  { label: 'Missions', href: '/missions/' },
] as const;

/** Hero + site-wide advertising copy */
export const MARKETING = {
  hero: {
    eyebrow: 'Next-gen lunar FPS',
    title: 'The next frontier is yours.',
    lead: 'Cinema-grade lighting, sharp 3D detail, and mission-scale combat built to feel like a premium sci-fi shooter.',
    ctaPrimary: 'Download game',
    ctaSecondary: 'Watch trailer',
  },
  divider: 'Built for players who expect AAA polish',
  discover: {
    eyebrow: 'Discover the world',
    title: 'A world beyond limits.',
    body: 'From vacuum-lit craters to orbital hangars, every frame is authored for modern hardware.',
  },
  pillars: [
    {
      title: 'Cinema-grade visuals',
      body: 'Filmic color, volumetric depth, and high-fidelity lunar surfaces that hold up in 4K.',
    },
    {
      title: 'Best-in-class 3D combat',
      body: 'Responsive movement, readable silhouettes, and weapons tuned for skillful play at any range.',
    },
    {
      title: 'Mission-scale worlds',
      body: 'Large operational theaters with clear objectives, designed for replayability.',
    },
  ],
  media: {
    eyebrow: 'Media',
    title: 'Into the unknown.',
    body: 'Official KV Moonshot key art and cinematic stills. Preview the tone before you deploy. Concept visuals, not captured gameplay.',
  },
  download: {
    eyebrow: 'Download KV Moonshot',
    title: 'Prepare for liftoff.',
    lead: 'Install the Windows client and step into a premium lunar operations experience. macOS build coming soon.',
  },
  operatorsIntro: 'Hand-picked specialists. Distinct roles. One squad pushing the Moon forward.',
  arsenalIntro: 'Curated weapons with readable handling, tuned for crisp 3D gunplay in low gravity.',
  missionsIntro: 'High-stakes objectives across the lunar theater. Select your drop zone and deploy.',
} as const;

/** href/fileName must match sync-marketing-game-assets.js (fileName is not shown on the public site). */
export const DOWNLOAD = {
  windows: {
    fileName: 'KVMoonShot-Setup-0.7.2-win-x64.exe',
    href: '/downloads/KVMoonShot-Setup-0.7.2-win-x64.exe',
    label: 'Full game client',
    platform: 'Windows PC',
  },
  mac: {
    fileName: '',
    href: '',
    label: 'Coming soon',
    platform: 'macOS',
    comingSoon: true,
  },
  steps: [
    { n: '01', title: 'Download for Windows', body: 'Get the official PC installer from kvmoonshot.cc/download.' },
    { n: '02', title: 'Install KV Moonshot', body: 'Follow the on-screen setup, same flow as any premium PC title.' },
    { n: '03', title: 'Begin your mission', body: 'Pick an operator, build your loadout, and deploy.' },
  ],
} as const;

export const OPERATORS = [
  {
    id: 'nova',
    name: 'Nova',
    role: 'Recon',
    tagline: 'Precision. Awareness. Control.',
    image: '/game/operators/nova.png',
    stats: [
      { label: 'Mobility', value: 74 },
      { label: 'Detection', value: 92 },
      { label: 'Control', value: 86 },
    ],
  },
  {
    id: 'atlas',
    name: 'Atlas',
    role: 'Assault',
    tagline: 'Stand firm. Lead the advance.',
    image: '/game/operators/atlas.png',
    stats: [
      { label: 'Mobility', value: 62 },
      { label: 'Detection', value: 58 },
      { label: 'Control', value: 78 },
    ],
  },
  {
    id: 'vega',
    name: 'Vega',
    role: 'Specialist',
    tagline: 'Read the field. Shape the mission.',
    image: '/game/operators/vega.png',
    stats: [
      { label: 'Mobility', value: 81 },
      { label: 'Detection', value: 70 },
      { label: 'Control', value: 88 },
    ],
  },
  {
    id: 'orion',
    name: 'Orion',
    role: 'Pathfinder',
    tagline: 'Find the route. Push beyond.',
    image: '/game/operators/orion.png',
    stats: [
      { label: 'Mobility', value: 90 },
      { label: 'Detection', value: 76 },
      { label: 'Control', value: 72 },
    ],
  },
] as const;

export const WEAPONS = [
  {
    id: 'arc-7',
    name: 'ARC-7',
    class: 'Primary',
    description: 'Lunar pulse carbine',
    image: '/game/weapons/arc-7.png',
    stats: { control: 72, range: 58, handling: 81 },
  },
  {
    id: 'vector-9',
    name: 'VECTOR-9',
    class: 'Primary',
    description: 'Long-range precision weapon',
    image: '/game/weapons/vector-9.png',
    stats: { control: 64, range: 92, handling: 55 },
  },
  {
    id: 'helix',
    name: 'Helix',
    class: 'Secondary',
    description: 'Compact sidearm',
    image: '/game/weapons/helix.png',
    stats: { control: 88, range: 41, handling: 90 },
  },
] as const;

export const MISSIONS = [
  {
    id: 'crater-base',
    title: 'Crater Base',
    subtitle: 'Establish the first foothold in hostile lunar terrain.',
    image: '/game/scenes/lunar-hero.png',
  },
  {
    id: 'darkside-relay',
    title: 'Darkside Relay',
    subtitle: 'Cross the terminator and secure comms beyond the horizon.',
    image: '/game/scenes/lunar-action.png',
  },
  {
    id: 'orbital-dock',
    title: 'Orbital Dock',
    subtitle: 'Stage equipment for the next push, from hangar to hard vacuum.',
    image: '/game/backgrounds/hangar.png',
  },
] as const;

export const WORLD_CARDS = [
  {
    title: 'The lunar frontier',
    blurb: 'Sweeping vistas and tactical depth. Every ridge tells a story.',
    href: '/missions/',
    image: '/game/scenes/lunar-hero.png',
  },
  {
    title: 'Into the unknown',
    blurb: 'Cinematic key art that sets the tone for KV Moonshot.',
    href: '/media/',
    image: '/game/scenes/lunar-action.png',
  },
] as const;
