<template>
  <div v-if="showRank" class="aside-rank-container">
    <!-- 1. 顶部 Header 区：全站统一展示单行高亮「🔥 热门点赞排行榜」 -->
    <div class="aside-rank-header">
      <h3 class="rank-header-title">🔥 热门点赞排行榜</h3>
    </div>

    <!-- 2. 1~15 榜单列表：按点赞数 💗 统一倒序排列 -->
    <ol class="aside-rank-list">
      <li v-for="(item, index) in displayList" :key="item.id" class="rank-list-item">
        <span class="rank-index" :class="getBadgeClass(index)">{{ index + 1 }}</span>
        <a :href="item.link" class="rank-item-title" :title="cleanTitle(item.title)">
          {{ cleanTitle(item.title) }}
        </a>
        <span class="rank-stat-val">
          <span class="stat-like-tag">💗 {{ formatNum(getLikes(item.id)) }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const showRank = computed(() => {
  if (frontmatter.value && frontmatter.value.asideRank === false) return false
  if (page.value && page.value.relativePath === 'reviews/index.md') return false
  return true
})

// 默认开启热门测评榜主视图
const currentTab = ref('hot')
const likesMap = ref({})
const viewsMap = ref({})

// 博客真实收录的 15 篇核心长文与测评大榜
const rawList = [
  { id: 'software-wiki', title: '2026 全平台客户端下载与深度部署教程百科', link: '/tutorials/', defaultViews: 2580, defaultLikes: 581 },
  { id: 'about', title: '【置顶】我是懂哥机：测评自白与准则', link: '/about', defaultViews: 2450, defaultLikes: 320 },
  { id: 'recommend-2026', title: '2026 稳定科学上网机场推荐综合大榜', link: '/recommend/', defaultViews: 2380, defaultLikes: 295 },
  { id: 'review-muguang', title: '【暮光加速】2026 深度测评 (主推)', link: '/reviews/muguang', defaultViews: 2350, defaultLikes: 268 },
  { id: 'ai-4k-unlock', title: '2026 ChatGPT / Claude 住宅IP解锁技术指南', link: '/recommend/streaming-ai', defaultViews: 2280, defaultLikes: 245 },
  { id: 'warning', title: '2026 避坑指南：全网最全翻墙机场跑路汇总、失联黑名单与维权防骗全复盘', link: '/warning/', defaultViews: 2150, defaultLikes: 210 },
  { id: 'review-tiziyun', title: '【梯子云】IEPL 企业专线与小白客户端', link: '/reviews/tiziyun', defaultViews: 1980, defaultLikes: 180 },
  { id: 'cheap', title: '2026 便宜机场与不限时按量付费推荐', link: '/recommend/cheap', defaultViews: 1850, defaultLikes: 165 },
  { id: 'review-yinxingren', title: '【隐形人】新加坡 VLESS 纯专线实测', link: '/reviews/yinxingren', defaultViews: 1750, defaultLikes: 150 },
  { id: 'review-flyv', title: '【FlyV】全节点 1.0x 不限设备专线', link: '/reviews/flyv', defaultViews: 1620, defaultLikes: 142 },
  { id: 'soft-router', title: '软路由全屋翻墙部署方案', link: '/tutorials/soft-router', defaultViews: 295, defaultLikes: 49 },
  { id: 'clash-rules-guide', title: '如何编写高性能的 Clash 分流规则', link: '/tutorials/clash-rules-guide', defaultViews: 290, defaultLikes: 48 },
  { id: 'sub-converter', title: '机场节点订阅转换实操详解', link: '/tutorials/sub-converter', defaultViews: 280, defaultLikes: 45 },
  { id: 'ip-clean-guide', title: '原生 IP 防封与环境净化指南', link: '/tutorials/ip-clean-guide', defaultViews: 275, defaultLikes: 43 },
  { id: 'network-tuning', title: '晚高峰低延迟优化秘籍', link: '/tutorials/network-tuning', defaultViews: 265, defaultLikes: 41 }
]

const cleanTitle = (str) => {
  if (!str) return ''
  return str.replace(/^[\p{Extended_Pictographic}\s]+/gu, '').trim()
}

const getBadgeClass = (index) => {
  if (index === 0) return 'top-1'
  if (index === 1) return 'top-2'
  if (index === 2) return 'top-3'
  return 'top-other'
}

import { getMasterStats } from '../articleRegistry'

const loadStats = () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
  const lMap = {}
  const vMap = {}
  rawList.forEach(p => {
    const lVal = localStorage.getItem(`dongge_likes_${p.id}`)
    if (lVal) lMap[p.id] = parseInt(lVal, 10)
    
    const vVal = localStorage.getItem(`dongge_views_${p.id}`)
    if (vVal) {
      const parsed = parseInt(vVal, 10)
      if (parsed !== 240 && parsed !== 241 && parsed !== 510) {
        vMap[p.id] = parsed
      }
    }
  })
  likesMap.value = lMap
  viewsMap.value = vMap
}

const getLikes = (id, defaultVal) => {
  if (likesMap.value[id] !== undefined) return likesMap.value[id]
  return getMasterStats(id).likes
}

const getViews = (id, defaultVal) => {
  if (viewsMap.value[id] !== undefined) return viewsMap.value[id]
  return getMasterStats(id).views
}

const formatNum = (num) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  return num.toLocaleString()
}

// 全局动态点赞排行榜：按 Likes 降序排列
const displayList = computed(() => {
  const list = [...rawList]
  return list.sort((a, b) => getLikes(b.id) - getLikes(a.id))
})

onMounted(() => {
  loadStats()
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', loadStats)
    window.addEventListener('dongge_stats_updated', loadStats)
  }
})
</script>

<style scoped>
/* 经典高清晰度边栏排行榜容器 */
.aside-rank-container {
  margin-top: 1.8rem;
  padding: 1.35rem 1.05rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
}

.aside-rank-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--vp-c-gutter);
  padding-bottom: 0.65rem;
  width: 100%;
  box-sizing: border-box;
}
.rank-header-title {
  font-size: 0.95rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin: 0 !important;
  border: none !important;
  padding: 0 !important;
  white-space: nowrap;
  letter-spacing: -0.2px;
}

/* 经典清晰列表 */
.aside-rank-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rank-list-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.25rem;
  border-bottom: 1px dashed var(--vp-c-gutter);
  font-size: 0.84rem;
  line-height: 1.5;
  transition: background-color 0.15s ease;
}

.rank-list-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 6px;
}

/* 图 2 样式：带圆角的柔和底色方块序号 */
.rank-index {
  font-weight: 900;
  font-size: 0.76rem;
  width: 1.35rem;
  height: 1.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  flex-shrink: 0;
}

/* 1位淡红/粉，2位淡橙，3位淡蓝，4-15位淡灰 */
.rank-index.top-1 {
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
}
.dark .rank-index.top-1 {
  background: #450a0a;
  color: #fca5a5;
  border: 1px solid #7f1d1d;
}

.rank-index.top-2 {
  background: #fff7ed;
  color: #f97316;
  border: 1px solid #fed7aa;
}
.dark .rank-index.top-2 {
  background: #431407;
  color: #fdba74;
  border: 1px solid #7c2d12;
}

.rank-index.top-3 {
  background: #f0f9ff;
  color: #0284c7;
  border: 1px solid #bae6fd;
}
.dark .rank-index.top-3 {
  background: #0c4a6e;
  color: #7dd3fc;
  border: 1px solid #0369a1;
}

.rank-index.top-other {
  background: #ffffff;
  color: #64748b;
  border: 1px solid #e2e8f0;
}
.dark .rank-index.top-other {
  background: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
}

/* 高对比度纯文本文章标题 (无杂乱图标) */
.rank-item-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--vp-c-text-1) !important;
  font-weight: 700;
  font-size: 0.84rem;
  text-decoration: none;
  letter-spacing: 0.01em;
}

.rank-item-title:hover {
  color: #0284c7 !important;
  text-decoration: underline;
}

/* 数字与统计清晰展示 (💗 581 / 👁️ 2,580) */
.rank-stat-val {
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono, monospace);
}

.stat-like-tag {
  color: #e11d48;
  font-weight: 700;
}

.stat-view-tag {
  color: var(--vp-c-text-1);
  font-weight: 700;
}
</style>
