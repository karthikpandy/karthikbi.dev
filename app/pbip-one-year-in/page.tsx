import PostShell from '@/components/PostShell'

export const metadata = {
  title: 'A Year on PBIP: The Model Stopped Being a File — karthikbi.dev',
  description:
    'One year on Power BI Projects (PBIP): version control, multiple developers, pull requests from other teams and AI agents reading the model for context.',
}

export default function PbipOneYearInPage() {
  return (
    <PostShell slug="pbip-one-year-in">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section className="space-y-3">
          <p>A Power BI model starts life as a file.</p>
          <p>One file, one owner. Whoever has it open is the team.</p>
          <p>
            About a year ago, we moved a production model to PBIP, while it was still in preview.
            PBIP sat in preview from June 2023 to September 2026. We didn&apos;t wait for the label.
          </p>
          <p>It went GA last month, so this felt like the week to write down what actually changed.</p>
          <p>The format was the small part.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The timeline</h2>
          <ul className="mt-1 space-y-1.5 pl-0">
            {[
              [
                'June 2023:',
                'Power BI Desktop developer mode enters public preview. Its first feature is saving as a Power BI Project (PBIP).',
              ],
              ['About a year ago:', 'we move a production model to PBIP.'],
              [
                'September 2026:',
                'developer mode and PBIP reach general availability. PBIR becomes the default report format.',
              ],
            ].map(([lead, rest]) => (
              <li key={lead} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>
                  <strong>{lead}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            It stopped being one person&apos;s file
          </h2>
          <p>A PBIX is a binary. You can&apos;t see what changed, only that something did.</p>
          <p>So one person holds it, everyone else waits, and the model is whatever got saved last.</p>
          <p>
            In PBIP, the model is a folder of plain text files. The semantic model is TMDL. The
            report is PBIR. We put it in Git.
          </p>
          <p>
            Every change now has a history and an author. Two of us could work on the same model in
            the same week without handing a file back and forth.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Other teams stopped being afraid of it
          </h2>
          <p>This is the one I didn&apos;t expect.</p>
          <p>
            Once the model lived in Git, other teams could open it. Read a measure. Follow a
            relationship. No fear of breaking anything, because reading code doesn&apos;t touch
            production :)
          </p>
          <p>
            Then the small changes they used to ask us for started arriving as pull requests. We
            review it, merge it, ship it.
          </p>
          <p>The model stopped being something people raise a request for and wait on.</p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              PBIP didn&apos;t change the model. It changed who could read it.
            </p>
          </blockquote>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Then AI agents could read it too
          </h2>
          <p>Text files are context.</p>
          <p>
            An agent can read the measures, the relationships and the descriptions, and understand
            the model before it suggests anything.
          </p>
          <p>A PBIX gave it nothing to read.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            And automation became ordinary engineering
          </h2>
          <p>Plain files in Git means the rest is familiar: checks, scripts, deployments.</p>
          <p>The same tools every other codebase already uses. Nothing special for Power BI.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">If you&apos;re starting now</h2>
          <p>
            One detail from the GA matters here. PBIR is now the default report format, and reports
            still in the older format upgrade automatically the next time someone edits them in
            Power BI tools.
          </p>
          <p>The move is happening whether you plan it or not. Better to plan it.</p>
          <p>What I&apos;d do first:</p>
          <ul className="space-y-2 pl-0">
            {[
              'Save one real report as PBIP and open the folder. A semantic model in TMDL is readable in a way a PBIX never was.',
              'Put it in Git and change one measure. Look at the diff. That diff is the whole point.',
              "List anything that reads report files directly. That's what the new default touches.",
              'Agree on branch rules before the second developer joins, not after the first conflict.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Caveats</h2>
          <ul className="space-y-2 pl-0">
            {[
              "This is one model over one year. Your team's Git habits matter more than the format.",
              "Opening the code to other teams only works if someone owns the review. Pull requests don't review themselves.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'The format is the small part. Access is the big part.',
              'Reading code without fear is what turns other teams into contributors.',
              'Plain files are context for agents and input for automation. A binary is neither.',
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
