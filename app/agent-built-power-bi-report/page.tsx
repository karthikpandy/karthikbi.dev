import Image from 'next/image'
import PostShell from '@/components/PostShell'

const IMG = '/blog/agent-built-power-bi-report'

const TITLE = 'An Agent Built My Power BI Report in 38 Minutes. It Audited My Model First.'
const DESCRIPTION =
  "I gave an agent Microsoft's Power BI report skill and my 1,851,282-flight model. Before building anything, it found five empty columns, a disconnected table and no month field."
const OG_ALT =
  'The finished Flight Delay Atlas: KPI row, day-by-hour heatmap, airline ranking, delay causes and busiest routes'

export const metadata = {
  title: `${TITLE} — karthikbi.dev`,
  description: DESCRIPTION,
  authors: [{ name: 'Karthik Pandy' }],
  alternates: {
    canonical: 'https://karthikbi.dev/agent-built-power-bi-report/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://karthikbi.dev/agent-built-power-bi-report/',
    siteName: 'karthikbi.dev',
    type: 'article',
    publishedTime: '2026-11-16',
    authors: ['Karthik Pandy'],
    images: [{ url: `${IMG}/final.png`, width: 1108, height: 637, alt: OG_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${IMG}/final.png`],
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

export default function AgentBuiltPowerBiReportPage() {
  return (
    <PostShell slug="agent-built-power-bi-report">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section className="space-y-3">
          <p>Last month an agent built me a Fabric App on 1,851,282 US flights.</p>
          <p>
            This time I gave an agent the same data and asked for something more ordinary: a
            Power BI report.
          </p>
          <p>
            The tool was Microsoft&apos;s open-source Power BI report skill. It&apos;s a set of
            instructions plus two command-line tools that let an AI coding agent plan, write,
            validate and check a report in PBIP format.
          </p>
          <p>
            The interesting part wasn&apos;t the report. It was everything the agent did before it
            built anything.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">The setup</h2>
          <p>
            A new report in Power BI Desktop, live-connected to my flights semantic model, saved
            as PBIP. The skill copied into the project folder. Two CLIs installed with npm.
          </p>
          <p>
            Then one prompt: plan first, show me a design brief, wait for my OK, then build.
            Validate after every batch of edits. Keep a build log.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            It couldn&apos;t see the model at first
          </h2>
          <p>
            A live-connected report has no local copy of the model. So the agent had to read the
            table, column and measure names from the service.
          </p>
          <p>
            It took three tries. The agent&apos;s tools were signed in to the wrong account, and
            that account couldn&apos;t see my workspace.
          </p>
          <p>
            That&apos;s not a Power BI problem. It&apos;s the most ordinary problem there is. But
            the agent stopped and told me, instead of guessing field names.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Then it audited my model</h2>
          <p>Before writing a single visual, it checked the model against the raw data.</p>
          <Bullets
            items={[
              'It recalculated on-time %, average arrival delay and cancelled % from the raw columns. All three matched my measures.',
              "It found five columns that were 100% empty, including the scheduled departure hour I'd planned to use.",
              "It found that the airports table had no relationship to anything. It couldn't filter a single visual.",
              'It found there was no month field, because Auto Date/Time was off.',
            ]}
          />
          <p>
            Then it designed around all of it. The heatmap used actual departure hour. Month
            became a date-range slicer. And it asked before suggesting any model change.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              The most useful thing the agent did happened before it built anything.
            </p>
          </blockquote>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">The build</h2>
          <p>I approved the brief. The agent wrote the page.</p>
          <p>
            The first validation found 8 errors in its own files. It fixed them before Power BI
            Desktop ever opened the report.
          </p>
          <p>
            Then one more snag: my Desktop is a Microsoft Store install, and the tool couldn&apos;t
            find it in the usual place. I opened the file myself.
          </p>
          <Figure
            src={`${IMG}/first-render.png`}
            alt="First render: the KPI cards were empty and every percentage showed as a decimal"
            width={1405}
            height={1254}
          />
          <p>
            The first render passed validation and was still wrong. Empty KPI cards. Percentages
            showing as 0.75.
          </p>
          <p>One review round fixed it.</p>
          <Figure src={`${IMG}/final.png`} alt={OG_ALT} width={1108} height={637} />
          <p>
            Prompt to finished page: about 38 minutes, including the sign-in detour. Not a
            benchmark.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            What it logged instead of faking
          </h2>
          <p>
            The build log was the most honest part. Where the model couldn&apos;t support what
            I&apos;d asked for, it said so:
          </p>
          <Bullets
            items={[
              'Delay causes are columns, not a category. So instead of one bar per cause, it built stacked bars by airline.',
              'A Top N filter can only rank one column, and a route is two. So the routes table sorts by flights and scrolls.',
              "One slicer setting couldn't be set in the report files at all.",
            ]}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Caveats</h2>
          <Bullets
            items={[
              'One model, one page, one evening.',
              "The agent works on PBIP files. A .pbix won't do.",
              "Validation passing isn't the same as correct on screen. Look at it.",
            ]}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <Bullets
            items={[
              'An agent is only as good as what it can see. Getting it signed in to the right place was half the work.',
              "The planning step was worth more than the build. It found model problems I didn't know about.",
              '"Validated" proved less than "looked at". Always check the first render.',
            ]}
          />
        </section>
      </div>
    </PostShell>
  )
}
