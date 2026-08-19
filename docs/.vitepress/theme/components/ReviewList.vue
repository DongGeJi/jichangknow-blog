<template>
  <div class="reviews-container">
    <h1 class="page-title"><span class="icon">📑</span> 机场单篇深度测评库 (32+)</h1>
    <p class="page-desc">懂哥机真实 1000M 宽带晚高峰挂测，拆解每家机场的线路架构、丢包率与流媒体解锁实测报告。</p>

    <div class="reviews-grid">
      <!-- 评测卡片 1 -->
      <div class="review-card">
        <div class="card-tag">IPLC 专线</div>
        <h2 class="card-title"><a href="/posts/2026-airport-recommend">【翼游专线】深度测评：晚高峰 900M 跑满与 4K 秒开表现实测</a></h2>
        <p class="card-summary">三网 BGP 入口内网纯专线，零丢包、低延迟，针对 ChatGPT 与 Netflix 原生解锁深度压测。</p>
        <div class="card-footer">
          <span class="score">综合评分：⭐ 9.6</span>
          <a href="/posts/2026-airport-recommend" class="read-link">查看完整测评 ↗</a>
        </div>
      </div>

      <!-- 评测卡片 2 -->
      <div class="review-card">
        <div class="card-tag">性价比中转</div>
        <h2 class="card-title"><a href="/recommend/cheap">【极速中转】深度测评：18元档位平价水桶机实测</a></h2>
        <p class="card-summary">全节点 1.0 倍率不虚标，晚高峰 YouTube 12w+ 码率稳定测试，学生党高性价比之选。</p>
        <div class="card-footer">
          <span class="score">综合评分：⭐ 8.9</span>
          <a href="/recommend/cheap" class="read-link">查看完整测评 ↗</a>
        </div>
      </div>

      <!-- 评测卡片 3 -->
      <div class="review-card">
        <div class="card-tag">AI 特化专线</div>
        <h2 class="card-title"><a href="/recommend/streaming-ai">【泡泡云】深度测评：Claude 3.5 与 OpenAI 防封 IP 专线</a></h2>
        <p class="card-summary">住宅双 ISP 原生家宽伪装，解决 Access Denied 报错，针对外贸与 AI 开发者深度适配。</p>
        <div class="card-footer">
          <span class="score">综合评分：⭐ 9.2</span>
          <a href="/recommend/streaming-ai" class="read-link">查看完整测评 ↗</a>
        </div>
      </div>

      <!-- 评测卡片 4 -->
      <div class="review-card">
        <div class="card-tag">按量付费</div>
        <h2 class="card-title"><a href="/recommend/cheap">【按量云】深度测评：不限时流量包与备用梯子实测</a></h2>
        <p class="card-summary">流量永不过期，按 GB 扣费，适合手机轻度备用与出差应急。</p>
        <div class="card-footer">
          <span class="score">综合评分：⭐ 8.7</span>
          <a href="/recommend/cheap" class="read-link">查看完整测评 ↗</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}
.page-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}
.page-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
.review-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.review-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  border-color: var(--vp-c-brand-1);
}
.card-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #2563eb;
  background: #eff6ff;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.8rem;
  align-self: flex-start;
}
.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.6rem 0;
  line-height: 1.4;
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
.card-summary {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  flex: 1;
  margin: 0 0 1.2rem 0;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.82rem;
  border-top: 1px dashed var(--vp-c-gutter);
  padding-top: 0.8rem;
}
.score {
  font-weight: 700;
  color: #ea580c;
}
.read-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}
.read-link:hover {
  text-decoration: underline;
}
</style>
