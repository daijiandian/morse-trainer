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

test('thin history and myth pages contain deeper sections with stronger standalone value', () => {
  const cases = [
    {
      file: 'tutorials/common-morse-code-myths.html',
      minWords: 700,
      requiredHeadings: [
        'Why these myths keep returning',
        'How to test a Morse claim before you repeat it',
      ],
    },
    {
      file: 'tutorials/why-sos-became-famous.html',
      minWords: 700,
      requiredHeadings: [
        'How SOS became a standard',
        'What SOS did not say by itself',
      ],
    },
    {
      file: 'tutorials/how-the-telegraph-changed-communication.html',
      minWords: 700,
      requiredHeadings: [
        'How the telegraph changed the speed of decisions',
        'Why telegraph discipline shaped Morse operators',
      ],
    },
    {
      file: 'tutorials/emergency-signaling-beyond-sos.html',
      minWords: 700,
      requiredHeadings: [
        'Why clarity matters more than dramatic wording',
        'What modern learners can take from emergency signaling',
      ],
    },
    {
      file: 'tutorials/morse-code-in-aviation-history.html',
      minWords: 720,
      requiredHeadings: [
        'How Morse supported early navigation habits',
        'Why aviation examples still matter to modern learners',
      ],
    },
    {
      file: 'tutorials/why-morse-worked-on-early-radio.html',
      minWords: 720,
      requiredHeadings: [
        'Why weak signals rewarded simple patterns',
        'What early radio teaches modern Morse students',
      ],
    },
    {
      file: 'tutorials/morse-code-in-scouting-and-education.html',
      minWords: 720,
      requiredHeadings: [
        'Why educators kept Morse after its commercial peak',
        'How Morse supports group learning and memory',
      ],
    },
    {
      file: 'tutorials/how-morse-operators-trained-before-computers.html',
      minWords: 720,
      requiredHeadings: [
        'Why instructor feedback mattered so much',
        'What pre-digital training still gets right',
      ],
    },
    {
      file: 'tutorials/visual-morse-and-signal-lamps.html',
      minWords: 720,
      requiredHeadings: [
        'Why visual Morse remained useful beside radio',
        'What signal lamps reveal about the code itself',
      ],
    },
    {
      file: 'tutorials/how-railways-used-morse-code.html',
      minWords: 720,
      requiredHeadings: [
        'Why railway timing made communication critical',
        'How Morse reduced confusion across the network',
      ],
    },
    {
      file: 'tutorials/famous-real-morse-messages.html',
      minWords: 720,
      requiredHeadings: [
        'Why famous messages become larger than the system',
        'How to read Morse history without flattening it',
      ],
    },
    {
      file: 'tutorials/how-morse-was-used-at-sea.html',
      minWords: 720,
      requiredHeadings: [
        'Why routine sea traffic mattered as much as emergencies',
        'What maritime Morse teaches about disciplined sending',
      ],
    },
    {
      file: 'tutorials/morse-code-in-films-and-games.html',
      minWords: 720,
      requiredHeadings: [
        'Why media Morse is memorable but incomplete',
        'How to turn media curiosity into real practice',
      ],
    },
    {
      file: 'tutorials/morse-code-for-ham-radio.html',
      minWords: 740,
      requiredHeadings: [
        'Why operators still value Morse in low-pressure contacts',
        'How to move from trainer confidence to on-air confidence',
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
