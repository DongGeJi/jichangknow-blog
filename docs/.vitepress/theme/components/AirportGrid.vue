<template>
  <div class="airport-grid-container">
    <div v-for="item in airports" :key="item.name" class="airport-card">
      <div class="card-cover-wrap">
        <img :src="item.cover" :alt="item.name" class="card-cover-img" />
      </div>

      <div class="card-body">
        <div class="card-header-row">
          <h3 class="airport-name">{{ item.name }}</h3>
          <span class="price-badge">{{ item.price }}</span>
        </div>

        <p class="airport-desc">{{ item.desc }}</p>

        <div class="tags-row">
          <span v-for="t in item.tags" :key="t" class="tag-pill">{{ t }}</span>
        </div>

        <div class="btn-group">
          <a :href="item.affUrl" target="_blank" rel="nofollow sponsored" class="btn btn-aff">官网 ↗</a>
          <a :href="item.reviewUrl" class="btn btn-review">评测报告</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const airports = [
  {
    name: '暮光加速 (主推)',
    price: '¥20/月 120G (码: mm88)',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    desc: '懂哥机主力实测推荐！晚高峰 YouTube 4K 零缓冲秒开，ChatGPT/Netflix 原生双解锁，千兆下载跑满带宽。',
    tags: ['主推专线', 'mm88优惠', '4K秒开', 'AI原生'],
    affUrl: 'https://tizi2.twilightaff.com/#/?code=nogJwChd',
    reviewUrl: '/reviews/muguang'
  },
  {
    name: '梯子云 (第二)',
    price: '¥25/月 125G (码: tiziyun)',
    cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    desc: '全线 IEPL 企业专线，告别晚高峰拥堵！完美解锁 ChatGPT/Netflix，支持自研小白客户端与主流开源订阅。',
    tags: ['IEPL企业专线', '自研客户端', '稳定安全'],
    affUrl: 'https://tiziyun3.ladderaff.com/#/register?code=9otclbmc',
    reviewUrl: '/reviews/tiziyun'
  },
  {
    name: '隐形人',
    price: '¥24/月 100G (码: yxr888)',
    cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80',
    desc: '新加坡技术团队打造，全线纯专线 + VLESS 协议。8K 秒开，原生解锁 AI/流媒体，随用随续无后顾之忧。',
    tags: ['VLESS协议', '新加坡团队', '8K秒开'],
    affUrl: 'https://tizi2.invisibleaff.com/#/?code=2ZoNoNo5',
    reviewUrl: '/reviews/yinxingren'
  },
  {
    name: 'FlyV',
    price: '¥25/月 150G (码: fly20)',
    cover: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80',
    desc: '全线专线架构，全节点 1.0x 计费不扣流量！支持 4K/8K 流媒体与 ChatGPT，无限速、不限设备数。',
    tags: ['1.0x不虚标', '不限设备', '大流量'],
    affUrl: 'https://tizi2.flyvaff.com/#/?code=JrLBx09H',
    reviewUrl: '/reviews/flyv'
  },
  {
    name: '灵动云',
    price: '¥20/月 100G (码: ld88)',
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    desc: '全线采用最新 VLESS 协议，提供香港、台湾、日本、新加坡及美国超多节点，实测晚高峰 4K 毫无压力。',
    tags: ['VLESS', '多地区节点', '晚高峰抗拥堵'],
    affUrl: 'https://tizi2.lingdongaff.com/#/?code=NNWFzdHj',
    reviewUrl: '/reviews/lingdongyun'
  },
  {
    name: '浪网',
    price: '¥25/月 150G (码: lw88)',
    cover: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
    desc: '全面支持 ChatGPT、Claude 等 AI 工具开发调用，买即送软件版 SS 协议，不限制同时在线设备数。',
    tags: ['AI特化', 'SS协议', '不限设备'],
    affUrl: 'https://tizi2.wavenetaff.com/#/?code=xnwjiFqT',
    reviewUrl: '/reviews/langwang'
  },
  {
    name: '宇宙云',
    price: '¥14.90/月 100G (码: YUZHOU553)',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    desc: '超高性价比平价首选！首月折后仅 14.9 元，BGP 中转多线负载，学生党与轻度追剧神器。',
    tags: ['高性价比', '14.9元平价', 'BGP中转'],
    affUrl: 'https://wzjc.yuzoucloud.cc',
    reviewUrl: '/reviews/yuzhouyun'
  },
  {
    name: '全球云',
    price: '¥20/月 120G',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    desc: '多线 BGP 混合专线入口，覆盖全球 30+ 国家地区节点，外贸跨境与出海商务首选。',
    tags: ['全球覆盖', '外贸推荐', 'BGP多线'],
    affUrl: 'https://hueue09.gcvipaff.com/#/?code=AVo0WgaO',
    reviewUrl: '/reviews/quanqiuyun'
  },
  {
    name: '光速云',
    price: '¥17/月 110G',
    cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    desc: '极速专线中转，节点平均延迟低至 35ms，网页秒开，无感翻墙。',
    tags: ['极速中转', '低延迟', '秒开体验'],
    affUrl: 'https://mdlky.gsyaff.com',
    reviewUrl: '/reviews/guangshuyun'
  },
  {
    name: 'U1S1',
    price: '¥20/月 120G',
    cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80',
    desc: '节点倍率透明公开，抗封锁 AnyTLS 协议，晚高峰不降速。',
    tags: ['倍率透明', 'AnyTLS', '晚高峰抗拥堵'],
    affUrl: 'https://pkdj7.vipaff.cc',
    reviewUrl: '/reviews/u1s1'
  },
  {
    name: '极连云',
    price: '¥18/月 100G',
    cover: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=80',
    desc: '智能多入口调度，晚高峰千兆带宽压测 0 丢包，日常通勤稳定首选。',
    tags: ['智能调度', '零丢包', '日常稳定'],
    affUrl: 'https://kdjhao.jlyvipaff.com',
    reviewUrl: '/reviews/jilianyun'
  },
  {
    name: '光年梯',
    price: '¥18/月 110G',
    cover: 'https://images.unsplash.com/photo-1484417894907-623942c8ec29?w=600&auto=format&fit=crop&q=80',
    desc: '专为流媒体打造，Netflix 4K / Disney+ 深度解锁，全天候 4K 拖拽无压力。',
    tags: ['流媒体特化', 'Netflix 4K', '高性价比'],
    affUrl: 'https://ggmq.gntaff.com',
    reviewUrl: '/reviews/guangnianti'
  },
  {
    name: '一翻云',
    price: '¥20/月 150G',
    cover: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    desc: '大带宽 150G 充沛配额，适合高频下载与多端团队协作共享。',
    tags: ['大流量', '150GB', '团队多开'],
    affUrl: 'https://wzjc.1flyunaff.cc',
    reviewUrl: '/reviews/yifanyun'
  },
  {
    name: '二猫云',
    price: '¥20/月 130G',
    cover: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    desc: '针对 iOS / Android 双端配置极致精简，一键导入小火箭与 Clash。',
    tags: ['手机适配', '一键导入', '稳定平价'],
    affUrl: 'https://wzjc.2maoyunaff.cc',
    reviewUrl: '/reviews/ermaoyun'
  },
  {
    name: 'sogo云',
    price: '¥25/月 150G',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    desc: '企业级中转隧道，高稳定性保障，跨境外贸与远程生产力主力方案。',
    tags: ['企业级', '外贸生产力', '大带宽'],
    affUrl: 'https://wzjc.sogoyunaff.cc',
    reviewUrl: '/reviews/sogoyun'
  },
  {
    name: 'edgenova',
    price: '¥20/月 100G',
    cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    desc: '边缘计算加速节点，针对 OpenAI API 及 GitHub 代码拉取特化加速。',
    tags: ['边缘加速', 'GitHub加速', 'OpenAI API'],
    affUrl: 'https://work.edgenovaaff.cc',
    reviewUrl: '/reviews/edgenova'
  }
]
</script>

<style scoped>
.airport-grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 1.5rem 0 2.5rem;
}
.airport-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.airport-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.35);
  border-color: #38bdf8;
}
.card-cover-wrap {
  width: 100%;
  height: 175px;
  background: #020617;
  overflow: hidden;
}
.card-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}
.airport-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 !important;
  border: none !important;
}
.price-badge {
  background: #1e293b;
  color: #38bdf8;
  border: 1px solid #334155;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 12px;
}
.airport-desc {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex: 1;
}
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1.2rem;
}
.tag-pill {
  font-size: 0.72rem;
  background: #1e293b;
  border: 1px solid #334155;
  color: #cbd5e1;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}
.btn-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.btn {
  text-align: center;
  padding: 0.5rem 0;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none !important;
  transition: opacity 0.2s;
}
.btn:hover { opacity: 0.9; }
.btn-aff {
  background: #7dd3fc;
  color: #082f49 !important;
}
.btn-review {
  background: #1e293b;
  color: #e2e8f0 !important;
  border: 1px solid #334155;
}
@media (max-width: 768px) {
  .airport-grid-container { grid-template-columns: 1fr; }
}
</style>
