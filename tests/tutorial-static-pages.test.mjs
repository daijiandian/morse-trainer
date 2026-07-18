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
  const files = ['history.html', ...listTutorialFiles()];

  for (const file of files) {
    const html = read(file);
    assert.doesNotMatch(html, /July 18, 2026 路/);
    assert.match(html, /Last updated: July 18, 2026/);
    assert.match(html, /href="[^"]*about\.html"/);
    assert.match(html, /href="[^"]*editorial-policy\.html"/);
    assert.match(html, /href="[^"]*privacy\.html"/);
    assert.match(html, /href="[^"]*morse-glossary\.html"/);
    assert.match(html, /href="[^"]*contact\.html"/);
  }
});
