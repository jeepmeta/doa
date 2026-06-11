import { useState, useEffect } from 'react';
import { Skull } from 'lucide-react';

import { Card } from './components/Card';
import { BuyButton } from './components/BuyButton';
import { CaptureButton } from './components/CaptureButton';
import { PieChart } from './components/PieChart';
import { CandleChart } from './components/CandleChart';
import { TopPredators } from './components/TopPredators';
import { LiveSlaughterFeed } from './components/LiveSlaughterFeed';
import { SocialIcon } from './components/SocialIcon';

interface Totals { allTime: number; instaDead: number; gradRugged: number; survived: number; }

export default function App() {
  const [logo, setLogo] = useState('D.O.A.');
  const [totals, setTotals] = useState<Totals>({ allTime: 7543921, instaDead: 7438304, gradRugged: 94212, survived: 11405 });
  const [real, setReal] = useState<any>(null);
  const [addr, setAddr] = useState('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263');

  useEffect(() => {
    const id = setInterval(() => setLogo(p => p === 'D.O.A.' ? 'DEAD ON ARRIVAL' : 'D.O.A.'), 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTotals(t => {
        const n = Math.floor(Math.random()*2)+1;
        let d = t.instaDead, g = t.gradRugged, s = t.survived;
        if (Math.random() < 0.986) d += n; else if (Math.random() < 0.75) g += n; else s += n;
        return { allTime: t.allTime + n, instaDead: d, gradRugged: g, survived: s };
      });
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const fetchReal = async (a: string) => {
    try {
      const r = await fetch(`https://api.dexscreener.com/tokens/v1/solana/${a}`);
      const d = await r.json();
      if (d?.length) setReal(d[0]);
    } catch {}
  };
  useEffect(() => { fetchReal(addr); const id = setInterval(() => fetchReal(addr), 45000); return () => clearInterval(id); }, [addr]);

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div className="min-h-screen text-[#f0f0f0] font-mono bg-[#050505]">
      <div className="crt-overlay" />

      <nav className="sticky top-0 z-40 border-b border-[#ff2a2a]/30 bg-[#0a0a0a]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#ff2a2a] rounded-full flex items-center justify-center animate-pulse"><Skull className="w-4 h-4 text-[#0a0a0a]" /></div>
            <span className="font-bold text-2xl tracking-[3px] glitch">{logo}</span>
          </div>
          <div className="flex gap-2 text-xs">
            <CaptureButton />
            <BuyButton />
          </div>
        </div>
      </nav>

      <div id="snapshot-area" className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-[#ff2a2a] text-[#0a0a0a] text-[10px] font-bold py-1.5 mb-8 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            DEAD ON ARRIVAL. THE PUMP.FUN SLAUGHTERHOUSE. VISUALIZING THE ABSOLUTE REALITY OF THE PUMP.FUN TRENCHES. THE DATA IS PUBLIC. THE RIGGING IS OBVIOUS. $DOA IS THE INDEX OF FAILURE.&nbsp;&nbsp;&nbsp;&nbsp;
            DEAD ON ARRIVAL. THE PUMP.FUN SLAUGHTERHOUSE. VISUALIZING THE ABSOLUTE REALITY OF THE PUMP.FUN TRENCHES. THE DATA IS PUBLIC. THE RIGGING IS OBVIOUS. $DOA IS THE INDEX OF FAILURE.
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-black tracking-tighter">THE <span className="text-[#ff2a2a] neon-text-red">SLAUGHTERHOUSE</span></h1>
          <p className="text-gray-500 text-sm mt-1">pump.fun reality index • data public • rigging obvious</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Card><div className="text-[10px] text-gray-500">TOTAL LAUNCHED</div><div className="text-3xl font-bold mt-1">{fmt(totals.allTime)}</div></Card>
          <Card border="border-[#ff2a2a]/60" className="neon-border-red"><div className="text-[10px] text-[#ff2a2a]">INSTANTLY RUGGED</div><div className="text-3xl font-bold mt-1 text-[#ff2a2a]">{fmt(totals.instaDead)}</div></Card>
          <Card><div className="text-[10px] text-gray-500">GRADUATED & DUMPED</div><div className="text-3xl font-bold mt-1 text-[#ff8c00]">{fmt(totals.gradRugged)}</div></Card>
          <Card><div className="text-[10px] text-gray-500">RETAIL SURVIVORS</div><div className="text-3xl font-bold mt-1 text-[#00ff41] neon-text-green">{fmt(totals.survived)}</div></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <PieChart />
          <CandleChart />
        </div>

        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="font-bold text-[#00ff41] flex items-center gap-2">LIVE FROM DEXSCREENER (FREE)</div>
            <input value={addr} onChange={e=>setAddr(e.target.value)} className="bg-black border border-gray-700 text-xs px-2 py-1 w-80 font-mono rounded" placeholder="Solana token address" />
          </div>
          {real ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-gray-500">Pair:</span> {real.baseToken?.symbol}/{real.quoteToken?.symbol}</div>
              <div><span className="text-gray-500">Price:</span> ${parseFloat(real.priceUsd||0).toFixed(8)}</div>
              <div><span className="text-gray-500">Liquidity:</span> ${fmt(Math.floor(real.liquidity?.usd||0))}</div>
              <div><span className="text-gray-500">24h Volume:</span> ${fmt(Math.floor(real.volume?.h24||0))}</div>
            </div>
          ) : <div className="text-gray-600 text-sm">Loading real pair data...</div>}
          <div className="text-[10px] text-gray-600 mt-3">Auto-refreshes • 60 req/min limit • No key needed</div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TopPredators />
          <LiveSlaughterFeed />
        </div>

        <div className="text-center text-[10px] text-gray-700 mt-10 tracking-widest flex items-center justify-center gap-3">
          $DOA • EXPOSING THE TRENCHES • DOATOKEN.COM <SocialIcon />
        </div>
      </div>

      <style>{`
        .glitch { animation: flicker 2.8s infinite linear; }
        @keyframes flicker { 0%,19%,22%,62%,64%,70%,100% {opacity:1} 20%,21%,63%,65%,69% {opacity:0.35} }
        .animate-marquee { animation: marquee 32s linear infinite; }
        @keyframes marquee { from {transform:translateX(0)} to {transform:translateX(-50%)} }
        .neon-text-red { text-shadow: 0 0 5px #ff2a2a, 0 0 10px #ff2a2a, 0 0 20px #8b0000; }
        .neon-text-green { text-shadow: 0 0 5px #00ff41, 0 0 10px #00ff41; }
        .neon-border-red { box-shadow: 0 0 10px rgba(255,42,42,.5), inset 0 0 10px rgba(255,42,42,.2); border:1px solid #ff2a2a; }
      `}</style>
    </div>
  );
}
