import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('about page explains monetization transparency and links trust pages', () => {
  const about = read('about.html');

  assert.match(about, /How the site is funded/i);
  assert.match(about, /advertising and future revenue support hosting, maintenance, and content updates/i);
  assert.match(about, /ads or commercial relationships do not decide tutorial conclusions/i);
  assert.match(about, /href="advertising\.html"/);
  assert.match(about, /href="editorial-policy\.html"/);
});
