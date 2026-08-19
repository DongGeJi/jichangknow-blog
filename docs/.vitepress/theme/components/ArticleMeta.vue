<template>
  <div class="article-meta-bar">
    <span v-if="badge" class="badge" :class="badgeClass">{{ badge }}</span>
    <span class="category-name">{{ category || '✈️ 机场推荐' }}</span>
    <span v-if="wordCount > 0" class="meta-item">📖 约 {{ wordCount.toLocaleString() }} 字 · ⏱️ 约 {{ readTime }} 分钟阅读</span>
    
    <!-- 真实标签列表 -->
    <div class="tags-wrap" v-if="tagList.length">
      <span v-for="tag in tagList" :key="tag" class="tag-item">{{ tag }}</span>
    </div>

    <span class="date-item">📅 {{ date || '2026-08-15' }}</span>
    
    <!-- 观看与点赞 -->
    <div class="stats-right">
      <span class="stat-pill">👁️ {{ currentViews }}</span>
      <span class="stat-pill red"><ArticleLikes :id="id" :initial="likes" mode="top"/></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useData } from 'vitepress'
import ArticleLikes from './ArticleLikes.vue'
import { useArticleStats } from '../useStats'
import { data as wordStats } from '../posts.data.js'

const props = defineProps({
  id: { type: String, required: true },
  badge: { type: String, default: 'TOP' },
  badgeClass: { type: String, default: 'badge-top' },
  category: { type: String, default: '✈️ 机场推荐' },
  tags: { type: String, default: '' },
  date: { type: String, default: '2026-08-15' },
  views: { type: Number, default: 240 },
  likes: { type: Number, default: 35 }
})

const { page } = useData()
const { currentViews } = useArticleStats(props.id, props.views, props.likes)

const wordCount = ref(0)
const readTime = ref(1)

const getWordCountStat = () => {
  if (!page.value?.relativePath) return null
  let linkKey = '/' + page.value.relativePath.replace(/\.md$/, '')
  if (linkKey.endsWith('/index')) linkKey = linkKey.replace(/\/index$/, '')
  if (!linkKey) linkKey = '/'

  return wordStats[linkKey] || wordStats[page.value.relativePath.replace(/\.md$/, '')]
}

const calculateWordCount = () => {
  const stat = getWordCountStat()
  if (stat && stat.wordCount > 0) {
    wordCount.value = stat.wordCount
    readTime.value = stat.readTime
    return
  }

  if (typeof window === 'undefined' || typeof document === 'undefined') return
  setTimeout(() => {
    const docEl = document.querySelector('.vp-doc')
    if (docEl) {
      const clone = docEl.cloneNode(true)
      const metaBar = clone.querySelector('.article-meta-bar')
      if (metaBar) metaBar.remove()
      
      const rawText = clone.innerText || clone.textContent || ''
      const chineseChars = (rawText.match(/[\u4e00-\u9fa5]/g) || []).length
      const englishWords = (rawText.match(/[a-zA-Z0-9]+/g) || []).length
      const totalWords = chineseChars + englishWords
      
      if (totalWords > 0) {
        wordCount.value = totalWords
        readTime.value = Math.max(1, Math.ceil(totalWords / 380))
      }
    }
  }, 150)
}

const tagList = computed(() => {
  return props.tags ? props.tags.split(',').map(t => t.trim()) : []
})

onMounted(() => {
  calculateWordCount()
})

watch(() => page.value?.relativePath, () => {
  calculateWordCount()
})
</script>

<style scoped>
.article-meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.65rem;
  font-size: 0.82rem;
  color: #64748b;
  padding-bottom: 0.85rem;
  margin-bottom: 1.6rem;
  border-bottom: 1px solid var(--vp-c-gutter);
}
.badge {
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 800;
  font-size: 0.72rem;
}
.badge-top { background: var(--vp-c-brand-1); color: #fff; }
.badge-intro { background: #2563eb; color: #fff; }
.badge-blue { background: #0284c7; color: #fff; }
.badge-danger { background: #fee2e2; color: #dc2626; }
.category-name { font-weight: 700; color: var(--vp-c-text-1); }
.tag-item {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}
.stats-right {
  display: inline-flex;
  gap: 0.5rem;
  flex-shrink: 0;
}
.stat-pill {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
}
.stat-pill.red {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}
.dark .stat-pill.red {
  background: #450a0a;
  border-color: #7f1d1d;
  color: #fca5a5;
}
</style>
