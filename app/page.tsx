import Link from 'next/link'
import MetricCard from '@/components/MetricCard'
import StackPill from '@/components/StackPill'
import PipelineFlow from '@/components/PipelineFlow'

const stack = [
  'Power BI',
  'Microsoft Fabric',
  'Databricks',
  'DAX',
  'PySpark',
  'SQL',
  'Azure DevOps',
  'Informatica',
  'Cognos',
  'Tableau',
]

const metrics = [
  { value: '18',  label: 'years experience', accent: 'blue'   as const },
  { value: '12+', label: 'tools mastered',   accent: 'amber'  as const },
  { value: '3',   label: 'certifications',   accent: 'purple' as const },
  { value: '∞',   label: 'pipelines built',  accent: 'green'  as const },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">

      {/* Hero */}
      <section className="mb-20">
        {/* Breadcrumb / status line */}
        <div className="flex items-center gap-2 mb-8">
          <span className="font-mono text-xs text-green">● online</span>
          <span className="text-border">|</span>
          <span className="font-mono text-xs text-muted">karthikbi.dev</span>
        </div>

        {/* Name */}
        <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-3 leading-tight">
          Karthik <span className="text-blue">BI</span>
        </h1>

        {/* Title */}
        <p className="font-mono text-lg text-muted mb-6">
          <span className="text-amber">Senior BI Engineer</span>
          <span className="text-muted"> @ </span>
          <span className="text-text">LinkedIn</span>
        </p>

        {/* Tagline */}
        <p className="text-xl text-muted max-w-2xl leading-relaxed mb-10">
          Building data systems that actually scale.{' '}
          <span className="text-text">18 years</span> from Cognos to Microsoft Fabric.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/blueprints"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue/10 border border-blue/30 text-blue rounded font-mono text-sm font-medium hover:bg-blue/20 transition-colors"
          >
            <span>View Blueprints</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border text-muted rounded font-mono text-sm font-medium hover:text-text hover:border-muted transition-colors"
          >
            Career Timeline
          </Link>
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">
          // by the numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">
          // data pipeline
        </h2>
        <PipelineFlow />
      </section>

      {/* Stack */}
      <section className="mb-16">
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">
          // technology stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <StackPill key={tech} label={tech} />
          ))}
        </div>
      </section>

      {/* Divider + blueprint teaser */}
      <section className="border-t border-border pt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
            // latest blueprints
          </h2>
          <Link href="/blueprints" className="font-mono text-xs text-blue hover:underline">
            view all →
          </Link>
        </div>
        <div className="card p-5 hover:border-blue/30 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-text font-semibold mb-1">CI/CD for Power BI Semantic Models</p>
              <p className="text-muted text-sm">Automated deployment pipelines using Azure DevOps and Tabular Editor.</p>
            </div>
            <span className="font-mono text-xs text-green border border-green/30 bg-green/10 px-2 py-0.5 rounded whitespace-nowrap">live</span>
          </div>
        </div>
      </section>
    </div>
  )
}
