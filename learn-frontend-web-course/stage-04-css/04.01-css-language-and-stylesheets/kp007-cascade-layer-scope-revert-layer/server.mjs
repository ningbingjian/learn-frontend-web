import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = new Map([[".html","text/html; charset=utf-8"],[".css","text/css; charset=utf-8"],[".js","text/javascript; charset=utf-8"],[".mjs","text/javascript; charset=utf-8"],[".json","application/json; charset=utf-8"],[".md","text/markdown; charset=utf-8"]]);

createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    const rawPath = url.pathname === "/" ? "/index.html" : url.pathname;
    const safePath = normalize(rawPath).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]+/, "");
    const filePath = join(root, safePath);
    if (!filePath.startsWith(root)) { response.writeHead(403,{"Content-Type":"text/plain; charset=utf-8"}); response.end("Forbidden"); return; }
    const body = await readFile(filePath);
    response.writeHead(200,{"Content-Type":mime.get(extname(filePath)) ?? "application/octet-stream","Cache-Control":"no-store"});
    response.end(body);
  } catch (error) {
    const status = error?.code === "ENOENT" ? 404 : 500;
    response.writeHead(status,{"Content-Type":"text/plain; charset=utf-8"});
    response.end(status === 404 ? "Not Found" : "Internal Server Error");
  }
}).listen(port, () => console.log(`CSS lesson server: http://localhost:${port}`));
