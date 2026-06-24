# GitHub Publish Steps

## 1. 建议上传到 GitHub 的目录结构

建议保留这些内容：

```text
css/
js/
server/
tutorials/
.gitignore
about.html
ADSENSE_READY_CHECKLIST.md
contact.html
DEPLOYMENT.md
GITHUB_LAUNCH_CHECKLIST.md
index.html
privacy.html
README.md
start.bat
tutorials.html
```

这些内容目前不应该提交：

- `server/node_modules/`
- `server/data/`
- `*.log`

## 2. 推送前最后自查

先确认：

- 首页能打开
- 教程目录能打开
- About / Privacy / Contact 页面能打开
- `start.bat` 可以本地启动项目
- `server/` 下依赖可以正常安装
- `.gitignore` 已经生效

## 3. 推荐的 GitHub 仓库说明

仓库名称建议尽量直接，例如：

- `morse-trainer`
- `morse-code-trainer`
- `morse-learning-site`

仓库描述可以写成：

- 一个在线摩斯密码训练与学习网站，包含训练工具、学习路线、教程内容与进度同步功能。

## 4. 本地初始化 Git 并提交

如果当前目录还没有 Git 仓库，可以按这个顺序做：

```bash
git init
git add .
git commit -m "Initial publish-ready version"
```

如果已经有 Git 仓库，就直接正常提交当前改动即可。

## 5. 推送到 GitHub

在 GitHub 新建仓库后，按你的仓库地址执行：

```bash
git remote add origin <你的仓库地址>
git branch -M main
git push -u origin main
```

## 6. 推送后建议立刻做的事

1. 先在 GitHub 检查是否误提交了 `node_modules`、日志或其他无关文件
2. 再按 `DEPLOYMENT.md` 开始拆分前端和后端部署
3. 正式上线前把 `contact.html` 里的示例邮箱换成真实邮箱
4. 根据实际部署平台继续补充 `privacy.html`
5. 上线一段时间后再考虑申请 AdSense

## 7. 当前项目适合的发布定位

当前这版更适合这样定义：

- 第一阶段：发布到 GitHub，作为公开项目和网站源码
- 第二阶段：部署为可访问站点
- 第三阶段：继续补教程和真实站点信息
- 第四阶段：等内容和稳定性更成熟后，再考虑广告平台

