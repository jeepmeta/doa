import React, { useState } from 'react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';

interface CaptureButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({ onClick, className = '' }) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    if (onClick) {
      onClick();
      return;
    }

    const target = document.getElementById('snapshot-area');
    if (!target) return;

    setIsCapturing(true);

    try {
      const canvas = await html2canvas(target, {
        backgroundColor: '#050505',
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = `DOA_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Snapshot failed:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <motion.button
      onClick={handleCapture}
      disabled={isCapturing}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={`
        flex items-center justify-center gap-2
        rounded-lg border border-gray-700 bg-[#111] px-4 py-2.5
        text-sm md:text-base font-medium text-gray-300
        hover:bg-[#1a1a1a] hover:text-white hover:border-gray-600
        active:bg-[#222]
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-150
        ${className}
      `}
    >
      <span className="text-base">📸</span>
      <span>{isCapturing ? 'Capturing...' : 'SNAPSHOT'}</span>
    </motion.button>
  );
};