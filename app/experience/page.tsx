import StackPill from '@/components/StackPill'

export const metadata = {
  title: 'Experience — karthikbi.dev',
  description: '18 years of BI engineering — from Cognos to Microsoft Fabric.',
}

interface Role {
  period: string
  title: string
  company: string
  location?: string
  highlights: string[]
  stack: string[]
  current?: boolean
}

const roles: Role[] = [
  {
    period: '2024 → present',
    title: 'Senior BI Engineer',
    company: 'LinkedIn',
    highlights: [
      'Building enterprise-scale Power BI semantic models on Microsoft Fabric',
      'Designing lakehouse architecture with Databricks and Delta Lake',
      'Driving BI platform strategy and self-serve analytics enablement',
    ],
    stack: ['Power BI', 'Microsoft Fabric', 'Databricks', 'PySpark', 'DAX', 'Azure DevOps'],
    current: true,
  },
  {
    period: '2023 → 2024',
    title: 'Senior BI Engineer',
    company: 'CommunityAmerica Credit Union',
    highlights: [
      'Led end-to-end migration from Tableau to Power BI',
      'Automated reporting workflows using Azure Logic Apps',
      'Standardized semantic layer with reusable DAX patterns',
    ],
    stack: ['Power BI', 'Tableau', 'DAX', 'Azure DevOps', 'SQL'],
  },
  {
    period: '2022 → 2023',
    title: 'Data Site Reliability Engineer',
    company: 'LinkedIn',
    highlights: [
      'Monitored data pipeline reliability across Kafka and Hadoop ecosystems',
      'Built observability dashboards for data platform health',
      'Contributed to Datahub metadata cataloging initiatives',
    ],
    stack: ['Databricks', 'SQL', 'PySpark'],
  },
  {
    period: '2014 → 2021',
    title: 'Senior BI Data Engineer',
    company: 'Parker Hannifin / GE / Honeywell',
    highlights: [
      'Designed and maintained enterprise ETL pipelines using Informatica PowerCenter',
      'Integrated Oracle ERP data into enterprise data warehouses',
      'Delivered Cognos report suites for global manufacturing operations',
    ],
    stack: ['Informatica', 'Cognos', 'SQL', 'DAX'],
  },
  {
    period: '2009 → 2014',
    title: 'Senior BI Data Engineer',
    company: 'iGATE',
    highlights: [
      'Led a team of 10 BI engineers across multiple client engagements',
      'Architected Cognos frameworks for financial reporting',
      'Built Informatica pipelines for large-scale data migration projects',
    ],
    stack: ['Cognos', 'Informatica', 'SQL'],
  },
  {
    period: '2008 → 2009',
    title: 'BI Developer',
    company: 'NTT DATA',
    highlights: [
      'Developed Business Objects universes and reports for enterprise clients',
      'Built Cognos Framework Manager models and report studios',
      'Implemented Informatica mappings for source-to-target transformations',
    ],
    stack: ['Cognos', 'Informatica', 'SQL'],
  },
]

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
          // career history
        </p>
        <h1 className="font-mono text-4xl font-bold text-text mb-4">Experience</h1>
        <p className="text-muted text-lg max-w-2xl">
          18 years of BI engineering — from Cognos report studios to Microsoft Fabric lakehouses.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-[7px]" />

        <div className="space-y-12">
          {roles.map((role, i) => (
            <div key={i} className="relative pl-10">
              {/* Dot */}
              <div
                className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${
                  role.current
                    ? 'bg-green border-green shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                    : 'bg-bg border-border'
                }`}
              />

              {/* Period */}
              <p className="font-mono text-xs text-muted mb-2">{role.period}</p>

              {/* Title + Company */}
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-text">{role.title}</h2>
                <p className={`font-mono text-sm ${role.current ? 'text-blue' : 'text-muted'}`}>
                  {role.company}
                  {role.current && (
                    <span className="ml-2 text-xs text-green border border-green/30 bg-green/10 px-1.5 py-0.5 rounded">
                      current
                    </span>
                  )}
                </p>
              </div>

              {/* Highlights */}
              <ul className="space-y-1 mb-4">
                {role.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-muted text-sm">
                    <span className="text-border mt-1.5 flex-shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5">
                {role.stack.map((tech) => (
                  <StackPill key={tech} label={tech} />
                ))}
              </div>

              {/* Separator (except last) */}
              {i < roles.length - 1 && (
                <div className="mt-10 border-t border-border/50" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-16 card p-5 bg-surface/50">
        <p className="font-mono text-xs text-muted">
          <span className="text-blue">const</span>{' '}
          <span className="text-text">yearsOfExperience</span>{' '}
          = {new Date().getFullYear() - 2008};{' '}
          <span className="text-muted">// {new Date().getFullYear() - 2008} years and counting</span>
        </p>
      </div>
    </div>
  )
}
