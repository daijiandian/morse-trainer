import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

function extractWordCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text.split(' ').filter(Boolean).length : 0;
}

test('homepage provides a stronger public review path and product-completeness explanation', () => {
  const home = read('index.html');
  const words = extractWordCount(home);

  assert.ok(words >= 1200, `index.html is too thin at ${words} words`);
  assert.match(home, /How to review the site quickly/);
  assert.match(home, /Why this is more than a single drill page/);
  assert.match(home, /href="tutorials\.html"/);
  assert.match(home, /href="practice-guides\.html"/);
  assert.match(home, /href="history\.html"/);
  assert.match(home, /href="about\.html"/);
  assert.match(home, /href="help\.html"/);
  assert.match(home, /href="privacy\.html"/);
  assert.match(home, /href="terms\.html"/);
  assert.match(home, /href="advertising\.html"/);
  assert.match(home, /href="editorial-policy\.html"/);
  assert.match(home, /href="faq\.html"/);
  assert.match(home, /href="contact\.html"/);
  assert.match(home, /href="site-map\.html"/);
});

test('homepage review-readiness copy is localized across all supported UI languages', () => {
  const i18n = read('js/i18n.js');
  const requiredKeys = [
    'homeCompleteEyebrow',
    'homeCompleteTitle',
    'homeCompleteDesc',
    'homeComplete1Title',
    'homeComplete1Desc',
    'homeComplete2Title',
    'homeComplete2Desc',
    'homeComplete3Title',
    'homeComplete3Desc',
    'homeReviewEyebrow',
    'homeReviewTitle',
    'homeReviewDesc',
    'homeReview1Title',
    'homeReview1Desc',
    'homeReview2Title',
    'homeReview2Desc',
    'homeReview3Title',
    'homeReview3Desc',
  ];

  for (const key of requiredKeys) {
    const matches = i18n.match(new RegExp(`${key}:`, 'g')) || [];
    assert.equal(matches.length, 5, `Expected ${key} in all 5 language dictionaries, found ${matches.length}`);
  }
});
