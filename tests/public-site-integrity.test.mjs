import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const rootPath = fileURLToPath(root);

function listHtmlFiles(dirUrl, files = []) {
  for (const entry of fs.readdirSync(dirUrl, { withFileTypes: true })) {
    if (entry.name === 'tests' || entry.name === 'docs' || entry.name === 'node_modules') {
      continue;
    }

    const nextUrl = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, dirUrl);
    if (entry.isDirectory()) {
      listHtmlFiles(nextUrl, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(nextUrl);
    }
  }

  return files;
}

const htmlFiles = listHtmlFiles(root);

function read(url) {
  return fs.readFileSync(url, 'utf8');
}

test('public html pages keep core trust and indexing signals', () => {
  for (const fileUrl of htmlFiles) {
    const rel = path.relative(rootPath, fileURLToPath(fileUrl)).replace(/\\/g, '/');
    const html = read(fileUrl);

    assert.match(html, /<title>[^<]+<\/title>/i, `${rel} is missing a title`);
    assert.match(html, /<meta name="description"/i, `${rel} is missing a meta description`);
    assert.match(html, /<h1[\s>]/i, `${rel} is missing an h1`);
    assert.match(html, /rel="canonical"/i, `${rel} is missing a canonical link`);
    assert.match(html, /meta name="google-adsense-account"/i, `${rel} is missing the AdSense account meta tag`);
    assert.match(html, /dateModified|Last updated:/i, `${rel} is missing a visible update signal`);
  }
});

test('public html pages do not contain broken internal href targets', () => {
  for (const fileUrl of htmlFiles) {
    const rel = path.relative(rootPath, fileURLToPath(fileUrl)).replace(/\\/g, '/');
    const html = read(fileUrl);
    const hrefMatches = [...html.matchAll(/href="([^"]+)"/g)];

    for (const [, href] of hrefMatches) {
      if (/^(https?:|mailto:|#)/i.test(href)) {
        continue;
      }

      const target = href.split('#')[0];
      const resolved = new URL(target, fileUrl);
      assert.ok(fs.existsSync(resolved), `${rel} links to a missing target: ${href}`);
    }
  }
});
