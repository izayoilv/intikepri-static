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

- Node.js 18+
- pnpm

## Quick Start

```bash
pnpm install
pnpm dev
```

## Data

Reads from `src/data/news.json` at build time. Falls back to empty array if missing. News content is managed via a separate CMS backend.

## Build

```bash
pnpm build
```

Output in `out/`.

## Deploy

Kubernetes manifests live in a separate infrastructure repository.
