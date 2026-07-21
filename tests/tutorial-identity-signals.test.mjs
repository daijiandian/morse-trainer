import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('../', import.meta.url);
const tutorialDir = new URL('../tutorials/', import.meta.url);

function read(relativePath) {
  return fs.readFileSync(new URL(relativePath, root), 'utf8');
}

function listTutorialFiles() {
  return fs.readdirSync(tutorialDir)
    .filter((name) => name.endsWith('.html'))
    .map((name) => path.posix.join('tutorials', name));
}

test('tutorial articles and hubs expose richer maintainer identity signals in static html', () => {
  const files = ['tutorials.html', 'history.html', ...listTutorialFiles()];

  for (const file of files) {
    const html = read(file);

    assert.match(html, /Last updated: July 21, 2026/, `${file} should show the latest public maintenance date`);
    assert.match(html, /"dateModified": "2026-07-21"/, `${file} should keep schema freshness aligned`);
    assert.match(html, /"name": "Morse Trainer"/, `${file} should identify the site maintainer in schema`);
    assert.match(html, /"url": "https:\/\/www\.mmccode\.com\/"/, `${file} should point schema identity to the main site`);
    assert.match(html, /"email": "415417421@qq\.com"/, `${file} should expose the public maintainer email in schema`);
    assert.match(html, /"sameAs": \[\s*"https:\/\/github\.com\/daijiandian\/morse-trainer"\s*\]/, `${file} should link the public source repository in schema`);
    assert.match(html, /"availableLanguage": \[\s*"en",\s*"zh-CN",\s*"ja",\s*"ko",\s*"es"\s*\]/, `${file} should declare supported public languages in schema`);
  }
});

test('tutorial renderer keeps runtime identity schema aligned with the static tutorial pages', () => {
  const source = read('js/tutorial-renderer.js');

  assert.match(source, /const LAST_UPDATED = 'July 21, 2026';/);
  assert.match(source, /dateModified:\s*'2026-07-21'/);
  assert.match(source, /email:\s*'415417421@qq\.com'/);
  assert.match(source, /sameAs:\s*\[\s*'https:\/\/github\.com\/daijiandian\/morse-trainer'\s*\]/);
  assert.match(source, /availableLanguage:\s*\['en', 'zh-CN', 'ja', 'ko', 'es'\]/);
});
