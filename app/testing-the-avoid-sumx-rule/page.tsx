import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'I Tested "Avoid SUMX" Against 10.9 Million Rows. It Went Both Ways. — karthikbi.dev',
  description:
    'Combining three columns, SUMX beat three separate SUMs by nearly 7x — 303ms vs 2015ms. With nothing to fold, plain SUM won. The difference is predictable.',
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

export default function TestingAvoidSumxPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-400 hover:text-gray-700 transition-colors mb-12"
      >
        ← Writing
      </Link>

      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug mb-4">
          I Tested &ldquo;Avoid SUMX&rdquo; Against 10.9 Million Rows. It Went Both Ways.
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-07-14">July 14, 2026</time>
          <span>·</span>
          <span>4 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">DAX</span>,{' '}
          <span className="tag-link">Performance</span>
        </p>
      </header>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            The standard DAX advice — and something I've followed on production work — is to avoid{' '}
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">SUMX</code>{' '}
            where a simpler aggregation exists, on the assumption that row-by-row iteration is slower
            than a columnar scan. I put it on the clock with Performance Analyzer, on 10.9 million
            rows of NYC taxi data, two different ways.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Test 1 — SUMX combining three columns
          </h2>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-2 leading-relaxed">
            <code>{`Total SUMX   = SUMX ( nyc_taxi, fareAmount + tipAmount + tollsAmount )
Total Simple = SUM ( fareAmount ) + SUM ( tipAmount ) + SUM ( tollsAmount )`}</code>
          </pre>
          <p className="mt-3">
            Three separate <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">SUM()</code>{' '}
            calls force three separate storage-engine scans, stitched together in the formula engine
            afterward. A single SUMX reads all three columns in one pass.
          </p>
          <p className="mt-3 font-medium text-gray-700">
            SUMX: 303ms. Three SUMs added together: 2015ms. SUMX won by nearly 7x.
          </p>
          <Figure
            src="/blog/testing-the-avoid-sumx-rule/test1-sumx-wins.png"
            alt="SUMX 303ms versus three separate SUMs added together at 2015ms"
            caption="SUMX: 303ms. Three separate SUMs added together: 2015ms."
            width={1550}
            height={656}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Test 2 — SUMX with nothing to fold
          </h2>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-2 leading-relaxed">
            <code>{`Total SUMX   = SUMX ( nyc_taxi, nyc_taxi[fareAmount] )
Total Simple = SUM ( nyc_taxi[fareAmount] )`}</code>
          </pre>
          <p className="mt-3">
            Here SUMX is wrapping a single column with no arithmetic to combine.{' '}
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">SUM()</code>{' '}
            already does a direct single-column scan and needs no help — so SUMX just adds iteration
            overhead for nothing.
          </p>
          <p className="mt-3 font-medium text-gray-700">
            SUMX: 460ms. Plain SUM: 435ms. SUM won.
          </p>
          <Figure
            src="/blog/testing-the-avoid-sumx-rule/test2-sum-wins.png"
            alt="SUMX 460ms versus plain SUM 435ms — SUM wins when there is nothing to fold"
            caption="SUMX: 460ms. Plain SUM: 435ms — SUM wins when there's nothing to fold."
            width={1128}
            height={398}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The rule that actually holds</h2>
          <p>
            It isn't &ldquo;avoid SUMX&rdquo; and it isn't &ldquo;prefer SUMX.&rdquo; It's: SUMX
            helps when it lets the engine do one pass instead of several. It costs when it's wrapping
            something a native aggregation already does directly, with zero help needed.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              General DAX guidance points in a direction. The real answer for your calculation comes
              from Performance Analyzer on your actual data volume.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'The same function was ~7x faster in one case and slightly slower in the very next',
              'The deciding factor is whether SUMX collapses multiple scans into one',
              "Test the specific calculation at real volume; don't apply the blanket rule blind",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

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
