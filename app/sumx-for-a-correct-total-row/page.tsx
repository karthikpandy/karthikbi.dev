import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'The Total Row Said $111,270.85. The Real Answer Was $146,626.18. — karthikbi.dev',
  description:
    "A measure's total row doesn't sum what's on screen — it re-evaluates in its own filter context. For a table of daily maximums, that's a different number, and it's wrong for what it claims to be.",
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

export default function SumxForCorrectTotalRowPage() {
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
          The Total Row Said $111,270.85. The Real Answer Was $146,626.18.
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-07-21">July 21, 2026</time>
          <span>·</span>
          <span>3 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">DAX</span>
        </p>
      </header>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            This one isn't a performance question. It's a correctness one, and it's easy to ship
            without noticing.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            The total row didn't add up what was on screen
          </h2>
          <p>
            I built a simple table on the NYC taxi data: PickupDate down the rows, a Max Fare
            measure, one row per day showing that day's single highest fare. Then I turned on the
            Total row, expecting it to add up the values above it.
          </p>
          <p className="mt-3">
            It didn't. The Total showed the single highest fare across the entire 10.9-million-row
            table, recalculated with no date context at all — not the sum of the daily maximums.
          </p>
          <Figure
            src="/blog/sumx-for-a-correct-total-row/daily-max-vs-sum.png"
            alt="Max Fare Total 111,270.85 versus Sum of Daily Max Total 146,626.18"
            caption="Max Fare Total: 111,270.85 (single highest fare overall) vs. Sum of Daily Max Total: 146,626.18 (the real sum of daily peaks)."
            width={1071}
            height={718}
          />
          <p className="mt-3">
            This is standard behaviour: a measure's Total row doesn't sum the displayed values. It
            re-evaluates the measure in the filter context of the Total row itself. For{' '}
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">MAX()</code>,
            that context means &ldquo;ignore the per-day breakdown and find the one true
            maximum.&rdquo;
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Forcing per-date evaluation, then summing
          </h2>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-2 leading-relaxed">
            <code>{`Sum of Daily Max =
SUMX ( VALUES ( nyc_taxi[PickupDate] ), [Max Fare] )`}</code>
          </pre>
          <p className="mt-3">
            This tells the engine: for each distinct date, evaluate Max Fare in that date's context,
            then sum those individual results. That's the operation a plain Total row can't do on its
            own.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">After the fix</h2>
          <p>
            The Total came to $146,626.18 — genuinely the sum of every visible daily max, and you can
            verify it by adding the column by hand. The original $111,270.85 is now visibly,
            provably wrong for what it claims to represent.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              A measure's Total row is a fresh recalculation in a different filter context, not
              &ldquo;the sum of what you see.&rdquo; For any aggregation-of-an-aggregation,{' '}
              SUMX(VALUES(...), [Measure]) is required, not optional.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'For anything other than a plain SUM, the Total row can silently disagree with the rows above it',
              '"Sum of a per-group value" — daily max, per-customer average — always needs SUMX(VALUES(...), [Measure])',
              "This is about getting a correct number, not a fast one",
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
