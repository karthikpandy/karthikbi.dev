import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: "Copilot Ignored a Real Field Twice. A Description Didn't Help. Synonyms Did. — karthikbi.dev",
  description:
    "'Extra' is an ambiguous field name. Copilot grabbed the wrong field, then grabbed another wrong one after I added a description. Synonyms were the only lever that worked.",
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

export default function CopilotSynonymsPage() {
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
          Copilot Ignored a Real Field Twice. A Description Didn't Help. Synonyms Did.
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-07-29">July 29, 2026</time>
          <span>·</span>
          <span>4 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">Copilot</span>
        </p>
      </header>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">Extra</code>{' '}
            is a genuinely ambiguous column name — it's a real field on the NYC taxi data (rush-hour
            and overnight surcharges), but no human would guess that without context, and neither did
            Copilot. I used it to find out which piece of model metadata actually changes Copilot's
            field selection.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Attempt 0 — raw field, no metadata
          </h2>
          <p>
            I asked: &ldquo;what's the total extra charges.&rdquo; Copilot skipped Extra entirely,
            picked <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">totalAmount</code>{' '}
            instead, and returned 170,582,317.45 labelled &ldquo;Sum of totalAmount.&rdquo; Its own
            explanation gave it away — it said the breakdown was &ldquo;missing,&rdquo; even though
            Extra had been in the model the whole time, just unrecognised.
          </p>
          <Figure
            src="/blog/copilot-synonyms-vs-descriptions/original-failure.png"
            alt="Original attempt — Copilot missed Extra entirely, returned Sum of totalAmount"
            caption="Original attempt — Copilot missed Extra entirely and returned Sum of totalAmount (170,582,317.45)."
            width={705}
            height={693}
            cap={560}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Attempt 1 — add a description
          </h2>
          <p>
            I added a field description: &ldquo;Extra charges applied outside the standard fare, such
            as rush hour or overnight surcharges.&rdquo; Asked the identical question again.
          </p>
          <p className="mt-3">
            Still wrong. This time Copilot grabbed{' '}
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">Total SUMX</code>,
            an unrelated measure, and returned 136,181,159.92. The description didn't move the field
            selection at all.
          </p>
          <Figure
            src="/blog/copilot-synonyms-vs-descriptions/description-added.png"
            alt="A field description added to Extra"
            caption="Attempt 1 — a field description added to Extra."
            width={560}
            height={963}
            cap={380}
          />
          <Figure
            src="/blog/copilot-synonyms-vs-descriptions/description-attempt.png"
            alt="Attempt 1 result — still wrong, Copilot grabbed Total SUMX"
            caption="Attempt 1 result — still wrong, Copilot grabbed Total SUMX (136,181,159.92)."
            width={558}
            height={952}
            cap={380}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Attempt 2 — add synonyms</h2>
          <p>
            Same field, added explicit synonyms:{' '}
            <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
              surcharge, extra fee, additional charge, extra amount
            </code>
            . Asked the same question a third time.
          </p>
          <p className="mt-3">
            Correct. Copilot identified Extra directly and returned 3,414,531.09 labelled &ldquo;Sum
            of Extra,&rdquo; with an accurate written summary.
          </p>
          <Figure
            src="/blog/copilot-synonyms-vs-descriptions/synonyms-success.png"
            alt="Attempt 2 result — synonyms added, Copilot correctly identified Extra"
            caption="Attempt 2 result — synonyms added, Copilot correctly identified Extra (Sum of Extra, 3,414,531.09)."
            width={502}
            height={747}
            cap={380}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What that tells me</h2>
          <p>
            Not all metadata is equal to Copilot. A description didn't change which field got picked.
            Synonyms — mapping the actual business phrase (&ldquo;extra charges&rdquo;) to the field
            — did. Microsoft's guidance points to AI data schema and AI instructions as
            higher-priority levers still; that's the next thing I want to test.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              If Copilot is missing an obviously relevant field, try synonyms before assuming a
              longer description will fix it. In this test it was the only lever that worked.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'Description and synonyms are not interchangeable — only synonyms changed the outcome here',
              'Synonyms work best when they carry the exact phrases users actually type',
              'Worth testing next: AI data schema and AI instructions, which Microsoft ranks higher than either',
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
