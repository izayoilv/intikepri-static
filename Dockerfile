# syntax=docker/dockerfile:1
FROM node:26.5-alpine3.24 AS builder
WORKDIR /app
RUN npm install -g pnpm@11.16
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --link . .
RUN mkdir -p src/data && (test -f src/data/news.json || echo '[]' > src/data/news.json)
RUN pnpm build

FROM nginx:1.31-alpine3.24
RUN rm /etc/nginx/conf.d/default.conf
COPY --link nginx.conf /etc/nginx/nginx.conf
COPY --link --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
