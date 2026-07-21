import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('tutorial renderer trust copy stays readable across supported languages', () => {
  const source = read('js/tutorial-renderer.js');

  assert.match(source, /Last updated: \$\{LAST_UPDATED\}\. Maintained as part of the public Morse Trainer tutorial library on mmccode\.com\./);
  assert.match(source, /Tutorial content is maintained independently of advertising decisions\./);
  assert.match(source, /Research & Sources/);
  assert.match(source, /See how history pages, media examples, and public references are researched and corrected\./);

  assert.match(source, /最后更新：\$\{LAST_UPDATED\}。本页属于 mmccode\.com 上公开维护的 Morse Trainer 教程库。/);
  assert.match(source, /教程内容独立于广告决策维护。/);
  assert.match(source, /研究与来源/);
  assert.match(source, /查看历史页面、媒体示例与公开参考资料如何被整理和修正。/);

  assert.match(source, /最終更新: \$\{LAST_UPDATED\}。このページは mmccode\.com で公開管理されている Morse Trainer チュートリアルライブラリの一部です。/);
  assert.match(source, /チュートリアル内容は広告判断とは独立して管理されています。/);
  assert.match(source, /調査と出典/);
  assert.match(source, /歴史ページ、メディア例、公開資料がどのように調査・修正されるかを確認できます。/);

  assert.match(source, /최종 업데이트: \$\{LAST_UPDATED\}\. 이 페이지는 mmccode\.com에서 공개 관리하는 Morse Trainer 튜토리얼 라이브러리의 일부입니다\./);
  assert.match(source, /튜토리얼 내용은 광고 결정과 별도로 관리됩니다\./);
  assert.match(source, /조사와 출처/);
  assert.match(source, /역사 페이지, 미디어 예시, 공개 참고 자료가 어떻게 조사·수정되는지 확인할 수 있습니다\./);

  assert.match(source, /Última actualización: \$\{LAST_UPDATED\}\. Esta página forma parte de la biblioteca pública de tutoriales de Morse Trainer mantenida en mmccode\.com\./);
  assert.match(source, /El contenido de los tutoriales se mantiene de forma independiente de las decisiones publicitarias\./);
  assert.match(source, /Investigación y fuentes/);
  assert.match(source, /Consulta cómo se investigan y corrigen las páginas históricas, los ejemplos de medios y las referencias públicas\./);

  assert.doesNotMatch(source, /鏈€鍚庢洿鏂/);
  assert.doesNotMatch(source, /鏈€绲傛洿鏂/);
  assert.doesNotMatch(source, /斓滌/);
  assert.doesNotMatch(source, /脷ltima/);
  assert.doesNotMatch(source, /p谩gina/);
  assert.doesNotMatch(source, /p煤blica/);
});
