import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
const root=dirname(fileURLToPath(import.meta.url)); const port=Number(process.env.PORT||4173);
const mime=new Map([[".html","text/html; charset=utf-8"],[".css","text/css; charset=utf-8"],[".js","text/javascript; charset=utf-8"],[".mjs","text/javascript; charset=utf-8"],[".json","application/json; charset=utf-8"],[".md","text/markdown; charset=utf-8"]]);
createServer(async(req,res)=>{try{const url=new URL(req.url??"/",`http://${req.headers.host??"localhost"}`);const raw=url.pathname==="/"?"/index.html":url.pathname;const safe=normalize(raw).replace(/^(\.\.[/\\])+/ ,"").replace(/^[/\\]+/,"");const file=join(root,safe);if(!file.startsWith(root)){res.writeHead(403);res.end("Forbidden");return;}const body=await readFile(file);res.writeHead(200,{"Content-Type":mime.get(extname(file))??"application/octet-stream","Cache-Control":"no-store"});res.end(body);}catch(error){const status=error?.code==="ENOENT"?404:500;res.writeHead(status,{"Content-Type":"text/plain; charset=utf-8"});res.end(status===404?"Not Found":"Internal Server Error");}}).listen(port,()=>console.log(`CSS lesson server: http://localhost:${port}`));
