import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('glossary page is published and linked from the main public entry points', () => {
  const glossary = read('morse-glossary.html');
  const homepage = read('index.html');
  const siteMap = read('site-map.html');
  const tutorials = read('tutorials.html');
  const tutorialData = read('js/tutorial-data.js');
  const sitemapXml = read('sitemap.xml');

  assert.match(glossary, /<title>Morse Code Glossary \| Morse Trainer<\/title>/);
  assert.match(glossary, /https:\/\/www\.mmccode\.com\/morse-glossary\.html/);
  assert.match(homepage, /href="morse-glossary\.html"/);
  assert.match(siteMap, /href="morse-glossary\.html"/);
  assert.match(tutorials, /href="morse-glossary\.html"/);
  assert.match(tutorialData, /morse-glossary\.html/);
  assert.match(sitemapXml, /https:\/\/www\.mmccode\.com\/morse-glossary\.html/);
});

test('tutorial catalog structured data includes the glossary page', () => {
  const tutorials = read('tutorials.html');
  assert.match(tutorials, /Morse Code Glossary/);
  assert.match(tutorials, /https:\/\/www\.mmccode\.com\/morse-glossary\.html/);
});

test('major onboarding pages link to the glossary page', () => {
  const startHere = read('start-here.html');
  const roadmap = read('learning-roadmap.html');
  const howItWorks = read('how-it-works.html');

  assert.match(startHere, /href="morse-glossary\.html"/);
  assert.match(roadmap, /href="morse-glossary\.html"/);
  assert.match(howItWorks, /href="morse-glossary\.html"/);
});

test('tutorial catalog data keeps glossary titles readable across languages', () => {
  const tutorialData = read('js/tutorial-data.js');

  assert.match(tutorialData, /摩斯密码术语表/);
  assert.match(tutorialData, /Morse Code Glossary/);
  assert.match(tutorialData, /モールス信号用語集/);
  assert.match(tutorialData, /모스 부호 용어집/);
  assert.match(tutorialData, /Glosario del código Morse/);
});

test('glossary page contains practical learning sections', () => {
  const glossary = read('morse-glossary.html');

  assert.match(glossary, /Beginner listening and training terms/);
  assert.match(glossary, /On-air and operating terms/);
  assert.match(glossary, /Equipment and sending terms/);
  assert.match(glossary, /Related next steps/);
});

test('glossary page includes a visible public trust section and independence note', () => {
  const glossary = read('morse-glossary.html');

  assert.match(glossary, /Public site and editorial links/);
  assert.match(glossary, /independently of advertising decisions/i);
  assert.match(glossary, /href="privacy\.html"/);
  assert.match(glossary, /href="editorial-policy\.html"/);
  assert.match(glossary, /href="contact\.html"/);
});
