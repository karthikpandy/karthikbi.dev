export const metadata = {
  title: 'About — karthikbi.dev',
  description: '18 years of BI engineering, from Cognos to Microsoft Fabric.',
}

const roles = [
  {
    period: '2024 – present', title: 'Senior BI Engineer', company: 'LinkedIn',
    description: 'Building enterprise-scale Power BI semantic models on Microsoft Fabric. Designing lakehouse architecture with Databricks.',
    stack: ['Power BI', 'Fabric', 'Databricks', 'PySpark', 'DAX'],
    current: true,
  },
  {
    period: '2023 – 2024', title: 'Senior BI Engineer', company: 'CommunityAmerica Credit Union',
    description: 'Led end-to-end migration from Tableau to Power BI. Automated reporting with Azure Logic Apps.',
    stack: ['Power BI', 'Tableau', 'DAX', 'Azure DevOps'],
  },
  {
    period: '2022 – 2023', title: 'Data Site Reliability Engineer', company: 'LinkedIn',
    description: 'Monitored data pipeline reliability across Kafka and Hadoop. Built observability dashboards.',
    stack: ['Databricks', 'PySpark', 'SQL'],
  },
  {
    period: '2014 – 2021', title: 'Senior BI Data Engineer', company: 'Parker Hannifin / GE / Honeywell',
    description: 'Designed enterprise ETL pipelines with Informatica PowerCenter. Integrated Oracle ERP across global manufacturing operations.',
    stack: ['Informatica', 'Cognos', 'Oracle ERP', 'SQL'],
  },
  {
    period: '2009 – 2014', title: 'Senior BI Data Engineer', company: 'iGATE',
    description: 'Led a team of 10 engineers. Architected Cognos frameworks for financial reporting.',
    stack: ['Cognos', 'Informatica', 'SQL'],
  },
  {
    period: '2008 – 2009', title: 'BI Developer', company: 'NTT DATA',
    description: 'Developed Business Objects universes and Cognos Framework Manager models for enterprise clients.',
    stack: ['Business Objects', 'Cognos', 'Informatica'],
  },
]

export default function AboutPage() {
  const years = new Date().getFullYear() - 2008

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <header className="mb-10">
        <p className="mono-label mb-3">About</p>
        <p className="font-serif text-ink-2" style={{ fontSize: '1.075rem', lineHeight: 1.65 }}>
          Senior BI Engineer at LinkedIn. {years} years building data systems across manufacturing,
          finance, and tech — from Cognos report studios to Microsoft Fabric lakehouses.
          This site is where I share what I learn.
        </p>
      </header>

      <p className="mono-label mb-5">Career Timeline</p>
      <div className="border-t border-rule">
        {roles.map((role, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[128px_1fr] gap-x-6 gap-y-1 py-5 border-b border-rule">
            <time className="font-mono text-[0.63rem] uppercase tracking-label text-ink-3 tnum pt-1">
              {role.period}
            </time>
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display font-semibold text-ink" style={{ fontSize: '1.05rem' }}>
                  {role.title}
                </span>
                {role.current && (
                  <span className="font-mono text-[0.6rem] uppercase tracking-label text-signal border border-signal/50 px-1.5 py-px leading-none">
                    now
                  </span>
                )}
              </div>
              <p className="font-mono text-[0.7rem] text-ink-3 mt-0.5">{role.company}</p>
              <p className="font-serif text-ink-2 mt-2" style={{ fontSize: '0.98rem', lineHeight: 1.6 }}>
                {role.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {role.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[0.6rem] uppercase tracking-label text-ink-3 border border-rule-2 px-1.5 py-[3px] leading-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
