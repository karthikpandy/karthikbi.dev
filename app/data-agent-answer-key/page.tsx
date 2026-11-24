import Image from 'next/image'
import PostShell from '@/components/PostShell'

const IMG = '/blog/data-agent-answer-key'

const TITLE = "I Gave My Data Agent an Answer Key. Fluent Wasn't the Same as Correct."
const DESCRIPTION =
  'I tested a Fabric data agent on 1,851,282 flights with 8 questions and an answer key. Three were exact. The rest taught me where the agent ends and the model begins.'
const OG_ALT =
  'Eight answer rows: three checked, four unchecked, and one flagged in red'

// Pixel sizes of the images in public/blog/data-agent-answer-key/
const SIZE = {
  hourFailed: { width: 1140, height: 307 },
  routesBefore: { width: 652, height: 651 },
  hourFixedDax: { width: 957, height: 542 },
  routesAfter: { width: 597, height: 257 },
  airlineFinal: { width: 611, height: 585 },
}

export const metadata = {
  title: `${TITLE} — karthikbi.dev`,
  description: DESCRIPTION,
  authors: [{ name: 'Karthik Pandy' }],
  alternates: {
    canonical: 'https://karthikbi.dev/data-agent-answer-key/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://karthikbi.dev/data-agent-answer-key/',
    siteName: 'karthikbi.dev',
    type: 'article',
    publishedTime: '2026-11-23',
    authors: ['Karthik Pandy'],
    images: [{ url: `${IMG}/og.jpg`, width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${IMG}/og.jpg`],
  },
}

function Figure({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <figure className="my-6">
      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mx-auto">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="w-full h-auto"
        />
      </div>
    </figure>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-0">
      {items.map((point) => (
        <li key={point} className="flex items-start gap-3">
          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  )
}

export default function DataAgentAnswerKeyPage() {
  return (
    <PostShell slug="data-agent-answer-key">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section className="space-y-3">
          <p>
            At Microsoft Ignite this month, one session line stuck with me: a data agent always
            gives you an answer. Fluent isn&apos;t the same as correct.
          </p>
          <p>So I tested one on my own model, with an answer key.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">The setup</h2>
          <p>
            The model: 1,851,282 US domestic flights, May to July 2026, from public BTS on-time
            data. The same model behind my Fabric App and my agent-built report.
          </p>
          <p>
            A Fabric data agent pointed at that semantic model. One note: my trial capacity
            couldn&apos;t create data agents at all. It needed a paid capacity. I used the smallest
            one, F2, and paused it when I was done.
          </p>
          <p>
            Eight fixed questions. For the first three I knew the exact answers. For the rest, my
            own report was the answer key.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Round 1: no setup, just ask
          </h2>
          <p>The three numbers were exact:</p>
          <Bullets
            items={[
              'On-time: 74.8%',
              'Average arrival delay: 11.2 minutes',
              'Cancelled: 1.74%',
            ]}
          />
          <p>Then it got interesting.</p>
          <p>
            <strong>&quot;Which hour of the day has the worst on-time rate?&quot;</strong> It said
            it couldn&apos;t tell. No breakdown came back.
          </p>
          <p>That was the honest answer. It didn&apos;t invent one.</p>
          <Figure
            src={`${IMG}/hour-failed.png`}
            alt="Round 1: the agent couldn't get an hourly breakdown, and said so"
            {...SIZE.hourFailed}
          />
          <p>
            <strong>&quot;Which routes got worse from May to July?&quot;</strong> It found 4,118 of
            them. The worst: CAK to FLL, from 100% on time to 22.2%.
          </p>
          <p>On about nine flights.</p>
          <Figure
            src={`${IMG}/routes-before.png`}
            alt='Round 1: the "worst" routes were tiny samples'
            {...SIZE.routesBefore}
          />
          <p>
            <strong>&quot;Which airline is the worst?&quot;</strong> NK, at 68.4% on time. I
            checked it against my own app. Correct.
          </p>
          <p>On 354 flights, out of 1.85 million.</p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              The scariest answers weren&apos;t wrong. They were correct, and meaningless.
            </p>
          </blockquote>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            The agent rewrote my question
          </h2>
          <p>
            The hour failure made no sense. My report has an hour-by-day heatmap built on the same
            model.
          </p>
          <p>
            So I opened the agent&apos;s steps. Before querying the model, it had rewritten my
            question:
          </p>
          <p>
            &quot;Find the hour of the day (using <strong>scheduled</strong> departure hour)…&quot;
          </p>
          <p>
            My model has a scheduled-hour column. It&apos;s 100% empty. The agent chose it, got
            nothing back, and correctly said it couldn&apos;t answer.
          </p>
          <p>That&apos;s when it clicked. There are two layers here:</p>
          <Bullets
            items={[
              'The agent decides what question to ask the model.',
              'The model decides how to answer it in DAX.',
            ]}
          />
          <p>A fix in only one layer wasn&apos;t enough.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">The fixes</h2>
          <p>In the agent&apos;s instructions:</p>
          <Bullets
            items={[
              'For hour-of-day questions, ask for the actual departure hour. Never the scheduled one.',
              'Minimum sample rules for rankings.',
              'Always state the definition and filters used.',
            ]}
          />
          <p>In the semantic model, under Prep data for AI:</p>
          <Bullets
            items={[
              'I hid the five empty columns from AI entirely.',
              'I added an instruction with the exact query pattern for on-time % by hour.',
            ]}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Round 2</h2>
          <p>
            <strong>Worst hour:</strong> 8 PM, at 61.5%. The agent&apos;s step now said &quot;using
            DepHour&quot;, and the DAX matched the pattern I&apos;d added to the model, line for
            line.
          </p>
          <Figure
            src={`${IMG}/hour-fixed-dax.png`}
            alt="Round 2: the agent asked for the actual departure hour, and the DAX followed"
            {...SIZE.hourFixedDax}
          />
          <p>
            <strong>Worst routes:</strong> 1,582 routes with at least 100 flights in both months.
            Top of the list: PHL–BTV, from 88.8% to 48.6%. A real decline, on real volume.
          </p>
          <p>
            My model has no month field. The agent built one itself from the flight date and
            applied the 100-flight rule exactly as instructed.
          </p>
          <Figure
            src={`${IMG}/routes-after.png`}
            alt="Round 2: only routes with at least 100 flights in both months"
            {...SIZE.routesAfter}
          />
          <p>
            <strong>Worst airline:</strong> still NK.
          </p>
          <p>
            The agent followed my rule perfectly. At least 100 flights, and NK has 354. My rule was
            the problem. A hundred flights is a sensible bar for a route. For an airline, when the
            others fly hundreds of thousands, it&apos;s nothing.
          </p>
          <p>
            I raised the bar for airlines to 10,000 flights and asked again: WN, 69.2% on time,
            across 366,573 flights. That matches my report exactly. And the agent stated its
            definition and its minimum-flight rule before giving the answer.
          </p>
          <Figure
            src={`${IMG}/airline-final.png`}
            alt="Round 2: definition, minimum-flight rule, then the answer — and it matches the report"
            {...SIZE.airlineFinal}
          />
          <p>About 35 minutes of hands-on time, start to finish.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Caveats</h2>
          <Bullets
            items={[
              'One model, eight questions, one evening.',
              "Data agents need a paid capacity. My trial couldn't create one.",
              "Answers can vary between runs. That's exactly why a fixed answer key matters.",
            ]}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <Bullets
            items={[
              'An answer key turns "sounds right" into "is right." Keep one, and re-run it after every model change.',
              'Put meaning in both layers. The agent shapes the question; the model shapes the query.',
              'Watch for correct-but-meaningless answers. Small samples looked exactly as confident as real findings.',
            ]}
          />
        </section>
      </div>
    </PostShell>
  )
}
