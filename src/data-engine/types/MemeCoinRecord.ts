export type MemeCoinRecord = {
  mint: string;
  name: string;
  symbol: string;
  createdAt: number;
  liquidity: number;
  volume24h: number;
  marketCap: number;
  priceChange24h: number;
  status: "rugged" | "dumped" | "survived";
  chain: "solana";
  source: "dexscreener";
};
