import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('key public trust pages expose consistent maintainer identity and current freshness signals', () => {
  const files = ['about.html', 'contact.html', 'editorial-policy.html', 'help.html'];

  for (const file of files) {
    const html = read(file);
    assert.match(html, /"name": "Morse Trainer"/, `${file} should identify the site publisher`);
    assert.match(html, /"url": "https:\/\/www\.mmccode\.com\/"/, `${file} should point schema identity to the main site`);
    assert.match(html, /"email": "415417421@qq\.com"/, `${file} should expose the public maintainer email in schema`);
    assert.match(html, /"sameAs": \[\s*"https:\/\/github\.com\/daijiandian\/morse-trainer"\s*\]/, `${file} should link the public source repository in schema`);
    assert.match(html, /"availableLanguage": \[\s*"en",\s*"zh-CN",\s*"ja",\s*"ko",\s*"es"\s*\]/, `${file} should declare the supported public languages in schema`);
    assert.match(html, /Last updated: July 21, 2026/, `${file} should show the latest public review date`);
    assert.match(html, /"dateModified": "2026-07-21"/, `${file} should keep structured freshness signals aligned`);
  }
});

test('about and editorial pages explain who maintains the public site and how corrections are handled', () => {
  const about = read('about.html');
  const editorial = read('editorial-policy.html');

  assert.match(about, /Who maintains the public site/);
  assert.match(about, /The Morse Trainer project maintains the drills, tutorials, trust pages, and public support flow as one connected learning product\./);
  assert.match(about, /Public corrections, policy questions, and maintenance requests all route through the main contact address and the linked public trust pages\./);

  assert.match(editorial, /Who maintains editorial review/);
  assert.match(editorial, /Public tutorial, support, and policy pages are maintained under the Morse Trainer project rather than being left as one-time static uploads\./);
  assert.match(editorial, /When content quality, factual clarity, or translation accuracy is challenged, the review path runs through the public contact channel and the relevant policy page before a page is kept live as-is\./);
});

test('sitemap freshness stays aligned for the trust pages updated in this review pass', () => {
  const sitemap = read('sitemap.xml');

  assert.match(sitemap, /<loc>https:\/\/www\.mmccode\.com\/about\.html<\/loc>\s*<lastmod>2026-07-21<\/lastmod>/);
  assert.match(sitemap, /<loc>https:\/\/www\.mmccode\.com\/contact\.html<\/loc>\s*<lastmod>2026-07-21<\/lastmod>/);
  assert.match(sitemap, /<loc>https:\/\/www\.mmccode\.com\/help\.html<\/loc>\s*<lastmod>2026-07-21<\/lastmod>/);
  assert.match(sitemap, /<loc>https:\/\/www\.mmccode\.com\/editorial-policy\.html<\/loc>\s*<lastmod>2026-07-21<\/lastmod>/);
});
