'use client';

import { motion } from 'motion/react';

const reasons = [
  {
    title: "Bonding Curve = Exit Ramp",
    desc: "Bots snipe early, devs dump the second it graduates. Retail buys the top of a dead curve every single time."
  },
  {
    title: "Dev Wallet Farms",
    desc: "One dev. 12 wallets. Fake volume. Coordinated dump. Zero accountability. pump.fun profits either way."
  },
  {
    title: "97% Bot Volume",
    desc: "This isn’t a market. It’s an extraction machine. The house (bots + platform) always wins."
  },
  {
    title: "Zero Consequences",
    desc: "No KYC. No bans. Devs vanish with millions. pump.fun takes their cut and keeps the lights on."
  }
];

export default function WhyBroken() {
  return (
    <div className="mb-8">
      <div className="text-xs text-doa-red tracking-[1.5px] mb-2 font-mono">THE RIGGED SYSTEM</div>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01 }}
            className="bg-doa-dark border border-gray-800 p-4 rounded"
          >
            <div className="font-bold mb-1 text-doa-white">{r.title}</div>
            <div className="text-gray-400 text-xs">{r.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}