<template>
  <div v-if="!isHome" class="global-back-nav-container">
    <div class="nav-inner-box">
      <button @click="goBack" class="btn-back">
        <span class="arrow">←</span> 返回上一页
      </button>
      <a href="/" class="btn-home">🏠 返回懂哥机首页</a>
      <span class="sep">/</span>
      <span class="current-crumb">{{ pageTitle }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page, frontmatter } = useData()
const route = useRoute()

// 首页不展示返回导航
const isHome = computed(() => {
  return route.path === '/' || route.path === '/index.html'
})

const pageTitle = computed(() => {
  return frontmatter.value.category || frontmatter.value.title || page.value.title || '文章详情'
})

const goBack = () => {
  if (typeof window !== 'undefined') {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>
.global-back-nav-container {
  margin-bottom: 1.5rem;
}
.nav-inner-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  padding: 0.55rem 0.9rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  font-size: 0.82rem;
}
.btn-back {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-1);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;
}
.btn-back:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateX(-2px);
}
.btn-home {
  color: var(--vp-c-text-2);
  text-decoration: none !important;
  font-weight: 600;
}
.btn-home:hover {
  color: var(--vp-c-brand-1);
}
.sep {
  color: var(--vp-c-text-3);
}
.current-crumb {
  color: var(--vp-c-text-3);
  font-size: 0.78rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
}
</style>
