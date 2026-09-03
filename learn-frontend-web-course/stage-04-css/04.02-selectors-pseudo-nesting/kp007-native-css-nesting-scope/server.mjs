import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  const requestedPath = decodeURIComponent(url.pathname);
  const relativePath = requestedPath === "/" ? "index.html" : requestedPath.slice(1);
  const targetPath = resolve(root, normalize(relativePath));

  if (!targetPath.startsWith(root)) {
    response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  try {
    const content = await readFile(targetPath);
    response.writeHead(200, {
      "content-type": mimeTypes[extname(targetPath)] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not Found");
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("CSS lesson server: http://127.0.0.1:4173");
});
