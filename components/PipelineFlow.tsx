const stages = [
  { label: 'Databricks',        color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
  { label: 'Microsoft Fabric',  color: 'text-blue',        bg: 'bg-blue/10 border-blue/30' },
  { label: 'Power BI',          color: 'text-amber',       bg: 'bg-amber/10 border-amber/30' },
]

export default function PipelineFlow() {
  return (
    <div className="card p-5 bg-surface/50">
      <p className="font-mono text-xs text-muted mb-4 uppercase tracking-widest">// current stack</p>
      <div className="flex items-center gap-0 flex-wrap">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-0">
            {/* Stage box */}
            <div className={`border rounded px-4 py-2 ${stage.bg}`}>
              <span className={`font-mono text-sm font-semibold ${stage.color}`}>
                {stage.label}
              </span>
            </div>

            {/* Connector arrow */}
            {i < stages.length - 1 && (
              <div className="relative flex items-center w-10 mx-1 overflow-hidden h-5">
                {/* Static line */}
                <div className="w-full h-px bg-border" />
                {/* Animated dot */}
                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue animate-flow opacity-80" />
                {/* Arrow head */}
                <svg
                  className="absolute right-0 text-muted"
                  width="6"
                  height="8"
                  viewBox="0 0 6 8"
                  fill="currentColor"
                >
                  <path d="M0 0 L6 4 L0 8 Z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
