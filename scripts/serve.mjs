import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..','dist')
const port = Number(process.env.PORT || 4173)
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8'}
http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url,'http://localhost')
    if (url.pathname.includes('..') || /%2f|%5c/i.test(req.url)) { res.writeHead(400).end('Bad path'); return }
    const target = path.resolve(root, `.${decodeURIComponent(url.pathname)}`)
    if (target !== root && !target.startsWith(root+path.sep)) { res.writeHead(403).end('Forbidden'); return }
    let stat
    try { stat=await fs.stat(target) } catch { stat=null }
    if (stat?.isDirectory() && !url.pathname.endsWith('/')) { res.writeHead(301,{Location:url.pathname+'/'+url.search}).end(); return }
    const file = stat?.isDirectory() ? path.join(target,'index.html') : target
    const content = await fs.readFile(file)
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'}).end(req.method==='HEAD'?undefined:content)
  } catch { res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Not found') }
}).listen(port,()=>console.log(`Preview at http://localhost:${port}/`))
