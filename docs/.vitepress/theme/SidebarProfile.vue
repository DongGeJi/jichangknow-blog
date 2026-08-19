<template>
  <div class="dongge-profile-card">
    <div class="profile-header">
      <div class="profile-avatar">⚡</div>
      <h3 class="profile-name">懂哥机</h3>
      <p class="profile-bio">硬核数码老玩家 · 真实测速</p>
      <div class="profile-socials">
        <a href="https://t.me/+eRqPUPEwXu80ZGU1" target="_blank" rel="noopener" class="social-btn">💬 TG 频道</a>
        <a href="mailto:jichangknow@proton.me" class="social-btn" :class="{ 'copied': emailCopied }" title="点击发邮件或一键复制邮箱 jichangknow@proton.me" @click="handleEmailClick">
          {{ emailCopied ? '✅ 已复制邮箱' : '✉️ 联系邮箱' }}
        </a>
      </div>
    </div>
    <div class="profile-stats">
      <div class="stat-item">
        <strong>12+</strong>
        <span>标签</span>
      </div>
      <div class="stat-item">
        <strong>5+</strong>
        <span>分类</span>
      </div>
      <div class="stat-item">
        <strong>30+</strong>
        <span>测评</span>
      </div>
    </div>
    <div class="hot-posts">
      <h4 class="hot-title">🔥 热门测评与教程</h4>
      <ol class="hot-list">
        <li>
          <span class="rank rank-1">1</span>
          <a href="/posts/2026-airport-recommend">2026最佳机场推荐综合榜</a>
          <span class="views">2.4k</span>
        </li>
        <li>
          <span class="rank rank-2">2</span>
          <a href="/scam/airport-scam-list">2026机场跑路黑名单汇总</a>
          <span class="views">1.8k</span>
        </li>
        <li>
          <span class="rank rank-3">3</span>
          <a href="/tools/clash-verge-guide">Clash Verge Rev 保姆级教程</a>
          <span class="views">1.1k</span>
        </li>
        <li>
          <span class="rank rank-4">4</span>
          <a href="/posts/cheap-airports">按量付费与平价性价比机场</a>
          <span class="views">890</span>
        </li>
        <li>
          <span class="rank rank-5">5</span>
          <a href="/posts/ai-nodes">OpenAI/Claude 防封原生节点</a>
          <span class="views">650</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emailCopied = ref(false)
const handleEmailClick = (e) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText('jichangknow@proton.me').then(() => {
      emailCopied.value = true
      setTimeout(() => {
        emailCopied.value = false
      }, 2500)
    }).catch(() => {})
  }
}
</script>

<style scoped>
.dongge-profile-card {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  font-family: system-ui, -apple-system, sans-serif;
}
.profile-header {
  text-align: center;
  border-bottom: 1px dashed #e2e8f0;
  padding-bottom: 1rem;
}
.profile-avatar {
  width: 60px;
  height: 60px;
  background: #0f172a;
  color: #ffffff;
  border-radius: 50%;
  font-size: 1.8rem;
  line-height: 60px;
  margin: 0 auto 0.5rem;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
}
.profile-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}
.profile-bio {
  margin: 0.25rem 0 0.75rem;
  font-size: 0.82rem;
  color: #64748b;
}
.profile-socials {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
.social-btn {
  background: #f1f5f9;
  color: #334155 !important;
  padding: 0.28rem 0.65rem;
  border-radius: 6px;
  font-size: 0.78rem;
  text-decoration: none !important;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.social-btn:hover {
  background: #0284c7;
  color: #ffffff !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.2);
}
.social-btn.copied {
  background: #22c55e !important;
  color: #ffffff !important;
}
.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 0.8rem 0;
  border-bottom: 1px dashed #e2e8f0;
  text-align: center;
}
.stat-item strong {
  display: block;
  font-size: 1.1rem;
  color: #0f172a;
  font-weight: 800;
}
.stat-item span {
  font-size: 0.75rem;
  color: #94a3b8;
}
.hot-posts {
  margin-top: 0.85rem;
}
.hot-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.6rem;
}
.hot-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.hot-list li {
  display: flex;
  align-items: center;
  font-size: 0.82rem;
  margin-bottom: 0.55rem;
}
.hot-list a {
  color: #334155;
  text-decoration: none;
  flex: 1;
  margin: 0 0.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}
.hot-list a:hover {
  color: #2563eb;
}
.rank {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  display: inline-block;
  text-align: center;
  line-height: 18px;
  font-size: 0.72rem;
  font-weight: bold;
  background: #f1f5f9;
  color: #64748b;
}
.rank-1 { background: #fee2e2; color: #dc2626; }
.rank-2 { background: #ffedd5; color: #ea580c; }
.rank-3 { background: #e0f2fe; color: #0284c7; }
.views {
  font-size: 0.72rem;
  color: #94a3b8;
}
</style>
