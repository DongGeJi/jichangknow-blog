import { ref, onMounted } from 'vue'
import { getMasterStats } from './articleRegistry'

export function getBaselineStats(rawId) {
  return getMasterStats(rawId)
}

export function useArticleStats(rawId, customViews, customLikes) {
  const master = getMasterStats(rawId)
  const canonicalId = master.id || rawId
  
  // 始终以中央唯一注册表为基准，彻底消除局部组件传入不同 initial/customLikes 导致的错乱
  const defaultViews = master.views
  const defaultLikes = master.likes

  const currentViews = ref(defaultViews)
  const currentLikes = ref(defaultLikes)
  const hasLiked = ref(false)

  const syncState = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
    
    // 1. 读取或修正 Views
    const savedViews = localStorage.getItem(`dongge_views_${canonicalId}`)
    if (savedViews) {
      const parsed = parseInt(savedViews, 10)
      if (parsed === 240 || parsed === 241 || parsed === 510 || Math.abs(parsed - defaultViews) > 1000) {
        localStorage.removeItem(`dongge_views_${canonicalId}`)
        currentViews.value = defaultViews
      } else {
        currentViews.value = parsed
      }
    } else {
      currentViews.value = defaultViews
    }
    
    // 2. 读取或修正 Likes
    const savedLikes = localStorage.getItem(`dongge_likes_${canonicalId}`)
    if (savedLikes) {
      const parsed = parseInt(savedLikes, 10)
      if (Math.abs(parsed - defaultLikes) > 500) {
        localStorage.removeItem(`dongge_likes_${canonicalId}`)
        currentLikes.value = defaultLikes
      } else {
        currentLikes.value = parsed
      }
    } else {
      currentLikes.value = defaultLikes
    }

    // 3. 读取点赞状态
    const savedLiked = localStorage.getItem(`dongge_liked_${canonicalId}`)
    hasLiked.value = savedLiked === 'true'
  }

  const recordView = () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return
    
    const sessionKey = `dongge_viewed_${canonicalId}`
    const alreadyViewed = sessionStorage.getItem(sessionKey)
    
    let views = currentViews.value
    if (!alreadyViewed) {
      views += 1
      sessionStorage.setItem(sessionKey, 'true')
      localStorage.setItem(`dongge_views_${canonicalId}`, views)
      currentViews.value = views
      
      window.dispatchEvent(new CustomEvent('dongge_stats_updated', { 
        detail: { id: canonicalId, rawId, views, likes: currentLikes.value } 
      }))
    }
  }

  const triggerLike = () => {
    if (hasLiked.value) return
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return

    hasLiked.value = true
    currentLikes.value += 1
    localStorage.setItem(`dongge_likes_${canonicalId}`, currentLikes.value)
    localStorage.setItem(`dongge_liked_${canonicalId}`, 'true')
    
    // 全局双向广播点赞事件
    window.dispatchEvent(new CustomEvent('dongge_stats_updated', { 
      detail: { id: canonicalId, rawId, likes: currentLikes.value, liked: true, views: currentViews.value } 
    }))
  }

  onMounted(() => {
    syncState()
    recordView()

    if (typeof window !== 'undefined') {
      window.addEventListener('dongge_stats_updated', (e) => {
        if (e.detail && (e.detail.id === canonicalId || e.detail.rawId === rawId || e.detail.id === rawId)) {
          if (e.detail.views !== undefined) currentViews.value = e.detail.views
          if (e.detail.likes !== undefined) currentLikes.value = e.detail.likes
          if (e.detail.liked !== undefined) hasLiked.value = e.detail.liked
        }
      })
    }
  })

  return {
    canonicalId,
    currentViews,
    currentLikes,
    hasLiked,
    triggerLike
  }
}
