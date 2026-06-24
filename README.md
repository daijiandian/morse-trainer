# Morse Trainer

涓€涓潰鍚戝垵瀛﹁€呫€佷笟浣欐棤绾跨數鐖卞ソ鑰呭拰鑷鐢ㄦ埛鐨勬懇鏂瘑鐮佽缁冪綉绔欙紝鍖呭惈璁粌宸ュ叿銆佸涔犺矾绾裤€佹暀绋嬪唴瀹广€佽繘搴﹀悓姝ヤ笌绉垎鎺掕姒溿€?
## Project Overview

褰撳墠椤圭洰鐢变袱閮ㄥ垎缁勬垚锛?
- 闈欐€佸墠绔細鏍圭洰褰曚笅鐨?`index.html`銆乣about.html`銆乣privacy.html`銆乣contact.html`銆乣tutorials.html`銆乣css/`銆乣js/`
- Node.js 鍚庣锛歚server/`锛岃礋璐ｈ处鍙枫€佸悓姝ャ€佹帓琛屾涓庢湰鍦?SQLite 鏁版嵁瀛樺偍

杩欐剰鍛崇潃锛?
- 椤圭洰婧愮爜鍙互瀹屾暣鍙戝竷鍒?GitHub
- 闈欐€侀〉闈㈠彲浠ラ儴缃插埌 GitHub Pages銆丯etlify 鎴?Vercel
- 鐧诲綍銆佸悓姝ャ€佹帓琛屾绛夊姛鑳介渶瑕佸崟鐙儴缃?`server/`

## Core Features

- Morse flashcards
- Listening multiple choice
- Typing practice for letters, words and sentences
- Koch-style learning plan
- Study statistics and level unlocks
- Login, register, password change and progress sync
- Leaderboard and recent score history
- Tutorial pages for long-term content growth

## Local Development

### Start the backend

```bash
cd server
npm install
npm run dev
```

Then open:

```text
http://localhost:3000/
```

You can also start locally with `start.bat`.

## Backend Endpoints

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/change-password`
- `GET /api/progress`
- `POST /api/progress/sync`
- `POST /api/progress/reset`
- `POST /api/progress/clear-cloud`
- `GET /api/leaderboard`

## Deployment Model

Recommended production split:

- Frontend: `https://yourdomain.com`
- API: `https://api.yourdomain.com`

Recommended low-cost setup:

- Frontend: GitHub Pages
- Backend: Render or Railway

Important:

- GitHub Pages does not run the Node.js backend
- The frontend should set `window.MORSE_API_BASE` to your deployed backend URL

Example:

```html
<script>
  window.MORSE_API_BASE = 'https://api.yourdomain.com';
</script>
```

## Repository Publishing Notes

Before pushing to GitHub, keep these files and folders:

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
- `GITHUB_LAUNCH_CHECKLIST.md`
- `GITHUB_PUBLISH_STEPS.md`

Do not commit:

- `server/node_modules/`
- `server/data/`
- `*.log`
- temporary patch scripts or one-off local repair scripts

## AdSense Readiness

This project is better suited for AdSense after:

- a custom domain is connected
- real contact information is added
- the privacy policy is updated for actual deployment and third-party tools
- tutorial content continues to grow
- the site runs stably for a period of time before applying

See:

- `DEPLOYMENT.md`
- `ADSENSE_READY_CHECKLIST.md`
- `GITHUB_LAUNCH_CHECKLIST.md`

