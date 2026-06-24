# First GitHub Push

杩欎唤鏂囨。鐢ㄤ簬鍦ㄥ綋鍓嶇洰褰曡繕涓嶆槸 Git 浠撳簱鏃讹紝蹇€熷畬鎴愮涓€娆″叕寮€鎺ㄩ€併€?
## 1. 鎺ㄩ€佸墠鍏堢‘璁?
- 浣犲凡缁忓垹闄ゆ垨绉昏蛋涓存椂淇ˉ鑴氭湰
- `server/node_modules/` 娌℃湁鍑嗗鎻愪氦
- `.gitignore` 宸插瓨鍦ㄥ苟鐢熸晥
- `contact.html`銆乣privacy.html`銆乣README.md` 宸茶揪鍒板彲鍏紑鐘舵€?
## 2. 鍒濆鍖?Git

鍦ㄩ」鐩牴鐩綍鎵ц锛?
```bash
git init
git branch -M main
```

## 3. 鏌ョ湅寰呮彁浜ゆ枃浠?
```bash
git status
```

閲嶇偣纭杩欎簺鍐呭娌℃湁琚姞鍏ワ細

- `server/node_modules/`
- `server/data/`
- `*.log`

## 4. 棣栨鎻愪氦

```bash
git add .
git commit -m "Initial publish-ready version"
```

## 5. 鍏宠仈杩滅▼浠撳簱

鍏堝幓 GitHub 鍒涘缓涓€涓柊浠撳簱锛岀劧鍚庢墽琛岋細

```bash
git remote add origin <浣犵殑浠撳簱鍦板潃>
git push -u origin main
```

渚嬪锛?
```bash
git remote add origin https://github.com/yourname/morse-trainer.git
git push -u origin main
```

## 6. 鎺ㄩ€佸悗绔嬪埢妫€鏌?
- 浠撳簱涓槸鍚﹁鎻愪氦浜嗗ぇ鏂囦欢銆佹棩蹇楁垨鏈湴鍨冨溇
- `README.md` 鏄惁鏄剧ず姝ｅ父
- `about.html`銆乣contact.html`銆乣privacy.html` 鏄惁閮藉湪浠撳簱閲?- `server/` 鐩綍鏄惁瀹屾暣浣嗘病鏈?`node_modules/`

## 7. 鎺ㄩ€佸悗涓嬩竴姝?
寤鸿椤哄簭锛?
1. 鍚敤 GitHub Pages 鎵樼闈欐€佸墠绔?2. 鍗曠嫭閮ㄧ讲 `server/` 鍒?Render 鎴?Railway
3. 閰嶇疆姝ｅ紡 `window.MORSE_API_BASE`
4. 鍐嶅仛姝ｅ紡鍩熷悕缁戝畾涓庡箍鍛婂寲鍑嗗

