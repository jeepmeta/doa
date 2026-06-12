import { MemeCoinRecord } from "../types/MemeCoinRecord";

type DexscreenerPair = {
  pairAddress: string;
  chainId: string;
  pairCreatedAt?: number;
  liquidity?: { usd?: number };
  volume?: { h24?: number };
  fdv?: number;
  priceChange?: { h24?: number };
  baseToken: { address: string; name: string; symbol: string };
};

export function normalizeDexscreenerPairs(raw: { pairs?: DexscreenerPair[] }): MemeCoinRecord[] {
  const pairs = raw.pairs ?? [];

  return pairs
    .filter((p) => p.chainId === "solana")
    .map((p) => {
      const liquidityUsd = p.liquidity?.usd ?? 0;
      const volume24h = p.volume?.h24 ?? 0;
      const fdv = p.fdv ?? 0;
      const priceChange24h = p.priceChange?.h24 ?? 0;
      const createdAt = p.pairCreatedAt ?? Date.now();

      return {
        mint: p.baseToken.address,
        name: p.baseToken.name,
        symbol: p.baseToken.symbol,
        createdAt,
        liquidity: liquidityUsd,
        volume24h,
        marketCap: fdv,
        priceChange24h,
        status: "survived", // classifier will adjust later
        chain: "solana",
        source: "dexscreener",
      } as MemeCoinRecord;
    });
}
