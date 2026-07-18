import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('help page explains self-service troubleshooting and leaderboard validity', () => {
  const help = read('help.html');

  assert.match(help, /audio|browser|reload/i);
  assert.match(help, /leaderboard|rank/i);
  assert.match(help, /valid session|short session|points|score/i);
  assert.match(help, /href="faq\.html"/);
  assert.match(help, /href="contact\.html"/);
  assert.match(help, /href="editorial-policy\.html"/);
});
