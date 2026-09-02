import Image from 'next/image'
import PostShell from '@/components/PostShell'

export const metadata = {
  title: 'I Built the Same View-Switcher Two Ways: Bookmarks vs Field Parameters — karthikbi.dev',
  description:
    'Bookmarks won on setup speed. Field parameters won on object count, on what actually gets swapped, and on every view I added afterward.',
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

export default function FieldParametersVsBookmarksPage() {
  return (
    <PostShell slug="field-parameters-vs-bookmarks">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            The requirement was small: let a report user switch a bar chart's axis between Product
            name and Customer name. I've always reached for bookmarks for this. This time I built it
            both ways and compared them directly, instead of just going with the familiar one.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The bookmark version</h2>
          <p>
            Built the &ldquo;By Product&rdquo; view, saved a bookmark. Switched the chart to
            &ldquo;By Customer,&rdquo; saved a second. Added two buttons, assigned each a bookmark
            action. Result: two bookmarks, two buttons, and Power BI now tracking visual state —
            position, filters, formatting — as part of each bookmark, which is a lot more than
            &ldquo;which field is on the axis.&rdquo;
          </p>
          <Figure
            src="/blog/field-parameters-vs-bookmarks/bookmarks-working.png"
            alt="The bookmark approach — two bookmarks, two buttons, chart swapped via bookmark actions"
            caption="The bookmark approach — two bookmarks, two buttons, chart swapped via bookmark actions."
            width={1395}
            height={486}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The field parameter version</h2>
          <p>
            Modeling → New Parameter → Fields. Added CompanyName and Name as the two swappable
            fields. Power BI generated a parameter table and a slicer automatically. I dropped the
            parameter onto the X-axis instead of a hardcoded field, and the chart started swapping
            live off the slicer selection.
          </p>
          <Figure
            src="/blog/field-parameters-vs-bookmarks/new-param-menu.png"
            alt="New Parameter → Fields, the entry point for the field parameter approach"
            caption="New Parameter → Fields, the entry point for the field parameter approach."
            width={964}
            height={429}
          />
          <Figure
            src="/blog/field-parameters-vs-bookmarks/param-dialog.png"
            alt="Two fields added to the parameter — Power BI auto-generates the table and slicer"
            caption="Two fields added to the parameter — Power BI auto-generates the table and slicer."
            width={708}
            height={678}
            cap={520}
          />
          <Figure
            src="/blog/field-parameters-vs-bookmarks/param-working.png"
            alt="The field parameter approach — one parameter table, one slicer, chart swaps live"
            caption="The field parameter approach — one parameter table, one slicer, chart swaps live."
            width={1413}
            height={541}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Field parameters won, and not narrowly
          </h2>
          <ul className="mt-1 space-y-2.5 pl-0">
            {[
              'Object count — the field parameter needed one table and one slicer. Bookmarks needed two bookmarks and two buttons, and one more of each for every view you add.',
              "What's actually being swapped — a field parameter changes the field on the axis and nothing else. A bookmark captures the whole visual state at the moment you saved it: more than the job needs, and a source of subtle bugs later when the report changes.",
              'Adding a third view — one row in the parameter table, versus a third bookmark, a third button, and re-testing that the first two still work.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Bookmarks are still the right tool for what they're built for — snapshotting full report
            state (filters, drill state, visual visibility) for guided narratives or a &ldquo;reset
            view&rdquo; button. Axis switching isn't that.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              If the only thing you need to swap is which field drives a visual, reach for a field
              parameter first. Save bookmarks for when you genuinely need to capture the whole report
              state.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'Field parameters: fewer objects, trivially extendable, and they swap only what you asked them to',
              "Bookmarks capture extra state you didn't ask for, which ages badly as the report evolves",
              "Reach for the lightest tool that does the job — the familiar one isn't automatically the lightest",
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
