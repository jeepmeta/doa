import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  border?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', border = 'border-gray-800', ...rest }) => (
  <div {...rest} className={`bg-[#121212] border ${border} rounded p-4 md:p-5 overflow-hidden ${className}`}>
    {children}
  </div>
);
