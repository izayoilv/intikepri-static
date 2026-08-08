# syntax=docker/dockerfile:1
FROM node:26.7-alpine3.24 AS builder
WORKDIR /app
RUN npm install -g pnpm@11
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --link . .
RUN mkdir -p src/data && \
    (test -f src/data/news.json || echo '[]' > src/data/news.json) && \
    (test -f src/data/galeri.json || echo '[]' > src/data/galeri.json) && \
    (test -f src/data/direktori.json || echo '[]' > src/data/direktori.json) && \
    (test -f src/data/agenda.json || echo '[]' > src/data/agenda.json && test -f src/data/video.json || echo '[]' > src/data/video.json && test -f src/data/dokumen.json || echo '[]' > src/data/dokumen.json)
RUN pnpm build

FROM nginx:1.31-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --link nginx.conf /etc/nginx/nginx.conf
COPY --link --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
