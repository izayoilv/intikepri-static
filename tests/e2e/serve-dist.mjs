import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../dist",
);
const port = Number(process.env.PORT ?? 4173);

const CONTENT_TYPES = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function resolvePath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const base = path.resolve(root, `.${decoded}`);
  if (base !== root && !base.startsWith(`${root}${path.sep}`)) return null;
  if (decoded.endsWith("/") || path.extname(base) === "") {
    return path.join(base, "index.html");
  }
  return base;
}

function send(res, status, body, type) {
  res.writeHead(status, {
    "Cache-Control": type.startsWith("text/html")
      ? "no-cache"
      : "public, max-age=604800, immutable",
    "Content-Type": type,
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
  });
  res.end(body);
}

const server = createServer(async (req, res) => {
  const url = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? "localhost"}`,
  );

  if (url.pathname === "/health") {
    send(res, 200, "ok", "text/plain; charset=utf-8");
    return;
  }

  const file = resolvePath(url.pathname);
  if (file) {
    try {
      const body = await readFile(file);
      send(
        res,
        200,
        body,
        CONTENT_TYPES[path.extname(file)] ?? "application/octet-stream",
      );
      return;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  const notFound = await readFile(path.join(root, "404.html"));
  send(res, 404, notFound, "text/html; charset=utf-8");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`serving dist/ on http://127.0.0.1:${port}`);
});
