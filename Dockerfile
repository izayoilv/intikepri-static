# syntax=docker/dockerfile:1
FROM node:26.5.0-alpine3.24 AS builder
WORKDIR /app
RUN npm install -g pnpm@11.15.0
COPY --link frontend/package.json frontend/pnpm-lock.yaml frontend/pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --link frontend/ .
RUN pnpm build

FROM nginx:1.31.3-alpine3.24
RUN rm /etc/nginx/conf.d/default.conf
COPY --link nginx.conf /etc/nginx/nginx.conf
COPY --link --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
