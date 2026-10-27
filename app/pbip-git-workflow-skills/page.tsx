import PostShell from '@/components/PostShell'

export const metadata = {
  title: 'PBIP Gave Us Git. Skills Made Everyone Use It the Same Way. — karthikbi.dev',
  description:
    'Like most BI teams, we came from PBIX files, not Git. So we packaged the PBIP workflow — branch, change, commit, push, PR — as skills and scripts, with the ticket number carried through to promotion.',
  authors: [{ name: 'Karthik Pandy' }],
  alternates: {
    canonical: 'https://karthikbi.dev/pbip-git-workflow-skills/',
  },
  openGraph: {
    title: 'PBIP Gave Us Git. Skills Made Everyone Use It the Same Way.',
    description:
      'Like most BI teams, we came from PBIX files, not Git. So we packaged the PBIP workflow — branch, change, commit, push, PR — as skills and scripts, with the ticket number carried through to promotion.',
    url: 'https://karthikbi.dev/pbip-git-workflow-skills/',
    siteName: 'karthikbi.dev',
    type: 'article',
    publishedTime: '2026-10-27',
    authors: ['Karthik Pandy'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PBIP Gave Us Git. Skills Made Everyone Use It the Same Way.',
    description:
      'Like most BI teams, we came from PBIX files, not Git. So we packaged the PBIP workflow — branch, change, commit, push, PR — as skills and scripts, with the ticket number carried through to promotion.',
  },
}

export default function PbipGitWorkflowSkillsPage() {
  return (
    <PostShell slug="pbip-git-workflow-skills">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section className="space-y-3">
          <p>Last week I wrote about moving a production model to PBIP.</p>
          <p>Git was the big win. But like most BI teams, we came from PBIX files, not Git.</p>
          <p>
            A new format, a new tool and a new process, all at once. I wanted everyone to feel
            comfortable, and still follow the right steps every time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Seven steps, every change</h2>
          <ol className="space-y-2 pl-0">
            {[
              'Create a branch from the latest main',
              'Open Power BI Desktop',
              'Make the change',
              'Save',
              'Commit',
              'Push',
              'Create a pull request',
            ].map((item, i) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-4 text-right font-medium text-[#7C7BFF] flex-shrink-0">
                  {i + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p>
            For someone who lives in Git, that&apos;s muscle memory. For someone new to it,
            it&apos;s seven chances to get stuck, and a reason to avoid the change altogether.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            We packaged the process as skills and scripts
          </h2>
          <p>So the process lives in the repo now, not in people&apos;s heads.</p>
          <p>
            Every step is written as a skill, a procedure an AI coding agent can follow. The same
            steps also exist as plain scripts, so it works without an agent too.
          </p>
          <p>You ask, or you run the script, and it goes the same way for everyone.</p>
          <p>
            The only part that stays human is the part that should: making the change in Desktop.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              The process didn&apos;t change. Nobody has to remember it anymore.
            </p>
          </blockquote>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            The ticket number does the rest
          </h2>
          <p>
            We work from tickets. You enter the ticket number once at the start. It names the
            branch, and the PR carries it every time, so no one retypes it by hand.
          </p>
          <p>
            That&apos;s what makes promotion simple. When a ticket is ready for UAT or production,
            we pick the build by its ticket number. No searching through branches for which change
            belongs to which request.
          </p>
          <p>The PR isn&apos;t just for the reviewer. It&apos;s written for the pipeline too.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'PBIP makes the model code. Skills make the process code.',
              'Make the right way the easy way, especially for people new to Git.',
              "Scripts first, agent optional. The process shouldn't depend on one tool.",
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
