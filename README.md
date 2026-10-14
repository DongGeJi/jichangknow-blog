# 晚高峰观察（暂定名）

一个从零编写的中文机场选择博客。首版只发布方法、费用核算与场景决策文章；没有真实测试记录时，不发布商家排名或测速结论。旧站 `docs/` 是项目中原有的参考资料，不参与新站构建，也不应部署到新域名。

用户提供的 `airports.csv` 实际为 XLSX 工作簿。已从中整理 31 个待核验名称到 `/research/`，该页设为 `noindex` 且不进入 sitemap；未采纳错位的套餐字段、推广链接或未经证实的性能宣称。处理细节见 [DATA_IMPORT.md](DATA_IMPORT.md)。

## 本地运行

需要 Node.js 20 或更新版本，无需安装新依赖。

```powershell
npm run build
npm run check
npm run dev
```

打开 `http://localhost:4173/`。新站输出在 `dist/`。当前未确定域名，默认构建使用保留域名 `https://example.com`，并在 `robots.txt` 中禁止抓取。

## 上线前

```powershell
$env:SITE_URL = 'https://你的正式域名'
npm run build
npm run check
```

将 `dist/` 部署为站点根目录，强制 HTTPS、统一首选主机名，并把不带尾斜杠的页面路径 301 重定向到带尾斜杠的版本。提交 `https://你的正式域名/sitemap.xml` 到 Bing Webmaster Tools。品牌名可通过 `SITE_NAME` 环境变量修改；更换正式品牌时同步核对页面文案和 Logo 字样。参见 [EDITORIAL_PLAN.md](EDITORIAL_PLAN.md) 与 [测评记录模板](templates/review-record.md)。

## 新文章和 IndexNow

新文章须加入 `site/content.mjs` 的 `articles`，写明独立标题、描述、正文与更新日期；商家测评还须有公开证据。构建器只把明确标为 `published` 的文章写入页面与 sitemap。下列命令先生成并检查将要提交的 URL，不发送请求：

```powershell
$env:SITE_URL = 'https://你的正式域名'
$env:INDEXNOW_KEY = '你的IndexNow密钥'
npm run build
npm run indexnow -- /guides/budget-math/
```

部署包含根目录密钥文件的 `dist/` 后，再运行 `npm run indexnow -- --send /guides/budget-math/`。脚本只接受 sitemap 内的规范 URL，并拒绝占位域名。IndexNow 通知不保证收录。

## 内容边界

不从原站复制文章、图片、测评数值或文案；不自动生成未核验的商家推荐；不显示虚构浏览量、评分和实时状态。商业关系在每篇评测的记录中披露，站点通用政策见 `/about/`。
