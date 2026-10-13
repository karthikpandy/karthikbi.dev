import Image from 'next/image'
import PostShell from '@/components/PostShell'

const IMG = '/blog/build-a-fabric-app-with-claude-code'

export const metadata = {
  title: 'Building a Fabric App with Claude Code: 1,851,282 Flights',
  description:
    '1,851,282 US flights, a semantic model and Claude Code. How I went from New item to a deployed Fabric App with a map, filters and animation.',
  alternates: {
    canonical: 'https://karthikbi.dev/build-a-fabric-app-with-claude-code/',
  },
  openGraph: {
    title: 'Building a Fabric App with Claude Code: 1,851,282 Flights',
    description:
      '1,851,282 US flights, a semantic model and Claude Code. How I went from New item to a deployed Fabric App with a map, filters and animation.',
    url: 'https://karthikbi.dev/build-a-fabric-app-with-claude-code/',
    siteName: 'karthikbi.dev',
    type: 'article',
    publishedTime: '2026-10-12',
    images: [
      {
        url: `${IMG}/08-phase2-mci-map-panel.png`,
        width: 1085,
        height: 1301,
        alt: 'Flight Delay Atlas filtered to MCI, with a US route map, a side panel of top routes and on-time % by hour',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Building a Fabric App with Claude Code: 1,851,282 Flights',
    description:
      '1,851,282 US flights, a semantic model and Claude Code. How I went from New item to a deployed Fabric App with a map, filters and animation.',
    images: [`${IMG}/08-phase2-mci-map-panel.png`],
  },
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
  caption?: string
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
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-gray-400 leading-relaxed">{caption}</figcaption>
      )}
    </figure>
  )
}

const codeClass = 'font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700'

const steps: React.ReactNode[] = [
  <>
    <strong>Turned on the tenant setting.</strong> &quot;Enable Fabric App Items (preview)&quot; in
    the admin portal.
    <Figure
      src={`${IMG}/01-tenant-setting.png`}
      alt="The Fabric admin portal tenant setting Enable Fabric App Items (preview), switched to Enabled for the entire organization"
      width={644}
      height={195}
      cap={644}
    />
  </>,
  <>
    <strong>Created the item.</strong> In the workspace, New item, then App (preview). I named it
    Flight Delay Atlas.
    <Figure
      src={`${IMG}/02-new-item-app-preview.png`}
      alt="The Fabric New item dialog searched for app, with the App (preview) tile highlighted"
      width={943}
      height={444}
      cap={943}
    />
    <Figure
      src={`${IMG}/03-new-app-dialog.png`}
      alt="The New App dialog with the name Flight Delay Atlas and the karthikbi-dev workspace as location"
      width={595}
      height={261}
      cap={595}
    />
  </>,
  <>
    <strong>Used the prompt it gives you.</strong> The item page has a &quot;Copy prompt&quot;
    button for AI coding agents. I pasted it into Claude Code. It scaffolded the project, started
    the dev server and created the backend item in my workspace. From creating the item to a running dev server: about 11 minutes.
    <Figure
      src={`${IMG}/04-item-page-copy-prompt.png`}
      alt="The Getting started section of the Fabric App item page, with the Copy prompt button for AI coding agents highlighted above the manual setup steps"
      width={1220}
      height={816}
      cap={820}
    />
    <Figure
      src={`${IMG}/05-claude-code-scaffold.png`}
      alt="Claude Code with the copied prompt pasted in, a numbered list of steps from running npm create to deploying with npx rayfin up"
      width={590}
      height={1033}
      cap={420}
    />
    <Figure
      src={`${IMG}/06-first-run.png`}
      alt="VS Code with the scaffolded Fabric App running on localhost in a browser tab and Claude Code asking where the flight data comes from"
      caption="First run, about 11 minutes in"
      width={1665}
      height={607}
    />
  </>,
  <>
    <strong>Told it where the data was.</strong> I gave it the name of my semantic model, the table
    and column names, and the measures. It attached the model as a connector.
  </>,
  <>
    <strong>Phase 1: the report-style part.</strong> KPI row, delay causes, airline ranking, a
    day-by-hour heatmap, a route table, and filters that every visual responds to. About 20
    minutes.
    <Figure
      src={`${IMG}/07-phase1-full-page.png`}
      alt="The phase 1 Flight Delay Atlas page: filters, KPI row, delay causes bar chart, airline ranking, day-by-hour heatmap and route table"
      width={977}
      height={1244}
      cap={640}
    />
  </>,
  <>
    <strong>Phase 2: the web-only part.</strong> About an hour.
  </>,
  <>
    <strong>Deployed.</strong> <code className={codeClass}>npx rayfin up</code>.
  </>,
]

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-0">
      {items.map((point, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  )
}

export default function BuildAFabricAppWithClaudeCodePage() {
  return (
    <PostShell slug="build-a-fabric-app-with-claude-code">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section>
          <p>Every report I build is shaped by what the visual lets me set.</p>
          <p className="mt-4">Not what the data can say. What the properties expose.</p>
          <p className="mt-4">
            So I built the same kind of answers as a Fabric App instead. Fabric Apps are in
            preview. Here&apos;s how it went.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The data</h2>
          <p>
            Public, so anyone can check it. US domestic flights from the BTS on-time performance
            files, May to July 2026. 1,851,282 flights, loaded into a Lakehouse and exposed through
            a semantic model. The app reads that model live. Nothing is copied into it.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">How I built it</h2>
          <ol className="space-y-4 pl-0 list-none">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="font-mono text-xs text-gray-400 w-4 flex-shrink-0 mt-0.5">
                  {i + 1}.
                </span>
                <div className="min-w-0 flex-1">{step}</div>
              </li>
            ))}
          </ol>
          <p className="mt-4">
            Clock time from creating the item to the deployed app: about an hour and 40 minutes,
            with a few breaks. Not a benchmark.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The prompts</h2>
          <p>Two rules did most of the work:</p>
          <div className="mt-3">
            <Bullets
              items={[
                'Aggregate in the model. Never pull raw rows into the browser.',
                'Keep a build log: what you tried, what broke, the fix.',
              ]}
            />
          </div>
          <p className="mt-4">
            I also asked it to plan first, and to check each feature in a browser before telling me
            it works.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What phase 2 added</h2>
          <Figure
            src={`${IMG}/08-phase2-mci-map-panel.png`}
            alt="The phase 2 Flight Delay Atlas filtered to MCI: a US route map of arcs coloured by average delay, with a side panel of MCI top routes and on-time % by scheduled hour"
            width={1085}
            height={1301}
            cap={720}
          />
          <figure className="my-6">
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mx-auto">
              <video
                controls
                muted
                playsInline
                preload="metadata"
                poster={`${IMG}/08-phase2-mci-map-panel.png`}
                aria-label="Short recording of the Flight Delay Atlas app: the route map, airport filtering and the Play the day animation"
                className="w-full h-auto block"
              >
                <source src={`${IMG}/demo.mp4`} type="video/mp4" />
              </video>
            </div>
          </figure>
          <Bullets
            items={[
              'A US route map with the 300 busiest routes as arcs, coloured by average delay, no map tiles',
              'Click an airport and the whole page filters to it, with a side panel for its top routes and on-time % by hour',
              'Filters live in the URL, so a copied link opens the same view',
              'Keyboard shortcuts, and a phone layout',
              'A "Play the day" button that animates flights along the arcs hour by hour',
            ]}
          />
          <p className="mt-4">
            Overall: 74.8% on-time, 11.2 min average arrival delay, 1.74% cancelled, 0.41% diverted.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">One thing that broke</h2>
          <p>
            Connectors don&apos;t run under <code className={codeClass}>rayfin dev</code>. My page
            showed <code className={codeClass}>Connector &apos;bts-flights&apos; is not declared</code>.
            The docs say to test via <code className={codeClass}>rayfin up</code>. I had Claude Code
            add a dev-only bridge to keep iterating locally, and removed it before the final deploy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I liked</h2>
          <p>The speed. I could create it, not just mock it.</p>
          <p className="mt-4">
            And the freedom. In a report I&apos;m limited to what&apos;s available: the visuals,
            their properties, the size they allow. An app is a normal web app, so I&apos;m wide
            open to anything a web app can do.
          </p>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              In a report, I work with what&apos;s available. In an app, I can do anything a normal
              web app can.
            </p>
          </blockquote>
          <p>
            I also think a stronger model makes this faster. That&apos;s a belief, not something I
            tested.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Caveats</h2>
          <Bullets
            items={[
              'Fabric Apps are in preview. Things will change.',
              "The hosted app needs a Fabric sign-in, so I can't link it for you to click. Screenshots and a short recording instead.",
            ]}
          />
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <Bullets
            items={[
              "A report limits you to what's available. An app is a normal web app, so you're wide open. That also means you own the testing and the deploying",
              'Give the agent the schema and the rules, not just the goal',
              '"Works in dev" proved less than I wanted. Deploy early',
            ]}
          />
        </section>
      </div>
    </PostShell>
  )
}
