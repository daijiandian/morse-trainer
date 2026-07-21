import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('tutorial renderer trust copy stays readable across supported languages', () => {
  const source = read('js/tutorial-renderer.js');

  assert.match(source, /Last updated: \$\{LAST_UPDATED\}\. Maintained as part of the public Morse Trainer tutorial library on mmccode\.com\./);
  assert.match(source, /Tutorial content is maintained independently of advertising decisions\./);
  assert.match(source, /How this tutorial content is reviewed/);
  assert.match(source, /Each tutorial or hub page is manually outlined, checked for factual clarity, and revised when training advice, navigation, or historical context needs correction\./);
  assert.match(source, /These pages are written to answer one learning question or topic cluster in a cleaner format than scattered forum replies, copied snippets, or low-context summaries\./);
  assert.match(source, /Research & Sources/);

  assert.match(source, /最后更新：\$\{LAST_UPDATED\}。本页属于 mmccode\.com 上公开维护的 Morse Trainer 教程库。/);
  assert.match(source, /教程内容独立于广告决策维护。/);
  assert.match(source, /这些教程内容如何审核/);
  assert.match(source, /每个教程页或专题页都会经过人工梳理、事实表述检查，并在训练建议、导航结构或历史说明需要修正时更新。/);
  assert.match(source, /这些页面的目标是把一个学习问题或一个主题专题整理清楚，而不是拼接论坛摘录、复制片段或缺少上下文的摘要。/);
  assert.match(source, /研究与来源/);

  assert.match(source, /最終更新: \$\{LAST_UPDATED\}。このページは mmccode\.com で公開管理されている Morse Trainer チュートリアルライブラリの一部です。/);
  assert.match(source, /チュートリアル内容は広告判断とは独立して管理されています。/);
  assert.match(source, /このチュートリアル内容の確認方法/);
  assert.match(source, /各チュートリアルページやハブページは人の手で構成を整え、事実関係を確認し、練習方針・導線・歴史説明に修正が必要な場合は更新しています。/);
  assert.match(source, /これらのページは、ひとつの学習課題やトピック群を、断片的な投稿や文脈の薄い要約よりも整理された形で学べるようにまとめています。/);
  assert.match(source, /調査と出典/);

  assert.match(source, /최종 업데이트: \$\{LAST_UPDATED\}\. 이 페이지는 mmccode\.com에서 공개 관리하는 Morse Trainer 튜토리얼 라이브러리의 일부입니다\./);
  assert.match(source, /튜토리얼 내용은 광고 결정과 별도로 관리됩니다\./);
  assert.match(source, /이 튜토리얼 콘텐츠를 검토하는 방식/);
  assert.match(source, /각 튜토리얼 페이지와 허브 페이지는 사람이 직접 구조를 다듬고 사실 표현을 점검하며, 학습 조언·탐색 흐름·역사 설명에 수정이 필요하면 업데이트합니다\./);
  assert.match(source, /이 페이지들은 흩어진 포럼 답변, 복사된 조각, 맥락이 부족한 요약을 이어 붙이는 대신 하나의 학습 질문이나 주제 묶음을 더 선명하게 정리하기 위해 작성됩니다\./);
  assert.match(source, /조사와 출처/);

  assert.match(source, /Última actualización: \$\{LAST_UPDATED\}\. Esta página forma parte de la biblioteca pública de tutoriales de Morse Trainer mantenida en mmccode\.com\./);
  assert.match(source, /El contenido de los tutoriales se mantiene de forma independiente de las decisiones publicitarias\./);
  assert.match(source, /Cómo se revisa este contenido de tutoriales/);
  assert.match(source, /Cada página de tutorial o página hub se organiza manualmente, se revisa para asegurar claridad factual y se actualiza cuando la orientación de práctica, la navegación o el contexto histórico necesitan corrección\./);
  assert.match(source, /Estas páginas se escriben para resolver una pregunta de aprendizaje o un grupo temático de forma más clara que respuestas dispersas de foros, fragmentos copiados o resúmenes sin contexto\./);
  assert.match(source, /Investigación y fuentes/);

  assert.doesNotMatch(source, /鏈€鍚庢洿鏂/);
  assert.doesNotMatch(source, /鏈€绲傛洿鏂/);
  assert.doesNotMatch(source, /斓滌/);
  assert.doesNotMatch(source, /脷ltima/);
  assert.doesNotMatch(source, /p谩gina/);
  assert.doesNotMatch(source, /p煤blica/);
});
