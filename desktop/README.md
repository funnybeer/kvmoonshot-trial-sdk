# KVMoonShot Desk (desktop installer)

**Size warning:** Desk bundles Electron + Next.js + wallet deps (~330 MB+). For runtime sync only, use `npm run build:runtime-sync-release` → `releases/minimal/KVMoonShot-Runtime-Sync-*.zip` (~20 KB, Node 18+ required).

Windows `.exe` / macOS `.dmg` / Linux AppImage for non-developers who need the **full UI**: no Git clone on the end machine.

## What still runs on the server

**VPS stack monitoring is unchanged.** `kvmoonshot-stack-monitor.service` on the operator host keeps polling ops/sync/registry/R2 independently of desktop installs.

## Build (operator / CI machine)

Requires Node **≥ 18.17** and a **production Next build** plus dependencies (same as shipping the trial SDK):

```bash
cd kvmoonshot-trial-sdk
cp .env.example .env.local   # optional API keys for copilot
npm ci
npm run build
npm run desktop:pack:win     # or desktop:pack:mac / desktop:pack:linux
```

Installers land in `dist/desktop/`.

### Windows note

Build the Windows installer **on Windows** (or a CI Windows runner) so native optional deps match `win32-x64`.

## End-user flow

1. Run the installer → launch **KVMoonShot Desk**.
2. The app starts a local Next.js server on `127.0.0.1:3847` and opens the desk UI in a window.
3. External links open in the system browser.

## Dev smoke test (without installer)

```bash
npm run build
npm run desktop:dev
```
