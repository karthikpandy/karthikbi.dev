import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'The Golden Rule of Data Transformation: Go Upstream — karthikbi.dev',
  description: 'How a single DAX calculated column brought down our refresh — and the simple rule that fixed it permanently.',
}

export default function GoldenRulePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-400 hover:text-gray-700 transition-colors mb-12"
      >
        ← Writing
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug mb-4">
          The Golden Rule of Data Transformation: Go Upstream
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-03-30">March 30, 2026</time>
          <span>·</span>
          <span>3 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">Databricks</span>,{' '}
          <span className="tag-link">Architecture</span>
        </p>
      </header>

      {/* Diagram */}
      <div className="mb-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <Image
          src="/golden-rule-diagram.png"
          alt="The Golden Rule: Database (BEST) → Power Query (GOOD) → Semantic Model (LAST RESORT)"
          width={2816}
          height={1536}
          className="w-full"
        />
      </div>

      {/* Body */}
      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Introduction</h2>
          <p>
            If you work with large Import mode semantic models in Power BI, you've probably been there —
            a model that ran perfectly for months suddenly starts failing refresh. No code changes.
            No new features. Just more data.
          </p>
          <p className="mt-3">
            This is the story of how a single calculated column brought down our refresh — and the
            simple rule that fixed it permanently.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The Problem</h2>
          <p>
            Our large Import mode semantic model at LinkedIn was running smoothly in production for months.
            Then one day — refresh started failing completely.
          </p>
          <p className="mt-3">
            Digging into the monitoring logs I found the culprit: a calculated column using DAX{' '}
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">RELATED</code>{' '}
            on a massive fact table.
          </p>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-4">
            <code>{`Column = RELATED(DimTable[ColumnName])`}</code>
          </pre>
          <p className="mt-3">
            It worked fine when the table was smaller. As data grew into tens of millions of rows —
            it became a memory monster.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Why This Happens</h2>
          <p>
            Power BI evaluates calculated columns row by row in memory at refresh time. Add{' '}
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">RELATED</code>{' '}
            on top — which resolves relationships row by row — and you're multiplying the memory
            footprint on every single row.
          </p>
          <p className="mt-3">Fine at small scale. Catastrophic as data grows.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The Fix</h2>
          <p>I moved the logic upstream into a Databricks view:</p>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-4">
            <code>{`CREATE OR REPLACE VIEW vw_FactTable AS
SELECT f.*, d.ColumnName
FROM FactTable f
LEFT JOIN DimTable d ON f.JoinKey = d.JoinKey`}</code>
          </pre>
          <p className="mt-3">
            Power BI reads it as a regular imported column. No DAX evaluation. No memory explosion.
            Refresh failures gone.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The Golden Rule</h2>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              "Before adding a calculated column, ask yourself: Could the database do this?"
            </p>
          </blockquote>
          <div className="overflow-hidden rounded-xl border border-gray-100 mt-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide font-mono">Layer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide font-mono">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">Database / Lakehouse</td>
                  <td className="px-4 py-3 text-xs text-gray-600">🏆 BEST — zero memory drag</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">Power Query / ETL</td>
                  <td className="px-4 py-3 text-xs text-gray-600">✅ GOOD — optimized load</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">DAX Calculated Column</td>
                  <td className="px-4 py-3 text-xs text-gray-600">🔴 LAST RESORT — eats memory</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Why It Matters More in Fabric</h2>
          <p>
            With F-SKU capacity, inefficient DAX consumes shared Compute Units affecting everyone on
            your capacity. One bad column doesn't just break your refresh — it steals performance
            from your entire team.
          </p>
          <p className="mt-3 font-medium text-gray-700">
            Optimization is no longer just good engineering. It's good citizenship.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Key Takeaways</h2>
          <ul className="space-y-2 pl-0">
            {[
              'RELATED on large tables is a hidden memory risk that grows with your data',
              'Moving logic upstream to Databricks eliminates the problem entirely',
              'In Fabric capacity — inefficient DAX has a shared cost',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          href="/"
          className="font-mono text-xs text-gray-400 hover:text-gray-700 transition-colors"
        >
          ← Back to Writing
        </Link>
      </div>

    </article>
  )
}
