<template>
  <div class="more-airports-card">
    <!-- 上方通栏：完整标题与正文描述 -->
    <div class="card-top-section">
      <div class="card-title">🔍 寻找更多高性价比与稳定专线机场？</div>
      <div class="card-desc">
        懂哥机为您全天候实测全网 20+ 优质翻墙梯子，包含 IPLC 物理专线、不限设备大流量包、全原生 IP 解锁与跑路预警黑名单。
      </div>
    </div>

    <!-- 下方通栏：独立双按钮区 (整齐排列，不拥挤) -->
    <div class="card-bottom-actions">
      <a href="/recommend/" class="btn-more-primary">
        ✈️ 查看 2026 机场推荐综合榜 ↗
      </a>
      <a href="/reviews/" class="btn-more-secondary">
        📊 浏览 20 家机场测评大榜 ➔
      </a>
    </div>
  </div>
</template>

<script setup>
// MoreAirportsCard Component
</script>

<style scoped>
.more-airports-card {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  background: #ffffff;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 14px;
  padding: 1.8rem 2rem;
  margin: 2.8rem 0 2.2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

/* 暗黑夜间模式：自动切换为黑金暗黑科技渐变 */
.dark .more-airports-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border: 1px solid #334155;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
}

.card-top-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
  letter-spacing: 0.2px;
}

.dark .card-title {
  color: #ffffff !important;
}

.card-desc {
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  width: 100%;
}

.dark .card-desc {
  color: #94a3b8 !important;
}

/* 下方按钮区 */
.card-bottom-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding-top: 0.2rem;
}

.btn-more-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  color: #ffffff !important;
  font-weight: 800;
  font-size: 0.9rem;
  padding: 0.7rem 1.6rem;
  border-radius: 9px;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.btn-more-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(2, 132, 199, 0.45);
  background: linear-gradient(135deg, #0369a1 0%, #1d4ed8 100%);
}

.btn-more-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-1) !important;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.7rem 1.5rem;
  border-radius: 9px;
  text-decoration: none !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.dark .btn-more-secondary {
  background: rgba(255, 255, 255, 0.06);
  border-color: #334155;
  color: #f1f5f9 !important;
}

.btn-more-secondary:hover {
  background: var(--vp-c-bg);
  border-color: #0284c7;
  color: #0284c7 !important;
}

.dark .btn-more-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #0284c7;
  color: #38bdf8 !important;
}

@media (max-width: 640px) {
  .more-airports-card {
    padding: 1.35rem 1.2rem;
    gap: 1.2rem;
    margin: 2.2rem 0 1.8rem;
  }
  .card-title {
    font-size: 1.1rem;
  }
  .card-desc {
    font-size: 0.88rem;
    line-height: 1.65;
  }
  .card-bottom-actions {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }
  .btn-more-primary, .btn-more-secondary {
    width: 100%;
    min-height: 44px; /* 移动端 44px 黄金大按键触控热区 */
    font-size: 0.92rem;
    padding: 0.75rem 1rem;
    text-align: center;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
