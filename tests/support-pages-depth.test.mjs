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

test('key trust and support pages carry enough standalone value for site review', () => {
  const cases = [
    {
      file: 'about.html',
      minWords: 760,
      requiredHeadings: [
        'What the site is not trying to be',
        'How public content and product features reinforce each other',
      ],
    },
    {
      file: 'help.html',
      minWords: 760,
      requiredHeadings: [
        'When self-service is faster than email',
        'How to tell a product issue from a learning issue',
      ],
    },
    {
      file: 'advertising.html',
      minWords: 760,
      requiredHeadings: [
        'What advertisers cannot influence',
        'Why ad disclosures belong on a learning site',
        'Why ads will never unlock learning features',
        'How ad review differs from technical support',
      ],
    },
    {
      file: 'contact.html',
      minWords: 700,
      requiredHeadings: [
        'When a public page is not enough',
        'What not to send in a first message',
      ],
    },
    {
      file: 'faq.html',
      minWords: 700,
      requiredHeadings: [
        'What question belongs in the FAQ and what belongs in support',
        'Why public answers help site quality',
      ],
    },
    {
      file: 'research-sources.html',
      minWords: 760,
      requiredHeadings: [
        'What counts as a source on this site',
        'How history, media, and culture pages are handled',
        'How corrections and disputes are handled',
      ],
    },
  ];

  for (const page of cases) {
    const html = read(page.file);
    const words = extractWordCount(html);

    assert.ok(words >= page.minWords, `${page.file} is too thin at ${words} words`);
    for (const heading of page.requiredHeadings) {
      assert.match(html, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
  }
});
