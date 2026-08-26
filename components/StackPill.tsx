interface StackPillProps {
  label: string
}

const colorMap: Record<string, string> = {
  'Power BI':          'bg-lavender/10 text-lavender border border-lavender/25 hover:bg-lavender/20',
  'Microsoft Fabric':  'bg-lavender/10 text-lavender border border-lavender/25 hover:bg-lavender/20',
  'Databricks':        'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 hover:bg-cyan-500/20',
  'DAX':               'bg-lavender/10 text-lavender border border-lavender/25 hover:bg-lavender/20',
  'PySpark':           'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 hover:bg-cyan-500/20',
  'SQL':               'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 hover:bg-cyan-500/20',
  'Azure DevOps':      'bg-lavender/10 text-lavender border border-lavender/25 hover:bg-lavender/20',
  'Informatica':       'bg-slate-500/10 text-slate-400 border border-slate-500/25 hover:bg-slate-500/20',
  'Cognos':            'bg-slate-500/10 text-slate-400 border border-slate-500/25 hover:bg-slate-500/20',
  'Tableau':           'bg-lavender/10 text-lavender border border-lavender/25 hover:bg-lavender/20',
}

export default function StackPill({ label }: StackPillProps) {
  const cls = colorMap[label] ?? 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20'
  return (
    <span className={`inline-flex items-center px-4 py-1 rounded-full font-mono text-xs font-medium transition-all cursor-default ${cls}`}>
      {label}
    </span>
  )
}

