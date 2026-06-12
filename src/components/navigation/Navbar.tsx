'use client';

import { BuyButton } from './BuyButton';
import { CaptureButton } from './CaptureButton';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-doa-red/30 bg-doa-black/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-doa-red rounded-full flex items-center justify-center animate-pulse-fast shadow-[0_0_15px_#ff2a2a]">
              <span className="text-doa-black font-bold text-[10px]">☠︎</span>
            </div>
            <span className="font-bold text-xl tracking-[3px] text-doa-white animate-flicker">D.O.A.</span>
          </div>

          <div className="flex items-center gap-3">
            <CaptureButton />
            <BuyButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

