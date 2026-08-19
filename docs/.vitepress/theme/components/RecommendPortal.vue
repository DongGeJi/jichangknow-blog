<template>
  <div class="recommend-portal-container">
    <h1 class="portal-main-title">✈️ 2026 翻墙机场测评与分类选购专区</h1>
    <p class="portal-subtitle">根据使用场景与预算快速挑选最适合你的科学上网工具。所有推荐均经 1000M 晚高峰实测。</p>

    <div class="portal-grid">
      <!-- 分类卡片 1 -->
      <div class="portal-card">
        <div class="card-icon">⚡</div>
        <h2 class="card-title">
          <a href="/posts/2026-airport-recommend">2026 稳定机场大榜 (置顶大文)</a>
        </h2>
        <p class="card-desc">晚高峰千兆带宽实测，三网 IPLC/IEPL 纯专线，拒绝虚标 10 倍率，主力推荐首选。</p>
        <a href="/posts/2026-airport-recommend" class="card-btn btn-brand">查看综合大榜 ↗</a>
      </div>

      <!-- 分类卡片 2 -->
      <div class="portal-card">
        <div class="card-icon">💰</div>
        <h2 class="card-title">
          <a href="/recommend/cheap">便宜机场与按量付费</a>
        </h2>
        <p class="card-desc">适合学生党与轻度使用者，包含不过期的不限时流量包与 10~15 元平价月付套餐。</p>
        <a href="/recommend/cheap" class="card-btn btn-brand">查看平价梯子 ↗</a>
      </div>

      <!-- 分类卡片 3 -->
      <div class="portal-card">
        <div class="card-icon">🤖</div>
        <h2 class="card-title">
          <a href="/recommend/streaming-ai">ChatGPT / 4K 解锁专区</a>
        </h2>
        <p class="card-desc">原生商业与家宽 IP，防封锁，秒开 OpenAI、Claude 3.5 及 Netflix / Disney+ 4K。</p>
        <a href="/recommend/streaming-ai" class="card-btn btn-brand">查看解锁专区 ↗</a>
      </div>

      <!-- 分类卡片 4 -->
      <div class="portal-card">
        <div class="card-icon">🚨</div>
        <h2 class="card-title">
          <a href="/warning/">跑路失联黑名单预警</a>
        </h2>
        <p class="card-desc">买机前必看避雷指南！曝光失联跑路、TG 全员禁言及高危超卖机场名单。</p>
        <a href="/warning/" class="card-btn btn-danger">查看跑路名单 ↗</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommend-portal-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}
.portal-main-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}
.portal-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin-bottom: 2rem;
}
.portal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.portal-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.portal-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.card-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}
.card-title {
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  border: none;
  padding: 0;
}
.card-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.card-title a:hover {
  color: #2563eb;
}
.card-desc {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  flex: 1;
  margin: 0 0 1.25rem 0;
  line-height: 1.6;
}
.card-btn {
  display: inline-block;
  text-align: center;
  text-decoration: none;
  padding: 0.55rem 1rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
  transition: opacity 0.2s;
}
.card-btn:hover {
  opacity: 0.9;
}
.btn-brand {
  background: var(--vp-c-brand-1);
  color: #ffffff !important;
}
.btn-danger {
  background: #dc2626;
  color: #ffffff !important;
}
</style>
