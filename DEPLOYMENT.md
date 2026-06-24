# Deployment Guide

## 一、目标结构

推荐将项目拆成两部分：

- 前端静态站：`https://yourdomain.com`
- 后端 API：`https://api.yourdomain.com`

这样做的好处是：

- 前端可以部署到 GitHub Pages、Netlify 或 Vercel
- 后端可以部署到支持 Node.js 的平台
- 以后接广告、SEO、内容页扩展都更灵活

## 二、最推荐的落地组合

如果你想先低成本上线，再逐步走向正式站点，推荐这套组合：

- 前端：GitHub Pages
- 后端：Render 或 Railway
- 域名：后续再绑定自己的独立域名

这样做的原因是：

- GitHub Pages 免费、稳定，适合托管当前这些静态页面
- Render / Railway 更适合直接跑 `server/` 里的 Node 服务
- 等站点内容和流量稳定后，再切到更正式的域名方案也不晚

## 三、GitHub 仓库准备

1. 在 GitHub 新建仓库。
2. 将当前项目代码推送到仓库根目录。
3. 建议至少保留以下目录与文件：
   - `index.html`
   - `about.html`
   - `privacy.html`
   - `contact.html`
   - `tutorials.html`
   - `tutorials/`
   - `css/`
   - `js/`
   - `server/`
   - `README.md`
   - `DEPLOYMENT.md`
   - `ADSENSE_READY_CHECKLIST.md`

## 四、前端静态部署

### 方案 A：GitHub Pages

适合展示静态站，但不负责运行 `server/` 后端。

1. 将前端静态文件放在默认分支。
2. 在 GitHub 仓库设置中开启 Pages。
3. 选择从分支发布静态内容。
4. 成功后获得一个 GitHub Pages 域名。
5. 如需绑定正式域名，再配置自定义域名和 DNS。

### 方案 B：Netlify / Vercel

更适合正式站点，设置自定义域名与 HTTPS 更方便。

1. 导入 GitHub 仓库。
2. 将项目根目录作为静态站目录。
3. 不需要构建命令时可直接留空，或按平台要求填写。
4. 发布后绑定正式域名。

## 五、后端 API 部署

后端位于 `server/` 目录，不能直接运行在 GitHub Pages。

### 基本步骤

1. 进入 `server/` 目录。
2. 执行：`npm install`
3. 启动：`npm run dev`
4. 正式环境建议设置：
   - `PORT`
   - `AUTH_TOKEN_SECRET`

### API 检查点

部署成功后至少确认：

- `/health`
- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/me`
- `/api/progress`
- `/api/progress/sync`

## 六、一个更具体的部署示例

下面给你一个比较容易执行的真实组合：

### 示例：GitHub Pages + Render

1. 把整个项目推到 GitHub 仓库。
2. 在 GitHub Pages 发布前端静态页面。
3. 在 Render 新建一个 Web Service，根目录指向 `server/`。
4. Render 安装依赖并启动 Node 服务。
5. 在 Render 中配置环境变量：
   - `PORT`
   - `AUTH_TOKEN_SECRET`
6. 拿到 Render 提供的后端地址，例如：
   - `https://your-morse-api.onrender.com`
7. 在前端页面中配置：

```html
<script>
  window.MORSE_API_BASE = 'https://your-morse-api.onrender.com';
</script>
```

8. 再次检查登录、同步、训练和隐私页面是否可访问。

如果你后面换成正式域名，建议：

- 主站：`https://yourdomain.com`
- API：`https://api.yourdomain.com`

## 七、前后端连接

如果前端和后端分开部署，在 `index.html` 顶部配置：

```html
<script>
  window.MORSE_API_BASE = 'https://api.yourdomain.com';
</script>
```

当前项目已经支持：

- 优先读取 `window.MORSE_API_BASE`
- 未设置时回退为当前站点同源

## 八、自定义域名建议

建议使用：

- 主站：`yourdomain.com`
- API：`api.yourdomain.com`

这样做的好处：

- 更像正式产品站
- 更适合 SEO
- 更利于后续接广告和统计工具
- 更方便未来做前后端独立扩展

## 九、正式发布前检查

上线前请确认：

- 首页可正常打开
- About / Privacy / Contact 页面可访问
- 教程目录和 10 篇内容页可访问
- 移动端无明显布局问题
- 登录、同步和训练主流程可用
- 页面无乱码、空白页和 404

## 十、AdSense 前准备

申请前建议：

- 已绑定自定义域名
- 已上线一段时间
- 已有至少 10 篇原创内容页
- 已提供 About / Privacy / Contact
- 已保证站点内容不是单纯为了放广告
- 已补充真实联系邮箱和真实隐私条款

## 十一、推荐执行顺序

1. 先把前端静态站部署出去
2. 再把后端 API 部署出去
3. 配置 `window.MORSE_API_BASE`
4. 绑定正式域名
5. 补完真实联系信息和隐私条款
6. 检查收录情况
7. 最后申请 AdSense

