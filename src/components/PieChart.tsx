import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card } from './Card';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Rugged', 'Dumped', 'Survived'],
  datasets: [{ data: [98.6, 1.3, 0.1], backgroundColor: ['#ff2a2a', '#ff8c00', '#00ff41'], borderColor: '#050505', borderWidth: 2 }]
};

export const PieChart: React.FC = () => (
  <Card>
    <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">FATE BREAKDOWN (24H)</div>
    <div className="h-48 flex items-center justify-center">
      <Doughnut data={data} options={{ cutout: '68%', plugins: { legend: { position: 'right', labels: { color: '#888', font: { size: 11 } } } } }} />
    </div>
    <div className="text-center text-[#ff2a2a] text-2xl font-black mt-1">98.6% RUGGED</div>
  </Card>
);