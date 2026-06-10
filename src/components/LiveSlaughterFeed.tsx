import React, { useState, useEffect } from 'react';
import { Card } from './Card';

export const LiveSlaughterFeed: React.FC = () => {
  const [feed, setFeed] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const add = () => {
      if (paused) return;
      const names = ['PEPE','DOGE','WIF','MOON','CHAD','BASED'];
      const tk = `$${names[Math.floor(Math.random()*names.length)]}${(Math.random()>.5?'AI':'2.0')}`;
      const msgs = [`INIT ${tk} launched`, `RUG ${tk} dev dumped`, `DEAD ${tk} liq pulled`, `MEV extracted from ${tk}`];
      const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
      setFeed(f => [`[${time}] ${msgs[Math.floor(Math.random()*msgs.length)]}`, ...f].slice(0,10));
    };
    const id = setInterval(add, 1300);
    for(let i=0; i<5; i++) setTimeout(add, i*80);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <Card onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="text-xs font-bold mb-3 flex justify-between uppercase text-gray-400">
        LIVE SLAUGHTER FEED <span className={`text-[#ff2a2a] ${paused ? 'opacity-40' : 'animate-pulse'}`}>REC</span>
      </div>
      <div className="text-xs text-gray-400 font-mono space-y-1 max-h-48 overflow-hidden">
        {feed.map((l,i) => <div key={i} className="border-b border-gray-900 pb-0.5">{l}</div>)}
      </div>
    </Card>
  );
};