import Image from 'next/image'
import PostShell from '@/components/PostShell'

export const metadata = {
  title: 'One Calculated Column Cost 1.4MB on a 10.9M-Row Table. The Measure Cost Nothing. — karthikbi.dev',
  description:
    'On sample data the difference is invisible. At 10.9 million rows, a single calculated column added over a megabyte to the file — and the identical logic as a measure added zero.',
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

export default function CalcColumnsVsMeasuresPage() {
  return (
    <PostShell slug="calculated-columns-vs-measures-at-scale">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            On sample data, the calculated-column-versus-measure debate is invisible — a few KB
            nobody notices. So I ran it on something real: the NYC Yellow Taxi trip dataset, 10.9
            million rows.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The quick option</h2>
          <p>
            I needed a combined total of three columns — fare, tip, and tolls. The fast way is a
            calculated column:
          </p>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-4 leading-relaxed">
            <code>{`TotalCalc =
nyc_taxi[fareAmount] + nyc_taxi[tipAmount] + nyc_taxi[tollsAmount]`}</code>
          </pre>
          <p className="mt-3">
            Simple, and it works immediately in any visual. But a calculated column is materialised —
            computed once at refresh and physically stored, one value per row, forever, whether
            anything queries it or not. At 10.9 million rows, that adds up.
          </p>
          <Figure
            src="/blog/calculated-columns-vs-measures-at-scale/calccolumn-fieldlist.png"
            alt="TotalCalc added as a calculated column — materialised, stored in every row"
            caption="TotalCalc added as a calculated column — materialised, stored in every row."
            width={842}
            height={795}
            cap={560}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The same logic as a measure</h2>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-2 leading-relaxed">
            <code>{`Total =
SUMX (
    nyc_taxi,
    nyc_taxi[fareAmount] + nyc_taxi[tipAmount] + nyc_taxi[tollsAmount]
)`}</code>
          </pre>
          <p className="mt-3">
            Same row-level logic, same result in any visual — but a measure computes on the fly at
            query time and stores nothing.
          </p>
          <Figure
            src="/blog/calculated-columns-vs-measures-at-scale/measure-fieldlist.png"
            alt="Same result, now as a measure — computed at query time, nothing stored"
            caption="Same result, now as a measure — computed at query time, nothing stored."
            width={846}
            height={799}
            cap={560}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Three versions of the same file
          </h2>
          <ul className="mt-1 space-y-1.5 pl-0">
            {[
              'Base file, no extra column — 219,231 KB',
              'With the calculated column — 220,632 KB, an extra 1,401 KB from one column',
              'With the measure instead — 219,231 KB, identical to base',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Figure
            src="/blog/calculated-columns-vs-measures-at-scale/filesize-comparison.png"
            alt="Same 10.9M-row table, three versions — the calc column is the only one that costs anything"
            caption="Same 10.9M-row table, three versions — the calculated column is the only one that costs anything."
            width={652}
            height={121}
            cap={520}
          />
          <Figure
            src="/blog/calculated-columns-vs-measures-at-scale/base-fieldlist.png"
            alt="Base file — no TotalCalc field present"
            caption="Base file — no TotalCalc field present."
            width={839}
            height={782}
            cap={560}
          />
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              If the same logic can be a measure, it almost always should be. Save the calculated
              column for when you genuinely need to filter or slice on that value.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              "One unnecessary calculated column here cost over a megabyte — and that's one column on one table",
              'Multiply that by every calc column added out of habit across a real model and it becomes a measurable cost',
              'Calculated columns earn their place when you need to group, filter, or slice on the value — not for building a total',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
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
