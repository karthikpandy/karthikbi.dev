# karthikbi.dev

Personal website for Karthik BI — Senior BI Engineer @ LinkedIn.

Built with **Next.js 14** (static export) and **Tailwind CSS**. Deployed to **Azure Static Web Apps**.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, metrics, pipeline flow, stack |
| `/blueprints` | Technical blog posts (from `data/posts-blog.json`) |
| `/stream` | LinkedIn posts (from `data/posts.json`) |
| `/experience` | Career timeline |

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.8+ (for LinkedIn post import only)

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build (Static Export)

```bash
npm run build
# Output: ./out/
```

---

## Importing LinkedIn Posts (The Stream)

The Stream page reads from `data/posts.json`. To populate it from your LinkedIn data export:

### Step 1 — Export LinkedIn data

1. Go to LinkedIn → Settings → Data Privacy → Get a copy of your data
2. Select **Posts and articles** (or **Shares**)
3. Download and unzip — you'll get a `Shares.xlsx` file

### Step 2 — Convert to CSV

Open `Shares.xlsx` in Excel:
- File → Save As → CSV UTF-8 (Comma delimited) → save as `Shares.csv` in the project root

### Step 3 — Run the import script

```bash
python scripts/shares_to_json.py
```

Output: `data/posts.json` with all your posts sorted newest-first.

### Step 4 — Rebuild

```bash
npm run build
```

---

## Adding Blog Posts (Blueprints)

Edit `data/posts-blog.json`. Each post has:

```json
{
  "slug": "my-post-slug",
  "title": "Post Title",
  "description": "One paragraph description.",
  "tags": ["Power BI", "CI/CD"],
  "status": "live",
  "date": "2025-01-01",
  "url": "https://karthikbi.dev/my-post-slug",
  "codeSnippet": "// optional code example"
}
```

`status` can be `"live"` or `"coming-soon"`.

---

## Deployment to Azure Static Web Apps

### One-time Azure setup

1. Create an Azure Static Web App in the Azure Portal
2. Select "Other" as the deployment source (we use GitHub Actions)
3. Copy the **Deployment Token** from Deployment → Manage deployment token

### GitHub setup

1. Push this repo to GitHub
2. Add a secret: **Settings → Secrets → Actions → New repository secret**
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: paste your Azure deployment token

### Auto-deploy

Every push to `main` triggers `.github/workflows/azure-static-web-apps.yml` which builds and deploys automatically.

### Custom domain

In Azure Portal → your Static Web App → Custom domains:

1. Add `karthikbi.dev`
2. Add `www.karthikbi.dev`
3. Follow the DNS verification steps (add CNAME/TXT records to your domain registrar)

---

## Project Structure

```
karthikbi.dev/
├── app/
│   ├── layout.tsx           # Root layout (Nav + Footer)
│   ├── page.tsx             # Home
│   ├── blueprints/page.tsx  # Blog
│   ├── stream/page.tsx      # LinkedIn posts
│   └── experience/page.tsx  # Career timeline
├── components/              # Shared UI components
├── data/
│   ├── posts-blog.json      # Blog post data
│   └── posts.json           # LinkedIn post data (gitignore optional)
├── scripts/
│   └── shares_to_json.py    # LinkedIn CSV → JSON converter
├── public/
│   └── staticwebapp.config.json
├── .github/workflows/
│   └── azure-static-web-apps.yml
└── README.md
```

---

## Color Reference

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0a0e1a` | Page background |
| `surface` | `#111827` | Card backgrounds |
| `border` | `#1e2d40` | Borders |
| `text` | `#e2e8f0` | Primary text |
| `muted` | `#64748b` | Secondary text |
| `blue` | `#60a5fa` | Primary accent |
| `amber` | `#f59e0b` | Power BI / highlights |
| `purple` | `#a78bfa` | Secondary accent |
| `green` | `#22c55e` | Status / active |
