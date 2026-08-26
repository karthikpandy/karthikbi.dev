import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Auto-Detect Guessed My Cardinality, and Guessed It Wrong — karthikbi.dev',
  description:
    "Power BI's auto-detected relationship looked right for weeks — 1-to-1, bidirectional — until a customer placed a second order and refresh failed outright.",
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

export default function AutoDetectCardinalityPage() {
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
          Auto-Detect Guessed My Cardinality, and Guessed It Wrong
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-06-01">June 1, 2026</time>
          <span>·</span>
          <span>4 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">Data Modeling</span>
        </p>
      </header>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>
            Every model I inherit has at least one relationship that nobody drew on purpose. Power
            BI's auto-detect creates them the moment you load two tables that share a column name,
            and most of the time the result looks fine. That's exactly what makes it dangerous.
          </p>
          <p className="mt-3">
            This one came from a scratch workspace where I was rebuilding a Customer-to-Orders model
            on the SalesLT sample. I loaded the tables, let auto-detect wire them together, and moved
            on to the measures.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What auto-detect decided</h2>
          <p>
            It set the Customer-to-SalesOrderHeader relationship as one-to-one, bidirectional. At the
            moment it made that call, it was technically correct: every customer in the data I'd
            loaded happened to have exactly one order. Auto-detect reads cardinality off the rows in
            front of it, not off the business rule. It has no idea that a customer can obviously place
            a second order — nothing in the model said so, because nothing had violated it yet.
          </p>
          <Figure
            src="/blog/auto-detect-relationships-cardinality/before-model.png"
            alt="Auto-detect's original relationship — one-to-one, bidirectional, between Customer and SalesOrderHeader"
            caption="Auto-detect's original relationship — 1-to-1, bidirectional, between Customer and SalesOrderHeader."
            width={921}
            height={856}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The refresh that broke</h2>
          <p>The first time a customer placed a second order, refresh failed outright:</p>
          <pre className="bg-gray-900 text-gray-100 rounded-xl p-5 overflow-x-auto font-mono text-sm mt-4 leading-relaxed">
            <code>{`Column 'CustomerID' in Table 'SalesLT SalesOrderHeader'
contains a duplicate value '30050' and this is not allowed
for columns on the one side of a many-to-one relationship.`}</code>
          </pre>
          <Figure
            src="/blog/auto-detect-relationships-cardinality/error-dialog.png"
            alt="The refresh failure dialog, triggered when customer 30050 placed a second order"
            caption="The refresh failure, triggered the moment customer 30050 placed a second order."
            width={896}
            height={560}
          />
          <p className="mt-3">
            No warning at build time. No squiggle in Model view. The model was &ldquo;valid&rdquo;
            right up until real data disagreed with an assumption nobody had consciously made.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The fix is two dropdowns</h2>
          <p>In Model view I changed two things:</p>
          <ul className="mt-3 space-y-1.5 pl-0">
            {[
              'Cardinality — one-to-one → one-to-many, with Customer on the one side and SalesOrderHeader on the many side',
              'Cross-filter direction — bidirectional → single',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Figure
            src="/blog/auto-detect-relationships-cardinality/fixed-model.png"
            alt="Corrected relationship — one-to-many, single-direction cross-filter"
            caption="Corrected relationship — one-to-many, single-direction cross-filter."
            width={959}
            height={845}
          />
          <p className="mt-3">
            This is just the normal shape of a dimension-to-fact relationship — one customer, many
            orders. It's obvious once you look. The problem is that auto-detect will never tell you
            to look.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">After the fix</h2>
          <p>
            The same refresh that died on customer 30050 — Metropolitan Bicycle Supply — completed
            cleanly, and that customer correctly showed a count of 2. Total order count across all
            customers came to 33, complete and accurate.
          </p>
          <Figure
            src="/blog/auto-detect-relationships-cardinality/fixed-output.png"
            alt="Corrected output — Metropolitan Bicycle Supply now shows Count = 2, total 33 across all customers"
            caption="Corrected output — Metropolitan Bicycle Supply now shows Count = 2, total 33 across all customers."
            width={765}
            height={555}
          />
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              Auto-detected cardinality is a guess dressed up as a fact. On any dimension-to-fact
              relationship, open Model view and check it yourself before you build anything on top.
            </p>
          </blockquote>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'Auto-detect infers cardinality from the rows present when the relationship is created, not from the real-world rule',
              'Small or early datasets are the most likely to produce a wrong 1-to-1',
              'Verifying a relationship in Model view takes seconds; a broken production refresh does not',
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
