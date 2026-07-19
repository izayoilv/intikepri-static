# INTI Kepri Website

Complete rewrite of the INTI Kepri (Perhimpunan Indonesia Tionghoa Provinsi Kepulauan Riau) website using **Next.js 15** (frontend), **Rust Axum** (backend CMS), and **SQLite** (database).

## Architecture

```
app/
├── frontend/          # Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
│   ├── src/app/       # App Router pages
│   ├── src/components # React components
│   ├── src/hooks/     # Custom hooks (useAuth, useToast)
│   ├── src/lib/       # API client + static data
│   ├── src/types/     # TypeScript types
│   └── public/images/ # Static assets
│
└── backend/           # Rust Axum + Tokio + sqlx + SQLite
    ├── src/
    │   ├── main.rs    # Server entry point
    │   ├── db.rs      # Database connection pool
    │   ├── models.rs  # Data models/structs
    │   └── routes/    # REST API routes
    └── migrations/    # SQL schema migrations
```

## Frontend Stack

- **Next.js 15** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **GSAP** (scroll animations)
- **Lucide React** (icons)
- **react-pdf** (PDF viewer)

## Backend Stack

- **Rust** + **Axum** (HTTP framework)
- **Tokio** (async runtime)
- **sqlx** (async SQLite with compile-time checked queries)
- **Serde** (JSON serialization)
- **jsonwebtoken** (JWT auth)
- **bcrypt** (password hashing - ready for future use)

## Prerequisites

### Frontend (Node.js)
- Node.js 18+ and npm

### Backend (Rust)
- Rust toolchain (install via [rustup.rs](https://rustup.rs))
- sqlx CLI: `cargo install sqlx-cli`

## Quick Start

### 1. Start the Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Build and run
cargo run
```

The backend will:
- Create `intikepri.db` SQLite database automatically
- Run migrations automatically
- Start on `http://localhost:3001`

### 2. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 3. Build for Production

```bash
cd frontend
npm run build
# Output in frontend/dist/
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | List news (search, category, page, limit) |
| GET | `/api/news/:id` | Get single news |
| POST | `/api/news` | Create news |
| PUT | `/api/news/:id` | Update news |
| DELETE | `/api/news/:id` | Delete news |
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/me` | Validate token |

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `inti2024`

## Database Schema

```sql
CREATE TABLE news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT '/images/news-1.jpg',
    category TEXT NOT NULL DEFAULT 'Kegiatan',
    author TEXT NOT NULL DEFAULT 'Redaksi INTI Kepri',
    date TEXT NOT NULL,
    attachments TEXT NOT NULL DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, intro, news, quote, structure sections |
| About | `/tentang-kami` | Organization profile, history, vision/mission |
| News | `/berita` | News listing with search, filter, pagination |
| News Detail | `/berita/:id` | Full article with attachments |
| Login | `/login` | Admin authentication |
| Admin | `/admin` | CMS dashboard (CRUD news) |

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:/app/data/intikepri.db
PORT=3001
```

### Frontend (next.config.ts)
```typescript
env: {
    API_URL: 'http://localhost:3001',  // Backend URL
}
```

## Key Changes from Original

| Aspect | Original | New |
|--------|----------|-----|
| Frontend | Vite + React Router | Next.js 15 App Router |
| Backend | Hono (Node.js) | Axum (Rust) |
| Database | MySQL | SQLite |
| ORM | Drizzle | sqlx |
| API Style | tRPC | REST JSON |
| Auth | localStorage plain | JWT + localStorage |
| Rendering | SPA (client-side) | Static Export + client fetch |

## Communication Flow

```
Browser → Next.js (static pages) → fetch() → Rust Axum API → SQLite
                ↓                      ↑
           Client-side              REST JSON
           data fetching            responses
```

## Development Notes

1. **Frontend** uses static export (`output: 'export'`) for simple deployment
2. **Backend** CORS is configured to allow all origins for development
3. **Images** are stored as base64 data URLs in the `attachments` JSON column
4. **JWT secret** is hardcoded for demo - change `JWT_SECRET` in `backend/src/routes/auth.rs` for production
5. **No tRPC** - using plain REST fetch for simplicity with Rust backend

## Deployment

### Kubernetes (Flux)

The `deploy/` directory contains Kubernetes manifests synced by Flux from the [intikepri-infra](https://forgejo.kudofools.dev/izayoilv/intikepri-infra) repo.

- `deploy/storage.yaml` — PVC for SQLite data
- `deploy/intikepri-static.yaml` — Deployment + Service

Infrastructure configs (cloudflared, ESO, ingress, middleware, network-policy) live in the [intikepri-infra](https://forgejo.kudofools.dev/izayoilv/intikepri-infra) repo.

### Frontend (Static)
Deploy the `frontend/dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, etc.)

### Backend (Rust Binary)
Build the Rust binary and run it on your server:
```bash
cd backend
cargo build --release
# Binary at target/release/intikepri-backend
./target/release/intikepri-backend
```

Or use Docker:
```dockerfile
FROM rust:1.75 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /app/target/release/intikepri-backend /bin/intikepri-backend
COPY migrations /app/migrations
WORKDIR /app
EXPOSE 3001
CMD ["/bin/intikepri-backend"]
```
