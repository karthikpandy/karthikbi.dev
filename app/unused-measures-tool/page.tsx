import PostShell from '@/components/PostShell'

export const metadata = {
  title: 'We Built a Tool to Find Unused Measures. Then the Platform Kept Shrinking It. — karthikbi.dev',
  description:
    'Hundreds of unused measures, found once a quarter by uploading files. Then PBIP, Git and a metadata database turned cleanup into a query.',
  authors: [{ name: 'Karthik Pandy' }],
  alternates: {
    canonical: 'https://karthikbi.dev/unused-measures-tool/',
  },
  openGraph: {
    title: 'We Built a Tool to Find Unused Measures. Then the Platform Kept Shrinking It.',
    description:
      'Hundreds of unused measures, found once a quarter by uploading files. Then PBIP, Git and a metadata database turned cleanup into a query.',
    url: 'https://karthikbi.dev/unused-measures-tool/',
    siteName: 'karthikbi.dev',
    type: 'article',
    publishedTime: '2026-11-03',
    authors: ['Karthik Pandy'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Built a Tool to Find Unused Measures. Then the Platform Kept Shrinking It.',
    description:
      'Hundreds of unused measures, found once a quarter by uploading files. Then PBIP, Git and a metadata database turned cleanup into a query.',
  },
}

export default function UnusedMeasuresToolPage() {
  return (
    <PostShell slug="unused-measures-tool">

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
        <section className="space-y-3">
          <p>Big semantic models don&apos;t get cleaned up. They get added to.</p>
          <p>
            A measure for one report. Another for a one-off request. A copy someone made &quot;just
            to test.&quot; A year later, nobody can say which ones still matter, and nobody wants
            to delete the wrong one.
          </p>
          <p>
            That&apos;s where we were. So I set out to answer one question: what in this model is
            actually used?
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            The first answer was a workaround
          </h2>
          <p>There was no clean way to ask the model. So I built one.</p>
          <p>
            A small web app: upload the model, upload the reports connected to it, and the code
            digs through the files to work out what each report touches. Used on one side, unused
            on the other.
          </p>
          <p>
            We ran it once a quarter. Each time, it found hundreds of measures nothing was using,
            and we cleaned them out.
          </p>
          <p>
            It worked. But the hard part was never the logic. It was getting at the information,
            locked inside files that were never meant to be read, and collected by hand every
            quarter.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Then the platform started doing the work
          </h2>
          <p>
            When we moved to PBIP, the files opened up. The model and reports were plain text now,
            so there was nothing to dig through. The code just read the folder.
          </p>
          <p>
            When the project went into Git, even the folder came to us. No uploads, no collecting
            files from people. The code read the repo, and the answer was always current.
          </p>
          <p>
            Every step, I wrote less code than the step before. And cleanup stopped being a
            quarterly event.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Now the question answers itself
          </h2>
          <p>
            Today the model&apos;s metadata and every report&apos;s definition land in a database
            on their own: every measure, every report, and where each one is used.
          </p>
          <p>
            &quot;Is this measure used?&quot; isn&apos;t a tool we run anymore. It&apos;s a
            question we query, any time.
          </p>
        </section>

        <section>
          <blockquote className="border-l-4 border-[#7C7BFF] pl-4 my-5">
            <p className="text-gray-700 font-medium">
              The question never changed. The work to answer it kept disappearing.
            </p>
          </blockquote>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 mb-3">What&apos;s next</h2>
          <p>
            Measures were the start. Now we&apos;re turning the same question on unused tables and
            columns, which is where the real size savings are.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What I take from this</h2>
          <ul className="space-y-2 pl-0">
            {[
              'Build the workaround. It teaches you exactly what the platform is missing.',
              "When the platform catches up, let your code shrink. That's progress, not loss.",
              'Metadata in a table turns cleanup from a project into a query.',
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
