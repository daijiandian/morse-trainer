import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('practice guides hub is published and linked from key public entry points', () => {
  const practiceHub = read('practice-guides.html');
  const homepage = read('index.html');
  const tutorials = read('tutorials.html');
  const i18n = read('js/i18n.js');
  const tutorialData = read('js/tutorial-data.js');
  const siteMap = read('site-map.html');
  const startHere = read('start-here.html');
  const roadmap = read('learning-roadmap.html');
  const sitemapXml = read('sitemap.xml');

  assert.match(practiceHub, /<title>Practice Guides Hub \| Morse Trainer<\/title>/);
  assert.match(practiceHub, /https:\/\/www\.mmccode\.com\/practice-guides\.html/);
  assert.match(homepage, /href="practice-guides\.html"/);
  assert.match(i18n, /homeTutorial5Title/);
  assert.match(i18n, /homeTutorial5Desc/);
  assert.match(tutorials, /href="practice-guides\.html"/);
  assert.match(tutorialData, /practice-guides\.html/);
  assert.match(siteMap, /href="practice-guides\.html"/);
  assert.match(startHere, /href="practice-guides\.html"/);
  assert.match(roadmap, /href="practice-guides\.html"/);
  assert.match(sitemapXml, /https:\/\/www\.mmccode\.com\/practice-guides\.html/);
});

test('practice guides hub contains training sections that group existing tutorials', () => {
  const practiceHub = read('practice-guides.html');

  assert.match(practiceHub, /Foundations before speed/);
  assert.match(practiceHub, /Core training methods/);
  assert.match(practiceHub, /Daily structure and troubleshooting/);
  assert.match(practiceHub, /From drills to real-world use/);
});

test('practice guides hub footer exposes the same public trust pages as other core entry pages', () => {
  const practiceHub = read('practice-guides.html');

  assert.match(practiceHub, /href="privacy\.html"/);
  assert.match(practiceHub, /href="terms\.html"/);
  assert.match(practiceHub, /href="advertising\.html"/);
  assert.match(practiceHub, /href="editorial-policy\.html"/);
  assert.match(practiceHub, /href="faq\.html"/);
});
