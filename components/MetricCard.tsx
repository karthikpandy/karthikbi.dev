interface MetricCardProps {
  value: string
  label: string
  accent?: 'blue' | 'amber' | 'purple' | 'green'
}

const accentMap = {
  blue:   { value: 'text-lavender', bg: 'bg-lavender/5', border: 'border-lavender/20' },
  amber:  { value: 'text-lavender', bg: 'bg-lavender/5', border: 'border-lavender/20' },
  purple: { value: 'text-lavender', bg: 'bg-lavender/5', border: 'border-lavender/20' },
  green:  { value: 'text-lavender', bg: 'bg-lavender/5', border: 'border-lavender/20' },
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
