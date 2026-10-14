import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'dist')
const files = []
async function walk(dir) { for (const entry of await fs.readdir(dir,{withFileTypes:true})) { const p=path.join(dir,entry.name); if(entry.isDirectory()) await walk(p); else files.push(p) } }
await walk(out)
const htmlFiles = files.filter(x=>x.endsWith('.html'))
if (!htmlFiles.length) throw new Error('No built HTML pages')
const errors = []
const urls = new Set()
const titleSet = new Set()
const descSet = new Set()
let origin
for (const file of htmlFiles) {
  const html = await fs.readFile(file,'utf8')
  const rel = path.relative(out,file).replaceAll('\\','/')
  const pagePath = rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/,'')}`
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  const desc = html.match(/<meta name="description" content="([^"]+)"/ )?.[1]
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/ )?.[1]
  const og = html.match(/<meta property="og:url" content="([^"]+)"/ )?.[1]
  if (!title || !desc || !canonical || !og) errors.push(`${pagePath}: missing metadata`)
  if (titleSet.has(title)) errors.push(`${pagePath}: duplicate title`)
  if (descSet.has(desc)) errors.push(`${pagePath}: duplicate description`)
  titleSet.add(title); descSet.add(desc)
  if (canonical !== og) errors.push(`${pagePath}: canonical and OG URL differ`)
  if (canonical) {
    const url = new URL(canonical)
    origin ||= url.origin
    if (url.origin !== origin || url.pathname !== pagePath || url.search || url.hash) errors.push(`${pagePath}: not self-canonical`)
    if (pagePath !== '/research/') urls.add(canonical)
  }
  if (pagePath === '/research/' && !html.includes('<meta name="robots" content="noindex, nofollow">')) errors.push('Research intake must remain noindex')
  if (!/<html lang="zh-CN">/.test(html) || !/<meta name="viewport"/.test(html)) errors.push(`${pagePath}: language or viewport missing`)
  for (const [,href] of html.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)) {
    const target = href.split(/[?#]/)[0]
    if (!target || target === '/') continue
    const relTarget = target.endsWith('/') ? `${target.slice(1)}index.html` : target.slice(1)
    if (!files.includes(path.join(out,relTarget))) errors.push(`${pagePath}: dead internal link ${href}`)
  }
  if (html.includes('jichangknow.com')) errors.push(`${pagePath}: old site reference leaked`)
}
const sitemap = await fs.readFile(path.join(out,'sitemap.xml'),'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1])
if (sitemapUrls.length !== urls.size || new Set(sitemapUrls).size !== urls.size) errors.push('Sitemap page count or uniqueness mismatch')
for (const url of urls) if (!sitemapUrls.includes(url)) errors.push(`Sitemap missing ${url}`)
if (sitemap.includes('/reviews/example-provider/')) errors.push('Draft review leaked into sitemap')
if (sitemap.includes('/research/')) errors.push('Unverified research intake leaked into sitemap')
const robots = await fs.readFile(path.join(out,'robots.txt'),'utf8')
if (origin === 'https://example.com') {
  if (!robots.includes('Disallow: /')) errors.push('Placeholder domain is crawlable')
} else if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) errors.push('robots.txt sitemap mismatch')
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1 }
else console.log(`Checked ${htmlFiles.length} pages, ${sitemapUrls.length} sitemap URLs, all internal links and metadata: OK`)
