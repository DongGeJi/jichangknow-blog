<template>
  <div class="unlock-matrix-dashboard">
    <div class="dashboard-header">
      <div class="title-with-pulse">
        <span class="lock-icon">🛡️</span>
        <span class="dashboard-title">{{ airportName }} 流媒体与 AI 支持特性参考</span>
      </div>
      <div class="test-tool-tag">
        检测工具基准: <code>RegionRestrictionCheck</code>
      </div>
    </div>

    <div class="matrix-grid">
      <div v-for="item in unlockItems" :key="item.name" class="matrix-item-card" :class="{ 'supported': item.status, 'unsupported': !item.status }">
        <div class="item-icon">{{ item.icon }}</div>
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-desc">{{ item.desc }}</div>
        </div>
        <div class="item-status-badge">
          <span v-if="item.status === 'verified'" class="badge-yes">✅ 实测已验</span>
          <span v-else-if="item.status === true || item.status === 'claimed'" class="badge-claimed">🔶 标称支持 (待复测)</span>
          <span v-else class="badge-no">❌ 暂未标称/受限</span>
        </div>
      </div>
    </div>

    <div class="matrix-footer-note">
      <span>📍 采样节点: <strong>核心专线 / 热门落地机房</strong></span>
      <span class="footer-sign">[ jichangknow.com · 真实度校准 ]</span>
    </div>

    <div class="unlock-disclaimer">
      ⚠️ <strong>流媒体与 AI 风控说明：</strong>Netflix、Disney+、ChatGPT 与 Claude 等平台的机房 IP 风控封锁策略具有高频动态性。上表基于机场官方标称线路特性与历史抽查整理。站长正在收集中立脚本抓包检测报告，请以实际使用节点为准。
    </div>
  </div>
</template>

<script setup>
defineProps({
  airportName: { type: String, default: '暮光加速' },
  unlockItems: {
    type: Array,
    default: () => [
      { name: 'ChatGPT-4o / Plus', desc: '官方标称支持 API 与网页端交互', icon: '🤖', status: 'claimed' },
      { name: 'Claude 3.5 Sonnet', desc: '官方标称支持，受 Anthropic 风控影响', icon: '🧠', status: 'claimed' },
      { name: 'Cursor AI IDE', desc: '官方标称支持智能代码补全请求', icon: '💻', status: 'claimed' },
      { name: 'Netflix 4K 超高清', desc: '官方标称支持主流自制与非自制影视', icon: '🍿', status: 'claimed' },
      { name: 'Disney+ 流媒体', desc: '官方标称支持杜比视界与 4K 音效', icon: '✨', status: 'claimed' },
      { name: 'YouTube 4K 播放', desc: '常规视频播放秒开，统计信息正常', icon: '▶️', status: 'claimed' }
    ]
  }
})
</script>

<style scoped>
.unlock-matrix-dashboard {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 14px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 24px rgba(0,0,0,0.03);
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-gutter);
}
.title-with-pulse { display: flex; align-items: center; gap: 0.5rem; }
.dashboard-title { font-weight: 900; font-size: 1.05rem; color: var(--vp-c-text-1); }
.test-tool-tag { font-size: 0.78rem; color: var(--vp-c-text-2); background: var(--vp-c-bg); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid var(--vp-c-gutter); }
.test-tool-tag code { color: #0284c7; }

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}
.matrix-item-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  padding: 0.85rem 1rem;
  border-radius: 10px;
  transition: transform 0.2s;
}
.matrix-item-card:hover { transform: translateY(-2px); border-color: #0284c7; }
.item-icon { font-size: 1.5rem; flex-shrink: 0; }
.item-info { flex: 1; min-width: 0; }
.item-name { font-weight: 800; font-size: 0.88rem; color: var(--vp-c-text-1); margin-bottom: 0.15rem; }
.item-desc { font-size: 0.75rem; color: var(--vp-c-text-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item-status-badge { flex-shrink: 0; }
.badge-yes { background: #d1fae5; color: #065f46; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px; }
.dark .badge-yes { background: rgba(16, 185, 129, 0.2); color: #34d399; }
.badge-no { background: #fee2e2; color: #991b1b; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px; }
.dark .badge-no { background: rgba(239, 68, 68, 0.2); color: #f87171; }
.badge-claimed { background: #fef3c7; color: #92400e; font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.5rem; border-radius: 6px; }
.dark .badge-claimed { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }

.matrix-footer-note {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  padding-top: 0.85rem;
  border-top: 1px dashed var(--vp-c-gutter);
}
.footer-sign { font-size: 0.75rem; color: var(--vp-c-text-3); font-family: monospace; }

.unlock-disclaimer {
  margin-top: 0.85rem;
  padding: 0.65rem 0.85rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-left: 3px solid #0284c7;
  border-radius: 6px;
  font-size: 0.75rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .matrix-grid { grid-template-columns: 1fr; }
}
</style>
