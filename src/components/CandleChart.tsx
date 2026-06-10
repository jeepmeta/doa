import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card } from './Card';

const data = {
  labels: Array.from({length:12},(_,i)=>`${(new Date().getHours()-11+i)%24}:00`),
  datasets: [
    { label: 'Launched', data: [1200,980,1450,1100,1350,890,1600,1220,980,1400,1150,1320], borderColor: '#fff', borderWidth: 1.5, tension: 0.1, pointRadius: 0 },
    { label: 'Died', data: [1180,960,1420,1080,1320,870,1570,1190,960,1370,1130,1290], borderColor: '#ff2a2a', borderWidth: 1.5, tension: 0.1, fill: true, backgroundColor: 'rgba(255,42,42,0.1)' },
  ]
};

export const CandleChart: React.FC = () => (
  <Card>
    <div className="flex justify-between items-center mb-3 text-xs uppercase tracking-widest text-gray-500">
      <span>24H VOLATILITY MAP</span>
      <span className="text-gray-600">LAUNCHED / DEAD</span>
    </div>
    <div className="h-48">
      <Line data={data} options={{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{x:{grid:{color:'#222'}}, y:{grid:{color:'#222'}} } }} />
    </div>
  </Card>
);