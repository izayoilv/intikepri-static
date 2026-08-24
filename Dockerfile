# syntax=docker/dockerfile:1
FROM node:26.7-alpine3.24 AS builder
WORKDIR /app
RUN --mount=type=cache,target=/root/.npm npm install -g pnpm@11.23
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --link . .
RUN --mount=type=cache,target=/app/.next/cache \
    mkdir -p src/data && touch src/data/{news,gallery,business,agenda,document,video}.json && pnpm build

FROM nginx:1.31-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --link nginx.conf /etc/nginx/nginx.conf
COPY --link --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
