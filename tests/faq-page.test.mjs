import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('faq page covers ads transparency and correction workflow', () => {
  const faq = read('faq.html');

  assert.match(faq, /Does the site use ads or sponsored placements\?/i);
  assert.match(faq, /How are tutorial corrections reviewed\?/i);
  assert.match(faq, /ads may appear on parts of the site, but advertising does not let anyone buy more favorable tutorial conclusions/i);
  assert.match(faq, /corrections should be reported through the Contact page and are reviewed under the public Editorial Policy/i);
  assert.match(faq, /href="advertising\.html"/);
  assert.match(faq, /href="editorial-policy\.html"/);
  assert.match(faq, /href="contact\.html"/);
});
