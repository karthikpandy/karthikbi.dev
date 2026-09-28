import Image from 'next/image'
import PostShell from '@/components/PostShell'

export const metadata = {
  title: 'What Direct Lake Actually Is: I Added a Row and Never Refreshed the Model — karthikbi.dev',
  description:
    'I inserted one row into a Fabric Warehouse table and watched a Power BI report pick it up without a manual model refresh, and what that says about how Direct Lake works.',
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

export default function WhatIsDirectLakePage() {
  return (
    <PostShell slug="what-is-direct-lake">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            Direct Lake gets described as Import speed with live data. I wanted to watch the live
            part happen.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What it is</h2>
          <p>
            Import copies your data into the model. DirectQuery sends every query back to the
            source. Direct Lake does neither. It pulls the Delta Parquet files from OneLake into
            memory when a query first needs them, and holds them there until they age out. A Fabric
            Warehouse stores its tables as Delta Parquet in OneLake, so a Warehouse table qualifies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The test</h2>
          <p>
            I built a Direct Lake on OneLake model over a 10.9-million-row table in a Fabric
            Warehouse (the NYC taxi data I use for these tests) and put a single card on a report:
            Sum of fareAmount.
          </p>
          <Figure
            src="/blog/what-is-direct-lake/direct-lake-storage-mode.png"
            alt="The table shown in Direct Lake storage mode"
            caption="The table in Direct Lake storage mode."
            width={1194}
            height={719}
          />
          <Figure
            src="/blog/what-is-direct-lake/card-before.png"
            alt="Sum of fareAmount before the insert: 136.18M"
            caption="Sum of fareAmount before the insert: 136.18M."
            width={390}
            height={320}
            cap={360}
          />
          <p>
            I then inserted one synthetic test row into the Warehouse table, with a fareAmount of
            1,000,000.
          </p>
          <Figure
            src="/blog/what-is-direct-lake/insert-row.png"
            alt="The insert statement, 1 record affected"
            caption="The insert, 1 record affected."
            width={1501}
            height={595}
          />
          <p>I refreshed the report, not the semantic model, and the card moved.</p>
          <Figure
            src="/blog/what-is-direct-lake/card-after-insert.png"
            alt="Sum of fareAmount after the insert: 137.18M"
            caption="After the insert: 137.18M."
            width={470}
            height={288}
            cap={400}
          />
          <p>Then I deleted the row.</p>
          <Figure
            src="/blog/what-is-direct-lake/delete-row.png"
            alt="The delete statement, 1 record affected"
            caption="The delete, 1 record affected."
            width={1503}
            height={595}
          />
          <Figure
            src="/blog/what-is-direct-lake/card-after-delete.png"
            alt="Sum of fareAmount back to 136.18M after the delete"
            caption="Back to 136.18M."
            width={485}
            height={308}
            cap={400}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Why it worked</h2>
          <p>
            Nothing was loaded and nothing was scheduled. A Direct Lake model has a setting, Keep
            your Direct Lake data up to date, that is on by default. When it detects changes in the
            underlying Delta tables, it re-frames the model to point at the new data. A Direct Lake
            refresh copies only metadata, which is why it takes seconds instead of the time an
            Import refresh needs to copy everything.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              Direct Lake doesn&rsquo;t copy your data into the model. It points the model at the
              data, and re-points it when the data changes.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'The model read the same Delta files the Warehouse wrote, with no copy step in between',
              "The freshness came from a default setting, so it's worth knowing it exists before you rely on it",
              'The test row was synthetic and I removed it afterward. The run was on a trial capacity.',
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
