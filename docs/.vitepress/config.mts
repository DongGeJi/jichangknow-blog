import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "懂哥机博客",
  description: "懂哥机（DongGeJi / jichangknow.com）专注2026科学上网与梯子机场测评。拒绝虚标伪专线，提供真实晚高峰测速、IPLC专线推荐、跑路预警黑名单及Clash/小火箭保姆级教程。",
  lang: 'zh-CN',
  sitemap: {
    hostname: 'https://jichangknow.com'
  },
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['link', { rel: 'canonical', href: 'https://jichangknow.com' }],
    ['meta', { name: 'author', content: '懂哥机' }],
    ['meta', { property: 'og:image', content: 'https://jichangknow.com/logo.png' }],
    ['meta', { name: 'keywords', content: '懂哥机,懂哥机博客,jichangknow,2026机场推荐,科学上网,IPLC专线机场,机场跑路预警,Clash Verge Rev下载' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '懂哥机博客' }],
    ['meta', { property: 'og:url', content: 'https://jichangknow.com' }],
    ['meta', { name: 'indexnow-key', content: 'c0d3f6a8e5b41297890123456789abcd' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    siteTitle: '懂哥机博客',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文章/关键字...',
                buttonAriaLabel: '搜索文章/关键字...'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: '此页目录'
    },
    nav: [
      { text: '🔥 2026机场推荐', link: '/recommend/' },
      { text: '⚠️ 跑路黑名单/预警', link: '/warning/' },
      { text: '⚡ AI / 4K解锁专区', link: '/recommend/streaming-ai' },
      { text: '🛠️ 软件下载与教程', link: '/tutorials/' },
      { text: '🙋‍♂️ 关于懂哥机', link: '/about' }
    ],
    footer: {
      message: '📢 <a href="https://t.me/+eRqPUPEwXu80ZGU1" target="_blank" rel="noopener" style="color:#0284c7;font-weight:700;text-decoration:underline;">TG 官方频道交流群 ↗</a> | 🐱 <a href="https://github.com/DongGeJi" target="_blank" rel="noopener" style="color:#0284c7;font-weight:700;text-decoration:underline;">GitHub 主页 ↗</a> | ✉️ 商务合作/投稿: <a href="mailto:jichangknow@proton.me" style="color:#0284c7;font-weight:700;text-decoration:underline;">jichangknow@proton.me</a>',
      copyright: 'Copyright © 2026 懂哥机 (jichangknow.com). All Rights Reserved.'
    }
  }
})
