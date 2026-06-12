import { MemeCoinRecord } from "../types/MemeCoinRecord";
import { normalizeDexscreenerPairs } from "../normalizers/normalizeDexscreener";

const DISCOVERY_URL = "/api/dexscreener/pairs-solana";
const TOKENS_URL = "/api/dexscreener/tokens"; // we'll pass mints as query

// DISCOVERY: all Solana pairs (we'll filter later in classifier)
export async function pullDexscreenerDiscovery(): Promise<MemeCoinRecord[]> {
  const res = await fetch(DISCOVERY_URL);
  if (!res.ok) return [];
  const raw = await res.json();
  return normalizeDexscreenerPairs(raw);
}

// UPDATES: token pairs by mint list
export async function pullDexscreenerUpdates(mints: string[]): Promise<MemeCoinRecord[]> {
  if (!mints.length) return [];

  const url = `${TOKENS_URL}?mints=${encodeURIComponent(mints.join(","))}`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const raw = await res.json();
  // assume backend returns { pairs: [...] } merged for all mints
  return normalizeDexscreenerPairs(raw);
}
