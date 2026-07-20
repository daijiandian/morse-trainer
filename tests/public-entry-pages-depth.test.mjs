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

test('major public entry pages provide deeper standalone value for reviewers and new visitors', () => {
  const cases = [
    {
      file: 'start-here.html',
      minWords: 700,
      requiredHeadings: [
        'What a successful first session looks like',
        'When to create an account and when not to bother yet',
      ],
    },
    {
      file: 'how-it-works.html',
      minWords: 700,
      requiredHeadings: [
        'Why the site separates practice from explanation',
        'How public pages support trust and review',
      ],
    },
    {
      file: 'learning-roadmap.html',
      minWords: 700,
      requiredHeadings: [
        'How long each stage may feel',
        'What to do when your roadmap breaks',
      ],
    },
    {
      file: 'history.html',
      minWords: 700,
      requiredHeadings: [
        'Why historical context improves modern practice',
        'How to use history pages without leaving the learning path',
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

test('public entry pages avoid visible mojibake in maintenance copy', () => {
  const files = ['start-here.html', 'how-it-works.html', 'learning-roadmap.html', 'history.html'];

  for (const file of files) {
    const html = read(file);
    assert.doesNotMatch(html, /July 18, 2026\s*[路Â]/);
    assert.doesNotMatch(html, /Â·/);
  }
});
