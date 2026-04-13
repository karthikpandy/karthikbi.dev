interface MetricCardProps {
  value: string
  label: string
  accent?: 'blue' | 'amber' | 'purple' | 'green'
}

const accentMap = {
  blue:   { value: 'text-blue',   bg: 'bg-blue/5',   border: 'border-blue/20' },
  amber:  { value: 'text-amber',  bg: 'bg-amber/5',  border: 'border-amber/20' },
  purple: { value: 'text-purple', bg: 'bg-purple/5', border: 'border-purple/20' },
  green:  { value: 'text-green',  bg: 'bg-green/5',  border: 'border-green/20' },
}

export default function MetricCard({ value, label, accent = 'blue' }: MetricCardProps) {
  const { value: valueColor, bg, border } = accentMap[accent]
  return (
    <div className={`card ${bg} ${border} p-5 flex flex-col gap-1 transition-all hover:scale-[1.02]`}>
      <span className={`font-mono text-3xl font-bold ${valueColor}`}>{value}</span>
      <span className="text-muted text-xs font-mono uppercase tracking-widest">{label}</span>
    </div>
  )
}
