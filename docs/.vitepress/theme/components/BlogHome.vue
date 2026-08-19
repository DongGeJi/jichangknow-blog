<template>
  <div class="dongge-blog-wrap">
    <div class="blog-container">
      <!-- 左侧全量文章长列表流（可一直往下滑动查看所有文章） -->
      <main class="article-stream">
        <article 
          v-for="post in allPosts" 
          :key="post.id" 
          class="post-card"
          :class="{ 
            'about-card': post.isAbout, 
            'featured-card': post.isTopRecommend,
            'warning-pinned-card': post.isTopWarning 
          }"
        >
          <div class="card-meta">
            <span v-if="post.badge" class="badge" :class="post.badgeClass">{{ post.badge }}</span>
            <span class="category-tag">{{ post.category }}</span>
            <span class="meta-item">📖 {{ getReadingInfo(post) }}</span>
            <span v-for="t in post.tags" :key="t" class="tag-pill">{{ t }}</span>
            <span class="date">📅 {{ post.date }}</span>
            <div class="stats-right">
              <span class="stat-badge like">❤️ {{ getLikes(post.id, post.defaultLikes) }}</span>
            </div>
          </div>

          <h2 class="post-title">
            <a :href="post.link">{{ post.title }}</a>
          </h2>

          <div v-if="post.leadQuote" class="lead-quote" :class="{ 'warning-quote': post.isTopWarning }">
            <strong>{{ post.leadQuote.label }}</strong> {{ post.leadQuote.content }}
          </div>

          <div v-if="post.banner" class="post-banner">
            <div class="banner-inner">
              <span class="banner-icon">⚡</span>
              <span class="banner-text">{{ post.banner }}</span>
            </div>
          </div>

          <p class="post-summary">{{ post.summary }}</p>
        </article>
      </main>

      <!-- 右侧固定侧边栏 -->
      <aside class="blog-sidebar">
        <!-- 1. 博主名片 -->
        <div class="sidebar-card profile-card">
          <div class="avatar-box">
            <img src="/avatar.png?v=20260819_v3" alt="懂哥机 Logo" class="author-avatar-img" />
          </div>
          <h3 class="author-name">懂哥机</h3>
          <p class="author-desc">硬核老玩家 · 真实晚高峰测速</p>
          <div class="author-links">
            <a href="https://t.me/+eRqPUPEwXu80ZGU1" target="_blank" rel="noopener" class="social-btn">💬 TG 频道</a>
            <a href="mailto:jichangknow@proton.me" class="social-btn" :class="{ 'copied': emailCopied }" title="点击直接发邮件或一键复制邮箱 jichangknow@proton.me" @click="handleEmailClick">
              {{ emailCopied ? '✅ 已复制邮箱' : '✉️ 合作邮箱' }}
            </a>
            <a href="https://github.com/DongGeJi" target="_blank" rel="noopener" class="social-btn">🐱 GitHub</a>
          </div>
        </div>

        <!-- 2. 三宫格统计 (带独立跳转路由与精美 hover 悬停效果) -->
        <div class="sidebar-card stats-card">
          <a href="/tags/" class="stat-col-btn" title="查看全站标签云索引">
            <span class="stat-num">{{ statsInfo.totalTags }}</span>
            <span class="stat-lbl">🏷️ 标签</span>
          </a>
          <a href="/categories/" class="stat-col-btn" title="查看全站分类目录">
            <span class="stat-num">{{ statsInfo.totalCategories }}</span>
            <span class="stat-lbl">📁 分类</span>
          </a>
          <a href="/reviews/" class="stat-col-btn" title="查看 20 家机场测评大榜">
            <span class="stat-num">{{ statsInfo.totalReviews }}</span>
            <span class="stat-lbl">📑 评测</span>
          </a>
        </div>

        <!-- 3. 热门文章榜单（点赞联动） -->
        <div class="sidebar-card ranking-card">
          <div class="rank-header">
            <span class="active-tab">🔥 热门测评榜</span>
            <span class="sub-tab">点赞排行</span>
          </div>
          <ol class="rank-list">
            <li v-for="(item, idx) in rankList" :key="item.id">
              <span class="num" :class="`num-${idx + 1}`">{{ idx + 1 }}</span>
              <a :href="item.link">{{ item.title }}</a>
              <span class="view-count">❤️ {{ getLikes(item.id, item.defaultLikes) }}</span>
            </li>
          </ol>
        </div>

        <!-- 4. 专区目录导航 -->
        <div class="sidebar-card toc-directory-card">
          <div class="rank-header">
            <span class="active-tab">📑 专区目录导航</span>
            <span class="sub-tab">全站索引</span>
          </div>
          <ul class="directory-list">
            <li>
              <a href="/recommend/" class="dir-item">
                <span class="dir-icon">✈️</span>
                <span class="dir-title">2026 翻墙机场天梯榜</span>
                <span class="dir-badge">必看</span>
              </a>
            </li>
            <li>
              <a href="/warning/" class="dir-item danger-dir">
                <span class="dir-icon">🚨</span>
                <span class="dir-title">跑路失联与避坑黑名单</span>
                <span class="dir-badge bg-danger">避雷</span>
              </a>
            </li>
            <li>
              <a href="/reviews/" class="dir-item">
                <span class="dir-icon">📊</span>
                <span class="dir-title">20 家机场单篇测速报告库</span>
                <span class="dir-badge">深度</span>
              </a>
            </li>
            <li>
              <a href="/recommend/streaming-ai" class="dir-item">
                <span class="dir-icon">🤖</span>
                <span class="dir-title">ChatGPT / 4K 住宅IP解锁</span>
                <span class="dir-badge">特化</span>
              </a>
            </li>
            <li>
              <a href="/tutorials/" class="dir-item">
                <span class="dir-icon">⚡</span>
                <span class="dir-title">软路由与分流协议研究</span>
                <span class="dir-badge">极客</span>
              </a>
            </li>
            <li>
              <a href="/tutorials/" class="dir-item">
                <span class="dir-icon">🛠️</span>
                <span class="dir-title">客户端下载与订阅配置教程</span>
                <span class="dir-badge">保姆级</span>
              </a>
            </li>
            <li>
              <a href="/tags/" class="dir-item">
                <span class="dir-icon">🏷️</span>
                <span class="dir-title">全站 28+ 标签云索引</span>
                <span class="dir-badge">标签</span>
              </a>
            </li>
            <li>
              <a href="/about" class="dir-item">
                <span class="dir-icon">🙋‍♂️</span>
                <span class="dir-title">关于懂哥机与测速准则</span>
                <span class="dir-badge">自白</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { data as blogData } from '../posts.data.js'

const wordStats = blogData?.wordMap || {}
const statsInfo = {
  totalTags: blogData?.totalTags || 28,
  totalCategories: blogData?.totalCategories || 4,
  totalReviews: blogData?.totalReviews || 20
}

const emailCopied = ref(false)
const handleEmailClick = (e) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText('jichangknow@proton.me').then(() => {
      emailCopied.value = true
      setTimeout(() => {
        emailCopied.value = false
      }, 2500)
    }).catch(() => {})
  }
}

const getReadingInfo = (post) => {
  if (!post || !post.link) return '约 3000 字 · 8分钟'
  let linkKey = post.link.replace(/\.html$/, '')
  if (linkKey.endsWith('/') && linkKey !== '/') linkKey = linkKey.slice(0, -1)
  if (!linkKey) linkKey = '/'

  const stat = wordStats[linkKey]
  if (stat && stat.wordCount > 0) {
    return `约 ${stat.wordCount.toLocaleString()} 字 · ${stat.readTime}分钟阅读`
  }
  return post.readingInfo || '约 3000 字 · 8分钟'
}

// 全站全部文章完整注入（前3位置顶 + 20家真实机场单篇测评 + 全部深度教程）
const allPosts = [
  // 1. 置顶自白
  {
    id: 'about',
    isAbout: true,
    badge: '博主自白',
    badgeClass: 'badge-intro',
    category: '🙋‍♂️ 关于懂哥机',
    readingInfo: '约 3200 字 · 10分钟',
    tags: ['硬核玩家', '数据测评', '拒绝充值'],
    date: '2026-08-15',
    views: 890,
    defaultLikes: 268,
    link: '/about',
    title: '【置顶】我是懂哥机：一个拒绝虚标、用千兆晚高峰数据说话的硬核测评人',
    leadQuote: {
      label: '懂哥机原则：',
      content: '不接无底线虚假投广，不拿凌晨空载截图忽悠小白。所有测试均基于家用 1000M 宽带 + 20:00-23:00 晚高峰真实压力实测。'
    },
    summary: '玩机翻墙近 10 年，见识过太多小作坊拿公网直连冒充内网 IPLC、节点暗标 10 倍率吸干流量、以及各种“9.9 一年”的跑路盘。建立懂哥机博客的初衷很简单：用最真实的数据和长期追踪黑名单，帮大家守住钱包。'
  },
  // 2. 核心置顶大榜长文 (独立长文链接)
  {
    id: 'recommend-2026',
    isTopRecommend: true,
    badge: 'TOP 推荐',
    badgeClass: 'badge-top',
    category: '✈️ 深度测评',
    readingInfo: '约 5600 字 · 16分钟',
    tags: ['科学上网', 'IEPL专线', '晚高峰测速'],
    date: '2026-08-15',
    views: 5860,
    defaultLikes: 128,
    link: '/posts/2026-airport-recommend',
    title: '2026稳定科学上网机场推荐：拒绝虚标伪专线，晚高峰不卡顿梯子与跑路预警汇总',
    banner: '2026 晚高峰测速 · 科学上网机场实测榜',
    summary: '精选 2026 晚高峰千兆实测表现最优的 20 家真实机场梯子天梯榜，涵盖暮光加速、梯子云、隐形人、FlyV 等。支持专属优惠码折扣、全媒体/ChatGPT 原生解锁与全平台通用订阅。'
  },
  // 3. 避坑预警
  {
    id: 'warning',
    isTopWarning: true,
    badge: '置顶预警',
    badgeClass: 'badge-danger',
    category: '🚨 避坑预警',
    readingInfo: '约 2600 字 · 8分钟',
    tags: ['黑名单', '跑路汇总', '防骗维权'],
    date: '2026-08-10',
    views: 342,
    defaultLikes: 89,
    link: '/warning/',
    title: '⚠️ 2026 避坑指南：全网最全翻墙机场跑路汇总、失联黑名单与维权防骗全复盘',
    leadQuote: {
      label: '懂哥机导读：',
      content: '整理 2025 至 2026 期间拍屁股走人、失联跑路或存在极高跑路风险的机场名单。买机前先来查验，防止血本无归！'
    },
    summary: '全网首发机场跑路前兆深度复盘：曝光 TG 群全员禁言超 72 小时、节点大面积红字超时、突发一折年付甩卖套现等典型跑路征兆。深度拆解直连冒充专线、超卖 100 倍率等行业暗操作。'
  },
  // 4. 暮光加速
  {
    id: 'review-muguang',
    badge: '主推测评',
    badgeClass: 'badge-top',
    category: '📑 单篇实测',
    readingInfo: '约 2300 字 · 7分钟',
    tags: ['暮光加速', 'IEPL专线', '优惠码 mm88'],
    date: '2026-08-15',
    views: 2350,
    defaultLikes: 189,
    link: '/reviews/muguang',
    title: '【暮光加速】2026 深度测评：晚高峰千兆压测与 4K 秒开稳定性报告',
    summary: '懂哥机主推首选！国内三网 BGP 入口 + 纯 IEPL 内网专线直连。晚高峰油管 4K 零缓冲秒开，多媒体与 ChatGPT-4o 原生全解锁，专属优惠码 mm88。'
  },
  // 5. 梯子云
  {
    id: 'review-tiziyun',
    badge: '企业专线',
    badgeClass: 'badge-intro',
    category: '📑 单篇实测',
    readingInfo: '约 2100 字 · 6分钟',
    tags: ['梯子云', '自研客户端', '优惠码 tiziyun'],
    date: '2026-08-14',
    views: 1980,
    defaultLikes: 165,
    link: '/reviews/tiziyun',
    title: '【梯子云】2026 深度测评：告别高峰拥堵，IEPL 企业专线与小白客户端实测',
    summary: '全线 IEPL 企业专线，完美解锁 ChatGPT/Netflix，支持自研小白客户端一键连接与主流开源订阅，优惠码 tiziyun。'
  },
  // 6. 隐形人
  {
    id: 'review-yinxingren',
    badge: '极客专线',
    badgeClass: 'badge-intro',
    category: '📑 单篇实测',
    readingInfo: '约 1900 字 · 5分钟',
    tags: ['隐形人', 'VLESS 纯专线', '优惠码 yxr888'],
    date: '2026-08-12',
    views: 1620,
    defaultLikes: 142,
    link: '/reviews/yinxingren',
    title: '【隐形人】2026 深度测评：新加坡团队打造，VLESS 纯专线与 8K 极速实测',
    summary: '新加坡技术团队研发，全线纯专线 + VLESS Reality 协议。8K 视频秒开，原生解锁 AI/流媒体，随用随续无后顾之忧。'
  },
  // 7. FlyV
  {
    id: 'review-flyv',
    badge: '多设备特化',
    badgeClass: 'badge-intro',
    category: '📑 单篇实测',
    readingInfo: '约 1800 字 · 5分钟',
    tags: ['FlyV', '全节点 1.0x', '优惠码 fly20'],
    date: '2026-08-10',
    views: 1540,
    defaultLikes: 138,
    link: '/reviews/flyv',
    title: '【FlyV】2026 深度测评：全节点 1.0x 不暗扣，不限设备数与大流量实测',
    summary: '全线专线架构，全节点 1x 计费！支持 4K/8K 流媒体与 ChatGPT，无限速、不限在线设备数，优惠码 fly20。'
  },
  // 8. 灵动云
  {
    id: 'review-lingdongyun',
    category: '📑 单篇实测',
    readingInfo: '约 1800 字 · 5分钟',
    tags: ['灵动云', 'VLESS协议', '优惠码 ld88'],
    date: '2026-08-08',
    views: 1410,
    defaultLikes: 126,
    link: '/reviews/lingdongyun',
    title: '【灵动云】2026 深度测评：最新 VLESS 协议与超多国家地区节点实测',
    summary: '全线采用最新 VLESS 协议，提供香港、台湾、日本、新加坡及美国超多节点，实测晚高峰看 YouTube 4K 毫无压力。'
  },
  // 9. 浪网
  {
    id: 'review-langwang',
    category: '📑 单篇实测',
    readingInfo: '约 1950 字 · 6分钟',
    tags: ['浪网', 'AI开发特化', '优惠码 lw88'],
    date: '2026-08-05',
    views: 1490,
    defaultLikes: 130,
    link: '/reviews/langwang',
    title: '【浪网】2026 深度测评：全面支持 AI 开发调用与不限设备数实测报告',
    summary: '针对 ChatGPT、Claude 等 AI 工具开发调用特化优化，买即送软件版 SS 协议，不限制同时在线设备数量。'
  },
  // 10. 宇宙云
  {
    id: 'review-yuzhouyun',
    category: '📑 单篇实测',
    readingInfo: '约 1750 字 · 5分钟',
    tags: ['宇宙云', '¥14.9平价', '优惠码 YUZHOU553'],
    date: '2026-08-03',
    views: 1380,
    defaultLikes: 112,
    link: '/reviews/yuzhouyun',
    title: '【宇宙云】2026 深度测评：14.9元超高性价比入门梯子实测',
    summary: 'BGP 多线中转架构，首月折后仅需 14.9 元，适合学生党查资料与轻度追剧的高性价比之选。'
  },
  // 11. 全球云
  {
    id: 'review-quanqiuyun',
    category: '📑 单篇实测',
    readingInfo: '约 1900 字 · 6分钟',
    tags: ['全球云', '外贸出海', '30+地区覆盖'],
    date: '2026-08-01',
    views: 1290,
    defaultLikes: 106,
    link: '/reviews/quanqiuyun',
    title: '【全球云】2026 深度测评：覆盖全球 30+ 地区外贸出海专线实测',
    summary: '多线 BGP 混合专线入口，支持智能负载均衡与多国节点切换，跨境外贸与跨境电商主力方案。'
  },
  // 12. 光速云
  {
    id: 'review-guangshuyun',
    category: '📑 单篇实测',
    readingInfo: '约 1800 字 · 5分钟',
    tags: ['光速云', '35ms低延迟', '秒开体验'],
    date: '2026-07-29',
    views: 1210,
    defaultLikes: 99,
    link: '/reviews/guangshuyun',
    title: '【光速云】2026 深度测评：平均延迟 35ms 极速中转专线实测',
    summary: '高规格中转接入，节点平均响应极快，网页毫秒级秒开，带来无感翻墙顺畅体验。'
  },
  // 13. U1S1
  {
    id: 'review-u1s1',
    category: '📑 单篇实测',
    readingInfo: '约 1700 字 · 5分钟',
    tags: ['U1S1', '倍率透明', 'AnyTLS'],
    date: '2026-07-27',
    views: 1150,
    defaultLikes: 94,
    link: '/reviews/u1s1',
    title: '【U1S1】2026 深度测评：节点倍率真实透明与 AnyTLS 抗封锁实测',
    summary: '拒绝暗扣流量，全节点透明标注，抗封锁 AnyTLS 协议，晚高峰千兆带宽不降速。'
  },
  // 14. 极连云
  {
    id: 'review-jilianyun',
    category: '📑 单篇实测',
    readingInfo: '约 1650 字 · 5分钟',
    tags: ['极连云', '智能调度', '零丢包'],
    date: '2026-07-25',
    views: 1080,
    defaultLikes: 91,
    link: '/reviews/jilianyun',
    title: '【极连云】2026 深度测评：多入口智能调度与 0 丢包晚高峰实测',
    summary: '自动优选最佳入口，晚高峰千兆带宽压测 0 丢包，日常通勤与移动端稳定首选。'
  },
  // 15. 光年梯
  {
    id: 'review-guangnianti',
    category: '📑 单篇实测',
    readingInfo: '约 1850 字 · 5分钟',
    tags: ['光年梯', 'Netflix 4K', '流媒体特化'],
    date: '2026-07-23',
    views: 1120,
    defaultLikes: 102,
    link: '/reviews/guangnianti',
    title: '【光年梯】2026 深度测评：Netflix 4K 与 Disney+ 深度解锁实测',
    summary: '专为流媒体打造，全节点原生 IP 轮询，全天候 YouTube 4K 拖拽零缓冲。'
  },
  // 16. 一翻云
  {
    id: 'review-yifanyun',
    category: '📑 单篇实测',
    readingInfo: '约 1700 字 · 5分钟',
    tags: ['一翻云', '150GB大流量', '多端共享'],
    date: '2026-07-21',
    views: 1040,
    defaultLikes: 87,
    link: '/reviews/yifanyun',
    title: '【一翻云】2026 深度测评：150GB 充沛配额与团队协作实测',
    summary: '大带宽 150G 流量配额，适合高频大文件下载与团队多设备共享使用。'
  },
  // 17. 二猫云
  {
    id: 'review-ermaoyun',
    category: '📑 单篇实测',
    readingInfo: '约 1600 字 · 5分钟',
    tags: ['二猫云', '一键导入', '手机适配'],
    date: '2026-07-19',
    views: 990,
    defaultLikes: 83,
    link: '/reviews/ermaoyun',
    title: '【二猫云】2026 深度测评：iOS 与 Android 客户端极简配置实测',
    summary: '针对移动端深度优化，支持一键导入小火箭与 Clash，配置极度精简。'
  },
  // 18. sogo云
  {
    id: 'review-sogoyun',
    category: '📑 单篇实测',
    readingInfo: '约 1750 字 · 5分钟',
    tags: ['sogo云', '企业中转', '外贸生产力'],
    date: '2026-07-17',
    views: 950,
    defaultLikes: 79,
    link: '/reviews/sogoyun',
    title: '【sogo云】2026 深度测评：企业级中转隧道与外贸生产力实测',
    summary: '高稳定性保障，企业级加密传输，远程办公与跨境外贸主力方案。'
  },
  // 19. edgenova
  {
    id: 'review-edgenova',
    category: '📑 单篇实测',
    readingInfo: '约 1700 字 · 5分钟',
    tags: ['edgenova', '边缘计算', 'OpenAI API', 'GitHub'],
    date: '2026-07-15',
    views: 1020,
    defaultLikes: 95,
    link: '/reviews/edgenova',
    title: '【edgenova】2026 深度测评：边缘计算加速节点与 GitHub / OpenAI 特化实测',
    summary: '边缘计算全球 Anycast 调度，针对 OpenAI API 及 GitHub 代码拉取特化加速，开发者公认好用。'
  },
  // 20. 雨燕云
  {
    id: 'review-yuyanyun',
    category: '📑 单篇实测',
    readingInfo: '约 1650 字 · 5分钟',
    tags: ['雨燕云', '电竞低延迟', '全协议支持'],
    date: '2026-07-13',
    views: 910,
    defaultLikes: 76,
    link: '/reviews/yuyanyun',
    title: '【雨燕云】2026 深度测评：极简低延迟隧道与电竞加速实测',
    summary: '极简高速隧道，低延迟电竞优化，支持各种开源客户端全协议直连。'
  },
  // 21. 次元链接
  {
    id: 'review-cylink',
    category: '📑 单篇实测',
    readingInfo: '约 1800 字 · 5分钟',
    tags: ['次元链接', '二次元特化', 'B站港澳台', 'DMM'],
    date: '2026-07-11',
    views: 1050,
    defaultLikes: 92,
    link: '/reviews/cylink',
    title: '【次元链接】2026 深度测评：二次元泛娱乐特化与 B站/DMM 番剧全绿实测',
    summary: '二次元泛娱乐特化，Bilibili 港澳台、DMM 及动画番剧全绿解锁，追番看剧无障碍。'
  },
  // 22. 茶艺云
  {
    id: 'review-teaartcloud',
    category: '📑 单篇实测',
    readingInfo: '约 1600 字 · 5分钟',
    tags: ['茶艺云', '纯净住宅IP', '小众轻量', '防封控'],
    date: '2026-07-09',
    views: 880,
    defaultLikes: 71,
    link: '/reviews/teaartcloud',
    title: '【茶艺云】2026 深度测评：文艺小众纯净住宅 IP 与远离封号实测',
    summary: '文艺轻量级梯子，小众纯净节点，住宅 IP 伪装，有效远离封号风控。'
  },
  // 23. 三番云
  {
    id: 'review-sanfancloud',
    category: '📑 单篇实测',
    readingInfo: '约 1750 字 · 5分钟',
    tags: ['三番云', '容灾双备份', '三网直连', 'IEPL'],
    date: '2026-07-07',
    views: 940,
    defaultLikes: 78,
    link: '/reviews/sanfancloud',
    title: '【三番云】2026 深度测评：三网直连与 IEPL 容灾双备份实测',
    summary: '三网直连与 IEPL 容灾双备份，极端特殊敏感时期不断连，坚挺耐用。'
  },
  // 24. 便宜机场与按量付费
  {
    id: 'cheap-2',
    category: '💰 便宜按量',
    readingInfo: '约 3100 字 · 9分钟',
    tags: ['平价梯子', '按量付费', '备用容灾'],
    date: '2026-08-08',
    views: 412,
    defaultLikes: 96,
    link: '/recommend/cheap',
    title: '2026便宜机场与不限时按量付费大流量套餐精选推荐',
    summary: '精选 2026 平价高性价比梯子与按量付费不限时流量包。拒绝 10 倍率暗扣，适合学生党查资料与作为主力专线的备用容灾方案。'
  },
  // 25. AI / 4K解锁专区
  {
    id: 'streaming-ai-2',
    category: '🤖 AI / 4K解锁',
    readingInfo: '约 3500 字 · 11分钟',
    tags: ['ChatGPT-4o', 'Claude 3.5', '住宅双ISP'],
    date: '2026-08-05',
    views: 510,
    defaultLikes: 145,
    link: '/recommend/streaming-ai',
    title: '2026 ChatGPT-4o / Claude 3.5 / Netflix 4K 原生 IP 解锁专线实测榜',
    summary: '专门针对 AI 开发者、外贸办公与 4K 流媒体用户整理的原生双 ISP 家宽专线。解决 Access Denied 报错与封号风控。'
  },
  // 26. Clash Verge Rev 教程
  {
    id: 'clash-verge',
    category: '🛠️ 客户端指南',
    readingInfo: '约 3300 字 · 9分钟',
    tags: ['Clash Verge', 'TUN模式', 'DNS防泄漏'],
    date: '2026-08-14',
    views: 620,
    defaultLikes: 115,
    link: '/posts/clash-verge-rev-guide',
    title: '2026 Clash Verge Rev 官方下载、订阅导入与防 DNS 泄漏保姆级配置教程',
    summary: '基于 Meta（Mihomo）内核打造的跨平台最稳定科学上网客户端。详解 Windows/macOS 内核切换与 TUN 虚拟网卡接管设置。'
  },
  // 27. Shadowrocket 教程
  {
    id: 'shadowrocket',
    category: '🛠️ 客户端指南',
    readingInfo: '约 2900 字 · 8分钟',
    tags: ['Shadowrocket', '小火箭', 'iOS翻墙'],
    date: '2026-08-12',
    views: 480,
    defaultLikes: 98,
    link: '/posts/shadowrocket-ios-setup',
    title: '2026 Shadowrocket (小火箭) 购买下载、节点配置与规则分流深度教程',
    summary: 'iPhone/iPad iOS 平台首选科学上网工具。从美区 Apple ID 购买下载、通用订阅一键导入到精细化分流规则全流程。'
  },
  // 28. 软路由教程
  {
    id: 'soft-router',
    category: '💡 软路由与极客',
    readingInfo: '约 3600 字 · 11分钟',
    tags: ['OpenWrt', 'OpenClash', 'Apple TV'],
    date: '2026-08-10',
    views: 730,
    defaultLikes: 142,
    link: '/posts/soft-router-openclash-guide',
    title: '2026 软路由全屋科学上网指南：OpenWrt / ImmortalWrt + OpenClash 旁路由配置',
    summary: '搞定 Apple TV、PS5、Switch 及智能家居全屋无感翻墙加速。详解旁路由网络拓扑规划与 Fake-IP 混合模式。'
  },
  // 29. 协议解析
  {
    id: 'vless-protocol',
    category: '💡 科学上网科普',
    readingInfo: '约 3200 字 · 9分钟',
    tags: ['AnyTLS', 'VLESS', 'Hysteria 2'],
    date: '2026-08-07',
    views: 390,
    defaultLikes: 88,
    link: '/posts/vless-anytls-hysteria2-explained',
    title: '2026 最新科学上网协议演进：AnyTLS、VLESS 与 Hysteria 2 深度原理解析',
    summary: '深度剖析 2026 年抗 GFW 封锁核心协议演进，拆解 AnyTLS 动态握手、VLESS Reality 伪装与 UDP Hysteria 2 暴力加速。'
  },
  // 30. 专线对比
  {
    id: 'iplc-vs-bgp',
    category: '💡 科学上网科普',
    readingInfo: '约 2800 字 · 8分钟',
    tags: ['IPLC专线', 'BGP中转', '线路对比'],
    date: '2026-08-04',
    views: 530,
    defaultLikes: 108,
    link: '/posts/iplc-vs-bgp-transit',
    title: 'IPLC 专线 vs BGP 中转 vs 直连：别再被机场主的营销话术忽悠了',
    summary: '扒透机场物理网络架构：为什么纯物理内网光纤直连能做到零丢包且不过墙？深入对比晚高峰公网拥堵下不同线路架构的真实体验。'
  }
]

// 热门榜单排行
const rankList = [
  { id: 'about', title: '【置顶】我是懂哥机：测评自白', link: '/about', defaultLikes: 268 },
  { id: 'review-muguang', title: '【暮光加速】深度测评 (主推)', link: '/reviews/muguang', defaultLikes: 189 },
  { id: 'review-tiziyun', title: '【梯子云】IEPL 企业专线', link: '/reviews/tiziyun', defaultLikes: 165 },
  { id: 'streaming-ai', title: 'ChatGPT/Claude 原生解锁榜', link: '/recommend/streaming-ai', defaultLikes: 145 },
  { id: 'review-yinxingren', title: '【隐形人】新加坡 VLESS 专线', link: '/reviews/yinxingren', defaultLikes: 142 },
  { id: 'review-flyv', title: '【FlyV】不限设备 1.0x 专线', link: '/reviews/flyv', defaultLikes: 138 },
  { id: 'recommend-2026', title: '2026最佳机场推荐综合榜', link: '/recommend/', defaultLikes: 128 },
  { id: 'warning', title: '2026 避坑指南：全网最全翻墙机场跑路汇总、失联黑名单与维权防骗全复盘', link: '/warning/', defaultLikes: 89 }
]

import { getMasterStats } from '../articleRegistry'

const viewsMap = ref({})
const likesMap = ref({})

const loadAllStats = () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
  const lMap = {}
  const vMap = {}
  allPosts.forEach(p => {
    const lVal = localStorage.getItem(`dongge_likes_${p.id}`)
    if (lVal) lMap[p.id] = parseInt(lVal, 10)

    const vVal = localStorage.getItem(`dongge_views_${p.id}`)
    if (vVal) vMap[p.id] = parseInt(vVal, 10)
  })
  likesMap.value = lMap
  viewsMap.value = vMap
}

const getViews = (id, defaultVal) => {
  if (viewsMap.value[id] !== undefined) return viewsMap.value[id]
  return getMasterStats(id).views
}

const getLikes = (id, defaultVal) => {
  if (likesMap.value[id] !== undefined) return likesMap.value[id]
  return getMasterStats(id).likes
}

onMounted(() => {
  loadAllStats()
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', loadAllStats)
    window.addEventListener('dongge_stats_updated', loadAllStats)
  }
})
</script>

<style scoped>
.dongge-blog-wrap {
  min-height: calc(100vh - 64px);
  padding: 2rem 1.5rem;
}
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: flex-start;
}
.article-stream {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.post-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  transition: all 0.25s ease;
}
.post-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}
.about-card {
  border-left: 4px solid #2563eb;
}
.featured-card {
  border-left: 4px solid #0284c7;
}
.warning-pinned-card {
  border-left: 4px solid #dc2626;
  background: linear-gradient(180deg, rgba(254, 242, 242, 0.25) 0%, var(--vp-c-bg) 100%);
}
.card-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}
.badge {
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 800;
  font-size: 0.72rem;
}
.badge-intro { background: #2563eb; color: #fff; }
.badge-top { background: var(--vp-c-brand-1); color: #fff; }
.badge-danger { background: #fee2e2; color: #dc2626; }
.category-tag { font-weight: 700; color: var(--vp-c-text-1); }
.tag-pill {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}
.stats-right {
  margin-left: auto;
  display: inline-flex;
  gap: 0.4rem;
}
.stat-badge {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-2);
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 10px;
}
.stat-badge.like { color: #dc2626; }
.post-title {
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.4;
  margin: 0 0 0.85rem 0;
}
.post-title a { color: var(--vp-c-text-1); text-decoration: none; }
.post-title a:hover { color: #2563eb; }

.post-banner {
  background: #0f172a;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}
.banner-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 800;
}
.lead-quote {
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand-1);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.85rem;
}
.lead-quote.warning-quote {
  border-left-color: #dc2626;
  background: #fef2f2;
  color: #991b1b;
}
.post-summary {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* 侧边栏（右侧保持粘性，左侧可以无限往下滑动） */
.blog-sidebar {
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.sidebar-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.profile-card { text-align: center; }
.avatar-box {
  width: 64px;
  height: 64px;
  margin: 0 auto 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(2, 132, 199, 0.25);
  border: 2px solid var(--vp-c-gutter);
  background: #0b0f19;
}
.author-avatar-img { width: 100%; height: 100%; object-fit: cover; }
.author-name { font-size: 1.15rem; font-weight: 800; color: var(--vp-c-text-1); margin: 0; }
.author-desc { font-size: 0.8rem; color: var(--vp-c-text-2); margin: 0.25rem 0 0.85rem; }
.author-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.35rem;
  width: 100%;
}
.social-btn {
  flex: 1 1 0;
  min-width: 0;
  white-space: nowrap;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-1) !important;
  padding: 0.4rem 0.2rem;
  border-radius: 6px;
  font-size: 0.74rem;
  text-decoration: none !important;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}
.social-btn:hover {
  background: var(--vp-c-bg);
  border-color: #0284c7;
  color: #0284c7 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
}
.social-btn.copied {
  background: #f0fdf4 !important;
  border-color: #86efac !important;
  color: #16a34a !important;
}
.dark .social-btn.copied {
  background: #052e16 !important;
  border-color: #166534 !important;
  color: #4ade80 !important;
}

/* 三宫格按钮 (可独立跳转与精美 hover 动画) */
.stats-card {
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 0.8rem 0.4rem;
}
.stat-col-btn {
  flex: 1;
  text-decoration: none !important;
  padding: 0.55rem 0.2rem;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stat-col-btn:hover {
  background: var(--vp-c-bg-alt);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.12);
}
.stat-col-btn:hover .stat-num {
  color: #0284c7;
}
.stat-num {
  display: block;
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
  transition: color 0.2s ease;
}
.stat-lbl {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

/* 热门榜 */
.rank-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--vp-c-gutter);
  padding-bottom: 0.6rem;
  margin-bottom: 0.75rem;
}
.active-tab { font-size: 0.88rem; font-weight: 700; color: var(--vp-c-text-1); }
.sub-tab { font-size: 0.88rem; color: var(--vp-c-text-3); }
.rank-list { list-style: none; padding: 0; margin: 0; }
.rank-list li { display: flex; align-items: center; font-size: 0.82rem; margin-bottom: 0.65rem; }
.rank-list a { color: var(--vp-c-text-2); text-decoration: none; flex: 1; margin: 0 0.5rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rank-list a:hover { color: #2563eb; }
.num { width: 18px; height: 18px; border-radius: 4px; display: inline-block; text-align: center; line-height: 18px; font-size: 0.72rem; font-weight: 700; background: var(--vp-c-bg-alt); color: var(--vp-c-text-2); }
.num-1 { background: #fee2e2; color: #dc2626; }
.num-2 { background: #ffedd5; color: #ea580c; }
.num-3 { background: #e0f2fe; color: #0284c7; }
.view-count { font-size: 0.75rem; color: #dc2626; font-weight: 600; }

/* 专区目录导航列表样式 */
.directory-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.dir-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.6rem;
  border-radius: 6px;
  text-decoration: none !important;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  transition: all 0.2s ease;
  background: var(--vp-c-bg-alt);
}
.dir-item:hover {
  background: var(--vp-c-gutter);
  color: var(--vp-c-brand-1);
  transform: translateX(3px);
}
.dir-icon { font-size: 0.95rem; }
.dir-title { flex: 1; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.dir-badge {
  font-size: 0.68rem;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 700;
}
.danger-dir .dir-badge {
  background: #fee2e2;
  color: #dc2626;
}

@media (max-width: 960px) {
  .blog-container { grid-template-columns: 1fr; }
  .blog-sidebar { position: static; }
}
</style>
