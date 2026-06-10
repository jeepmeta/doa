import React from 'react';
import { Card } from './Card';

const predators = [
  { w: '8bXt...4fQ1', tx: '14.2k', drained: '$142K' },
  { w: 'J9mz...pL0z', tx: '11.1k', drained: '$89K' },
  { w: '2cQ1...mX9T', tx: '8.4k', drained: '$61K' },
];

export const TopPredators: React.FC = () => (
  <Card border="border-[#ff2a2a]/30" className="bg-[#0a0202]">
    <div className="text-[#ff2a2a] text-xs font-bold mb-3 uppercase flex items-center gap-2">TOP PREDATORS <span className="text-[10px] bg-[#ff2a2a]/20 px-1.5 py-0.5 rounded">MEV</span></div>
    <div className="space-y-2 text-xs font-mono text-gray-400">
      {predators.map((p,i) => <div key={i} className="flex justify-between border-b border-gray-900 pb-1"><span className="text-[#ff2a2a]" >{p.w}</span><span>{p.tx} txs • {p.drained}</span></div>)}
    </div>
  </Card>
);