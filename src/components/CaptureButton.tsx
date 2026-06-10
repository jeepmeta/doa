import React from 'react';
import { Button } from './Button';
import html2canvas from 'html2canvas';

export const CaptureButton: React.FC = () => {
  const snap = async () => {
    const el = document.getElementById('snapshot-area');
    if (!el) return;
    const c = await html2canvas(el, {backgroundColor:'#050505', scale:2});
    const a = document.createElement('a');
    a.download = `DOA_${Date.now()}.png`;
    a.href = c.toDataURL();
    a.click();
  };
  return <Button variant="ghost" onClick={snap}><span>📸</span> SNAPSHOT</Button>;
};