<template>
  <!-- 顶部状态栏模式 -->
  <span v-if="mode === 'top'" class="top-like-pill" :class="{ 'liked': hasLiked }">
    ❤️ {{ currentLikes }}
  </span>

  <!-- 底部交互按钮模式 -->
  <div v-else class="bottom-like-wrap">
    <button 
      class="bottom-like-btn" 
      :class="{ 'is-liked': hasLiked }" 
      :disabled="hasLiked"
      @click="triggerLike"
    >
      <span>{{ hasLiked ? '💖' : '❤️' }}</span>
      <span>{{ hasLiked ? `已点赞支持 (${currentLikes})` : `点赞支持懂哥 (${currentLikes})` }}</span>
    </button>
    <p class="like-tip">感谢你的认可！坚持独立数测不易，欢迎点赞支持！</p>
  </div>
</template>

<script setup>
import { useArticleStats } from '../useStats'

const props = defineProps({
  id: { type: String, required: true },
  initial: { type: Number, default: 35 },
  mode: { type: String, default: 'bottom' }
})

const { currentLikes, hasLiked, triggerLike } = useArticleStats(props.id, 240, props.initial)
</script>

<style scoped>
.top-like-pill {
  color: #dc2626;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}
.bottom-like-wrap {
  text-align: center;
  margin: 3rem 0 2rem;
  padding: 1.8rem;
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  border: 1px dashed var(--vp-c-gutter);
}
.bottom-like-btn {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-1);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.6rem 1.5rem;
  border-radius: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.bottom-like-btn:hover:not(:disabled) {
  transform: scale(1.03);
  border-color: #ef4444;
  color: #ef4444;
}
.bottom-like-btn.is-liked {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
  cursor: default;
}
.like-tip {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
