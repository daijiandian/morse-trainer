import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('terms page explains enforcement, minors, updates, and support paths', () => {
  const terms = read('terms.html');

  assert.match(terms, /suspend|restrict|terminate/i);
  assert.match(terms, /leaderboard.*reset|reset.*leaderboard|remove.*score|score.*removed/i);
  assert.match(terms, /minor|parent|guardian/i);
  assert.match(terms, /changes to these terms|updated terms|posted on this page/i);
  assert.match(terms, /href="contact\.html"/);
  assert.match(terms, /href="help\.html"/);
});
