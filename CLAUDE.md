# mijenro-international-website — Claude 项目指令

> mijenro.com 公司官网。经常变的状态见 `STATUS.md`。这是公开仓库（合理：内容本来就公开）。

## 这是什么

Mijenro International LLC（美杰合）的 B2B 门面：服装批发/供应链管理服务展示。6 个静态页（index/about/services/sustainability/contact/privacy），中英双语。目标读者：北美批发买家。

## 技术形态

- 纯 HTML/CSS/JS 无框架无构建；双语靠 `data-i18n` + `locales/i18n-data.js`（**由 en.json/zh.json 生成，别手改**；改文案 = 改两个 json 再同步 i18n-data.js）
- `server.js` 即生产服务器：Express 静态托管 + www→apex 301 + `POST /api/contact`（Resend 发询盘邮件 + 双语自动回复，蜜罐+限流已有）
- 部署 **Zeabur**（.gitignore 里注明；曾在 Vercel）。GA4：G-J8S44P3CC1
- OG 图生成脚本：`scripts/generate-og-image.mjs`（已过时，见 STATUS）

## 本地运行

```bash
npm install && npm start   # localhost:8080
# 联系表单需要 RESEND_API_KEY（+ FROM_EMAIL/TO_EMAIL）；纯浏览页面不需要任何 env
```

## 规矩（不能违反）

- **只写可验证的事实性表述**：7 月改版特意把 20+ 年改成 15+ 年、删掉 280+ 员工数——不要把夸大话术加回来
- 中英文案必须成对改（en.json + zh.json + i18n-data.js 三处同步，键名一致）
- 联系方式只留 contact@mijenro.com（电话号是特意删除的，别加回）
- 图片先压缩再入库（assets/ 已有 19MB 死图教训）

## 上下文导航

- 干到哪了 → `STATUS.md` · 全局地图 → `~/new-life/PROJECTS.md`
