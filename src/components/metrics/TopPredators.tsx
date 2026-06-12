'use client';

export default function TopPredators() {
  return (
    <div className="bg-[#0a0202] border border-doa-red/30 p-4 rounded">
      <div className="flex justify-between items-center mb-3 border-b border-doa-red/20 pb-2">
        <span className="text-xs font-bold text-doa-red tracking-wider">TOP PREDATORS (MEV / SNIPERS)</span>
        <span className="text-[9px] px-2 py-px bg-doa-red/10 text-doa-red rounded">24H</span>
      </div>

      <div className="text-[10px] space-y-2 font-mono">
        <div className="flex justify-between text-gray-300">
          <span className="text-doa-red">8bXt...4fQ1</span>
          <span>14.2k tx</span>
          <span className="font-bold">$142.5k</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span className="text-doa-orange">J9mz...pL0z</span>
          <span>11.1k tx</span>
          <span className="font-bold">$89.2k</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span className="text-doa-orange">2cQ1...mX9T</span>
          <span>8.4k tx</span>
          <span className="font-bold">$61.0k</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span className="text-gray-400">Vv8p...1bNx</span>
          <span>5.1k tx</span>
          <span className="font-bold">$34.1k</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span className="text-gray-400">F4aK...7yUi</span>
          <span>4.9k tx</span>
          <span className="font-bold">$28.9k</span>
        </div>
      </div>

      <div className="text-[9px] text-center text-gray-500 mt-3 pt-3 border-t border-gray-900">
        Bots account for ~97% of volume. Retail is the exit.
      </div>
    </div>
  );
}