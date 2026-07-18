import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('tutorial renderer trust copy stays readable across supported languages', () => {
  const source = read('js/tutorial-renderer.js');

  assert.match(source, /Last updated: \$\{LAST_UPDATED\} · Maintained as part of the public Morse Trainer tutorial library on mmccode\.com\./);
  assert.match(source, /Tutorial content is maintained independently of advertising decisions\./);
  assert.match(source, /最后更新：2026 年 7 月 18 日 · 本页属于 mmccode\.com 公开维护的 Morse Trainer 教程内容体系。/);
  assert.match(source, /教程内容独立于广告决策进行维护。/);
  assert.match(source, /最終更新: 2026年7月18日 · このページは mmccode\.com で公開運用されている Morse Trainer のチュートリアル体系の一部です。/);
  assert.match(source, /마지막 업데이트: 2026년 7월 18일 · 이 페이지는 mmccode\.com 에서 공개 운영 중인 Morse Trainer 튜토리얼 라이브러리의 일부입니다。?/);
  assert.match(source, /Última actualización: 18 de julio de 2026 · Esta página forma parte de la biblioteca pública de tutoriales de Morse Trainer mantenida en mmccode\.com\./);
});
