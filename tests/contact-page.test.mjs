import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('contact page explains advertising inquiries and editorial independence', () => {
  const contact = read('contact.html');

  assert.match(contact, /Advertising and partnerships/i);
  assert.match(contact, /advertising questions do not buy coverage or guarantee editorial placement/i);
  assert.match(contact, /commercial requests are handled separately from tutorial review and corrections/i);
  assert.match(contact, /href="advertising\.html"/);
  assert.match(contact, /href="editorial-policy\.html"/);
});
