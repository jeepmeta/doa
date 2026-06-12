'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LiveSlaughterFeed() {
  const [feed, setFeed] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);

  const tokens = ['PEPE', 'DOGE', 'WIF', 'ELON', 'MOON', 'BASED', 'CHAD', 'TRUMP', 'AI', 'MEME'];
  const suffixes = ['AI', 'INU', '2.0', 'CEO', 'X', 'HAT', 'CUM', 'RUG'];

  const addFeedItem = () => {
    if (paused) return;

    const tk = '$' + tokens[Math.floor(Math.random() * tokens.length)] + suffixes[Math.floor(Math.random() * suffixes.length)];
    const events = [
      `INIT ${tk} launched — bots sniped 28%`,
      `RUG ${tk} dev dumped entire supply`,
      `DEAD ${tk} liquidity drained`,
      `MEV Bot extracted 0.6 SOL from ${tk}`,
      `GRAD ${tk} — top 8 wallets hold 91%`
    ];
    const ev = events[Math.floor(Math.random() * events.length)];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newItem = `[${time}] ${ev}`;
    setFeed(prev => [newItem, ...prev].slice(0, 10));
  };

  useEffect(() => {
    const interval = setInterval(addFeedItem, 950);
    // Seed initial items
    for (let i = 0; i < 6; i++) {
      setTimeout(addFeedItem, i * 80);
    }
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div 
      className="bg-black border border-gray-800 p-3 rounded flex flex-col h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-xs text-gray-400 tracking-wider font-mono">LIVE SLAUGHTER FEED</span>
        <span className={`text-doa-red text-[10px] ${paused ? 'opacity-30' : 'animate-pulse'}`}>● REC</span>
      </div>

      <div className="flex-1 overflow-hidden text-[9px] text-gray-400 font-mono space-y-px">
        <AnimatePresence initial={false}>
          {feed.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 px-1 py-0.5 hover:bg-zinc-950 border-b border-gray-900"
            >
              <span>{item}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}