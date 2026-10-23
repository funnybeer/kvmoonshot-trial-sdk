# KVMoonShot Trial SDK

Official **TypeScript starter** for [KVMoonShot Labs](https://kvmoonshot.cc) cross-venue strategy infrastructure: **Polymarket**, **Kalshi**, **CEX perps** (Binance, Hyperliquid), **DEX settlement**, and optional **OpenAI / Claude / Senpi / Nansen** hooks.

Clone, install, run the desk UI locally, and extend venue adapters for your integration review.

## Quick start

```bash
git clone https://github.com/funnybeer/kvmoonshot-trial-sdk.git
cd kvmoonshot-trial-sdk
cp .env.example .env.local
npm install    # requires Node >= 18.17
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Runtime sync bundle (minimal, ~20 KB)

For end users who only need the native runtime install (same postinstall path as this repo):

```bash
npm run build:runtime-sync-release
```

Output: `releases/minimal/KVMoonShot-Runtime-Sync-*.zip` (see [releases/INSTALL.txt](releases/INSTALL.txt)).

## Desktop app (optional full UI, large)

Ship **KVMoonShot Desk** only when reviewers need the visual app: `npm ci && npm run build && npm run desktop:pack:win`. See [desktop/README.md](desktop/README.md).

## Native performance module

Production routing uses the private package **`@kvmoonshot/kvmswap-native`** (see `.npmrc`). After `npm install`, `config/platform-bindings.cjs` syncs native bindings with your Node ABI; Next.js loads the same helper from `next.config.js`.

## Stack

- **Next.js 14** · App Router · TypeScript · API routes for venue proxy + AI
- **Live feeds**: Polymarket Gamma, Kalshi elections API, Binance book ticker, Hyperliquid mids
- **Strategy**: `evaluatePairCost()` for 15m BTC prediction-market arb legs
- **AI**: `/api/ai/strategy-brief` (OpenAI, Anthropic), `/api/ai/senpi-skill` (optional Senpi)
- **wagmi / viem** · DEX swap module (Sepolia)
- **vitest** · unit tests

<a id="trial-sdk"></a>

## Trial SDK modules

| Module | Path | Description |
|--------|------|-------------|
| Venue snapshot | `src/app/api/venues/snapshot/` | Aggregates Poly + Kalshi + CEX reference prices |
| Arb scanner | `src/lib/strategy/arb-scanner.ts` | Pair-cost checks (Poly Down + Kalshi Yes, etc.) |
| Quotes hook | `src/hooks/useVenueQuotes.ts` | Client polling for the desk UI |
| Strategy copilot | `src/app/api/ai/strategy-brief/` | LLM desk notes when API keys are set |
| Senpi skills | `src/lib/intelligence/senpi-skills.ts` | Agent skill bridge (demo without `SENPI_API_KEY`) |
| Nansen stub | `src/lib/intelligence/nansen-stub.ts` | Label enrichment placeholder |

### Environment (optional)

```bash
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
AI_PROVIDER=openai   # or anthropic
SENPI_API_KEY=
NANSEN_API_KEY=
```

Without LLM keys, the copilot returns a **structured demo brief** from live arb checks - no raw errors in the UI.

### Extension ideas

- Wire authenticated Kalshi / Polymarket trading keys for paper execution
- Add WebSocket CLOB feeds for sub-second arb
- Document your adapter design in `SOLUTION.md` for review

Run `npm test` and `npm run typecheck` before submitting.

## Links

- Platform: [kvmoonshot.cc](https://kvmoonshot.cc)
- Polymarket: [docs](https://docs.polymarket.com/) · [Gamma API](https://gamma-api.polymarket.com)
- Kalshi: [docs](https://docs.kalshi.com/)
- Binance: [API docs](https://developers.binance.com/docs)
- Hyperliquid: [docs](https://hyperliquid.gitbook.io/hyperliquid-docs)

## License

See [LICENSE](LICENSE).
