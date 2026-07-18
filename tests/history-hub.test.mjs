import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const readTutorialData = () => {
  const source = read('js/tutorial-data.js');
  return JSON.parse(source.slice(source.indexOf('{'), source.lastIndexOf(';')));
};

test('history hub static page links to supporting learning pages', () => {
  const history = read('history.html');

  assert.match(history, /href="start-here\.html"/);
  assert.match(history, /href="learning-roadmap\.html"/);
  assert.match(history, /href="morse-glossary\.html"/);
});

test('history hub data exposes support links across all languages', () => {
  const data = readTutorialData();
  const required = ['start-here.html', 'learning-roadmap.html', 'morse-glossary.html'];

  for (const [lang, localized] of Object.entries(data.historyHub.localizations)) {
    const hrefs = localized.sections.flatMap((section) => section.cards.map((card) => card.href).filter(Boolean));
    for (const href of required) {
      assert.ok(
        hrefs.includes(href),
        `Expected ${href} in historyHub.localizations.${lang}`
      );
    }
  }
});
