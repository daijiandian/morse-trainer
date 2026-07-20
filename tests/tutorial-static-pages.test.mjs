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

test('static tutorial pages expose readable maintenance copy and glossary support links', () => {
  const files = ['history.html', 'tutorials.html', ...listTutorialFiles()];

  for (const file of files) {
    const html = read(file);
    assert.doesNotMatch(html, /Last updated: July \d{1,2}, 2026\s*璺/);
    if (file === 'history.html' || file === 'tutorials.html') {
      assert.match(html, /Last updated: July 20, 2026/);
    } else {
      assert.match(html, /Last updated: July 18, 2026/);
    }
    assert.match(html, /independently of advertising decisions/i);
    assert.match(html, /href="[^"]*about\.html"/);
    assert.match(html, /href="[^"]*editorial-policy\.html"/);
    assert.match(html, /href="[^"]*privacy\.html"/);
    assert.match(html, /href="[^"]*morse-glossary\.html"/);
    assert.match(html, /href="[^"]*contact\.html"/);
  }
});

test('tutorial hubs explain how content is curated and how readers should use the library', () => {
  const tutorials = read('tutorials.html');
  const history = read('history.html');

  assert.match(tutorials, /How this library is curated and kept useful/);
  assert.match(tutorials, /How to choose your next article without getting lost/);
  assert.match(tutorials, /not every learner needs every article/i);
  assert.match(history, /How historical articles are selected and reviewed/);
  assert.match(history, /How to use history pages without leaving the learning path/);
  assert.match(history, /history supports practice when it answers a live learning question/i);
});
