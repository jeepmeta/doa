import React, { useMemo, useState, useRef, useEffect } from "react";
import { useLast24Hours } from "../../hooks/useLast24Hours";

const VISIBLE = 10;
const BAR_WIDTH = 28;
const BAR_GAP = 10;
const MAX_HEIGHT = 110; // 🔥 shorter candles

export default function ChainOfPain() {
  const timestamps = useLast24Hours();

  const [offset, setOffset] = useState(0);
  const [hover, setHover] = useState<any>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Generate meme‑coin distribution (90–95% red)
  const candles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const rugged = 0.9 + Math.random() * 0.05;
      const dumped = 0.03 + Math.random() * 0.04;
      const survived = 1 - rugged - dumped;

      return { id: `c-${i}`, rugged, dumped, survived };
    });
  }, []);

  // Grow the current hour candle in real time
  const [currentGrowth, setCurrentGrowth] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentGrowth(now.getMinutes() / 60);
    };

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const delta = touchEndX.current - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? shiftRight() : shiftLeft();
  };

  const shiftLeft = () => setOffset((o) => Math.max(0, o - 1));
  const shiftRight = () => setOffset((o) => Math.min(24 - VISIBLE, o + 1));

  return (
    <div
      className="relative w-full h-full bg-[var(--color-bg-panel)] border border-brand-grey p-4 rounded overflow-hidden neon-border-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Title */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
        <span className="text-brand-red text-lg">▼</span>
        <h2 className="font-black tracking-[0.25em] text-brand-white text-lg uppercase neon-text-red">
          Chain‑of‑Pain
        </h2>
      </div>


      {/* Tooltip */}
      {hover && (
        <div
          className="absolute z-30 px-3 py-2 rounded-md bg-[var(--color-grey-dark)] text-brand-white border-brand-grey"
          style={{
            left: hover.x,
            top: hover.y - 40,
            transform: "translateX(-50%)",
            fontFamily: "JetBrains Mono",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          <div className="font-bold uppercase tracking-wider mb-1">
            {hover.time}
          </div>
          <div className="text-brand-red">
            Rugged: {(hover.rugged * 100).toFixed(1)}%
          </div>
          <div className="text-brand-yellow">
            Dumped: {(hover.dumped * 100).toFixed(1)}%
          </div>
          <div className="text-brand-green">
            Survived: {(hover.survived * 100).toFixed(1)}%
          </div>
        </div>
      )}

      {/* Arrows */}
      <button
        onClick={shiftLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-brand-red neon-text-red text-2xl select-none"
      >
        ◀
      </button>

      <button
        onClick={shiftRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-brand-red neon-text-red text-2xl select-none"
      >
        ▶
      </button>


      {/* Candle Track */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden pb-8">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${offset * (BAR_WIDTH + BAR_GAP)}px)`,
          }}
        >
          {candles.map((c, i) => {
            const time = timestamps[i];

            const ruggedH = c.rugged * MAX_HEIGHT * (i === 0 ? currentGrowth : 1);
            const dumpedH = c.dumped * MAX_HEIGHT * (i === 0 ? currentGrowth : 1);
            const survivedH = c.survived * MAX_HEIGHT * (i === 0 ? currentGrowth : 1);

            return (
              <div
                key={c.id}
                className="flex flex-col items-center"
                style={{ width: BAR_WIDTH + BAR_GAP }}
              >
                {/* Candle */}
                <div
                  className="relative flex flex-col justify-end"
                  style={{
                    height: MAX_HEIGHT,
                    width: BAR_WIDTH,
                  }}
                >
                  {/* Rugged */}
                  <div
                    className="absolute bottom-0 left-0 w-full"
                    style={{
                      height: ruggedH,
                      background: "var(--color-red)",
                      filter: "drop-shadow(0 0 2px var(--color-red))",
                    }}
                    onMouseMove={(e) =>
                      setHover({
                        x: e.clientX,
                        y: e.clientY,
                        time,
                        rugged: c.rugged,
                        dumped: c.dumped,
                        survived: c.survived,
                      })
                    }
                    onMouseLeave={() => setHover(null)}
                  />

                  {/* Dumped */}
                  <div
                    className="absolute left-0 w-full"
                    style={{
                      bottom: ruggedH,
                      height: dumpedH,
                      background: "var(--color-yellow)",
                      filter: "drop-shadow(0 0 2px var(--color-yellow))",
                    }}
                  />

                  {/* Survived */}
                  <div
                    className="absolute left-0 w-full"
                    style={{
                      bottom: ruggedH + dumpedH,
                      height: survivedH,
                      background: "var(--color-green)",
                      filter: "drop-shadow(0 0 2px var(--color-green))",
                    }}
                  />
                </div>

                {/* Timestamp */}
                <div
                  className="mt-1 text-[9px] text-brand-grey"
                  style={{
                    fontFamily: "JetBrains Mono",
                    transform: "rotate(-45deg)",
                    transformOrigin: "top left",
                  }}
                >
                  {time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
