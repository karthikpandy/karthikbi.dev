import Image from 'next/image'
import PostShell from '@/components/PostShell'

export const metadata = {
  title: 'One Checkbox, 55KB, and Only Two Date-Heavy Tables — karthikbi.dev',
  description:
    'Auto Date/Time builds a hidden Year/Quarter/Month/Day hierarchy for every date column whether you ask for it or not. On a two-table model that was 55KB — about 15%.',
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

export default function DisableAutoDateTimePage() {
  return (
    <PostShell slug="disable-auto-date-time">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            Auto Date/Time is on by default in Power BI, and it does something more expensive than
            most people realise: for every date column in every table, it builds a hidden
            Year/Quarter/Month/Day hierarchy table. Whether you use it or not.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Two tables, five hidden hierarchies
          </h2>
          <p>
            I loaded exactly two tables from SalesLT — SalesOrderDetail and SalesOrderHeader. Between
            them they had five date columns: ModifiedDate, DueDate, OrderDate, ShipDate, and a second
            ModifiedDate. Every one of them got its own auto-generated date hierarchy in the field
            list. I'd asked for none of them. Most reports need real date intelligence on one column,
            maybe two.
          </p>
          <Figure
            src="/blog/disable-auto-date-time/default-hierarchies.png"
            alt="Five separate date columns, each with its own auto-generated Date Hierarchy"
            caption="Five separate date columns, each with its own auto-generated Date Hierarchy nobody asked for."
            width={426}
            height={944}
            cap={360}
          />
          <Figure
            src="/blog/disable-auto-date-time/auto-datetime-on.png"
            alt="The default setting — Auto date/time on under Time Intelligence"
            caption="The default — File → Options → Data Load → Time Intelligence, with Auto date/time on."
            width={1008}
            height={820}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            The fix is unchecking one box
          </h2>
          <p>
            File → Options → Data Load → Time Intelligence → uncheck Auto date/time. Do it under
            Global, not just Current File, so every new file starts clean.
          </p>
          <Figure
            src="/blog/disable-auto-date-time/auto-datetime-off.png"
            alt="Auto date/time turned off — one checkbox"
            caption="Auto date/time turned off — one checkbox, no rebuild required for a new file."
            width={1012}
            height={820}
          />
          <Figure
            src="/blog/disable-auto-date-time/no-hierarchies.png"
            alt="Field list after the fix — plain date columns, no auto-generated hierarchies"
            caption="Field list after the fix — plain date columns, no auto-generated hierarchies."
            width={406}
            height={750}
            cap={360}
          />
          <p className="mt-3">
            No rebuild for a new file. An existing file needs the date columns reloaded before the
            field list clears out.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What it saved</h2>
          <p>
            I saved the same model two ways for a direct comparison: 370KB with the default
            hierarchies, 315KB without. A ~15% reduction from one checkbox, on a model with two
            tables.
          </p>
          <Figure
            src="/blog/disable-auto-date-time/file-size-comparison.png"
            alt="Same model, same data — 55KB saved from one setting"
            caption="Same model, same data — 55KB saved from one setting."
            width={633}
            height={130}
            cap={520}
          />
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              Auto Date/Time is a convenience that bills you silently on every date column — extra
              tables, larger files, slower refresh. Turn it off globally and build date tables where
              you actually need them.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'The cost scales with the number of date columns, not the number you actually use',
              '15% on a two-table model; on a real model with dozens of date columns it compounds fast',
              'Turn it off at the Global level so every new file inherits the clean default',
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
