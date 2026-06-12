import React from 'react';
import { motion } from 'motion/react';

interface BuyButtonProps {
  onClick?: () => void;
  className?: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ onClick, className = '' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open('https://pump.fun', '_blank');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={`
        relative overflow-hidden rounded-lg px-6 py-2.5
        bg-[#ff2a2a] text-white font-bold text-sm md:text-base tracking-[1px]
        border border-[#ff2a2a] shadow-[0_0_20px_rgba(255,42,42,0.4)]
        hover:shadow-[0_0_35px_rgba(255,42,42,0.65)]
        active:bg-[#cc2222]
        flex items-center justify-center gap-2
        transition-all duration-150
        ${className}
      `}
    >
      BUY $DOA
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                      -translate-x-full hover:translate-x-[250%] transition-transform duration-[650ms]" />
    </motion.button>
  );
};