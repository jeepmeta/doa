# DOA Data Engine  
### The Unified Meme‑Coin Telemetry System  
### (Backend + Frontend Architecture Spec)

The DOA Data Engine is the subsystem responsible for ingesting, normalizing, merging, buffering, and distributing real‑time meme‑coin data across the DOA Dashboard.

It is designed to be:

- **Free‑API friendly**
- **Websocket‑enhanced**
- **Modular**
- **Fault‑tolerant**
- **Normalized**
- **Fast**
- **Simple to extend**
- **Simple to debug**

This document defines the full architecture, folder structure, data flow, and external connections.

---

# 1. Goals

The DOA Data Engine must:

- Ingest data from **multiple free sources**
- Maximize **free API limits**
- Use **websockets** where available
- Normalize all data into a **single DOA format**
- Maintain a **rolling 24‑hour buffer**
- Provide **real‑time updates** to the UI
- Detect:
  - new launches  
  - rugs  
  - dumps  
  - survivors  
- Power:
  - Chain‑of‑Pain  
  - Rug‑O‑Meter  
  - Kill Feed  
  - Metrics Grid  
  - Top Predators  
  - Lifespan Banner  
- Keep **all API keys on the backend**
- Expose a clean `/api/doa/*` interface to the frontend

---

# 2. High‑Level Architecture

```md
+-------------------------+
|   External Data Sources |
+-------------------------+
     |   |   |   |   |
     v   v   v   v   v
+----------------------------------+
|   Connection Modules (frontend)  |
|   pumpfun.ts                     |
|   dexscreener.ts                 |
|   jupiter.ts                     |
|   solscan.ts                     |
|   helius.ts                      |
+----------------------------------+
     | normalized DOA records
     v
+----------------------------------+
|   DOA Data Provider (frontend)   |
|   - merges                       |
|   - dedupes                      |
|   - classifies                   |
|   - aggregates                   |
|   - buffers                      |
|   - emits events                 |
+----------------------------------+
     | event stream
     v
+----------------------------------+
|   UI Components                  |
|   - ChainOfPain                  |
|   - RugOMeter                    |
|   - KillFeed                     |
|   - MetricsGrid                  |
|   - TopPredators                 |
+----------------------------------+
```

Backend sits underneath all of this:

```tree
Frontend → /api/doa/* → Backend → External APIs
```

---

# 3. Folder Structure

```tree
/src
  /data-engine
    /connections
      pumpfun.ts
      dexscreener.ts
      jupiter.ts
      solscan.ts
      helius.ts

    /normalizers
      normalizePumpfun.ts
      normalizeDexscreener.ts
      normalizeJupiter.ts
      normalizeSolscan.ts
      normalizeHelius.ts

    /core
      DOADataProvider.ts
      DOADataBuffer.ts
      DOAEventBus.ts
      DOAScheduler.ts
      DOAClassifier.ts

    /types
      MemeCoinRecord.ts
      KillEvent.ts
      HourBucket.ts

/backend
  /api
    doa-proxy.ts
    pumpfun-proxy.ts
    dexscreener-proxy.ts
    jupiter-proxy.ts
    solscan-proxy.ts
    helius-proxy.ts

/docs
  DOADATA.md
```

---

# 4. The DOA MemeCoinRecord Format

All sources normalize into this shape:

```ts
export type MemeCoinRecord = {
  mint: string;
  name: string;
  symbol: string;
  createdAt: number;      // unix timestamp
  liquidity: number;
  volume24h: number;
  marketCap: number;
  status: "rugged" | "dumped" | "survived";
  chain: "solana";
  source: "pumpfun" | "dexscreener" | "jupiter" | "solscan" | "helius";
};
```

This is the **Rosetta Stone** of the DOA Data Engine.

---

# 5. Connection Modules

Each connection module:

- maximizes free API usage  
- handles rate limits  
- handles retries  
- handles pagination  
- normalizes data  
- exposes:

```ts
pull(): Promise<MemeCoinRecord[]>
subscribe(callback): unsubscribe
```

### 5.1 Pump.fun  
**Purpose:** new launches, bonding curve state  
**Source:** unofficial API + HTML scrape  
**Type:** polling (10s)

### 5.2 Dexscreener  
**Purpose:** liquidity, volume, trending  
**Source:** free REST API  
**Type:** polling (15s)

### 5.3 Jupiter  
**Purpose:** price quotes, token list  
**Source:** REST  
**Type:** polling (30s)

### 5.4 Solscan  
**Purpose:** metadata, holders  
**Source:** REST  
**Type:** polling (60s)

### 5.5 Helius  
**Purpose:** logs, account changes, rugs  
**Source:** webhooks + RPC  
**Type:** websocket + polling

---

# 6. DOA Data Buffer

The buffer stores:

```ts
tokens: Map<string, MemeCoinRecord>
hourlyBuckets: HourBucket[] // 24 items
killFeed: KillEvent[]
lastUpdated: number
```

This is the **memory** of the system.

---

# 7. DOA Event Bus

A simple pub/sub system:

```ts
subscribe(callback)
unsubscribe(callback)
emit(event)
```

UI components listen to this.

---

# 8. DOA Scheduler

A tiny heartbeat:

- pumpfun: every 10s  
- dexscreener: every 15s  
- jupiter: every 30s  
- solscan: every 60s  
- helius: websocket  
- aggregates: every 60s  
- hour rollover: at :00  

This keeps everything in sync.

---

# 9. DOA Classifier

Classifies tokens into:

- rugged  
- dumped  
- survived  

Based on:

- liquidity drop  
- volume collapse  
- price delta  
- bonding curve exit  
- helius logs  

---

# 10. Backend Proxy

All keys live in backend.

Frontend calls:

```
/api/doa/pumpfun
/api/doa/dexscreener
/api/doa/jupiter
/api/doa/solscan
/api/doa/helius
```

Backend:

- stores keys  
- rate limits  
- caches  
- normalizes  
- protects you  

---

# 11. Data Flow Summary

```tree
External APIs → Backend Proxy → Connection Modules → Normalizers → Buffer → Provider → Event Bus → UI
```

---

# 12. What This Enables

- Real‑time Chain‑of‑Pain growth  
- Real‑time Rug‑O‑Meter updates  
- Live kill feed  
- Hourly candle rollover  
- 24‑hour rolling window  
- Top predators  
- Lifespan metrics  
- Zero UI lag  
- Zero wasted API calls  
- Zero key exposure  

---

# 13. Future Extensions

- Multi‑chain support  
- Token‑gated premium data  
- Historical archive  
- Predictive rug scoring  
- DOA AI agent for token analysis  

---

# 14. Summary

The DOA Data Engine is:

- modular  
- scalable  
- free‑API optimized  
- websocket‑enhanced  
- normalized  
- buffered  
- event‑driven  
- backend‑secured  

This file defines the architecture.  
The next step is implementing the modules.

