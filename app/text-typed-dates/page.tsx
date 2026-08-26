import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: "A Text-Typed Date Column Doesn't Announce Itself as Broken — karthikbi.dev",
  description:
    'OrderDate came in as text. Nothing errored — the line chart just sorted Aug → Jul → Jun, and Relative date was missing from the filter pane entirely.',
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

export default function TextTypedDatesPage() {
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
          A Text-Typed Date Column Doesn't Announce Itself as Broken
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-06-09">June 9, 2026</time>
          <span>·</span>
          <span>3 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">Power Query</span>
        </p>
      </header>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            A date column stored as text is one of those problems that never throws an error. It just
            quietly removes features and sorts things wrong, and if you're not looking for it
            specifically, you can ship it.
          </p>
          <p className="mt-3">
            I hit this on a model where <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">OrderDate</code> came in from the source as Text. Could
            have been a CSV import, a source system storing dates as strings, or a type change
            someone made upstream months ago. By the time it reached me it was just text that looked
            like dates.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            It looks completely normal in a table
          </h2>
          <p>
            The column was there. The values displayed correctly. Nothing about a table view told me
            anything was wrong. The problem only showed up once the column hit a visual.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The chart sorted backwards</h2>
          <p>
            A line chart of Sum of SubTotal by OrderDate sorted Aug 2025 → Jul 2025 → Jun 2025 → Jun
            2025. Power BI was ordering the values alphabetically as strings, because that's what
            they were.
          </p>
          <Figure
            src="/blog/text-typed-dates/wrong-sort.png"
            alt="Sum of SubTotal by OrderDate, sorted Aug → Jul → Jun alphabetically as text"
            caption="Sum of SubTotal by OrderDate — sorted Aug → Jul → Jun → Jun, alphabetically as text, not chronologically."
            width={959}
            height={408}
          />
          <p className="mt-3">
            Then I opened the filter pane. The Filter type dropdown offered Advanced, Basic, and Top
            N — and that was it. No Relative date. Any time intelligence that depends on a real Date
            type simply wasn't on the menu.
          </p>
          <Figure
            src="/blog/text-typed-dates/no-relative-filter.png"
            alt="Filter type dropdown on the text-typed column — no Relative date option"
            caption="Filter type dropdown on the text-typed column — no Relative date or Relative time option available."
            width={213}
            height={318}
            cap={240}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            The fix is a type change, not a formula
          </h2>
          <p>
            In Power Query: right-click the <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">OrderDate</code> header → Change Type → Date. Close &amp;
            Apply. No transformation, no custom column — the data was already dates, it was just
            wearing the wrong type.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">After the fix</h2>
          <p>
            Same chart, same data: Jun → Jul → Aug, chronological. And the filter pane now offered
            Relative date and Relative time — features that were invisible a minute earlier on the
            exact same column, typed wrong.
          </p>
          <Figure
            src="/blog/text-typed-dates/fixed-sort-and-filter.png"
            alt="Corrected — chart sorts chronologically and Relative date filters appear"
            caption="Corrected — the chart sorts chronologically, and Relative date / Relative time now appear as filter options."
            width={1194}
            height={448}
          />
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              A text-typed date field passes every check that looks at values and fails every one
              that depends on type. Check column types the moment you connect a source, not when
              something visibly breaks.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'No error, no warning — a wrong type only shows up as wrong behaviour downstream',
              'Text dates silently disable correct sorting, relative-date filters, and time intelligence',
              'The fix is a five-second type change in Power Query; finding it is the slow part',
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
