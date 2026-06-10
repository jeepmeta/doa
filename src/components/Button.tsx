import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const base = 'font-bold text-xs rounded transition flex items-center justify-center gap-2 px-4 py-1.5';
  const style = variant === 'primary' 
    ? 'bg-[#ff2a2a] hover:bg-[#8b0000] text-white border border-[#ff2a2a] neon-border-red' 
    : 'bg-gray-900 border border-gray-700 text-gray-400 hover:text-white';
  return <button className={`${base} ${style} ${className}`} {...props}>{children}</button>;
};