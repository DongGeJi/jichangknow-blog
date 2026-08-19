<template>
  <div :class="['cta-banner-box', mode === 'bottom' ? 'cta-bottom' : 'cta-top']">
    <div class="cta-content-wrap">
      <!-- 1. 标题与在线状态点 -->
      <div class="cta-head-row">
        <span class="pulse-green-dot" title="官方通道在线"></span>
        <span class="cta-title">官方直达通道 · {{ name }}</span>
      </div>

      <!-- 2. 说明文案与专属优惠码胶囊 -->
      <div class="cta-desc-row">
        <span class="desc-text">懂哥机 1000M 晚高峰实测推荐 · 全节点 1.0x 计费</span>
        <div v-if="code && code !== '暂无'" class="coupon-pill-box">
          <span class="coupon-label">专属优惠码:</span>
          <code class="coupon-code">{{ code }}</code>
          <span class="coupon-hint">(结算输入立减)</span>
        </div>
      </div>
    </div>

    <!-- 3. 右侧/下方的独立大号渐变按钮 -->
    <div class="cta-action-wrap">
      <a :href="url" target="_blank" rel="nofollow sponsored" class="cta-btn-gradient">
        🚀 访问 {{ name }} 官方网站 ↗
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  url: { type: String, required: true },
  code: { type: String, default: '' },
  mode: { type: String, default: 'top' }
})
</script>

<style scoped>
.cta-banner-box {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.4rem 1.75rem;
  border-radius: 14px;
  margin: 2rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}

/* ================= 1. 顶部模式 (亮色/暗色自适应) ================= */
.cta-top {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%);
  border: 1px solid rgba(2, 132, 199, 0.25);
}

.dark .cta-top {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(37, 99, 235, 0.12) 100%);
  border-color: rgba(2, 132, 199, 0.4);
}

/* ================= 2. 底部模式 (黑金深蓝高档卡片) ================= */
.cta-bottom {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border: 1px solid #334155;
  color: #ffffff;
  padding: 1.6rem 2rem;
}

.cta-content-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  flex: 1;
  min-width: 0;
}

.cta-head-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

/* 呼吸绿色在线指示灯 */
.pulse-green-dot {
  width: 9px;
  height: 9px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
  flex-shrink: 0;
  animation: pulse-dot-anim 2s infinite ease-in-out;
}

@keyframes pulse-dot-anim {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.cta-title {
  font-weight: 900;
  font-size: 1.12rem;
  color: var(--vp-c-text-1);
  letter-spacing: 0.2px;
}

.cta-bottom .cta-title {
  color: #ffffff;
}

.cta-desc-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.cta-bottom .cta-desc-row {
  color: #94a3b8;
}

/* 优惠码胶囊标签 */
.coupon-pill-box {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  padding: 0.2rem 0.55rem;
  border-radius: 7px;
}

.dark .cta-top .coupon-pill-box {
  background: rgba(239, 68, 68, 0.18);
  border-color: rgba(239, 68, 68, 0.4);
}

.cta-bottom .coupon-pill-box {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.45);
}

.coupon-label {
  font-weight: 800;
  color: #dc2626;
  font-size: 0.78rem;
}

.dark .coupon-label, .cta-bottom .coupon-label {
  color: #fca5a5;
}

.coupon-code {
  font-family: var(--vp-font-family-mono);
  font-weight: 900;
  color: #dc2626;
  font-size: 0.9rem;
  background: transparent;
  padding: 0;
}

.dark .coupon-code, .cta-bottom .coupon-code {
  color: #ffffff;
}

.coupon-hint {
  font-size: 0.72rem;
  color: #991b1b;
  opacity: 0.85;
}

.dark .coupon-hint, .cta-bottom .coupon-hint {
  color: #fca5a5;
  opacity: 0.85;
}

.cta-action-wrap {
  flex-shrink: 0;
}

/* 官方直达渐变按钮 (跟随全站主色与 Hover 效果) */
.cta-btn-gradient {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  color: #ffffff !important;
  font-weight: 900;
  font-size: 0.94rem;
  padding: 0.75rem 1.6rem;
  border-radius: 9px;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(2, 132, 199, 0.45);
  background: linear-gradient(135deg, #0369a1 0%, #1d4ed8 100%);
}

@media (min-width: 768px) {
  .cta-banner-box {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

@media (max-width: 767px) {
  .cta-banner-box {
    text-align: left;
    padding: 1.25rem;
    gap: 1.1rem;
  }
  .cta-action-wrap {
    width: 100%;
  }
  .cta-btn-gradient {
    width: 100%;
    min-height: 44px; /* 移动端 44px 触控大热区 */
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    text-align: center;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
