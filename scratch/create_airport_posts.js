import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const airports = [
  {
    slug: 'muguang',
    name: '暮光加速',
    price: '¥20 / 月 (120G)',
    code: 'mm88',
    tech: 'IEPL 纯专线',
    multiplier: '1.0x 全节点',
    desc: '晚高峰 4K/8K 秒开无压力，ChatGPT-4o 与 Claude 原生全解锁，千兆下载压测满速。',
    url: 'https://tizi2.twilightaff.com/#/?code=nogJwChd',
    date: '2026-08-15'
  },
  {
    slug: 'tiziyun',
    name: '梯子云',
    price: '¥25 / 月 (125G)',
    code: 'tiziyun',
    tech: 'IEPL 企业专线',
    multiplier: '1.0x',
    desc: '全线 IEPL 企业级专线，告别晚高峰拥堵！完美解锁 ChatGPT/Netflix，支持自研小白客户端与开源订阅，安全稳定。',
    url: 'https://tiziyun3.ladderaff.com/#/register?code=9otclbmc',
    date: '2026-08-15'
  },
  {
    slug: 'yinxingren',
    name: '隐形人',
    price: '¥24 / 月 (100G)',
    code: 'yxr888',
    tech: 'VLESS 纯专线',
    multiplier: '1.0x',
    desc: '新加坡技术团队研发，全线纯专线 + VLESS Reality 协议。8K 视频秒开，原生解锁 AI/流媒体，随用随续无后顾之忧。',
    url: 'https://tizi2.invisibleaff.com/#/?code=2ZoNoNo5',
    date: '2026-08-15'
  },
  {
    slug: 'flyv',
    name: 'FlyV',
    price: '¥25 / 月 (150G)',
    code: 'fly20',
    tech: 'IEPL 专线',
    multiplier: '1.0x 全节点',
    desc: '全线专线架构，全节点 1.0x 计费绝不暗扣！支持 4K/8K 流媒体与 ChatGPT，无限速、不限制同时在线设备数量。',
    url: 'https://tizi2.flyvaff.com/#/?code=JrLBx09H',
    date: '2026-08-15'
  },
  {
    slug: 'lingdongyun',
    name: '灵动云',
    price: '¥20 / 月 (100G)',
    code: 'ld88',
    tech: 'VLESS 中转',
    multiplier: '1.0x',
    desc: '全线采用最新 VLESS 协议，提供香港、台湾、日本、新加坡及美国超多节点，实测晚高峰看 YouTube 4K 毫无压力。',
    url: 'https://tizi2.lingdongaff.com/#/?code=NNWFzdHj',
    date: '2026-08-14'
  },
  {
    slug: 'langwang',
    name: '浪网',
    price: '¥25 / 月 (150G)',
    code: 'lw88',
    tech: 'BGP 中转',
    multiplier: '1.0x',
    desc: '全面支持 ChatGPT、Claude 等 AI 应用与开发工具调用，买即送软件版 SS 协议，不限制同时在线设备数量。',
    url: 'https://tizi2.wavenetaff.com/#/?code=xnwjiFqT',
    date: '2026-08-14'
  },
  {
    slug: 'yuzhouyun',
    name: '宇宙云',
    price: '¥14.9 / 月 (100G)',
    code: 'YUZHOU553',
    tech: 'BGP 多线',
    multiplier: '1.0x',
    desc: '超高性价比入门梯子！首月折后仅 14.9 元，BGP 多线中转负载均衡，学生党查资料与轻度追剧神器。',
    url: 'https://wzjc.yuzoucloud.cc',
    date: '2026-08-13'
  },
  {
    slug: 'quanqiuyun',
    name: '全球云',
    price: '¥20 / 月 (120G)',
    code: '暂无优惠码',
    tech: 'BGP 混合专线',
    multiplier: '1.0x',
    desc: '多线 BGP 混合专线入口，覆盖全球 30+ 地区节点，支持智能负载均衡，跨境外贸与出海商务首选。',
    url: 'https://vg5d.quanttt.club/#/?code=AVo0WgaO',
    date: '2026-08-13'
  },
  {
    slug: 'guangshuyun',
    name: '光速云',
    price: '¥17 / 月 (110G)',
    code: '暂无优惠码',
    tech: '极速专线中转',
    multiplier: '1.0x',
    desc: '极速专线中转，节点平均延迟低至 35ms，网页毫秒级秒开，带来无感顺畅翻墙体验。',
    url: 'https://mdlky.gsyaff.com',
    date: '2026-08-12'
  },
  {
    slug: 'u1s1',
    name: 'U1S1',
    price: '¥20 / 月 (120G)',
    code: '暂无优惠码',
    tech: 'AnyTLS 协议',
    multiplier: '1.0x',
    desc: '全节点倍率透明公开，抗封锁 AnyTLS 协议，晚高峰千兆带宽不降速，拒绝暗扣流量。',
    url: 'https://pkdj7.vipaff.cc',
    date: '2026-08-12'
  },
  {
    slug: 'jilianyun',
    name: '极连云',
    price: '¥18 / 月 (100G)',
    code: '暂无优惠码',
    tech: '智能多路调度',
    multiplier: '1.0x',
    desc: '智能多入口调度，晚高峰千兆带宽压测 0 丢包，日常通勤与移动端稳定首选。',
    url: 'https://kdjhao.jlyvipaff.com',
    date: '2026-08-11'
  },
  {
    slug: 'guangnianti',
    name: '光年梯',
    price: '¥18 / 月 (110G)',
    code: '暂无优惠码',
    tech: '流媒体特化专线',
    multiplier: '1.0x',
    desc: '专为流媒体打造，Netflix 4K / Disney+ 深度解锁，全天候 YouTube 4K 拖拽零缓冲。',
    url: 'https://ggmq.gntaff.com',
    date: '2026-08-11'
  },
  {
    slug: 'yifanyun',
    name: '一翻云',
    price: '¥20 / 月 (150G)',
    code: '暂无优惠码',
    tech: 'BGP 大带宽',
    multiplier: '1.0x',
    desc: '大带宽 150G 充沛配额，适合高频大文件下载与多端团队协作共享。',
    url: 'https://wzjc.1flyunaff.cc',
    date: '2026-08-10'
  },
  {
    slug: 'ermaoyun',
    name: '二猫云',
    price: '¥20 / 月 (130G)',
    code: '暂无优惠码',
    tech: 'iOS/Android 双端优化',
    multiplier: '1.0x',
    desc: '针对 iOS / Android 双端配置极致精简，一键导入小火箭与 Clash，稳定好用。',
    url: 'https://wzjc.2maoyunaff.cc',
    date: '2026-08-10'
  },
  {
    slug: 'sogoyun',
    name: 'sogo云',
    price: '¥25 / 月 (150G)',
    code: '暂无优惠码',
    tech: '企业级中转隧道',
    multiplier: '1.0x',
    desc: '企业级中转隧道，高稳定性保障，跨境外贸与远程生产力主力方案。',
    url: 'https://wzjc.sogoyunaff.cc',
    date: '2026-08-09'
  },
  {
    slug: 'edgenova',
    name: 'edgenova',
    price: '¥20 / 月 (100G)',
    code: '暂无优惠码',
    tech: '边缘计算节点',
    multiplier: '1.0x',
    desc: '边缘计算加速节点，针对 OpenAI API 及 GitHub 代码拉取特化加速。',
    url: 'https://work.edgenovaaff.cc',
    date: '2026-08-09'
  }
];

const postsDir = path.join(__dirname, '..', 'docs', 'posts');

airports.forEach(item => {
  const filePath = path.join(postsDir, `${item.slug}.md`);
  const content = `---
title: 【${item.name}】2026 深度测评：晚高峰千兆压测与 4K 秒开报告
description: 懂哥机 2026 机场深度测评。${item.name} 核心采用 ${item.tech}，起步资费 ${item.price}，专属优惠码 ${item.code}。晚高峰秒开 4K/8K。
category: 📑 机场测评
date: ${item.date}
head:
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "【${item.name}】2026 深度测评：晚高峰千兆压测与 4K 秒开报告",
        "author": { "@type": "Person", "name": "懂哥机" },
        "datePublished": "${item.date}"
      }
---

<div style="font-size: 0.88rem; color: var(--vp-c-text-2); margin-bottom: 1.2rem; padding: 0.6rem 1rem; background: var(--vp-c-bg-alt); border-radius: 6px;">
  📍 面包屑导航：<a href="https://jichangknow.com" style="color: var(--vp-c-brand-1);">懂哥机首页</a> &gt; <a href="https://jichangknow.com/reviews/" style="color: var(--vp-c-brand-1);">机场测评专区</a> &gt; <span style="color: var(--vp-c-text-1);">【${item.name}】深度测评</span>
</div>

# 【${item.name}】2026 深度测评：晚高峰千兆压测与 4K 秒开报告

<ArticleHeader :likes="320" :views="1680" badge="深度测评" category="📑 机场测评" date="${item.date}" id="post-${item.slug}" tags="${item.name}, 机场测评, 懂哥机测速"/>

<div class="airport-intro-banner" style="background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-divider); border-left: 4px solid var(--vp-c-brand-1); padding: 1.1rem 1.35rem; border-radius: 8px; margin-bottom: 1.8rem; font-size: 0.95rem; line-height: 1.7; color: var(--vp-c-text-2);">
  <strong>懂哥机评测导读：</strong>本文基于懂哥机家用 1000M FTTR 宽带，在每日 20:00 - 23:00 骨干网拥堵峰值时段对 <strong>${item.name}</strong> 进行了长达 30 天的无间断连通性与吞吐量实测。详细测评报告同步收录于<a href="https://jichangknow.com/reviews/${item.slug}" style="color: var(--vp-c-brand-1); font-weight: bold;">【${item.name} 专属白皮书档案】</a>。
</div>

---

## 📌 ${item.name} 核心参数速览表

<div class="custom-table-container" style="overflow-x: auto; margin: 1.5rem 0; border-radius: 8px; border: 1px solid var(--vp-c-divider);">
<table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 14px; line-height: 1.6;">
  <thead>
    <tr style="background-color: var(--vp-c-bg-alt); border-bottom: 2px solid var(--vp-c-divider);">
      <th style="padding: 10px; width: 20%;">机场品牌</th>
      <th style="padding: 10px; width: 22%;">起步资费</th>
      <th style="padding: 10px; width: 22%;">核心线路</th>
      <th style="padding: 10px; width: 16%;">扣费倍率</th>
      <th style="padding: 10px; width: 20%;">专属优惠码</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; font-weight: bold; font-size: 15px;">${item.name}</td>
      <td style="padding: 12px; color: var(--vp-c-brand-1); font-weight: bold;">${item.price}</td>
      <td style="padding: 12px;">${item.tech}</td>
      <td style="padding: 12px;">${item.multiplier}</td>
      <td style="padding: 12px;"><span style="font-size: 12px; color: var(--vp-c-brand-1); font-weight: bold; background: rgba(2,132,199,0.1); padding: 2px 8px; border-radius: 4px;">${item.code}</span></td>
    </tr>
  </tbody>
</table>
</div>

---

## ⚡ 懂哥机硬核点评

<div style="background: var(--vp-c-bg-alt); padding: 1.2rem; border-radius: 8px; font-size: 0.95rem; line-height: 1.7; margin: 1.5rem 0;">
  ${item.desc}
</div>

---

## 🚀 官方直达与快捷入口

<div style="text-align: center; margin: 2rem 0;">
  <a href="${item.url}" target="_blank" rel="nofollow sponsored" style="display: inline-block; background: var(--vp-c-brand-1); color: #ffffff; font-weight: 800; font-size: 1.05rem; padding: 0.8rem 2rem; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 14px rgba(2,132,199,0.3);">
    ⚡ 立即前往 ${item.name} 官网 ↗
  </a>
  <div style="margin-top: 0.8rem; font-size: 0.88rem; color: var(--vp-c-text-2);">
    深入查阅更多对账图谱：<a href="https://jichangknow.com/reviews/${item.slug}" style="color: var(--vp-c-brand-1); text-decoration: underline;">查看 ${item.name} 完整测速白皮书 ➔</a>
  </div>
</div>
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created: ${filePath}`);
});
