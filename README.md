# INTI Kepri — Static Website

Static website for INTI Kepri (Perhimpunan Indonesia Tionghoa Provinsi Kepulauan Riau) built with **Next.js** and **TypeScript**.

Production: `https://www.intikepri.com` / `https://intikepri.com`
Development: `http://localhost:3000`

## Stack

- **Next.js** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)

## Prerequisites

- Node.js 24 LTS or 26.x
- pnpm 12

## Quick Start

```bash
pnpm install
pnpm dev
```

## Data

Content is managed in a separate CMS (`api.intikepri.com`). At build time the CI pipeline downloads it into `src/data/` (git-ignored):

| File                          | Used by                  |
| ----------------------------- | ------------------------ |
| `news.json`                   | Beranda, Berita, sitemap |
| `agenda.json`                 | Beranda, Agenda, sitemap |
| `gallery.json`                | Beranda, Galeri          |
| `business.json`               | Beranda, Direktori       |
| `document.json`, `video.json` | Pustaka                  |

All files are read through `src/lib/content.ts`. A missing or empty file is treated as an empty list, so the site builds without CMS data (pages show their empty states). Static content (visi & misi, branches, committee, history) lives in `src/lib/data.ts`; contact details, including the optional WhatsApp number, live in `src/lib/site.ts`.

## Build

```bash
pnpm build
```

Output in `dist/`.

## Test

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

The suite builds the site, serves `dist/` locally, and exercises the main routes, article rendering, and the custom 404 page. Set `INTIKEPRI_BASE_URL` to run the same tests against an already-running deployment.

## Deploy

Woodpecker (`.woodpecker/build.yml`) builds the image on every push to `main` (and on a Woodpecker cron, if configured) and pushes it to `registry.kudofools.dev`. Flux updates the image tag in `deploy/deployment.yaml`; the Kubernetes manifests for the app live in `deploy/`. Response headers and caching are configured in `config.toml` (static-web-server).
