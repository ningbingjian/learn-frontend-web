import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
const root = new URL(".", import.meta.url).pathname;
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8" };
createServer(async (req,res)=>{ try { const pathname=req.url==="/"?"/index.html":req.url.split("?")[0]; const safePath=normalize(pathname).replace(/^(\.\.[/\\])+/,""); const file=join(root,safePath); const body=await readFile(file); res.writeHead(200,{"content-type":mime[extname(file)]??"text/plain; charset=utf-8"}); res.end(body); } catch { res.writeHead(404,{"content-type":"text/plain; charset=utf-8"}); res.end("Not Found"); } }).listen(4173,()=>console.log("Selector lab: http://localhost:4173"));
