export type KillEvent = {
  mint: string;
  time: number;
  status: 'rugged' | 'dumped' | 'survived';
  reason?: string;
  chain: 'solana';
};

