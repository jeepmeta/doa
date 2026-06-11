import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from './Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Generate 24h rolling candle data
const generateCandleData = () => {
  const labels: string[] = [];
  const redBody: number[] = [];
  const yellowTip: number[] = [];
  const greenTip: number[] = [];

  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    labels.push(`${hour.getHours()}:00`);

    const launched = Math.floor(Math.random() * 45) + 8;
    const rugged = Math.floor(launched * (0.88 + Math.random() * 0.1));
    const bonded = launched - rugged;
    const yellow = Math.floor(bonded * (Math.random() * 0.6));

    let green = 0;
    if (i > 4) {
      green = Math.floor(bonded * (0.08 + Math.random() * 0.12));
      if (Math.random() > 0.7) green = Math.max(0, green - 1);
    }

    redBody.push(rugged);
    yellowTip.push(yellow);
    greenTip.push(green);
  }

  return { labels, redBody, yellowTip, greenTip };
};

const { labels, redBody, yellowTip, greenTip } = generateCandleData();

const data = {
  labels,
  datasets: [
    { label: 'Rugged / Failed', data: redBody, backgroundColor: '#ff2a2a', stack: 'candle', barThickness: 7 },
    { label: 'Bonded → Rugged', data: yellowTip, backgroundColor: '#ff8c00', stack: 'candle', barThickness: 7 },
    { label: 'Successful (4h+)', data: greenTip, backgroundColor: '#00ff41', stack: 'candle', barThickness: 7 },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: '#1f1f1f' }, ticks: { color: '#666', font: { size: 9 } } },
    y: { grid: { color: '#1f1f1f' }, ticks: { color: '#666', font: { size: 9 } }, beginAtZero: true },
  },
};

export const CandleChart: React.FC = () => (
  <Card className="p-4 md:p-5">
    <div className="flex justify-between items-center mb-3">
      <div className="text-xs uppercase tracking-widest text-gray-500">24H VOLATILITY — PUMP.FUN</div>
      <div className="flex gap-3 text-[10px]">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#ff2a2a]" /> Rugged</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#ff8c00]" /> Bonded → Rug</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#00ff41]" /> Survived 4h+</div>
      </div>
    </div>
    <div className="h-40 md:h-56">
      <Bar data={data} options={options} />
    </div>
  </Card>
);