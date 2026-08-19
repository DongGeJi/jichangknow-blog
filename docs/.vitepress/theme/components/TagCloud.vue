<template>
  <div class="tags-page-container">
    <h1 class="page-title"><span class="icon">🏷️</span> 标签云索引</h1>
    <p class="tags-desc">
      当前博客共收录 <strong>{{ totalTagsCount }}</strong> 个核心技术与测评标签，实时匹配全站深度文章与专区内容。
    </p>

    <!-- 分组展示全站所有精选标签 (纯静态展示，无跳转) -->
    <div class="tag-section" v-for="group in tagGroups" :key="group.category">
      <h3 class="group-title">{{ group.category }}</h3>
      <div class="tags-cloud-wrap">
        <span 
          v-for="item in group.tags" 
          :key="item.name" 
          class="tag-badge-static" 
          :class="item.typeClass"
        >
          <span class="tag-name">{{ item.name }}</span>
          <span class="tag-count-chip">{{ item.count }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { data as blogData } from '../posts.data.js'

// 唯一数据源：统一读取 posts.data.js 导出的动态全站去重标签数
const totalTagsCount = computed(() => {
  return blogData?.totalTags || 28
})

// 分门别类的分类标签云列表 (纯静态视觉展示)
const tagGroups = [
  {
    category: '✈️ 专线架构与核心测速',
    tags: [
      { name: '科学上网', count: '18 篇', typeClass: 'tag-highlight' },
      { name: 'IPLC专线', count: '12 篇', typeClass: 'tag-highlight' },
      { name: 'IEPL专线', count: '8 篇', typeClass: 'tag-highlight' },
      { name: 'BGP中转', count: '8 篇', typeClass: '' },
      { name: '晚高峰测速', count: '15 篇', typeClass: '' },
      { name: '1000M宽带实测', count: '10 篇', typeClass: '' },
      { name: '机场推荐2026', count: '8 篇', typeClass: 'tag-highlight' }
    ]
  },
  {
    category: '🚨 避坑排雷与黑名单',
    tags: [
      { name: '黑名单汇总', count: '14 篇', typeClass: 'tag-danger' },
      { name: '跑路预警', count: '12 篇', typeClass: 'tag-danger' },
      { name: '已确认跑路', count: '8 篇', typeClass: 'tag-danger' },
      { name: '伪专线排雷', count: '6 篇', typeClass: 'tag-danger' },
      { name: '退款维权', count: '5 篇', typeClass: 'tag-danger' },
      { name: '暗扣倍率揭秘', count: '7 篇', typeClass: 'tag-danger' }
    ]
  },
  {
    category: '🤖 AI 原生与流媒体解锁',
    tags: [
      { name: 'ChatGPT-4o', count: '11 篇', typeClass: 'tag-blue' },
      { name: 'Claude 3.5', count: '9 篇', typeClass: 'tag-blue' },
      { name: '住宅家宽IP', count: '8 篇', typeClass: 'tag-blue' },
      { name: '原生双ISP', count: '7 篇', typeClass: 'tag-blue' },
      { name: 'Netflix 4K', count: '9 篇', typeClass: 'tag-blue' },
      { name: '防封号风控', count: '6 篇', typeClass: 'tag-blue' }
    ]
  },
  {
    category: '🛠️ 跨平台客户端与协议',
    tags: [
      { name: 'Clash Verge Rev', count: '9 篇', typeClass: '' },
      { name: 'Shadowrocket 小火箭', count: '7 篇', typeClass: '' },
      { name: 'Surge 5', count: '5 篇', typeClass: '' },
      { name: 'v2rayNG', count: '5 篇', typeClass: '' },
      { name: 'AnyTLS', count: '6 篇', typeClass: '' },
      { name: 'VLESS Reality', count: '8 篇', typeClass: '' },
      { name: 'Hysteria 2', count: '7 篇', typeClass: '' },
      { name: 'TUN 模式', count: '6 篇', typeClass: '' },
      { name: 'DNS 防泄漏', count: '8 篇', typeClass: '' }
    ]
  },
  {
    category: '💡 软路由极客与场景方案',
    tags: [
      { name: '软路由', count: '6 篇', typeClass: '' },
      { name: 'OpenClash', count: '5 篇', typeClass: '' },
      { name: 'OpenWrt', count: '5 篇', typeClass: '' },
      { name: 'Apple TV', count: '4 篇', typeClass: '' },
      { name: '游戏加速与联机', count: '6 篇', typeClass: '' },
      { name: '便宜平价梯子', count: '9 篇', typeClass: '' },
      { name: '按量不过期', count: '8 篇', typeClass: '' }
    ]
  }
]
</script>

<style scoped>
.tags-page-container {
  max-width: 960px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
}
.page-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}
.tags-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  line-height: 1.6;
}
.tag-section {
  margin-bottom: 2.2rem;
}
.group-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px dashed var(--vp-c-gutter);
}
.tags-cloud-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.tag-badge-static {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-1);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: default;
  user-select: none;
  box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}
.tag-count-chip {
  font-size: 0.75rem;
  opacity: 0.75;
  background: rgba(0,0,0,0.05);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
.dark .tag-count-chip {
  background: rgba(255,255,255,0.1);
}
.tag-highlight { 
  border-color: #3b82f6; 
  color: #2563eb; 
  background: #eff6ff; 
  font-weight: 800; 
}
.tag-danger { 
  border-color: #ef4444; 
  color: #dc2626; 
  background: #fef2f2; 
  font-weight: 800;
}
.tag-blue { 
  border-color: #8b5cf6; 
  color: #7c3aed; 
  background: #f5f3ff; 
  font-weight: 700;
}

.dark .tag-highlight { background: #1e293b; color: #60a5fa; border-color: #3b82f6; }
.dark .tag-danger { background: #450a0a; color: #f87171; border-color: #dc2626; }
.dark .tag-blue { background: #2e1065; color: #c084fc; border-color: #8b5cf6; }
</style>
