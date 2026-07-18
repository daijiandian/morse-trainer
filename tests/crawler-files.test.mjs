import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('robots.txt exists and points crawlers to the production sitemap', () => {
  const robots = read('robots.txt');

  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\/\s*/i);
  assert.match(robots, /Sitemap:\s*https:\/\/www\.mmccode\.com\/sitemap\.xml/i);
});

test('ads.txt exists and declares the site publisher id', () => {
  const ads = read('ads.txt');

  assert.match(ads, /google\.com,\s*pub-1195582871220373,\s*DIRECT,\s*f08c47fec0942fa0/i);
});
