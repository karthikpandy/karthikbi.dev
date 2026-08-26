import Link from 'next/link'

export const metadata = {
  title: 'CI/CD for Power BI Semantic Models: The Granular Way — karthikbi.dev',
  description: 'How we built a surgical CI/CD pipeline for a large Power BI semantic model — branch deploys, ALM Toolkit change files, and selective table refresh via REST API.',
}

function Code({ children }: { children: string }) {
  return (
    <code className="font-mono text-[12px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
      {children}
    </code>
  )
}

function CodeBlock({ lang, children }: { lang?: string; children: string }) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border border-gray-800">
      {lang && (
        <div className="bg-gray-800 px-4 py-1.5">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{lang}</span>
        </div>
      )}
      <pre className="bg-gray-900 text-gray-100 p-5 overflow-x-auto font-mono text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  )
}

function Stage({ number, label, sub }: { number: string; label: string; sub: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7C7BFF] flex items-center justify-center">
        <span className="font-mono text-xs font-bold text-white">{number}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

export default function CICDPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-400 hover:text-gray-700 transition-colors mb-12"
      >
        ← Writing
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug mb-4">
          CI/CD for Power BI Semantic Models: The Granular Way
        </h1>
        <div className="flex items-center gap-3 text-gray-400 font-mono text-xs mb-2">
          <time dateTime="2026-04-10">April 10, 2026</time>
          <span>·</span>
          <span>6 min read</span>
        </div>
        <p className="text-[13px] text-gray-400">
          <span className="tag-link">Power BI</span>, <span className="tag-link">CI/CD</span>,{' '}
          <span className="tag-link">Azure DevOps</span>
        </p>
      </header>

      {/* Disclaimer */}
      <div className="mb-10 flex gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5">
        <span className="text-amber-400 mt-0.5 flex-shrink-0">⚠</span>
        <p className="text-xs text-amber-700 leading-relaxed">
          Code samples in this post are illustrative — simplified for clarity. Workspace IDs,
          service principal details, and internal tooling have been generalized. Treat them as
          a blueprint, not a copy-paste solution.
        </p>
      </div>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

        <section>
          <p>
            Most CI/CD guides for Power BI assume you can deploy the whole model on every merge.
            If your model is small, that works fine.
          </p>
          <p className="mt-3">
            But if you have one large semantic model powering an entire enterprise — a full deploy
            and full refresh on every single change would take hours, block the team, and make every
            deployment feel like a production incident. We needed something more surgical.
          </p>
          <p className="mt-3">
            This is how we built a granular CI/CD pipeline for our Power BI semantic model at LinkedIn
            using Azure DevOps, ALM Toolkit, and the Power BI REST API.
          </p>
        </section>

        {/* Pipeline overview */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-4">The Full Pipeline at a Glance</h2>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
            <Stage number="1" label="Developer creates a branch and makes changes"         sub="Git workflow wrapped in simple PowerShell scripts" />
            <div className="ml-4 border-l border-gray-100 pl-4 py-0.5" />
            <Stage number="2" label="push script runs BPA before committing"               sub="Microsoft rules + custom project rules — violations block the push" />
            <div className="ml-4 border-l border-gray-100 pl-4 py-0.5" />
            <Stage number="3" label="PR triggers a pre-check pipeline"                     sub="Deploys the model to a test workspace — validates it builds clean" />
            <div className="ml-4 border-l border-gray-100 pl-4 py-0.5" />
            <Stage number="4" label="Reviewer approves → merge to main"                    sub="Post-merge pipeline runs automatically" />
            <div className="ml-4 border-l border-gray-100 pl-4 py-0.5" />
            <Stage number="5" label="ALM Toolkit generates a change file"                  sub="Compares the old BIM vs the new BIM — produces exactly what changed" />
            <div className="ml-4 border-l border-gray-100 pl-4 py-0.5" />
            <Stage number="6" label="Deploy only what changed + refresh only those tables" sub="Power BI REST API for selective refresh" />
            <div className="ml-4 border-l border-gray-100 pl-4 py-0.5" />
            <Stage number="7" label="Developer promotes the same change file to UAT → PROD" sub="Same file, same precision, all three environments" />
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The Foundation: PBIP in Git</h2>
          <p>
            Our semantic model lives in <Code>.pbip</Code> format, committed to Git. PBIP stores the
            model as plain-text TMDL files — every measure, relationship, and table definition is
            diff-able. This is the prerequisite for everything else. Without text-based source control,
            none of the change detection below is possible.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Developer Scripts: Git Without the Git</h2>
          <p>
            BI developers shouldn't have to remember branch naming conventions or upstream tracking flags.
            We wrapped the common Git operations into three PowerShell scripts:
          </p>

          <CodeBlock lang="powershell">
{`# start.ps1 — begin work on a new ticket
param([string]$TicketId)

git checkout main
git pull origin main
git checkout -b "feature/$TicketId"
Write-Host "Ready. Branch: feature/$TicketId"`}
          </CodeBlock>

          <CodeBlock lang="powershell">
{`# resume.ps1 — pick up where you left off
param([string]$TicketId)

git fetch origin
git checkout "feature/$TicketId"
git pull origin "feature/$TicketId"
Write-Host "Resumed: feature/$TicketId"`}
          </CodeBlock>

          <CodeBlock lang="powershell">
{`# push.ps1 — BPA check, then commit and push
param([string]$Message)

Write-Host "Running Best Practice Analyzer..."

$bpaResult = & TabularEditor.exe "model/model.bim" \`
    -BPA "rules/BPARules.json" \`
    -V 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Error "BPA violations found. Fix before pushing:"
    Write-Host $bpaResult
    exit 1
}

Write-Host "BPA passed. Committing..."
git add .
git commit -m $Message
git push origin (git rev-parse --abbrev-ref HEAD)
Write-Host "Pushed. Pipeline starting..."`}
          </CodeBlock>

          <p className="mt-3">
            A developer's full workflow: <Code>start TICKET-42</Code> → make changes in Power BI
            Desktop → <Code>push "Add YTD revenue measure"</Code>. If BPA catches a violation, the
            push is blocked locally before anything reaches the pipeline.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The BPA Gate: Quality Before the Pipeline</h2>
          <p>
            The Best Practice Analyzer (BPA) in Tabular Editor checks your model against a rule set
            before code ever leaves the developer's machine. We run two layers of rules:
          </p>
          <ul className="mt-3 space-y-1.5 pl-0">
            {[
              'Microsoft\'s published BPA rules — covering common performance and modelling anti-patterns',
              'Custom project rules — standards specific to our model (naming conventions, forbidden measure patterns, required descriptions on published tables)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            If either layer flags a violation, <Code>push</Code> exits with an error and prints exactly
            which rule failed and on which object. The developer fixes it locally, runs{' '}
            <Code>push</Code> again. Nothing broken ever reaches the PR.
          </p>
          <p className="mt-3">
            This is the cheapest quality gate in the pipeline — it runs in seconds on the developer's
            machine and catches the most common mistakes before they touch shared infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Stage 1: PR Pre-Check Pipeline</h2>
          <p>
            When a PR is opened against <Code>main</Code>, an Azure DevOps pipeline triggers automatically.
            Its only job: deploy the model from the feature branch to a shared test workspace and confirm
            it builds without errors.
          </p>
          <p className="mt-3">
            We're not running full validation here — just proving the model is deployable. The reviewer
            sees the pipeline status on the PR before they approve. No more "it worked on my laptop"
            surprises post-merge.
          </p>

          <CodeBlock lang="yaml">
{`# azure-pipelines-pr.yml
trigger: none
pr:
  branches:
    include:
      - main

steps:
  - task: PowerShell@2
    displayName: 'Deploy branch model to test workspace'
    inputs:
      filePath: 'scripts/deploy-to-workspace.ps1'
      arguments: >
        -WorkspaceId $(TEST_WORKSPACE_ID)
        -ModelPath   'model/model.bim'
        -ClientId    $(SPN_CLIENT_ID)
        -Secret      $(SPN_SECRET)
        -TenantId    $(TENANT_ID)`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">The Key: ALM Toolkit Change File</h2>
          <p>
            This is where we diverge from every standard guide. After the PR merges to{' '}
            <Code>main</Code>, the post-merge pipeline uses ALM Toolkit to compare two BIM files:
          </p>
          <ul className="mt-3 space-y-1.5 pl-0">
            {[
              'The BIM that was last deployed to production (stored as an artifact)',
              'The new BIM from the merged main branch',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            ALM Toolkit produces a TMSL change script — a JSON document describing exactly which
            objects changed: measures added or modified, tables altered, relationships updated. Nothing else.
          </p>

          <CodeBlock lang="json">
{`// changeset.json — ALM Toolkit output (example)
{
  "createOrReplace": {
    "object": { "database": "SemanticModel" },
    "measure": [
      { "name": "Revenue YTD", "table": "FactSales", ... }
    ]
  },
  "alter": {
    "column": [
      { "name": "RegionKey", "table": "FactSales", ... }
    ]
  }
}`}
          </CodeBlock>

          <p className="mt-3">
            This file becomes the single source of truth for the entire promotion chain.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Stage 2: Deploy What Changed</h2>
          <p>
            Instead of pushing a full model, the pipeline applies the change file directly to the
            target workspace via the XMLA endpoint. Only the objects in the changeset get touched.
            A measure change? One measure deployed. A new column on a fact table? Just that column.
          </p>

          <CodeBlock lang="powershell">
{`# apply-changes.ps1
param($WorkspaceId, $DatasetId, $ChangeFile, $Token)

$tmsl = Get-Content $ChangeFile -Raw

Invoke-RestMethod \`
  -Uri "https://api.powerbi.com/v1.0/myorg/groups/$WorkspaceId/datasets/$DatasetId/executeQueries" \`
  -Method  Post \`
  -Headers @{ Authorization = "Bearer $Token" } \`
  -Body    (@{ queries = @(@{ query = $tmsl }) } | ConvertTo-Json -Depth 10) \`
  -ContentType "application/json"

Write-Host "Change file applied."`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Selective Table Refresh</h2>
          <p>
            After deploying, we parse the change file to find which tables actually had data-level
            changes. Measure-only changes don't need a refresh at all — measures are computed at
            query time. But a new column or a modified partition does.
          </p>

          <CodeBlock lang="powershell">
{`# refresh-changed-tables.ps1
param($WorkspaceId, $DatasetId, $ChangeFile, $Token)

$changes  = Get-Content $ChangeFile | ConvertFrom-Json
$tables   = $changes.alter.column.table | Sort-Object -Unique

if (-not $tables) {
    Write-Host "No table refresh needed (measure-only change)."
    exit 0
}

foreach ($table in $tables) {
    $body = @{
        type    = "full"
        objects = @(@{ table = $table })
    } | ConvertTo-Json

    Invoke-RestMethod \`
      -Uri     "https://api.powerbi.com/v1.0/myorg/groups/$WorkspaceId/datasets/$DatasetId/refreshes" \`
      -Method  Post \`
      -Headers @{ Authorization = "Bearer $Token" } \`
      -Body    $body \`
      -ContentType "application/json"

    Write-Host "Refresh triggered: $table"
}`}
          </CodeBlock>

          <p className="mt-3">
            A change to one DAX measure: zero refresh. A new column on a 50M-row fact table: only
            that table refreshes. The difference in refresh time can be hours.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Promoting to UAT and PROD</h2>
          <p>
            After the developer tests in DEV, promoting to UAT is a single manual pipeline trigger —
            no new files, no new decisions. The same <Code>changeset.json</Code> artifact from the
            merge is passed through.
          </p>
          <p className="mt-3">
            UAT sign-off → same trigger → PROD. One change file travels through all three environments.
            What you tested in DEV is exactly what lands in PROD. No drift.
          </p>

          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mt-5">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="bg-violet-50 text-[#7C7BFF] border border-violet-100 px-2.5 py-1 rounded-full">merge → DEV</span>
              <span className="text-gray-300">──</span>
              <span className="bg-gray-50 text-gray-500 border border-gray-100 px-2.5 py-1 rounded-full">manual → UAT</span>
              <span className="text-gray-300">──</span>
              <span className="bg-gray-50 text-gray-500 border border-gray-100 px-2.5 py-1 rounded-full">manual → PROD</span>
            </div>
            <p className="text-xs text-gray-400 mt-3 font-mono">same changeset.json artifact across all three</p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Key Takeaways</h2>
          <ul className="space-y-2.5 pl-0">
            {[
              'Full model deploys don\'t scale for a large single semantic model — you need object-level precision',
              'ALM Toolkit\'s BIM comparison gives you exactly what changed, nothing more',
              'Selective table refresh via REST API reduces refresh windows from hours to minutes',
              'Wrapping Git in start / resume / push removes the barrier for BI developers who aren\'t Git-native',
              'One change file promoting through DEV → UAT → PROD keeps environments consistent and deployments auditable',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#7C7BFF] flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* Footer */}
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
