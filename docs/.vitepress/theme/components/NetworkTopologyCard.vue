<template>
  <div class="topology-matrix-dashboard">
    <div class="dashboard-header">
      <div class="title-with-pulse">
        <span class="topo-icon">🗺️</span>
        <span class="dashboard-title">{{ airportName }} 物理专线网络拓扑架构图</span>
      </div>
      <div class="topo-type-tag">
        架构模型: <code>三网 BGP + IEPL 物理专线过海</code>
      </div>
    </div>

    <div class="topology-flow-steps">
      <div class="flow-step-box">
        <div class="step-num">01</div>
        <div class="step-title">用户本地终端</div>
        <div class="step-desc">Clash / Surge 客户端加密封装</div>
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step-box">
        <div class="step-num">02</div>
        <div class="step-title">三网 BGP 智能入口</div>
        <div class="step-desc">电信/联通/移动最优网关接入</div>
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step-box highlight">
        <div class="step-num">03</div>
        <div class="step-title">IEPL 物理专线光缆</div>
        <div class="step-desc">直连海外枢纽，绕过公网拥堵</div>
      </div>
      <div class="flow-arrow">➔</div>
      <div class="flow-step-box">
        <div class="step-num">04</div>
        <div class="step-title">原生 ISP 目标服务器</div>
        <div class="step-desc">ChatGPT / Netflix 零风控访问</div>
      </div>
    </div>

    <div class="topology-footer-note">
      <span>🛡️ <strong>安全保障：</strong>全程采用专线私有协议传输，有效防范运营商 QoS 限速与深度包检测。</span>
      <span class="footer-sign">[ donggeji.topology ]</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  airportName: { type: String, default: '暮光加速' }
})
</script>

<style scoped>
.topology-matrix-dashboard {
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
.topo-type-tag { font-size: 0.78rem; color: var(--vp-c-text-2); background: var(--vp-c-bg); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid var(--vp-c-gutter); }
.topo-type-tag code { color: #0284c7; }

.topology-flow-steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.flow-step-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 10px;
  padding: 0.85rem;
  text-align: center;
  transition: all 0.25s;
}
.flow-step-box:hover {
  transform: translateY(-2px);
  border-color: #0284c7;
}
.flow-step-box.highlight {
  border-color: #0284c7;
  background: linear-gradient(180deg, rgba(2, 132, 199, 0.05), var(--vp-c-bg));
  box-shadow: 0 0 16px rgba(2, 132, 199, 0.1);
}
.step-num {
  font-size: 0.75rem;
  font-weight: 900;
  color: #0284c7;
  margin-bottom: 0.2rem;
  font-family: monospace;
}
.step-title {
  font-weight: 800;
  font-size: 0.84rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.3rem;
}
.step-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  line-height: 1.3;
}
.flow-arrow {
  color: #0284c7;
  font-weight: 900;
  font-size: 1.1rem;
}

.topology-footer-note {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  padding-top: 0.85rem;
  border-top: 1px dashed var(--vp-c-gutter);
}
.footer-sign { font-size: 0.75rem; color: var(--vp-c-text-3); font-family: monospace; }

@media (max-width: 768px) {
  .topology-flow-steps {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .flow-arrow {
    transform: rotate(90deg);
    margin: 0.2rem auto;
  }
}
</style>
