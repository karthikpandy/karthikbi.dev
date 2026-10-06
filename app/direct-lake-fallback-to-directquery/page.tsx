import Image from 'next/image'
import PostShell from '@/components/PostShell'

export const metadata = {
  title:
    "Direct Lake Gave Me the Right Number. It Just Didn't Use Direct Lake. — karthikbi.dev",
  description:
    'A table based on a SQL view in a Direct Lake on SQL model returned the right total and still showed Direct Lake. Performance Analyzer showed it had gone through DirectQuery.',
}

function Figure({
  src,
  alt,
  caption,
  width,
  height,
  cap,
}: {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  cap?: number
}) {
  return (
    <figure className="my-6">
      <div
        className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mx-auto"
        style={cap ? { maxWidth: cap } : undefined}
      >
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      </div>
      <figcaption className="mt-2 text-xs text-gray-400 leading-relaxed">{caption}</figcaption>
    </figure>
  )
}

export default function DirectLakeFallbackToDirectQueryPage() {
  return (
    <PostShell slug="direct-lake-fallback-to-directquery">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            A Direct Lake model that falls back to DirectQuery doesn&rsquo;t announce it. The
            report loads, the total is right, and nothing tells you which engine answered.
          </p>
          <p className="mt-4">
            Last week&rsquo;s test used Direct Lake on OneLake, which has no DirectQuery fallback
            at all. This one needed Direct Lake on SQL, the flavor that can fall back, so I set
            out to watch it happen.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The setup</h2>
          <p>
            I used the Contoso Retail sample data: a 12,627,608-row fact table in a Fabric
            Lakehouse, on a trial capacity. I built a Direct Lake on SQL model over it, then added
            a second table to the model: a SQL view over the same fact table.
          </p>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-4 leading-relaxed">
            <code>{`CREATE VIEW dbo.vw_FactOnlineSales AS
SELECT OnlineSalesKey, DateKey, SalesAmount FROM dbo.FactOnlineSales;`}</code>
          </pre>
          <p className="mt-3">
            Two visuals with the same shape: sales amount by date, one from the table, one from
            the view.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What the model said</h2>
          <p>
            Both tables show Direct Lake as their storage mode, the view included.
          </p>
          <Figure
            src="/blog/direct-lake-fallback-to-directquery/view-storage-mode.png"
            alt="The view-based table, storage mode Direct Lake"
            caption="The view-based table, storage mode Direct Lake."
            width={1161}
            height={509}
          />
          <p>
            Both visuals also returned the same total: 2,718,202,629.81. If I had stopped there, I
            would have called it fine.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What the query did</h2>
          <p>
            Performance Analyzer told a different story. Expanded, the view&rsquo;s entry has a
            Direct query step. The table&rsquo;s entry has none.
          </p>
          <Figure
            src="/blog/direct-lake-fallback-to-directquery/performance-analyzer-direct-query.png"
            alt="Performance Analyzer: a Direct query step on the view, none on the table"
            caption="Performance Analyzer: a Direct query step on the view, none on the table."
            width={1081}
            height={683}
          />
          <p>
            Same total, same label, different engine. The view-based table went through
            DirectQuery.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Where it didn&rsquo;t show up</h2>
          <p>
            I also went looking in workspace monitoring. I searched the semantic model logs for an
            operation with DirectQuery in its name and found none. I haven&rsquo;t worked out
            where, or whether, fallback shows up there, so Performance Analyzer is the only
            evidence I have.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              The storage mode says Direct Lake. Performance Analyzer says what the query actually
              did.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              "The storage mode on a table doesn't tell you whether a query fell back",
              <>
                A table based on a SQL view fell back in Direct Lake on SQL.{' '}
                <a
                  href="https://learn.microsoft.com/en-us/fabric/fundamentals/direct-lake-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal underline hover:no-underline"
                >
                  Microsoft documents
                </a>{' '}
                that, along with SQL endpoint security and capacity guardrails, as causes of
                fallback
              </>,
              "Microsoft says fallback can be disabled so those queries fail instead of quietly changing engine. I haven't tried it",
              'Direct Lake on OneLake has no fallback path, so the question only exists with Direct Lake on SQL',
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PostShell>
  )
}
