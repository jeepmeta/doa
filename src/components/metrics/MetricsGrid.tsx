'use client';

import MetricCard from './MetricCard';

interface MetricsGridProps {
  total: number;
  instaDead: number;
  gradRugged: number;
  survived: number;
}

export default function MetricsGrid({ total, instaDead, gradRugged, survived }: MetricsGridProps) {
  const fmt = (n: number) => n.toLocaleString('en-US');

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      <MetricCard label="TOTAL LAUNCHED" value={fmt(total)} />
      <MetricCard label="INSTANTLY RUGGED" value={fmt(instaDead)} variant="red" />
      <MetricCard label="GRADUATED → DUMPED" value={fmt(gradRugged)} variant="orange" />
      <MetricCard label="RETAIL SURVIVORS" value={fmt(survived)} variant="green" />
    </div>
  );
}