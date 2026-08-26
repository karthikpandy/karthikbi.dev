import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: '18 Fields in One Flat List, Half of Them Nobody Should Touch — karthikbi.dev',
  description:
    'Raw lat/long, an internal system flag, a vendor ID — all sitting in the field list next to the measures people actually need. Hiding and foldering it costs five minutes once.',
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

export default function DisplayFoldersPage() {
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
          18 Fields in One Flat List, Half of Them Nobody Should Touch
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-08-05">August 5, 2026</time>
          <span>·</span>
          <span>3 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">Data Modeling</span>
        </p>
      </header>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            Every field you leave visible is a tax on whoever builds the next report — including
            future-you. This model had 18 fields in one flat list and no signal about which ones
            mattered.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            One long list, no structure
          </h2>
          <p>
            Real reportable measures — fareAmount, tipAmount, totalAmount — sat directly next to
            fields nobody building a report should touch: raw coordinates (startLat, startLon,
            endLat, endLon), an internal system flag (storeAndFwdFlag), a code with no readable
            meaning on its own (rateCodeId), and an internal identifier (vendorID). Eighteen fields,
            alphabetical-ish, no grouping.
          </p>
          <Figure
            src="/blog/display-folders-field-list-hygiene/before-flat-list.png"
            alt="18 fields, flat list — real reportable measures mixed with raw coordinates and internal IDs"
            caption="18 fields, flat list — real reportable measures mixed with raw coordinates and internal IDs."
            width={372}
            height={579}
            cap={320}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Hide the internal fields, folder the rest
          </h2>
          <ul className="mt-1 space-y-1.5 pl-0">
            {[
              'Hid — startLat, startLon, endLat, endLon, storeAndFwdFlag, rateCodeId, vendorID',
              'Grouped the rest into two display folders — Fare Breakdown (Extra, Fare Amount, MTA Tax, Tip Amount, Tolls Amount, Total Amount) and Trip Details (Dropoff / Pickup DateTime, Passenger Count, Trip Distance)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Figure
            src="/blog/display-folders-field-list-hygiene/after-folders.png"
            alt="Same fields, organised into Fare Breakdown and Trip Details folders — internal fields hidden"
            caption="Same fields, organised into Fare Breakdown and Trip Details folders — internal fields hidden, not deleted."
            width={378}
            height={470}
            cap={320}
          />
          <p className="mt-3">
            Nothing was deleted. The hidden fields are still there for anyone who genuinely needs raw
            coordinates — a mapping visual, say — they're just out of the default view.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What changed</h2>
          <p>
            A report author now opens two clearly-labelled folders instead of scanning 18 mixed
            fields for the two or three they need. That's the whole payoff, and it cost about five
            minutes.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              Hiding internal fields and grouping the rest into display folders costs a few minutes
              once and pays off every time someone opens the field list.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'Hiding a field changes nothing about what a measure or DAX formula can reference',
              'This is pure cleanup — no trade-off, no risk',
              'Do it once per model and every future report-builder inherits the benefit',
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
