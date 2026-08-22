<template>
  <div class="reviews-full-container">
    <!-- 高级感卡片流 (每张卡片带 id 和 h2，供右侧大纲完美抓取) -->
    <div class="luxury-cards-stack">
      <div v-for="item in reviewsData" :key="item.id" class="luxury-card">
        <div class="card-top-info">
          <div class="badge-group">
            <span class="type-badge">{{ item.tag }}</span>
            <span v-if="item.code" class="coupon-badge">🎁 专属优惠: {{ item.code }}</span>
          </div>
          <div class="date-views-meta">
            <span class="meta-date">📅 {{ item.date }}</span>
          </div>
        </div>

        <!-- 关键：h2 配合 id，右侧 On this page 目录会立刻完美生成！ -->
        <h2 :id="item.id" class="card-main-title">
          <a :href="item.reviewUrl">{{ item.title }}</a>
        </h2>

        <p class="card-desc-text">{{ item.desc }}</p>

        <div class="card-footer-action">
          <div class="footer-left-tip">
            <span class="secure-dot"></span> 晚高峰千兆压测 · 独立验证
          </div>
          <div class="footer-btns-right">
            <a v-if="item.affUrl" :href="item.affUrl" target="_blank" rel="nofollow sponsored" class="btn-primary-aff">官网直达 ↗</a>
            <a :href="item.reviewUrl" class="btn-secondary-review">阅读完整测评 ➔</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部点赞组件 -->
    <ArticleLikes :initial="210" id="reviews-index" mode="bottom"/>
  </div>
</template>

<script setup>
const reviewsData = [
  { id: 'muguang', title: '【暮光加速】2026 深度测评：晚高峰千兆压测与 4K 秒开稳定性报告', tag: '主推专线', code: 'mm88', date: '2026-08-15', desc: '懂哥机首推主打！三网 IPLC 纯内网专线，晚高峰千兆带宽跑满，ChatGPT / Claude 3.5 原生绿灯解锁。', affUrl: 'https://tizi2.twilightaff.com/#/?code=nogJwChd', reviewUrl: '/reviews/muguang' },
  { id: 'tiziyun', title: '【梯子云】2026 深度测评：全线 IEPL 企业专线与自研客户端秒开实测', tag: '企业专线', code: 'tiziyun', date: '2026-08-14', desc: '全线 IEPL 企业内网专线，告别晚高峰拥堵。支持自研小白客户端与主流 Clash 订阅。', affUrl: 'https://tiziyun3.ladderaff.com/#/register?code=9otclbmc', reviewUrl: '/reviews/tiziyun' },
  { id: 'yinxingren', title: '【隐形人】2026 深度测评：新加坡技术团队与 VLESS 协议 8K 秒开实测', tag: 'VLESS 专线', code: 'yxr888', date: '2026-08-13', desc: '新加坡技术团队打造，全线纯专线 + VLESS 协议，8K 视频秒开无缓冲。', affUrl: 'https://tizi2.invisibleaff.com/#/?code=2ZoNoNo5', reviewUrl: '/reviews/yinxingren' },
  { id: 'flyv', title: '【FlyV】2026 深度测评：全节点 1.0x 不暗扣，不限设备数与大流量实测', tag: '不限设备', code: 'fly20', date: '2026-08-10', desc: '全节点 1.0x 计费绝不扣量！千兆不限速，支持 4K/8K 流媒体与 ChatGPT，不限制同时在线设备。', affUrl: 'https://tizi2.flyvaff.com/#/?code=JrLBx09H', reviewUrl: '/reviews/flyv' },
  { id: 'lingdongyun', title: '【灵动云】2026 深度测评：最新 VLESS 协议与超多国家地区节点实测', tag: 'VLESS 协议', code: 'ld88', date: '2026-08-08', desc: '全线采用最新 VLESS 协议，提供香港、台湾、日本、新加坡及美国超多节点，晚高峰 4K 播放流畅。', affUrl: 'https://tizi2.lingdongaff.com/#/?code=NNWFzdHj', reviewUrl: '/reviews/lingdongyun' },
  { id: 'langwang', title: '【浪网】2026 深度测评：全面支持 AI 开发调用与不限设备数实测报告', tag: 'AI 开发特化', code: 'lw88', date: '2026-08-05', desc: '针对 ChatGPT、Claude 等 AI 工具开发调用特化优化，买即送软件版 SS 协议，不限制同时在线设备数量。', affUrl: 'https://tizi2.wavenetaff.com/#/?code=xnwjiFqT', reviewUrl: '/reviews/langwang' },
  { id: 'yuzhouyun', title: '【宇宙云】2026 深度测评：14.9元超高性价比入门梯子实测', tag: '¥14.9 平价', code: 'YUZHOU553', date: '2026-08-03', desc: 'BGP 多线中转架构，首月折后仅需 14.9 元，适合学生党查资料与轻度追剧的高性价比之选。', affUrl: 'https://wzjc.yuzoucloud.cc', reviewUrl: '/reviews/yuzhouyun' },
  { id: 'quanqiuyun', title: '【全球云】2026 深度测评：覆盖全球 30+ 地区外贸出海专线实测', tag: '全球节点', code: '', date: '2026-08-01', desc: '多线 BGP 混合专线入口，支持智能负载均衡与多国节点切换，跨境外贸与跨境电商主力方案。', affUrl: 'https://hueue09.gcvipaff.com/#/?code=AVo0WgaO', reviewUrl: '/reviews/quanqiuyun' },
  { id: 'guangshuyun', title: '【光速云】2026 深度测评：平均延迟 35ms 极速中转专线实测', tag: '极速中转', code: '', date: '2026-07-29', desc: '高规格中转接入，节点平均响应极快，网页毫秒级秒开，带来无感翻墙顺畅体验。', affUrl: 'https://mdlky.gsyaff.com', reviewUrl: '/reviews/guangshuyun' },
  { id: 'u1s1', title: '【U1S1】2026 深度测评：节点倍率真实透明与 AnyTLS 抗封锁实测', tag: '倍率透明', code: '', date: '2026-07-27', desc: '拒绝暗扣流量，全节点透明标注，抗封锁 AnyTLS 协议，晚高峰千兆带宽不降速。', affUrl: 'https://pkdj7.vipaff.cc', reviewUrl: '/reviews/u1s1' },
  { id: 'jilianyun', title: '【极连云】2026 深度测评：多入口智能调度与 0 丢包晚高峰实测', tag: '智能调度', code: '', date: '2026-07-25', desc: '自动优选最佳入口，晚高峰千兆带宽压测 0 丢包，日常通勤与移动端稳定首选。', affUrl: 'https://kdjhao.jlyvipaff.com', reviewUrl: '/reviews/jilianyun' },
  { id: 'guangnianti', title: '【光年梯】2026 深度测评：Netflix 4K 与 Disney+ 深度解锁实测', tag: '流媒体专测', code: '', date: '2026-07-23', desc: '专为流媒体打造，全节点原生 IP 轮询，全天候 YouTube 4K 拖拽零缓冲。', affUrl: 'https://ggmq.gntaff.com', reviewUrl: '/reviews/guangnianti' },
  { id: 'yifanyun', title: '【一翻云】2026 深度测评：150GB 充沛配额与团队协作实测', tag: '150G 大流量', code: '', date: '2026-07-21', desc: '大带宽 150G 流量配额，适合高频大文件下载与团队多设备共享使用。', affUrl: 'https://wzjc.1flyunaff.cc', reviewUrl: '/reviews/yifanyun' },
  { id: 'ermaoyun', title: '【二猫云】2026 深度测评：iOS 与 Android 客户端极简配置实测', tag: '手机优化', code: '', date: '2026-07-19', desc: '针对移动端深度优化，支持一键导入小火箭与 Clash，配置极度精简。', affUrl: 'https://wzjc.2maoyunaff.cc', reviewUrl: '/reviews/ermaoyun' },
  { id: 'sogoyun', title: '【sogo云】2026 深度测评：企业级中转隧道与外贸生产力实测', tag: '企业生产力', code: '', date: '2026-07-17', desc: '高稳定性保障，企业级加密传输，远程办公与跨境外贸主力方案。', affUrl: 'https://wzjc.sogoyunaff.cc', reviewUrl: '/reviews/sogoyun' },
  { id: 'edgenova', title: '【edgenova】2026 深度测评：边缘计算加速节点与 GitHub / OpenAI 特化实测', tag: '边缘计算', code: '', date: '2026-07-15', desc: '边缘计算加速节点，针对 OpenAI API 及 GitHub 代码拉取特化加速，开发者首选。', affUrl: 'https://work.edgenovaaff.cc', reviewUrl: '/reviews/edgenova' },
  { id: 'yuyanyun', title: '【雨燕云】2026 深度测评：极简高速隧道与电竞低延迟实测报告', tag: '电竞低延迟', code: '', date: '2026-07-13', desc: '极简高速隧道，低延迟电竞优化，支持各种开源客户端全协议直连。', affUrl: '', reviewUrl: '/reviews/yuyanyun' },
  { id: 'cylink', title: '【次元链接】2026 深度测评：二次元与泛娱乐特化番剧全绿解锁实测', tag: '番剧解锁', code: '', date: '2026-07-11', desc: '二次元与泛娱乐特化，Bilibili 港澳台、DMM 及动画番剧全绿解锁。', affUrl: '', reviewUrl: '/reviews/cylink' },
  { id: 'teaartcloud', title: '【茶艺云】2026 深度测评：小众精品中转与稳定解锁实测', tag: '精品中转', code: '', date: '2026-07-09', desc: '小众低调运营，全中转链路，晚高峰连接平稳，解锁主流流媒体。', affUrl: '', reviewUrl: '/reviews/teaartcloud' },
  { id: 'sanfancloud', title: '【三番云】2026 深度测评：美区专线与学术搜索加速实测', tag: '学术加速', code: '', date: '2026-07-07', desc: '美区节点特化优化，适合学术论文检索、Google Scholar 及日常外网查阅。', affUrl: '', reviewUrl: '/reviews/sanfancloud' }
]
</script>

<style scoped>
.reviews-full-container {
  max-width: 1000px;
  margin: 1.5rem auto 4rem;
}
.luxury-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}
.luxury-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 14px;
  padding: 1.5rem 1.8rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
}
.luxury-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  border-color: rgba(2, 132, 199, 0.4);
}
.card-top-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}
.badge-group {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.type-badge {
  background: #0284c7;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.15rem 0.55rem;
  border-radius: 6px;
}
.coupon-badge {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: 6px;
}
.dark .coupon-badge {
  background: #450a0a;
  border-color: #7f1d1d;
  color: #fca5a5;
}
.date-views-meta {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
.card-main-title {
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  border: none;
  padding: 0;
}
.card-main-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}
.card-main-title a:hover {
  color: #0284c7;
}
.card-desc-text {
  font-size: 0.93rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  margin-bottom: 1.25rem;
}
.card-footer-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px dashed var(--vp-c-gutter);
  padding-top: 1rem;
}
.footer-left-tip {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  font-weight: 600;
}
.secure-dot {
  width: 7px;
  height: 7px;
  background-color: #10b981;
  border-radius: 50%;
}
.footer-btns-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.btn-primary-aff {
  background: linear-gradient(135deg, #0284c7, #2563eb);
  color: #fff !important;
  font-weight: 800;
  font-size: 0.85rem;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  text-decoration: none !important;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary-aff:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
}
.btn-secondary-review {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-1) !important;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  text-decoration: none !important;
  transition: background 0.2s;
}
.btn-secondary-review:hover {
  background: var(--vp-c-bg-alt);
  border-color: #0284c7;
  color: #0284c7 !important;
}

@media (max-width: 640px) {
  .card-top-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .card-footer-action {
    flex-direction: column;
    align-items: stretch;
    gap: 0.85rem;
  }
  .footer-btns-right {
    justify-content: space-between;
  }
  .btn-primary-aff, .btn-secondary-review {
    flex: 1;
    text-align: center;
  }
}
</style>
