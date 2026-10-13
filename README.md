# Vishnu Bajpai portfolio

Static site for GitHub Pages. All content lives in `data/`; edit the JSON and push.

| File | Drives |
|---|---|
| data/site.json | hero statements, intro, uplift chart, stats, impact rings, contact |
| data/problems.json | Problems I've solved board (layer: martech, revops, crm, growth) |
| data/platforms.json | Platform depth tabs (years, problems solved, features) |
| data/playbooks.json | Blueprints |
| data/evolution.json | How my scope grew |
| data/clients.json | Client portfolio |
| data/faq.json | Recruiter quick answers |
| data/news.json | Martech pulse headlines (written by the GitHub Action) |

## Deploy
Push to the repo root, then Settings > Pages > Deploy from branch > main / root.

## Martech pulse (daily news)
`.github/workflows/news.yml` runs `scripts/fetch_news.py` every morning and commits fresh headlines to `data/news.json`.
1. Settings > Actions > General > Workflow permissions > Read and write.
2. Actions tab > Refresh martech pulse > Run workflow (first run).
Until it runs, the hero shows your open-to-roles status instead. Edit `QUERIES` in the script to change topics.

## Local preview
`python3 -m http.server 8000`, then open http://localhost:8000
