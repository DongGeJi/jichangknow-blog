// 全站文章唯一中央数据源注册表 (Single Source of Truth)
export const MASTER_ARTICLE_REGISTRY = {
  // 1. 核心置顶与综合榜单
  'recommend-2026': { id: 'recommend-2026', views: 5860, likes: 480, link: '/recommend/' },
  'warning': { id: 'warning', views: 4250, likes: 420, link: '/warning/' },
  'software-wiki': { id: 'software-wiki', views: 3850, likes: 380, link: '/tutorials/' },
  'tutorials-wiki': { id: 'software-wiki', views: 3850, likes: 380, link: '/tutorials/' },
  'about': { id: 'about', views: 3450, likes: 320, link: '/about' },

  // 2. 特化指南与选购大榜
  'streaming-ai': { id: 'streaming-ai', views: 2680, likes: 245, link: '/recommend/streaming-ai' },
  'ai-4k-unlock': { id: 'streaming-ai', views: 2680, likes: 245, link: '/recommend/streaming-ai' },
  'cheap': { id: 'cheap', views: 2280, likes: 195, link: '/recommend/cheap' },

  // 3. 20 家机场单篇测评白皮书 (统一 ID 别名别误吸)
  'review-muguang': { id: 'review-muguang', views: 2850, likes: 268, link: '/reviews/muguang' },
  'review-tiziyun': { id: 'review-tiziyun', views: 2420, likes: 210, link: '/reviews/tiziyun' },
  'review-yinxingren': { id: 'review-yinxingren', views: 2150, likes: 189, link: '/reviews/yinxingren' },
  'review-flyv': { id: 'review-flyv', views: 1980, likes: 165, link: '/reviews/flyv' },
  'review-lingdongyun': { id: 'review-lingdongyun', views: 1850, likes: 149, link: '/reviews/lingdongyun' },
  'review-langwang': { id: 'review-langwang', views: 1720, likes: 141, link: '/reviews/langwang' },
  'review-yuzhouyun': { id: 'review-yuzhouyun', views: 1650, likes: 138, link: '/reviews/yuzhouyun' },
  'review-quanqiuyun': { id: 'review-quanqiuyun', views: 1580, likes: 132, link: '/reviews/quanqiuyun' },
  'review-guangshuyun': { id: 'review-guangshuyun', views: 1520, likes: 128, link: '/reviews/guangshuyun' },
  'review-u1s1': { id: 'review-u1s1', views: 1460, likes: 124, link: '/reviews/u1s1' },
  'review-jilianyun': { id: 'review-jilianyun', views: 1410, likes: 119, link: '/reviews/jilianyun' },
  'review-guangnianti': { id: 'review-guangnianti', views: 1360, likes: 115, link: '/reviews/guangnianti' },
  'review-yifanyun': { id: 'review-yifanyun', views: 1310, likes: 112, link: '/reviews/yifanyun' },
  'review-ermaoyun': { id: 'review-ermaoyun', views: 1270, likes: 108, link: '/reviews/ermaoyun' },
  'review-sogoyun': { id: 'review-sogoyun', views: 1230, likes: 105, link: '/reviews/sogoyun' },
  'review-edgenova': { id: 'review-edgenova', views: 1190, likes: 101, link: '/reviews/edgenova' },
  'review-yuyanyun': { id: 'review-yuyanyun', views: 1150, likes: 98, link: '/reviews/yuyanyun' },
  'review-cylink': { id: 'review-cylink', views: 1120, likes: 95, link: '/reviews/cylink' },
  'review-teaartcloud': { id: 'review-teaartcloud', views: 1090, likes: 92, link: '/reviews/teaartcloud' },
  'review-sanfancloud': { id: 'review-sanfancloud', views: 1060, likes: 89, link: '/reviews/sanfancloud' },
  'review-peiqian': { id: 'review-peiqian', views: 1890, likes: 210, link: '/reviews/peiqian' },
  'review-jiuyun': { id: 'review-jiuyun', views: 2150, likes: 230, link: '/reviews/jiuyun' },
  'review-baoyun': { id: 'review-baoyun', views: 1980, likes: 215, link: '/reviews/baoyun' },

  // 4. 深度技术教程
  'soft-router': { id: 'soft-router', views: 1540, likes: 125, link: '/tutorials/soft-router' },
  'shadowrocket-guide': { id: 'shadowrocket-guide', views: 1480, likes: 118, link: '/tutorials/shadowrocket' },
  'protocols-evolution': { id: 'protocols-evolution', views: 1390, likes: 112, link: '/tutorials/protocols-evolution' },
  'iplc-vs-bgp': { id: 'iplc-vs-bgp', views: 1310, likes: 108, link: '/tutorials/iplc-vs-bgp' },
  'clash-verge-guide': { id: 'clash-verge-guide', views: 1240, likes: 98, link: '/tools/clash-verge-guide' }
}

export function getMasterStats(id) {
  if (!id) return { id: 'default', views: 1200, likes: 100 }
  
  // 归一化提取规则：兼容页面路径、文章别名与真实 ID
  let key = id.replace(/^\//, '').replace(/\.html$/, '').replace(/\/$/, '')
  if (key.startsWith('reviews/')) {
    const name = key.replace('reviews/', '')
    key = `review-${name}`
  } else if (key === 'warning' || key.includes('scam')) {
    key = 'warning'
  } else if (key === 'recommend' || key.includes('2026-airport-recommend')) {
    key = 'recommend-2026'
  } else if (key.includes('streaming-ai') || key.includes('ai-nodes')) {
    key = 'streaming-ai'
  } else if (key.includes('cheap')) {
    key = 'cheap'
  } else if (key.includes('soft-router')) {
    key = 'soft-router'
  } else if (key.includes('shadowrocket')) {
    key = 'shadowrocket-guide'
  } else if (key.includes('protocols')) {
    key = 'protocols-evolution'
  } else if (key.includes('iplc-vs-bgp')) {
    key = 'iplc-vs-bgp'
  } else if (key.includes('clash-verge')) {
    key = 'clash-verge-guide'
  } else if (key.includes('tutorials')) {
    key = 'tutorials-wiki'
  }

  // 关键别名容错：如果 key 没有 review- 前缀，优先尝试 review-${key}
  if (!MASTER_ARTICLE_REGISTRY[key] && MASTER_ARTICLE_REGISTRY[`review-${key}`]) {
    key = `review-${key}`
  }

  if (MASTER_ARTICLE_REGISTRY[key]) {
    return MASTER_ARTICLE_REGISTRY[key]
  }

  // 安全哈希兜底
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i)
    hash |= 0
  }
  const absHash = Math.abs(hash)
  return {
    id: key,
    views: 1100 + (absHash % 1500),
    likes: 90 + (absHash % 150)
  }
}
