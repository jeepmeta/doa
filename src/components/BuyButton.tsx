import React from 'react';
import { Button } from './Button';

export const BuyButton: React.FC = () => (
  <Button onClick={() => window.open('https://pump.fun', '_blank')}>BUY $DOA</Button>
);