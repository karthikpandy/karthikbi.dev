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
    <div className="mx-auto max-w-3xl px-6 py-16">

      {/* Intro — editorial */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-3">About</h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
          Senior BI Engineer at LinkedIn. {years} years building data systems across manufacturing,
          finance, and tech — from Cognos report studios to Microsoft Fabric lakehouses.
          This site is where I share what I learn.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { value: `${years}`, label: 'years',     sub: 'in data engineering'   },
          { value: '6',        label: 'companies', sub: 'industries crossed'     },
          { value: '10+',      label: 'tools',     sub: 'from Cognos to Fabric'  },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
            <p className="font-mono text-3xl font-bold text-[#7C7BFF]">{s.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{s.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>


      {/* Career timeline */}
      <div>
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-5">
          Career Timeline
        </p>
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />

          <div className="space-y-4">
            {roles.map((role, i) => (
              <div key={i} className="relative flex gap-4">
                {/* Dot — violet for current, gray for past */}
                <div className={`mt-5 w-4 h-4 rounded-full border-2 flex-shrink-0 z-10
                  ${role.current ? 'bg-[#7C7BFF] border-violet-200' : 'bg-gray-200 border-gray-100'}`} />

                {/* Card — violet left border for current, gray for past */}
                <div className={`flex-1 bg-white border border-gray-100 border-l-4 rounded-xl p-4 shadow-sm
                  ${role.current ? 'border-l-[#7C7BFF]' : 'border-l-gray-200'}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">{role.title}</span>
                        {role.current && (
                          <span className="font-mono text-[10px] text-[#7C7BFF] border border-violet-200 bg-violet-50 px-1.5 py-px rounded-full">
                            now
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{role.company}</p>
                    </div>
                    <time className="font-mono text-[10px] text-gray-400 whitespace-nowrap">{role.period}</time>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-2.5">{role.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {role.stack.map((tech) => (
                      <span key={tech} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-50 border border-gray-100 text-gray-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
