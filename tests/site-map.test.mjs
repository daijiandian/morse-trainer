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
