import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";

const root = new URL(".", import.meta.url);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8" };

createServer(async (request, response) => {
  const pathname = request.url === "/" ? "index.html" : request.url.slice(1);
  try {
    const body = await readFile(new URL(pathname, root));
    response.writeHead(200, { "content-type": types[extname(pathname)] ?? "text/plain; charset=utf-8" });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(4173, "127.0.0.1", () => {
  console.log("http://localhost:4173");
});
