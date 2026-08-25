# syntax=docker/dockerfile:1
FROM node:26.7-alpine3.24 AS builder
WORKDIR /app
RUN --mount=type=cache,target=/root/.npm npm install -g pnpm@11.23
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --link . .
RUN --mount=type=cache,target=/app/.next/cache \
    mkdir -p src/data && touch src/data/{news,gallery,business,agenda,document,video}.json && pnpm build

FROM node:26.7-alpine3.24 AS compress
WORKDIR /app
RUN apk add --no-cache brotli zstd
COPY --link --from=builder /app/dist /app/dist
RUN find /app/dist -type f \( -name '*.html' -o -name '*.css' -o -name '*.js' -o -name '*.mjs' -o -name '*.json' -o -name '*.svg' -o -name '*.xml' -o -name '*.txt' -o -name '*.woff' -o -name '*.woff2' -o -name '*.ico' -o -name '*.map' \) \
    -exec brotli -q 11 -k {} \; \
    -exec gzip -9 -k {} \; \
    -exec zstd --ultra -22 -k {} \;

FROM gcr.io/distroless/static-debian13:nonroot
COPY --link --from=ghcr.io/static-web-server/static-web-server:2 /static-web-server /usr/local/bin/static-web-server
COPY --link --from=compress /app/dist /public
COPY --link config.toml /etc/sws/config.toml
EXPOSE 8080
CMD ["/usr/local/bin/static-web-server", "--config-file", "/etc/sws/config.toml"]
