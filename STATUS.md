# STATUS — mijenro-international-website

> **最后更新：2026-07-20**（基于完整代码与 33 个提交的历史分析）

## 当前状态

健康在线。7/3-7/4 完成「editorial visual system」全站改版（PR #1，15 个提交）：新视觉、文案改为可验证表述、修移动端导航。剩一些小尾巴。

## 最近完成

- 2026-07-04 PR #1 全站视觉改版 + 文案清洗（20+→15+ 年、删员工数、城市扩到 纽约·上海·南昌·金边）+ 清理 Vercel 残留

## 进行中 / 下一步（都是小活，一次会话可清完）

- [ ] `server.js` 确认邮件模板仍写 "within 24 business hours"（4 处），站点已改 48 小时——改齐
- [ ] `scripts/generate-og-image.mjs` 过时：输出 og-image.png（站点用 .jpg）、页脚写 "NEW YORK · SHANGHAI · HONG KONG"（站点已无香港）——修正或删脚本
- [ ] 清理 assets/ 约 19MB 未引用旧图 + `git rm --cached` 两个已入库的 .DS_Store
- [ ] sitemap.xml 补 privacy.html、刷新 lastmod
- [ ] 生产环境确认 `FROM_EMAIL` 已设为 mijenro.com 域名发件人（代码默认还是 Resend sandbox onboarding@resend.dev）

## 未决问题

- 暂无

## 重要决定

- 2026-07-04 · 文案原则改为"可验证的朴素表述" — 对沃尔玛/Costco 级买家，可信 > 唬人
- 2026-04-17 · 部署迁 Zeabur — 与其他项目统一
- 2026-04-09 · 删除电话号码，联系只留邮箱 — 询盘统一走表单/邮件
