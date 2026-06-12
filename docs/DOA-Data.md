# DOA Data Engine
### The Unified Meme‑Coin Telemetry System
### (Supabase-Centric Architecture Spec)

The DOA Data Engine is the subsystem responsible for ingesting, normalizing, buffering, and distributing real‑time meme‑coin data across the DOA Dashboard. 

By migrating heavy orchestration to the backend and using Supabase as the state and distribution layer, this architecture eliminates client-side memory bloat and protects API keys.

---

## 1. Design Principles

- **Free-tier friendly:** Minimizes outbound API requests via centralized polling and caching.
- **WebSocket + polling hybrid:** Uses high-velocity streams where available, backed by periodic REST updates.
- **Server-side security:** All external API keys remain strictly on the backend.
- **Normalized single source of truth:** Diverse data pipelines converge into a uniform schema.
- **Real-time distribution:** Leverages Supabase Realtime to push updates instantly to React without heavy client-side polling.
- **Lean frontend:** Eliminates custom frontend event buses, schedulers, and heavy in-memory caches.

---

## 2. Goals

- Ingest data exclusively from **Dexscreener** and **Helius**.
- Normalize all incoming data into a single `MemeCoinRecord` format.
- Maintain a rolling 24‑hour view of market activity.
- Detect launches, rugs, dumps, and survivors in real time.
- Power the following UI components:
  - Metrics Grid
  - Top Predators
  - Kill Feed
  - Lifespan Banner
  - Chain-of-Pain
  - Rug-O-Meter
- Restrict data exposure to the frontend via secure Supabase read-only hooks.

---

## 3. High‑Level Architecture

```text
  [ External Data Sources ]
     │                 │
     ▼ (REST Polling)  ▼ (Webhooks / WS)
┌────────────────────────────────────────┐
│        Supabase Edge Functions         │
│  ├── dexscreener-pull                  │
│  └── helius-listener                   │
└────────────────────────────────────────┘
     │
     ▼ (Normalize & Classify)
┌────────────────────────────────────────┐
│           Supabase Database            │
│  ├── meme_coins                        │
│  ├── kill_events                       │
│  └── hourly_snapshots                  │
└────────────────────────────────────────┘
     │
     ▼ (Supabase Realtime Stream)
┌────────────────────────────────────────┐
│         React Frontend (Vite)          │
│  └── Custom Hooks (useMemeCoins)       │
└────────────────────────────────────────┘
```

> **Key Operational Concept:** Supabase handles data persistence and real-time distribution. The frontend remains entirely stateless, reactive, and lightweight.

---

## 4. Folder Structure

```tree
/src
  /lib
    /doa
      /types
        MemeCoinRecord.ts
        KillEvent.ts
      /supabase
        client.ts
        realtime.ts
      /connections
        dexscreener.ts
        helius.ts
      /normalizers  
        normalizeDexscreener.ts
        normalizeHelius.ts
      classifier.ts

/supabase
  /functions
    /dexscreener
    /helius
  /migrations
    schema.sql
```

---

## 5. The DOA MemeCoinRecord Format

All data pipelines must normalize their output into this single schema before writing to the database:

```ts
export type MemeCoinRecord = {
  mint: string;
  name: string;
  symbol: string;
  createdAt: number;        // Unix timestamp
  price: number;            // Current token price
  liquidity: number;        // USD value in pools
  volume24h: number;        // 24h rolling volume
  marketCap: number;        // USD market capitalization
  status: 'launched' | 'rugged' | 'dumped' | 'survived';
  source: 'dexscreener' | 'helius';
  updatedAt: number;        // Unix timestamp of last mutation
};
```

---

## 6. Connection Modules

### 6.1 Dexscreener
- **Purpose:** Tracks liquidity, volume, market cap, and trending pairs.
- **Method:** REST polling executed by a centralized Supabase Cron/Edge Function (every 15–30s).
- **Role:** Primary engine for baseline pricing and financial metric state.

### 6.2 Helius
- **Purpose:** Instantly catches real-time account mutations, program logs, mint events, and rug signals.
- **Method:** Webhook endpoints and WebSocket connections managed via a dedicated Edge Function bridge.
- **Role:** Primary engine for immediate event telemetry and state classification.

---

## 7. Data Flow & Lifecycles

```text
Dexscreener (REST Polling) ──┐
                             ├──→ Edge Function → Normalize & Classify → Supabase DB → Realtime Channel → React UI
Helius (WS / Webhooks) ──────┘
```

1. **Ingestion:** Edge Functions handle cron-based polling (Dexscreener) or listen to open hooks (Helius).
2. **Normalization:** Raw payloads pass through `normalizer.ts` and `classifier.ts` on the server layer.
3. **Storage:** The record is upserted into the PostgreSQL database. Row Level Security (RLS) ensures public clients have **read-only** access.
4. **Broadcast:** The database mutation triggers a Supabase Realtime event.
5. **Render:** React components subscribed to the matching channel update instantly with zero local computation lag.

---

## 8. Scope (Phase 1)

### In-Scope
* Centralized Dexscreener polling and automated ingestion.
* Helius webhook processing and real-time log parsing.
* Supabase schema definitions, indices, and Realtime setups.
* Basic deterministic status classification (e.g., liquidity drops $> 90\%$ trigger a `'rugged'` state instantly).

### Out-of-Scope
* Integrating secondary APIs (Pump.fun, Jupiter, Solscan).
* Designing complex frontend in-memory state buffers.
* Building predictive, ML-based rug scoring models.

---

## 9. Summary

This architecture exchanges a fragile, rate-limited client infrastructure for a secure, highly scalable serverless backend. By utilizing **Supabase Edge Functions** as the ingestion gatekeeper and **Supabase Realtime** as the pipeline, the system safely encapsulates API credentials, maintains deterministic token classification, and serves a blazing fast telemetry UI to the browser.