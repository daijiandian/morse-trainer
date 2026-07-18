import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('editorial policy explains multilingual review, source handling, and correction flow', () => {
  const editorial = read('editorial-policy.html');

  assert.match(editorial, /translation|multilingual/i);
  assert.match(editorial, /source|reference|fact/i);
  assert.match(editorial, /copyright|public-domain|licensed|transcript/i);
  assert.match(editorial, /Last updated|dateModified|material change|correction/i);
  assert.match(editorial, /href="contact\.html"/);
  assert.match(editorial, /href="help\.html"/);
  assert.match(editorial, /advertising.*editorial|editorial.*advertising/i);
});
