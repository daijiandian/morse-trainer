import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('site map page is published and linked from the public site', () => {
  const siteMap = read('site-map.html');
  const homepage = read('index.html');
  const sitemapXml = read('sitemap.xml');

  assert.match(siteMap, /<title>Site Map \| Morse Trainer<\/title>/);
  assert.match(siteMap, /https:\/\/www\.mmccode\.com\/site-map\.html/);
  assert.match(homepage, /href="site-map\.html"/);
  assert.match(sitemapXml, /https:\/\/www\.mmccode\.com\/site-map\.html/);
});

test('major public pages expose the site map in their footers', () => {
  const publicPages = [
    'about.html',
    'advertising.html',
    'contact.html',
    'editorial-policy.html',
    'faq.html',
    'help.html',
    'history.html',
    'how-it-works.html',
    'learning-roadmap.html',
    'privacy.html',
    'start-here.html',
    'terms.html',
    'tutorials.html'
  ];

  for (const page of publicPages) {
    assert.match(read(page), /href="site-map\.html"/, `${page} is missing the site map footer link`);
  }
});

test('tutorial articles expose the site map in their static fallback footer', () => {
  const tutorialPages = [
    'tutorials/what-is-morse-code.html',
    'tutorials/koch-method-guide.html',
    'tutorials/morse-code-in-aviation-history.html'
  ];

  for (const page of tutorialPages) {
    assert.match(read(page), /href=\"\.\.\/site-map\.html\"/, `${page} is missing the site map footer link`);
  }
});

test('site map page includes a visible public trust section and independence note', () => {
  const siteMap = read('site-map.html');

  assert.match(siteMap, /Public site and editorial links/);
  assert.match(siteMap, /independently of advertising decisions/i);
  assert.match(siteMap, /href="privacy\.html"/);
  assert.match(siteMap, /href="editorial-policy\.html"/);
  assert.match(siteMap, /href="contact\.html"/);
});

test('research and sources page is published and linked from the main review hubs', () => {
  const sourcesPath = new URL('../research-sources.html', import.meta.url);
  assert.ok(fs.existsSync(sourcesPath), 'research-sources.html should be published for public review');

  const sources = read('research-sources.html');
  assert.match(sources, /Research (and|&) Sources/i);
  assert.match(sources, /history|historical|radio|film|media/i);
  assert.match(sources, /correction|contact|editorial/i);

  const hubPages = [
    'about.html',
    'editorial-policy.html',
    'history.html',
    'site-map.html',
    'tutorials.html',
  ];

  for (const page of hubPages) {
    assert.match(read(page), /href="research-sources\.html"/, `${page} should link to the public research and sources page`);
  }

  const tutorialPages = [
    'tutorials/what-is-morse-code.html',
    'tutorials/how-the-telegraph-changed-communication.html',
  ];

  for (const page of tutorialPages) {
    assert.match(read(page), /href="\.\.\/research-sources\.html"/, `${page} should link to the public research and sources page`);
  }
});

test('sitemap includes research sources and current review-facing lastmod values', () => {
  const sitemap = read('sitemap.xml');

  assert.match(sitemap, /https:\/\/www\.mmccode\.com\/research-sources\.html/);
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.mmccode\.com\/tutorials\.html<\/loc>\s*<lastmod>2026-07-21<\/lastmod>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.mmccode\.com\/history\.html<\/loc>\s*<lastmod>2026-07-21<\/lastmod>/,
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/www\.mmccode\.com\/research-sources\.html<\/loc>\s*<lastmod>2026-07-20<\/lastmod>/,
  );
});
