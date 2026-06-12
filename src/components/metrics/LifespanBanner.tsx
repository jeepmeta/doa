'use client';

export default function LifespanBanner() {
  return (
    <div className="bg-gradient-to-r from-black via-[#120505] to-black border border-doa-red/20 py-4 mb-6 flex flex-col md:flex-row items-center justify-center gap-x-6 text-center md:text-left">
      <span className="text-gray-400 text-xs tracking-widest">AVERAGE TOKEN LIFESPAN BEFORE LIQUIDITY DRAIN</span>
      <span className="text-4xl font-black text-doa-red neon-text-red tabular-nums">
        17m <span className="text-xl text-gray-400 font-normal">42s</span>
      </span>
    </div>
  );
}