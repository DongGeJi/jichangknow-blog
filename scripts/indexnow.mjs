import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const send = args.includes('--send')
const paths = args.filter(x=>x!=='--send')
if (!paths.length) throw new Error('Pass at least one published path, e.g. /guides/budget-math/')
const origin = new URL(process.env.SITE_URL || 'https://example.com')
if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.hostname === 'example.com' || origin.hostname.endsWith('.example')) throw new Error('Set a real HTTPS SITE_URL first')
const key = process.env.INDEXNOW_KEY?.trim()
if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key)) throw new Error('Set a valid INDEXNOW_KEY')
const keyFile = path.join(root,'dist',`${key}.txt`)
if ((await fs.readFile(keyFile,'utf8')).trim() !== key) throw new Error('Build site with this INDEXNOW_KEY and deploy the key file')
const xml = await fs.readFile(path.join(root,'dist','sitemap.xml'),'utf8')
const allowed = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]))
const urlList = [...new Set(paths.map(p=>{
  if (!/^\/(?:[a-z0-9-]+\/)*$/.test(p)) throw new Error(`Use a canonical trailing-slash path: ${p}`)
  const url = `${origin.origin}${p}`
  if (!allowed.has(url)) throw new Error(`URL is not published in sitemap: ${url}`)
  return url
}))]
const payload = {host:origin.hostname,key,keyLocation:`${origin.origin}/${key}.txt`,urlList}
if (!send) { console.log(`Dry run: ${urlList.join(', ')}\nAfter deployment use --send to notify IndexNow.`); process.exit(0) }
const response = await fetch('https://api.indexnow.org/IndexNow',{method:'POST',headers:{'content-type':'application/json; charset=utf-8'},body:JSON.stringify(payload)})
if (!response.ok) throw new Error(`IndexNow HTTP ${response.status}: ${(await response.text()).slice(0,300)}`)
console.log(`IndexNow accepted ${urlList.length} URL(s), HTTP ${response.status}`)
