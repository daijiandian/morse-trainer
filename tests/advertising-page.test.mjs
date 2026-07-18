import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('advertising page explains ad-safety rules and reporting paths', () => {
  const advertising = read('advertising.html');

  assert.match(advertising, /click ads.*rewards|rewards.*click ads/i);
  assert.match(advertising, /points|leaderboard|account benefits/i);
  assert.match(advertising, /href="contact\.html"/);
  assert.match(advertising, /href="help\.html"/);
  assert.match(advertising, /misleading ad|problematic ad|ad-related concern/i);
});
