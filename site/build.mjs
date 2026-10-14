import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { categories, articles } from './content.mjs'
import { providerIntake } from './providers.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.resolve(root, 'dist')
if (path.dirname(out) !== root || path.basename(out) !== 'dist') throw new Error('Unexpected output path')
const siteName = (process.env.SITE_NAME || '晚高峰观察').trim()
const rawSiteUrl = (process.env.SITE_URL || 'https://example.com').trim()
const origin = new URL(rawSiteUrl)
if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.search || origin.hash || origin.username || origin.password) {
  throw new Error('SITE_URL must be an HTTPS origin without path, query or credentials')
}
const siteUrl = origin.origin
const placeholder = origin.hostname === 'example.com' || origin.hostname.endsWith('.example')
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const absolute = p => `${siteUrl}${p}`
const a = (href, label, cls = '') => `<a href="${escape(href)}"${cls ? ` class="${cls}"` : ''}>${escape(label)}</a>`
const categoryByPath = new Map(categories.map(c => [c.path, c]))
const published = articles.filter(x => x.status === 'published')

for (const item of [...categories, ...published]) {
  if (!/^\/(?:[a-z0-9-]+\/)*$/.test(item.path)) throw new Error(`Invalid canonical path: ${item.path}`)
  if (!item.title || !item.description) throw new Error(`Missing metadata: ${item.path}`)
}
for (const item of published) {
  if (!categoryByPath.has(item.category) || !item.date || !item.lead || !item.body) throw new Error(`Incomplete article: ${item.path}`)
  if (item.path.startsWith('/reviews/')) {
    const required = ['region','carrier','planName','planSource','nodes','timeWindows','results','failures','evidence','commercialRelationship']
    if (new Set(item.testDates || []).size < 2 || required.some(key => !item[key] || (Array.isArray(item[key]) && !item[key].length))) {
      throw new Error(`Review lacks required multi-day conditions, failures or evidence: ${item.path}`)
    }
  }
}

const nav = [
  ['/broadband/telecom/', '运营商'], ['/budget/', '预算套餐'], ['/scenarios/', '使用场景'], ['/method/', '测试方法'], ['/about/', '关于与披露']
]
function layout({ path: p, title, description, body, type = 'website', date, indexable = true }) {
  const canonical = absolute(p)
  const fullTitle = p === '/' ? `${siteName}｜按宽带、预算和场景看机场` : `${title}｜${siteName}`
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(fullTitle)}</title><meta name="description" content="${escape(description)}">
<link rel="canonical" href="${escape(canonical)}"><meta property="og:title" content="${escape(fullTitle)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="${type}"><meta property="og:url" content="${escape(canonical)}"><meta property="og:locale" content="zh_CN"><meta property="og:site_name" content="${escape(siteName)}">
${date ? `<meta property="article:published_time" content="${escape(date)}">` : ''}${placeholder || !indexable ? '<meta name="robots" content="noindex, nofollow">' : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css"></head>
<body><a class="skip-link" href="#main">跳到正文</a><header class="site-header"><div class="shell header-inner"><a class="brand" href="/" aria-label="${escape(siteName)}首页"><span class="brand-mark" aria-hidden="true">◒</span><span>${escape(siteName)}<small>把条件写清楚，再谈推荐</small></span></a><nav aria-label="主导航">${nav.map(([href,label]) => a(href,label)).join('')}</nav></div></header>
<main id="main">${body}</main><footer class="site-footer"><div class="shell footer-grid"><div><strong>${escape(siteName)}</strong><p>记录测试条件、失败与证据。没有实测，不给商家排名。</p></div><div class="footer-links">${a('/research/','待核验资料')}${a('/method/','测试方法')}${a('/about/','关于与推广披露')}${a('/sitemap.xml','站点地图')}</div></div><div class="shell footer-bottom">© 2026 ${escape(siteName)} · 内容仅供比较方法参考，请遵守所在地法律及服务条款。</div></footer></body></html>`
}
function card(item) {
  return `<article class="card"><span class="eyebrow">${escape(item.categoryLabel || item.kicker || '')}</span><h3>${a(item.path, item.title)}</h3><p>${escape(item.description)}</p><span class="card-arrow" aria-hidden="true">阅读 →</span></article>`
}
const categoryLinks = categories.map((c,i) => `<a class="category-tile" href="${c.path}"><span class="tile-num">0${i+1}</span><span><strong>${escape(c.name)}</strong><small>${escape(c.description)}</small></span><span aria-hidden="true">↗</span></a>`).join('')
const home = layout({path:'/', title:siteName, description:'按电信、联通、移动宽带、预算与使用场景比较机场。公开测试方法与证据要求；没有真实测试就不发布商家排名。', body:`
  <section class="hero"><div class="shell hero-grid"><div><span class="eyebrow light">独立中文机场选择笔记</span><h1>机场推荐，<br><em>先看你的条件。</em></h1><p class="hero-lead">同一个套餐，在不同家宽、地区与晚高峰时段，不能只凭一张截图下结论。这里先把怎么测、怎么算、怎么验收讲清楚。</p><div class="hero-actions">${a('/method/','了解测试方法','button button-primary')}${a('/budget/','按预算开始','button button-ghost')}</div></div><aside class="hero-aside"><span class="eyebrow light">本站当前状态</span><strong>方法先行，测评待证据</strong><p>首版发布可核验的选择方法。商家实测、套餐对照与推荐列表，会在记录充分后逐篇上线。</p><div class="aside-line"><span>目前正式商家测评</span><b>尚无</b></div><div class="aside-line"><span>数据口径</span><b>逐次记录</b></div></aside></div></section>
  <section class="section shell"><div class="section-heading"><div><span class="eyebrow">从你的问题出发</span><h2>五条选择路径</h2></div><p>先选自己能对照的线路或需求，再看文章中的条件与证据。</p></div><div class="category-grid">${categoryLinks}</div></section>
  <section class="section section-soft"><div class="shell"><div class="section-heading"><div><span class="eyebrow">已发布</span><h2>先读这三篇</h2></div><p>这些文章讲方法，不使用未经验证的商家测速或价格。</p></div><div class="card-grid">${published.map(card).join('')}</div></div></section>
  <section class="section shell research-promo"><div><span class="eyebrow">资料登记</span><h2>站主资料已纳入待核验清单</h2><p>整理了 ${providerIntake.length} 个可辨认的品牌名称。原资料中的套餐、价格、性能宣称和推广链接尚无法核验，因此不作为推荐发布。</p></div>${a('/research/','查看资料登记簿 →','button button-outline')}</section>
  <section class="section shell trust-grid"><div><span class="eyebrow">编辑准则</span><h2>一条推荐，先回答四个问题</h2></div><ol><li><strong>在哪里测？</strong><span>地区、宽带运营商、设备与客户端。</span></li><li><strong>何时测？</strong><span>日期、时区、晚高峰时段和重复次数。</span></li><li><strong>测了什么？</strong><span>套餐、节点、目标、成功与失败。</span></li><li><strong>如何复核？</strong><span>原始证据、价格来源及推广关系。</span></li></ol></section>`})

function categoryPage(c) {
  const related = published.filter(x => x.category === c.path || (c.path.startsWith('/broadband/') && x.path === '/guides/carrier-baseline/'))
  return layout({path:c.path,title:c.title,description:c.description,body:`<div class="page-hero"><div class="shell narrow"><span class="eyebrow">${escape(c.kicker)}</span><h1>${escape(c.title)}</h1><p>${escape(c.description)}</p></div></div><div class="shell content-layout"><div class="main-column"><section class="prose"><h2>从哪里开始</h2><p>本站只会在条件与证据足够时给出具体商家结论。当前可先用下面的核对项筛选测评和试用方案。</p><ul>${c.checklist.map(x=>`<li>${escape(x)}</li>`).join('')}</ul></section><section class="related"><div class="section-heading"><div><span class="eyebrow">相关内容</span><h2>已发布文章</h2></div></div><div class="card-grid compact">${related.map(card).join('')}</div></section></div><aside class="sidebar"><div class="side-box"><span class="eyebrow">测评状态</span><h2>商家结论待实测</h2><p>我们尚未取得足以公开比较的多日晚高峰记录，不展示虚构榜单。</p>${a('/method/','查看证据规则 →')}</div></aside></div>`})
}
function articlePage(item) {
  return layout({path:item.path,title:item.title,description:item.description,type:'article',date:item.date,body:`<div class="article-head"><div class="shell narrow"><div class="breadcrumb">${a('/','首页')} <span>/</span> ${a(item.category,item.categoryLabel)}</div><span class="eyebrow">${escape(item.categoryLabel)} · ${escape(item.reading)}</span><h1>${escape(item.title)}</h1><p class="article-lead">${escape(item.lead)}</p><div class="article-meta">发布于 <time datetime="${escape(item.date)}">${escape(item.date)}</time> · ${escape(siteName)}编辑</div></div></div><div class="shell content-layout"><article class="prose main-column">${item.body}<div class="article-end"><strong>这篇文章的证据范围</strong><p>本文提供可复核的比较框架，不包含任何商家的性能或价格结论。若发现表述有误，请在未来公布的联系渠道提交具体出处；有来源的修订会标明日期。</p></div></article><aside class="sidebar"><div class="side-box"><span class="eyebrow">阅读提示</span><h2>先核对条件</h2><p>想看某一家机场是否适合自己，请等该地区和运营商的实测记录，或按方法亲自试用。</p>${a('/method/','测试方法 →')}${a('/about/','推广披露 →')}</div></aside></div><div class="shell bottom-nav">${a(item.category,`← 返回${item.categoryLabel}`)}${a('/','返回首页 →')}</div>`})
}
const method = layout({path:'/method/',title:'测试方法与证据标准',description:'了解本站如何记录机场晚高峰测试日期、地区、运营商、套餐、节点、时段、结果、失败情况和原始证据。',body:`<div class="page-hero"><div class="shell narrow"><span class="eyebrow">公开方法</span><h1>测试方法与证据标准</h1><p>可比较的结论，要从可复查的条件和逐次记录开始。这里说明采样、失败计数和发布门槛。</p></div></div><div class="shell prose prose-wide"><h2>1. 固定环境，先测基线</h2><p>记录测试日期、时区、城市或省份、家宽运营商与标称带宽、设备、连接方式、客户端版本。先在同一设备与网络上做无代理基线，观察目标服务是否本身异常。个人 IP、账号与订阅地址不公开。</p><h2>2. 记录套餐与节点</h2><p>保存套餐名称、实际支付价格、购买周期、流量与倍率、官方来源 URL 和查看日期。逐次记录节点标识、目标服务、开始时间与持续时间，不能只保留成功的一张截图。</p><h2>3. 对齐晚高峰与重复次数</h2><p>本站把当地时间 20:00–23:00 作为晚高峰观察窗口，并明确时区。跨至少两个不同日期在相近条件下重复；若样本少或条件变化，结论只描述本次观察，不写长期“稳定”。</p><h2>4. 失败进入分母</h2><p>超时、连接失败、播放缓冲或会议中断都逐次记录。报告预设的超时阈值和重试规则，不能在结果不好时临时增加重试后只展示成功值。汇总时同时给成功次数、失败次数和样本量。</p><h2>5. 公开证据和局限</h2><p>保留原始日志、截图、测速文件或哈希，说明工具版本与目标。价格和退款条款引用商家官方页面及查看日期。公开汇总时提供足够的证据索引，并说明地区、线路、设备和时段的局限。</p><div class="note"><strong>发布门槛</strong><p>没有真实记录与来源的商家测评只保存在草稿中，不生成公开页面，不进入 sitemap。联盟关系、赠测和广告必须逐篇披露。</p></div><p>准备自己的记录时，可使用项目中的测评模板。对读者而言，也可以把上述字段当作核查任何测评文章的清单。</p></div>`})
const about = layout({path:'/about/',title:'关于本站与推广披露',description:'了解晚高峰观察的编辑定位、测评独立性、联盟链接披露、资料更正和隐私边界。',body:`<div class="page-hero"><div class="shell narrow"><span class="eyebrow">站点说明</span><h1>关于本站与推广披露</h1><p>“晚高峰观察”是暂定品牌。我们以宽带线路、预算和实际使用任务组织内容，把条件、失败和证据放在结论前面。</p></div></div><div class="shell prose prose-wide"><h2>我们怎样写推荐</h2><p>站点不以单次峰值给商家排总榜。商家文章必须有测试日期、地区、运营商、套餐、节点、时段、逐次结果、失败记录与可复核证据。套餐、节点和价格会变化，因此文章会标明核对日期；旧记录不能冒充实时结果。</p><h2>推广与利益关系</h2><p>目前首版没有商家联盟链接、广告位、付费排名或赠测商家结论。以后如果加入联盟链接、赞助或赠测，会在相应文章开头写明关系、套餐取得方式和是否收取佣金；商业合作不改变数据记录与失败披露要求。读者购买前应再次核对商家官方条款。</p><h2>来源、更正与隐私</h2><p>文章中的计算方法由本站撰写，商家价格与规则须引用可访问的官方页面及查看日期。若资料变更或发现错误，更新文章并标注更正内容与时间。公开测试只保留必要的地区级信息，不公开测试者精确地址、个人 IP、账号和订阅链接。</p><h2>适用范围</h2><p>内容用于帮助读者评估服务与费用，不保证某一商家在所有地区或时间段的可用性。使用任何服务时，请遵守所在地法律和相关平台条款。</p></div>`})
if (new Set(providerIntake.map(x => x.name)).size !== providerIntake.length) throw new Error('Duplicate provider intake name')
const research = layout({path:'/research/',title:'待核验资料登记簿',description:'站主提供的机场品牌名称登记，尚未核验身份、套餐和表现；这里不提供商家推荐或购买链接。',indexable:false,body:`<div class="page-hero"><div class="shell narrow"><span class="eyebrow">资料登记 · 暂不收录</span><h1>待核验资料登记簿</h1><p>以下名称来自站主提供的资料表，共 ${providerIntake.length} 条。列入清单只表示等待核验，不表示本站推荐或证实该服务仍在运营。</p></div></div><div class="shell research-body"><div class="note"><strong>为什么只列名称？</strong><p>原表的官方地址列为空，套餐字段出现错位，且包含推广链接与未经证实的性能宣称。本站暂不展示这些内容，也不提供购买入口。每家商家只有在官方条款与多日真实测试齐全后，才可能获得正式测评。</p></div><div class="provider-grid">${providerIntake.map(x=>`<div class="provider-item"><strong>${escape(x.name)}</strong><span>待核验</span></div>`).join('')}</div><p class="research-footnote">资料整理日期：2026-10-06。名称可能重复、更名或停运；请以今后的独立核验记录为准。${a('/method/','了解测评发布标准 →')}</p></div>`})

const pages = [
  {path:'/',html:home}, ...categories.map(c=>({path:c.path,html:categoryPage(c)})),
  ...published.map(x=>({path:x.path,html:articlePage(x)})),
  {path:'/method/',html:method}, {path:'/about/',html:about}, {path:'/research/',html:research,indexable:false}
]
const unique = new Set(pages.map(x=>x.path))
if (unique.size !== pages.length) throw new Error('Duplicate page path')
await fs.rm(out, {recursive:true, force:true})
await fs.mkdir(out, {recursive:true})
for (const page of pages) {
  const file = path.join(out, page.path.slice(1), 'index.html')
  await fs.mkdir(path.dirname(file), {recursive:true})
  await fs.writeFile(file, page.html, 'utf8')
}
await fs.mkdir(path.join(out,'assets'), {recursive:true})
await fs.copyFile(path.join(root,'site','style.css'), path.join(out,'assets','style.css'))
await fs.copyFile(path.join(root,'site','favicon.svg'), path.join(out,'favicon.svg'))
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(x=>x.indexable!==false).map(x=>`  <url><loc>${escape(absolute(x.path))}</loc>${published.find(a=>a.path===x.path) ? `<lastmod>${published.find(a=>a.path===x.path).date}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`
await fs.writeFile(path.join(out,'sitemap.xml'), xml, 'utf8')
await fs.writeFile(path.join(out,'robots.txt'), placeholder ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8')
const key = process.env.INDEXNOW_KEY?.trim()
if (key) {
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) throw new Error('Invalid INDEXNOW_KEY format')
  await fs.writeFile(path.join(out,`${key}.txt`), key, 'utf8')
}
console.log(`Built ${pages.length} pages for ${siteUrl}${placeholder ? ' (placeholder; noindex)' : ''}`)
