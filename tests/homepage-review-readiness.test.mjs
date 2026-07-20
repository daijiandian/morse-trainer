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
  assert.match(home, /"dateModified": "2026-07-20"/);
  assert.match(home, /Updated July 20, 2026/);
  assert.match(home, /How to review the site quickly/);
  assert.match(home, /Why this is more than a single drill page/);
  assert.match(home, /Recently updated public resources/);
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
    'homeFreshEyebrow',
    'homeFreshTitle',
    'homeFreshDesc',
    'homeFresh1Title',
    'homeFresh1Desc',
    'homeFresh2Title',
    'homeFresh2Desc',
    'homeFresh3Title',
    'homeFresh3Desc',
    'homeFresh4Title',
    'homeFresh4Desc',
  ];

  for (const key of requiredKeys) {
    const matches = i18n.match(new RegExp(`${key}:`, 'g')) || [];
    assert.equal(matches.length, 5, `Expected ${key} in all 5 language dictionaries, found ${matches.length}`);
  }
});

test('spanish homepage review and freshness copy keeps readable accents', () => {
  const i18n = read('js/i18n.js');

  assert.match(i18n, /homeReviewEyebrow: 'Ruta pública de revisión'/);
  assert.match(i18n, /homeReviewTitle: 'Cómo revisar el sitio rápidamente'/);
  assert.match(i18n, /homeReview3Desc: 'Revisa Ayuda, FAQ, Contacto, Privacidad, Términos, Publicidad, Política editorial y el Mapa del sitio para ver cómo se explican el soporte, el manejo de datos, las divulgaciones y el mantenimiento\.'/);
  assert.match(i18n, /homeFreshTitle: 'Recursos públicos actualizados recientemente'/);
  assert.match(i18n, /homeFreshDesc: 'Estas páginas se actualizaron junto con la información pública de aprendizaje y soporte, para que el sitio se vea como un producto mantenido y no como una demo congelada\.'/);
  assert.match(i18n, /homeFresh1Title: 'Catálogo de tutoriales renovado'/);
  assert.match(i18n, /homeFresh2Title: 'Centro histórico ampliado'/);
  assert.match(i18n, /homeFresh4Title: 'Páginas de confianza siempre públicas'/);
});
