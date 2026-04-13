interface StackPillProps {
  label: string
}

const colorMap: Record<string, string> = {
  'Power BI':          'bg-amber/10 text-amber border border-amber/25 hover:bg-amber/20',
  'Microsoft Fabric':  'bg-blue/10 text-blue border border-blue/25 hover:bg-blue/20',
  'Databricks':        'bg-orange-500/10 text-orange-400 border border-orange-500/25 hover:bg-orange-500/20',
  'DAX':               'bg-amber/10 text-amber border border-amber/25 hover:bg-amber/20',
  'PySpark':           'bg-green/10 text-green border border-green/25 hover:bg-green/20',
  'SQL':               'bg-blue/10 text-blue border border-blue/25 hover:bg-blue/20',
  'Azure DevOps':      'bg-blue/10 text-blue border border-blue/25 hover:bg-blue/20',
  'Informatica':       'bg-purple/10 text-purple border border-purple/25 hover:bg-purple/20',
  'Cognos':            'bg-purple/10 text-purple border border-purple/25 hover:bg-purple/20',
  'Tableau':           'bg-blue/10 text-blue border border-blue/25 hover:bg-blue/20',
}

export default function StackPill({ label }: StackPillProps) {
  const cls = colorMap[label] ?? 'bg-surface text-muted border border-border hover:border-muted'
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded font-mono text-xs font-medium transition-colors cursor-default ${cls}`}>
      {label}
    </span>
  )
}
