import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Sum of UnitPriceDiscount Showed $8.4 — A Number That Means Nothing — karthikbi.dev',
  description:
    'Drag a discount rate into a table and Power BI sums it by default. The total row read $8.4, formatted as currency, looking exactly like something you would trust.',
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

export default function ImplicitMeasuresPage() {
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
          &ldquo;Sum of UnitPriceDiscount&rdquo; Showed $8.4 — A Number That Means Nothing
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-06-16">June 16, 2026</time>
          <span>·</span>
          <span>3 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">DAX</span>,{' '}
          <span className="tag-link">Data Modeling</span>
        </p>
      </header>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">UnitPriceDiscount</code>{' '}
            on the SalesLT SalesOrderDetail table is a rate — a decimal like 0.05 or 0.10, a
            percentage off a line item. I dragged it straight into a table to eyeball it, the way you
            do, and didn't build a measure first.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Power BI picked an aggregation for me
          </h2>
          <p>
            With no explicit measure, Power BI applied its default implicit aggregation: Sum. The
            visual labelled itself &ldquo;Sum of UnitPriceDiscount,&rdquo; and the total row showed
            $8.4 — formatted as currency, sitting at the bottom of the table looking exactly like a
            real total.
          </p>
          <Figure
            src="/blog/implicit-measures-meaningless-total/implicit-sum.png"
            alt="Implicit Sum of UnitPriceDiscount — total shows $8.4, formatted as currency"
            caption="Implicit Sum of UnitPriceDiscount — total shows $8.4, formatted as currency."
            width={1016}
            height={545}
          />
          <p className="mt-3">
            But summing a rate across rows produces a number with no meaning. $8.4 isn't a discount
            amount, it isn't a percentage, it isn't anything a stakeholder could act on. It's what
            you get when you add percentages together, which isn't a valid operation for this data.
            Nothing in the UI flagged it, because Sum is the default for anything numeric.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            One explicit measure, with the right aggregation
          </h2>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-2 leading-relaxed">
            <code>{`Avg Discount =
AVERAGE ( 'SalesLT SalesOrderDetail'[UnitPriceDiscount] )`}</code>
          </pre>
          <p className="mt-3">
            Then swap that measure into the visual in place of the raw column — Average, not Sum,
            because that's the aggregation a rate actually deserves.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">After the fix</h2>
          <p>
            The total became $0.0155 — an actual average discount rate across all orders. Individual
            rows changed too, from arbitrary summed values to real per-order averages. Row 71845 went
            from a flat $0.4 sum to a correctly averaged $0.0129.
          </p>
          <Figure
            src="/blog/implicit-measures-meaningless-total/explicit-average.png"
            alt="Explicit Avg Discount measure — total now correctly shows $0.0155"
            caption="Explicit Avg Discount measure — total now correctly shows $0.0155."
            width={995}
            height={523}
          />
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              Power BI will sum anything numeric — rates, percentages, even IDs — unless you tell it
              otherwise. Before trusting an implicit total, ask what aggregation the column actually
              deserves.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'An implicit total can be formatted like currency and still be meaningless',
              'Rates and percentages need Average (or a weighted calculation), never a plain Sum',
              "If a field isn't meant to be summed, build the measure explicitly rather than leaning on the default",
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
