'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'red' | 'orange' | 'green';
}

export default function MetricCard({ label, value, variant = 'default' }: MetricCardProps) {
  const base = "bg-doa-dark border p-4 rounded";
  const variants = {
    default: "border-gray-800",
    red: "border-doa-red/60 neon-border-red",
    orange: "border-doa-orange/40",
    green: "border-doa-green/40",
  };

  const valueClass = variant === 'green' 
    ? "text-3xl font-bold text-doa-green tabular-nums neon-text-green" 
    : variant === 'red'
    ? "text-3xl font-bold text-doa-red tabular-nums"
    : "text-3xl font-bold text-white tabular-nums";

  return (
    <div className={`${base} ${variants[variant]}`}>
      <div className="text-[10px] text-gray-500 tracking-wider mb-1">{label}</div>
      <div className={valueClass}>{value}</div>
    </div>
  );
}