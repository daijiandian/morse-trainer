import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('major public entry pages expose current maintainer identity and freshness signals', () => {
  const files = [
    'site-map.html',
    'practice-guides.html',
    'morse-glossary.html',
    'start-here.html',
    'how-it-works.html',
    'learning-roadmap.html',
    'faq.html',
    'privacy.html',
    'terms.html',
    'advertising.html'
  ];

  for (const file of files) {
    const html = read(file);
    assert.match(html, /Last updated: July 21, 2026/, `${file} should show the latest public maintenance date`);
    assert.match(html, /"dateModified": "2026-07-21"/, `${file} should keep schema freshness aligned`);
    assert.match(html, /"name": "Morse Trainer"/, `${file} should identify the site maintainer in schema`);
    assert.match(html, /"url": "https:\/\/www\.mmccode\.com\/"/, `${file} should point schema identity to the main site`);
    assert.match(html, /"email": "415417421@qq\.com"/, `${file} should expose the public maintainer email in schema`);
    assert.match(html, /"sameAs": \[\s*"https:\/\/github\.com\/daijiandian\/morse-trainer"\s*\]/, `${file} should link the public source repository in schema`);
    assert.match(html, /"availableLanguage": \[\s*"en",\s*"zh-CN",\s*"ja",\s*"ko",\s*"es"\s*\]/, `${file} should declare supported public languages in schema`);
  }
});

test('sitemap freshness stays aligned for the refreshed public entry pages', () => {
  const sitemap = read('sitemap.xml');
  const files = [
    'site-map.html',
    'practice-guides.html',
    'morse-glossary.html',
    'start-here.html',
    'how-it-works.html',
    'learning-roadmap.html',
    'faq.html',
    'privacy.html',
    'terms.html',
    'advertising.html'
  ];

  for (const file of files) {
    const escaped = file.replace(/\./g, '\\.');
    assert.match(
      sitemap,
      new RegExp(`<loc>https://www\\.mmccode\\.com/${escaped}</loc>\\s*<lastmod>2026-07-21</lastmod>`),
      `${file} should have a matching sitemap lastmod`
    );
  }
});
