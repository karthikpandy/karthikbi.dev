"""
shares_to_json.py — Convert LinkedIn Shares export to posts.json

Usage:
  1. Export your LinkedIn data (Settings → Data Privacy → Get a copy of your data → select Posts/Shares)
  2. Open Shares.xlsx in Excel and Save As → CSV UTF-8 → Shares.csv in the project root
  3. Run: python scripts/shares_to_json.py
  4. Output written to data/posts.json
  5. Run: npm run build  (to pick up the new posts)
"""

import csv
import json
import os
from datetime import datetime
try:
    import ftfy
except ImportError:
    ftfy = None

# Paths relative to project root (run from project root)
input_file = "Shares.csv"
output_file = os.path.join("data", "posts.json")

# Posts to ignore (exact matches after cleaning)
BLACKLIST_TITLES = {
    "Happy Weekend all",
}

posts = []

if not os.path.exists(input_file):
    print(f"Error: '{input_file}' not found.")
    print("Export your LinkedIn shares as CSV and place it in the project root.")
    exit(1)

with open(input_file, encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        commentary = row.get("ShareCommentary", "").strip()
        link = row.get("ShareLink", "").strip()
        date = row.get("Date", "").strip()

        if not commentary or not link:
            continue

        title = commentary.split("\n")[0].strip()

        if ftfy:
            title = ftfy.fix_text(title)
            link = ftfy.fix_text(link)

        if not title or title in BLACKLIST_TITLES:
            continue

        try:
            parsed_date = datetime.strptime(date, "%m/%d/%Y %H:%M")
            formatted_date = parsed_date.strftime("%Y-%m-%d")
        except Exception:
            formatted_date = date

        posts.append({
            "title": title,
            "date": formatted_date,
            "url": link
        })

posts.sort(key=lambda x: x["date"], reverse=True)

os.makedirs("data", exist_ok=True)
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"Done! {len(posts)} posts exported to {output_file}")
