// components/MarqueeTicker.tsx
'use client';

export default function MarqueeTicker() {
  return (
    <div className="w-full bg-doa-red text-doa-black font-bold text-[10px] md:text-xs py-1.5 overflow-hidden relative mb-6 shadow-[0_0_20px_rgba(255,42,42,0.4)]">
      <div className="whitespace-nowrap animate-marquee inline-block px-4">
        ⚠️ WARNING: EXTREME PREDATORY BOT ACTIVITY ON PUMP.FUN ⚠️ &nbsp;&nbsp;&nbsp;
        💀 98.6% RETAIL CASUALTY RATE &nbsp;&nbsp;&nbsp;
        💀 BOTS EXTRACT 40%+ OF ALL SWAP VALUE &nbsp;&nbsp;&nbsp;
        💀 RETAIL IS EXIT LIQUIDITY &nbsp;&nbsp;&nbsp;
        💀 DEV WALLETS FARM &amp; DUMP &nbsp;&nbsp;&nbsp;
        ⚠️ PUMP.FUN IS A RIGGED CASINO. DO YOUR OWN RESEARCH.  ⚠️
      </div>
    </div>
  );
}