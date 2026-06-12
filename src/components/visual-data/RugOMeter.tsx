'use client';

import { useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

interface ApiData {
  rugged: number;
  dumped: number;
  survived: number;
}

interface RugOMeterProps {
  data: ApiData;
  chain: 'solana' | 'ethereum' | 'base' | string;
}

// --- Helper: Dynamic SVG Logo Switcher ---
const ChainLogo = ({ chain }: { chain: string }) => {
  const normalizedChain = chain.toLowerCase();
  
  if (normalizedChain === 'solana') {
    return (
      <svg width="14" height="14" viewBox="0 0 348 274" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60.67 56.63h286.97c3.9 0 5.86-4.7 3.1-7.46L304.38 2.82c-1.87-1.87-4.4-2.82-7.05-2.82H10.36c-3.9 0-5.86 4.7-3.1 7.46l46.36 46.35c1.87 1.87 4.4 2.82 7.05 2.82zM337.64 168.32H50.67c-3.9 0-5.86 4.7-3.1 7.46l46.36 46.35c1.87 1.87 4.4 2.82 7.05 2.82h286.97c3.9 0 5.86-4.7 3.1-7.46l-46.36-46.35c-1.87-1.87-4.4-2.82-7.05-2.82zM10.36 161.42h286.97c3.9 0 5.86-4.7 3.1-7.46l-46.36-46.35c-1.87-1.87-4.4-2.82-7.05-2.82H10.36c-3.9 0-5.86 4.7-3.1 7.46l46.36 46.35c1.87 1.87 4.4 2.82 7.05 2.82z" fill="currentColor"/>
      </svg>
    );
  }
  
  if (normalizedChain === 'ethereum') {
    return (
      <svg width="12" height="18" viewBox="0 0 256 417" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M127.961 0L125.166 9.5V285.114L127.961 287.906L255.923 212.32L127.961 0Z" fill="currentColor"/>
        <path d="M127.961 0L0 212.32L127.961 287.906V0Z" fill="currentColor"/>
        <path d="M127.961 312.186L126.386 314.106V416.483L127.961 417L256 236.586L127.961 312.186Z" fill="currentColor"/>
        <path d="M127.961 417V312.186L0 236.586L127.961 417Z" fill="currentColor"/>
      </svg>
    );
  }

  if (normalizedChain === 'base') {
    return (
      <svg width="16" height="16" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0ZM52.5 100C52.5 73.7665 73.7665 52.5 100 52.5C126.234 52.5 147.5 73.7665 147.5 100C147.5 126.234 126.234 147.5 100 147.5V100H52.5Z" fill="currentColor"/>
      </svg>
    );
  }

  // Fallback generic network node
  return <div className="w-3 h-3 border border-current rounded-sm"></div>;
};

// --- Math Helpers ---
const polarToCartesian = (radius: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: radius * Math.cos(angleInRadians),
    y: radius * Math.sin(angleInRadians),
  };
};

const describeDonutArc = (
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
) => {
  const outerStart = polarToCartesian(outerRadius, startAngle);
  const outerEnd = polarToCartesian(outerRadius, endAngle);
  const innerStart = polarToCartesian(innerRadius, startAngle);
  const innerEnd = polarToCartesian(innerRadius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', outerStart.x, outerStart.y,
    'A', outerRadius, outerRadius, 0, largeArcFlag, 1, outerEnd.x, outerEnd.y,
    'L', innerEnd.x, innerEnd.y,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 0, innerStart.x, innerStart.y,
    'Z',
  ].join(' ');
};

export default function RugOMeter({ data, chain = 'UNKNOWN' }: RugOMeterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });

  const total = data.rugged + data.dumped + data.survived;
  const deathRate = total > 0 ? ((data.rugged / total) * 100).toFixed(1) : '0.0';

  const slices = useMemo(() => {
    if (total === 0) return [];

    const MIN_VISUAL_ANGLE = 4;
    let currentAngle = 0;

    const rawSections = [
      { id: 'rugged', label: 'RUGGED', value: data.rugged, color: 'var(--color-red)' },
      { id: 'dumped', label: 'DUMPED', value: data.dumped, color: 'var(--color-yellow)' },
      { id: 'survived', label: 'SURVIVED', value: data.survived, color: 'var(--color-green)' },
    ].filter((s) => s.value > 0);

    const angledSections = rawSections.map(item => ({
      ...item,
      angle: (item.value / total) * 360
    }));

    let totalAngleUsed = 0;
    const adjustedSections = angledSections.map(item => {
      const adjustedAngle = Math.max(item.angle, MIN_VISUAL_ANGLE);
      totalAngleUsed += adjustedAngle;
      return { ...item, angle: adjustedAngle };
    });

    const overflow = totalAngleUsed - 360;
    if (overflow > 0) {
      const largestSection = adjustedSections.reduce((prev, curr) =>
        curr.angle > prev.angle ? curr : prev
      );
      largestSection.angle -= overflow;
    }

    return adjustedSections.map((item) => {
      const startAngle = currentAngle;
      const endAngle = currentAngle + item.angle;
      currentAngle = endAngle;

      const midAngle = startAngle + item.angle / 2;
      const isRightSide = midAngle < 180;

      const innerRadius = 72;
      const outerRadius = 102;

      const path = describeDonutArc(innerRadius, outerRadius, startAngle, endAngle);
      const p1 = polarToCartesian(innerRadius + (outerRadius - innerRadius) / 2, midAngle);
      const p2 = polarToCartesian(132, midAngle);
      const p3 = { x: p2.x + (isRightSide ? 26 : -26), y: p2.y };

      return {
        ...item,
        path,
        p1, p2, p3,
        isRightSide,
      };
    });
  }, [data, total]);

  return (
    <div 
      ref={containerRef} 
      // STRICT ASPECT RATIO: Lock the container to a perfect square
      className="bg-[var(--color-bg-panel)] border border-brand-grey p-4 rounded w-full aspect-square relative flex flex-col justify-between overflow-hidden max-w-[500px] mx-auto"
    >
      {/* HEADER: Pushed to the top */}
      <div className="text-center z-10">
        <h2 className="text-xl font-black tracking-widest text-brand-red neon-text-red font-mono uppercase m-0">
          RUG-O-METER
        </h2>
        <p className="text-[10px] text-brand-grey font-mono tracking-wider italic mt-1 mb-0">
          A scientific instrument for measuring disappointment.
        </p>
      </div>

      {/* ABSOLUTE CENTER CHART: Detached from flow, dead-center of the square */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none z-0">
        <AnimatePresence mode="wait">
          {isInView && (
            <motion.svg
              viewBox="-220 -220 440 440"
              // The SVG itself is re-enabled for hover events
              className="w-[85%] h-[85%] max-w-[300px] max-h-[300px] pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.text
                x="0" y="-8"
                textAnchor="middle"
                fill="var(--color-red)"
                className="text-[42px] font-black tracking-[-2px] font-mono neon-text-red"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', bounce: 0.35 }}
              >
                {deathRate}%
              </motion.text>
              <motion.text
                x="0" y="18"
                textAnchor="middle"
                fill="var(--color-white)"
                className="text-[9px] tracking-[2px] font-mono opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                RUGGED / DEAD
              </motion.text>

              {slices.map((slice, i) => (
                <g key={slice.id}>
                  <motion.path
                    d={slice.path}
                    fill={slice.color}
                    stroke="var(--color-bg-panel)"
                    strokeWidth={5}
                    initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.1, delay: i * 0.12, type: 'spring', bounce: 0.25 }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  />

                  <motion.polyline
                    points={`${slice.p1.x},${slice.p1.y} ${slice.p2.x},${slice.p2.y} ${slice.p3.x},${slice.p3.y}`}
                    fill="none"
                    stroke="var(--color-white)"
                    strokeWidth={1.25}
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.45 }}
                    transition={{ duration: 0.9, delay: 0.7 + i * 0.1 }}
                  />

                  <motion.text
                    x={slice.p3.x + (slice.isRightSide ? 4 : -4)}
                    y={slice.p3.y}
                    dy="0.3em"
                    textAnchor={slice.isRightSide ? 'start' : 'end'}
                    fill={slice.color}
                    className="text-[9px] font-mono tracking-[1px] font-bold"
                    initial={{ opacity: 0, x: slice.isRightSide ? -8 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.1 + i * 0.08 }}
                  >
                    {slice.label} {slice.value}
                  </motion.text>
                </g>
              ))}
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER: Pushed to the bottom */}
      <div className="z-10 flex justify-center mt-auto">
        <div className="flex items-center gap-2 neon-border-red bg-[var(--color-red-dim)]/20 px-3 py-1.5 rounded text-brand-red uppercase">
          <div className="text-brand-red">
            <ChainLogo chain={chain} />
          </div>
          <span className="font-bold tracking-widest neon-text-red text-xs">
            NETWORK: {chain}
          </span>
          <div className="w-2 h-2 rounded-full bg-[var(--color-red)] animate-pulse-red ml-1 shadow-[0_0_8px_var(--color-red)]"></div>
        </div>
      </div>
    </div>
  );
}