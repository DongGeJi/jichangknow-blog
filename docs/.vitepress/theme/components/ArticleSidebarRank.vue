<template>
  <div v-if="showRank" class="aside-rank-container">
    <!-- 1. 顶部 Header 区：全站统一展示「📌 核心指南与推荐导读」 -->
    <div class="aside-rank-header">
      <h3 class="rank-header-title">📌 核心指南与推荐导读</h3>
    </div>

    <!-- 2. 1~15 榜单列表：按重要度结构化导读 -->
    <ol class="aside-rank-list">
      <li v-for="(item, index) in rawList" :key="item.id" class="rank-list-item">
        <span class="rank-index" :class="getBadgeClass(index)">{{ index + 1 }}</span>
        <a :href="item.link" class="rank-item-title" :title="cleanTitle(item.title)">
          {{ cleanTitle(item.title) }}
        </a>
        <span class="rank-stat-val">
          <span class="stat-tag-badge">{{ item.tag }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const showRank = computed(() => {
  if (frontmatter.value && frontmatter.value.asideRank === false) return false
  if (page.value && page.value.relativePath === 'reviews/index.md') return false
  return true
})

// 博客真实收录的 15 篇核心长文与测评大榜（清晰标签化导读）
const rawList = [
  { id: 'recommend-2026', title: '2026 稳定科学上网机场推荐综合大榜', link: '/recommend/', tag: '大榜' },
  { id: 'software-wiki', title: '2026 全平台客户端下载与深度部署教程百科', link: '/tutorials/', tag: '百科' },
  { id: 'warning', title: '2026 避坑指南：全网最全翻墙机场跑路汇总与黑名单', link: '/warning/', tag: '避坑' },
  { id: 'about', title: '我是懂哥机：测评自白与独立准则', link: '/about', tag: '置顶' },
  { id: 'review-muguang', title: '【暮光加速】IEPL 专线晚高峰实测', link: '/reviews/muguang', tag: '测评' },
  { id: 'ai-4k-unlock', title: '2026 ChatGPT / Claude 住宅IP解锁技术指南', link: '/recommend/streaming-ai', tag: '特化' },
  { id: 'review-tiziyun', title: '【梯子云】企业专线与小白客户端', link: '/reviews/tiziyun', tag: '测评' },
  { id: 'cheap', title: '2026 便宜机场与不限时按量付费推荐', link: '/recommend/cheap', tag: '平价' },
  { id: 'review-yinxingren', title: '【隐形人】新加坡 VLESS 纯专线实测', link: '/reviews/yinxingren', tag: '测评' },
  { id: 'review-flyv', title: '【FlyV】全节点 1.0x 不限设备专线', link: '/reviews/flyv', tag: '测评' },
  { id: 'clash-verge', title: 'Clash Verge Rev 官方下载与配置教程', link: '/tutorials/clash-verge', tag: '教程' },
  { id: 'soft-router', title: '软路由全屋翻墙部署方案', link: '/tutorials/soft-router', tag: '进阶' },
  { id: 'clash-rules-guide', title: '如何编写高性能的 Clash 分流规则', link: '/tutorials/clash-rules-guide', tag: '分流' },
  { id: 'sub-converter', title: '机场节点订阅转换实操详解', link: '/tutorials/sub-converter', tag: '工具' },
  { id: 'network-tuning', title: '晚高峰低延迟优化秘籍', link: '/tutorials/network-tuning', tag: '调优' }
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

.rank-stat-val {
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.stat-tag-badge {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-gutter);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.72rem;
}
</style>
