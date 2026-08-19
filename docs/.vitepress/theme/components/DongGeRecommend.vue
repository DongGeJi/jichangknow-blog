<template>
  <div class="recommend-doc-wrap">
    <!-- 1. 顶部状态胶囊 -->
    <div class="top-status-pills">
      <span class="live-pill"><span class="pulse-dot"></span> 2026 晚高峰千兆压测大榜</span>
      <span class="spec-pill">IEPL 企业专线</span>
      <span class="spec-pill">VLESS 协议</span>
      <span class="spec-pill">ChatGPT 原生解锁</span>
      <span class="spec-pill">全节点 1.0x</span>
    </div>

    <h1 class="main-title">2026年热门翻墙机场推荐</h1>

    <!-- 2. 引流卡片 -->
    <a href="/methodology" class="promo-banner-box">
      <div class="banner-text">
        <div class="banner-head">⚡ 懂哥机 · 晚高峰千兆压测方法与证据标准</div>
        <div class="banner-sub">拒绝凌晨空载作弊与虚标倍率！点击查阅本站丢包率、延迟抖动与 A/B/C/D 证据评级白皮书。</div>
      </div>
      <span class="banner-btn">进入评测方法 ➔</span>
    </a>

    <!-- 3. 导读说明段落 -->
    <div class="intro-note">
      <p>
        本推荐列表基于<strong>家用 1000M 双线宽带在 20:00–23:00 晚高峰黄金拥堵期</strong>的集中挂测数据整理而成。建议先根据自身预算、线路架构（IEPL 纯专线 / BGP 中转）及客户端需求进行初筛，再点击进入单篇报告核验详细测速图谱。完整选机逻辑请参考<a href="/posts/2026-airport-recommend" class="link-blue">2026 深度选机与避坑指南</a>。
      </p>
      <p>
        跨境网络受机房光缆割接与上游策略影响具有实时动态性，商家套餐资费与落地 IP 属性可能随时调整。未标明独立数测记录的信息仅代表服务商公开标称参数，具体证据等级请查验<a href="/methodology" class="link-blue">懂哥机评测证据白皮书</a>。
      </p>
    </div>

    <!-- 4. 购买提醒警示框 -->
    <div class="warning-alert-card">
      <div class="alert-title">🛡️ 懂哥机理性选机与风控提醒</div>
      <div class="alert-text">
        跨境网络不存在 100% 永不断连的神话。初次购机强烈建议<strong>优先选择月付套餐进行本地实测</strong>，满意后再考虑长周期；同时建议手头常备一个<a href="/tutorials/" class="alert-link">备用容灾方案</a>作为应急保障。买机前请务必先核对<a href="/warning/" class="alert-link">2026 避坑指南：全网最全翻墙机场跑路汇总、失联黑名单与维权防骗全复盘</a>。
      </div>
    </div>

    <!-- 4.5 [新增] 高颜值全站机场综合实力排行榜 -->
    <h2 id="airport-rank-table" class="section-title">📊 2026 全站机场综合实力排行榜</h2>
    <p class="section-subtitle">根据晚高峰千兆压测数据、线路稳定性、流媒体/AI 原生解锁率与性价比综合评分排序 (已为您智能剔除失效服务商)</p>

    <div class="rank-table-wrapper">
      <table class="luxury-rank-table">
        <thead>
          <tr>
            <th style="width: 21%;">排名与品牌</th>
            <th style="width: 18%;">线路技术</th>
            <th style="width: 22%;">起步资费</th>
            <th style="width: 15%;">优惠码</th>
            <th style="width: 24%; text-align: right; padding-right: 0.6rem;">快捷操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in fullAirports" :key="item.name" class="rank-row">
            <td class="brand-td">
              <div class="brand-cell-wrap">
                <span class="rank-num-pill" :class="`top-${idx + 1}`">{{ idx + 1 }}</span>
                <span class="brand-title">{{ item.name }}</span>
              </div>
            </td>
            <td class="tech-td">
              <span class="tech-badge">{{ item.tags[0] || 'BGP 专线' }}</span>
            </td>
            <td class="price-td">
              <strong class="price-text">{{ item.price }}</strong>
            </td>
            <td class="code-td">
              <code v-if="item.code !== '暂无'" class="coupon-code-pill">{{ item.code }}</code>
              <span v-else class="no-code-pill">注册即享原价</span>
            </td>
            <td class="action-td">
              <div class="table-btns-wrap">
                <a :href="item.reviewUrl" class="table-btn-review">深度测评 →</a>
                <a :href="item.affUrl" target="_blank" rel="nofollow sponsored" class="table-btn-aff">直达官网 ↗</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 5. 核心大标题：无图纯净双列卡片矩阵 -->
    <h2 id="popular-airports" class="section-title">🔥 2026 晚高峰表现优选机场矩阵</h2>

    <div class="airport-cards-clean-grid">
      <div v-for="item in fullAirports" :key="item.name" class="airport-clean-card">
        <!-- 头部：名称 + 价格 -->
        <div class="title-price-row">
          <h3 class="card-airport-name">{{ item.name }}</h3>
          <span class="card-price-chip">{{ item.price }}</span>
        </div>

        <!-- 优惠码条 -->
        <div v-if="item.code !== '暂无'" class="card-code-strip">
          <span class="strip-lbl">优惠码:</span>
          <strong class="strip-code">{{ item.code }}</strong>
          <span class="strip-hint">(结算输入立减)</span>
        </div>

        <!-- 描述 -->
        <p class="card-desc-txt">{{ item.desc }}</p>

        <!-- 标签云 -->
        <div class="card-tags-cloud">
          <span v-for="t in item.tags" :key="t" class="clean-tag-pill">{{ t }}</span>
        </div>

        <!-- 底部双按钮 -->
        <div class="card-action-btns">
          <a :href="item.affUrl" target="_blank" rel="nofollow sponsored" class="btn-cyan-action">直达官网 ↗</a>
          <a :href="item.reviewUrl" class="btn-dark-action">深度测评 ➔</a>
        </div>
      </div>
    </div>

    <!-- 6. 选机避坑四大原则 -->
    <h2 id="buying-principles" class="section-title">🛑 懂哥机选机避坑四大原则</h2>
    <div class="warning-list-box">
      <ul>
        <li><strong>原则一：坚决防范一折年付甩卖套现</strong>。凡是突然打出“19.9 元/包年 1000G”且 TG 群禁言的平台，99% 为跑路前最后资金套现，请极力规避。</li>
        <li><strong>原则二：认准 IEPL/IPLC 物理内网专线</strong>。普通的公网直连（如廉价直连节点）在晚高峰封锁期间极易陷入全红断连；专线不过 GFW 敏感过滤，稳定性具有断层优势。</li>
        <li><strong>原则三：拒绝“10 倍率暗扣流量”陷阱</strong>。许多机场标榜便宜，但高速节点全部标注 5x 或 10x 倍率，实际可用流量缩水 90%。本站推荐机场均具备透明倍率机制。</li>
        <li><strong>原则四：保持备份容灾意识</strong>。建议订阅主力专线梯子的同时，手头保留一个<a href="/recommend/cheap" class="link-blue">按量付费备用机场</a>，确保关键时刻出海不瘫痪。</li>
      </ul>
    </div>

    <!-- 7. 常见问题 FAQ -->
    <h2 id="faq" class="section-title">❓ 热门机场选购 FAQ (常见问题)</h2>
    
    <details class="faq-card">
      <summary class="faq-title">Q1: 为什么强烈建议优先选择月付套餐？</summary>
      <div class="faq-body">
        机场上游的国际出口光缆割接、落地 IP 被封禁以及政策变化具有极大的不确定性。按月付费能把您的资金风险降至最低，一旦线路质量下滑可随时切换其他优质机场。
      </div>
    </details>

    <details class="faq-card">
      <summary class="faq-title">Q2: IEPL 专线与 BGP 中转线路有什么区别？</summary>
      <div class="faq-body">
        IEPL/IPLC 属于局域网级别的端到端物理内网专线，信号不过 GFW 深度包检测（DPI），晚高峰几乎 0 丢包、延迟极度稳定；而 BGP 中转使用公网中转入口，成本较低但极端封锁时期可能受上游波动影响。
      </div>
    </details>

    <details class="faq-card">
      <summary class="faq-title">Q3: ChatGPT / Claude 经常提示 Access Denied 怎么办？</summary>
      <div class="faq-body">
        这是因为 OpenAI / Anthropic 封锁了大批数据中心（IDC）IP。解决办法是选用带有“原生 IP”或“AI 特化解锁”标签的节点（如暮光加速、隐形人、梯子云），并在客户端中开启针对 AI 域名分流规则。
      </div>
    </details>

    <!-- 底部互动点赞组件 -->
    <ArticleLikes :initial="128" id="recommend-2026" mode="bottom"/>
  </div>
</template>

<script setup>
// 16 家精选优质机场数据（已彻底剔除雨燕云、次元链接、茶艺云、三番云）
const fullAirports = [
  {
    name: '暮光加速',
    price: '¥20/月 (120G)',
    code: 'mm88',
    desc: '测试油管 4K 晚高峰毫无压力，多媒体与 ChatGPT-4o 原生全解锁，千兆下载跑满带宽。购买结算输入优惠码立减。',
    tags: ['IEPL 纯专线', '4K秒开', 'AI原生', '全节点 1.0x'],
    affUrl: 'https://tizi2.twilightaff.com/#/?code=nogJwChd',
    reviewUrl: '/reviews/muguang'
  },
  {
    name: '梯子云',
    price: '¥25/月 (125G)',
    code: 'tiziyun',
    desc: '全线 IEPL 企业级专线，告别晚高峰拥堵！完美解锁 ChatGPT/Netflix，支持自研小白客户端与开源订阅，安全稳定。',
    tags: ['企业专线', '自研客户端', '稳定安全', 'IEPL'],
    affUrl: 'https://tiziyun3.ladderaff.com/#/register?code=9otclbmc',
    reviewUrl: '/reviews/tiziyun'
  },
  {
    name: '隐形人',
    price: '¥24/月 (100G)',
    code: 'yxr888',
    desc: '新加坡技术团队研发，全线纯专线 + VLESS Reality 协议。8K 视频秒开，原生解锁 AI/流媒体，随用随续无后顾之忧。',
    tags: ['VLESS Reality', '新加坡团队', '8K秒开', '纯专线'],
    affUrl: 'https://tizi2.invisibleaff.com/#/?code=2ZoNoNo5',
    reviewUrl: '/reviews/yinxingren'
  },
  {
    name: 'FlyV',
    price: '¥25/月 (150G)',
    code: 'fly20',
    desc: '全线专线架构，全节点 1.0x 计费绝不暗扣！支持 4K/8K 流媒体与 ChatGPT，无限速、不限制同时在线设备数量。',
    tags: ['1.0x 计费', '不限设备', '150G 大流量', '无限速'],
    affUrl: 'https://tizi2.flyvaff.com/#/?code=JrLBx09H',
    reviewUrl: '/reviews/flyv'
  },
  {
    name: '灵动云',
    price: '¥20/月 (100G)',
    code: 'ld88',
    desc: '全线采用最新 VLESS 协议，提供香港、台湾、日本、新加坡及美国超多节点，实测晚高峰看 YouTube 4K 毫无压力。',
    tags: ['VLESS', '超多节点', '平价月付', '晚高峰抗拥堵'],
    affUrl: 'https://tizi2.lingdongaff.com/#/?code=NNWFzdHj',
    reviewUrl: '/reviews/lingdongyun'
  },
  {
    name: '浪网',
    price: '¥25/月 (150G)',
    code: 'lw88',
    desc: '全面支持 ChatGPT、Claude 等 AI 应用与开发工具调用，买即送软件版 SS 协议，不限制同时在线设备数量。',
    tags: ['AI特化', 'SS协议', '不限设备数', '开发者推荐'],
    affUrl: 'https://tizi2.wavenetaff.com/#/?code=xnwjiFqT',
    reviewUrl: '/reviews/langwang'
  },
  {
    name: '宇宙云',
    price: '¥14.9/月 (100G)',
    code: 'YUZHOU553',
    desc: '超高性价比入门梯子！首月折后仅 14.9 元，BGP 多线中转负载均衡，学生党查资料与轻度追剧神器。',
    tags: ['14.9元平价', '学生党首选', 'BGP中转', '高性价比'],
    affUrl: 'https://wzjc.yuzoucloud.cc',
    reviewUrl: '/reviews/yuzhouyun'
  },
  {
    name: '全球云',
    price: '¥20/月 (120G)',
    code: '暂无',
    desc: '多线 BGP 混合专线入口，覆盖全球 30+ 地区节点，支持智能负载均衡，跨境外贸与出海商务首选。',
    tags: ['全球30+地区', '外贸推荐', 'BGP专线', '负载均衡'],
    affUrl: 'https://vg5d.quanttt.club/#/?code=AVo0WgaO',
    reviewUrl: '/reviews/quanqiuyun'
  },
  {
    name: '光速云',
    price: '¥17/月 (110G)',
    code: '暂无',
    desc: '极速专线中转，节点平均延迟低至 35ms，网页毫秒级秒开，带来无感顺畅翻墙体验。',
    tags: ['35ms低延迟', '极速中转', '秒开体验', '低抖动'],
    affUrl: 'https://mdlky.gsyaff.com',
    reviewUrl: '/reviews/guangshuyun'
  },
  {
    name: 'U1S1',
    price: '¥20/月 (120G)',
    code: '暂无',
    desc: '全节点倍率透明公开，抗封锁 AnyTLS 协议，晚高峰千兆带宽不降速，拒绝暗扣流量。',
    tags: ['倍率透明', 'AnyTLS', '晚高峰抗拥堵', '千兆不降速'],
    affUrl: 'https://pkdj7.vipaff.cc',
    reviewUrl: '/reviews/u1s1'
  },
  {
    name: '极连云',
    price: '¥18/月 (100G)',
    code: '暂无',
    desc: '智能多入口调度，晚高峰千兆带宽压测 0 丢包，日常通勤与移动端稳定首选。',
    tags: ['智能调度', '零丢包', '日常稳定', '多线容灾'],
    affUrl: 'https://kdjhao.jlyvipaff.com',
    reviewUrl: '/reviews/jilianyun'
  },
  {
    name: '光年梯',
    price: '¥18/月 (110G)',
    code: '暂无',
    desc: '专为流媒体打造，Netflix 4K / Disney+ 深度解锁，全天候 YouTube 4K 拖拽零缓冲。',
    tags: ['Netflix 4K', 'Disney+', '原生IP', '流媒体特化'],
    affUrl: 'https://ggmq.gntaff.com',
    reviewUrl: '/reviews/guangnianti'
  },
  {
    name: '一翻云',
    price: '¥20/月 (150G)',
    code: '暂无',
    desc: '大带宽 150G 充沛配额，适合高频大文件下载与多端团队协作共享。',
    tags: ['150G大流量', '多端共享', '大带宽', '团队协作'],
    affUrl: 'https://wzjc.1flyunaff.cc',
    reviewUrl: '/reviews/yifanyun'
  },
  {
    name: '二猫云',
    price: '¥20/月 (130G)',
    code: '暂无',
    desc: '针对 iOS / Android 双端配置极致精简，一键导入小火箭与 Clash，稳定好用。',
    tags: ['手机适配', '一键导入', '平价稳定', '极简配置'],
    affUrl: 'https://wzjc.2maoyunaff.cc',
    reviewUrl: '/reviews/ermaoyun'
  },
  {
    name: 'sogo云',
    price: '¥25/月 (150G)',
    code: '暂无',
    desc: '企业级中转隧道，高稳定性保障，跨境外贸与远程生产力主力方案。',
    tags: ['企业中转', '外贸生产力', '大流量', '隧道加密'],
    affUrl: 'https://wzjc.sogoyunaff.cc',
    reviewUrl: '/reviews/sogoyun'
  },
  {
    name: 'edgenova',
    price: '¥20/月 (100G)',
    code: '暂无',
    desc: '边缘计算加速节点，针对 OpenAI API 及 GitHub 代码拉取特化加速。',
    tags: ['边缘加速', 'GitHub拉取', 'OpenAI API', '低延迟'],
    affUrl: 'https://work.edgenovaaff.cc',
    reviewUrl: '/reviews/edgenova'
  }
]
</script>

<style scoped>
.recommend-doc-wrap {
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 3rem;
}

.top-status-pills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.live-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #059669;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}
.dark .live-pill { color: #34d399; }
.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
}
.spec-pill {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
}

.main-title {
  font-size: 2.1rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin-bottom: 1.25rem;
}

.promo-banner-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(37, 99, 235, 0.1));
  border: 1px solid rgba(2, 132, 199, 0.3);
  border-radius: 12px;
  padding: 1.1rem 1.4rem;
  margin-bottom: 1.5rem;
  text-decoration: none !important;
  transition: transform 0.2s, box-shadow 0.2s;
}
.promo-banner-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(2, 132, 199, 0.15);
}
.banner-head {
  font-weight: 900;
  font-size: 1.05rem;
  color: #0284c7;
  margin-bottom: 0.25rem;
}
.banner-sub {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
.banner-btn {
  background: #0284c7;
  color: #fff !important;
  font-weight: 800;
  font-size: 0.82rem;
  padding: 0.45rem 0.95rem;
  border-radius: 6px;
  white-space: nowrap;
  margin-left: 1rem;
}

.intro-note {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}
.link-blue {
  color: #0284c7;
  font-weight: 700;
  text-decoration: underline;
}

.warning-alert-card {
  background: #fffbebf5;
  border: 1px solid #f59e0b;
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  padding: 1.1rem 1.35rem;
  margin: 1.5rem 0 2.2rem;
}
.dark .warning-alert-card {
  background: #281d08;
  border-color: #b45309;
}
.alert-title {
  color: #d97706;
  font-weight: 800;
  font-size: 0.95rem;
  margin-bottom: 0.35rem;
}
.dark .alert-title { color: #fbbf24; }
.alert-text {
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  line-height: 1.65;
}
.alert-link {
  color: #d97706;
  font-weight: 700;
  text-decoration: underline;
}
.dark .alert-link { color: #fbbf24; }

.section-title {
  font-size: 1.4rem;
  font-weight: 900;
  margin: 2.5rem 0 0.5rem;
  padding-bottom: 0.4rem;
}
.section-subtitle {
  font-size: 0.88rem;
  color: var(--vp-c-text-3);
  margin-bottom: 1.25rem;
}

/* ================= 高颜值 100% 单视口自适应排行榜表格 ================= */
.rank-table-wrapper {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden; /* 彻底取消横向滚动条 */
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.02);
}
.luxury-rank-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.86rem;
  text-align: left;
  table-layout: fixed; /* 严格由 100% 百分比定宽，防出现横向滚动 */
}
.luxury-rank-table th {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-weight: 800;
  font-size: 0.8rem;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid var(--vp-c-gutter);
  white-space: nowrap;
}
.rank-row {
  border-bottom: 1px solid var(--vp-c-gutter);
  transition: background 0.2s;
}
.rank-row:last-child {
  border-bottom: none;
}
.rank-row:hover {
  background: rgba(2, 132, 199, 0.04);
}
.luxury-rank-table td {
  padding: 0.75rem 0.5rem;
  vertical-align: middle;
  box-sizing: border-box;
}
.brand-td {
  overflow: hidden;
}
.brand-cell-wrap {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  overflow: hidden;
}
.rank-num-pill {
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background: var(--vp-c-gutter);
  color: var(--vp-c-text-2);
  font-weight: 900;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.rank-num-pill.top-1 { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; }
.rank-num-pill.top-2 { background: linear-gradient(135deg, #94a3b8, #64748b); color: #fff; }
.rank-num-pill.top-3 { background: linear-gradient(135deg, #b45309, #78350f); color: #fff; }

.brand-title {
  font-weight: 900;
  color: var(--vp-c-text-1);
  font-size: 0.88rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tech-badge {
  background: rgba(2, 132, 199, 0.1);
  color: #0284c7;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  white-space: nowrap;
  display: inline-block;
}
.dark .tech-badge { color: #38bdf8; }

.price-text {
  color: var(--vp-c-text-1);
  font-weight: 800;
  font-size: 0.82rem;
  white-space: nowrap;
}
.coupon-code-pill {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  font-weight: 800;
  font-size: 0.75rem;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  white-space: nowrap;
}
.dark .coupon-code-pill {
  background: #450a0a;
  border-color: #7f1d1d;
  color: #fca5a5;
}
.no-code-pill {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.action-td {
  padding-right: 0.6rem !important;
  text-align: right;
}
.table-btns-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  white-space: nowrap;
}
.table-btn-review {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-1) !important;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.3rem 0.55rem;
  border-radius: 6px;
  text-decoration: none !important;
  white-space: nowrap;
  transition: all 0.2s;
}
.table-btn-review:hover {
  border-color: #0284c7;
  color: #0284c7 !important;
}
.table-btn-aff {
  background: linear-gradient(135deg, #0284c7, #2563eb);
  color: #fff !important;
  font-weight: 800;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  text-decoration: none !important;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);
}
.table-btn-aff:hover {
  transform: translateY(-1px);
}

/* 移动端 (<= 768px) 触控体验与防挤压自适应 */
@media (max-width: 768px) {
  .rank-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .luxury-rank-table {
    min-width: 660px; /* 移动端启用流畅平滑触控滚动，防品牌与按钮切边压缩 */
    table-layout: auto;
  }
  .luxury-rank-table th, .luxury-rank-table td {
    padding: 0.65rem 0.4rem;
  }
  .table-btns-wrap {
    gap: 0.4rem;
  }
  .table-btn-review, .table-btn-aff {
    padding: 0.4rem 0.65rem;
    font-size: 0.78rem;
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }
}

/* ================= 纯净无图双列卡片网格 ================= */
.airport-cards-clean-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin-bottom: 3rem;
}
.airport-clean-card {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.airport-clean-card:hover {
  transform: translateY(-2px);
  border-color: #0284c7;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}

.title-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}
.card-airport-name {
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
  margin: 0 !important;
  border: none !important;
}
.card-price-chip {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  color: #0284c7;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.2rem 0.55rem;
  border-radius: 12px;
  white-space: nowrap;
}
.dark .card-price-chip { color: #38bdf8; }

.card-code-strip {
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-gutter);
  padding: 0.3rem 0.55rem;
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.strip-code {
  color: #dc2626;
  font-weight: 800;
}
.strip-hint {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.card-desc-txt {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 0.85rem 0;
  flex: 1;
}

.card-tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1.1rem;
}
.clean-tag-pill {
  font-size: 0.72rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  color: var(--vp-c-text-2);
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
}

.card-action-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}
.btn-cyan-action {
  text-align: center;
  background: #7dd3fc;
  color: #082f49 !important;
  font-weight: 800;
  font-size: 0.84rem;
  padding: 0.5rem 0;
  border-radius: 6px;
  text-decoration: none !important;
  transition: opacity 0.2s;
}
.btn-cyan-action:hover { opacity: 0.9; }
.dark .btn-cyan-action {
  background: #38bdf8;
  color: #082f49 !important;
}
.btn-dark-action {
  text-align: center;
  background: #1e293b;
  color: #f1f5f9 !important;
  border: 1px solid #334155;
  font-weight: 700;
  font-size: 0.84rem;
  padding: 0.5rem 0;
  border-radius: 6px;
  text-decoration: none !important;
  transition: background 0.2s;
}
.btn-dark-action:hover { background: #334155; }

.warning-list-box {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  padding: 1rem 1.4rem;
  margin-bottom: 2rem;
}
.warning-list-box ul { margin: 0; padding-left: 1.2rem; }
.warning-list-box li { font-size: 0.9rem; line-height: 1.8; color: var(--vp-c-text-2); }

.faq-card {
  border: 1px solid var(--vp-c-gutter);
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 0.85rem 1.2rem;
  margin-bottom: 0.85rem;
}
.faq-title { font-weight: 800; color: var(--vp-c-text-1); cursor: pointer; }
.faq-body { margin-top: 0.65rem; font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.65; }

@media (max-width: 768px) {
  .airport-cards-clean-grid { grid-template-columns: 1fr; }
  .promo-banner-box { flex-direction: column; align-items: flex-start; }
  .banner-btn { margin-left: 0; margin-top: 0.75rem; width: 100%; text-align: center; }
  .card-action-btns { grid-template-columns: 1fr; }
  .luxury-rank-table { min-width: 600px; }
}
</style>
