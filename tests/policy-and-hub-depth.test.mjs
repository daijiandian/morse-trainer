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

test('policy and navigation hub pages carry enough standalone value for trust review', () => {
  const cases = [
    {
      file: 'terms.html',
      minWords: 700,
      requiredHeadings: [
        'What happens when a score or account is reviewed',
        'What users should do before escalating a dispute',
      ],
    },
    {
      file: 'privacy.html',
      minWords: 760,
      requiredHeadings: [
        'What can be visible on the leaderboard and what stays private',
        'How deletion requests interact with backups and logs',
      ],
    },
    {
      file: 'editorial-policy.html',
      minWords: 760,
      requiredHeadings: [
        'How pages are retired, merged, or rewritten',
        'How examples are chosen without padding content',
      ],
    },
    {
      file: 'site-map.html',
      minWords: 700,
      requiredHeadings: [
        'Routes for first-time learners, returning users, and site reviewers',
        'If a page looks thin or outdated, where to go next',
      ],
    },
    {
      file: 'practice-guides.html',
      minWords: 730,
      requiredHeadings: [
        'How to pick one guide instead of opening everything',
        'When to stop reading and start sending or copying',
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
