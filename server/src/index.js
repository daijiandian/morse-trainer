import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'url';
import { authRouter } from './routes/auth.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { progressRouter } from './routes/progress.js';
import { jsonResponse, notFound } from './utils/http.js';

const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..', '..');

const STATIC_FILES = new Map([
  ['/', 'index.html'],
  ['/index.html', 'index.html'],
]);

const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function sendStatic(res, filePath) {
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(rootDir)) {
    return notFound(res);
  }

  if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
    return notFound(res);
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  res.statusCode = 200;
  res.setHeader('Content-Type', CONTENT_TYPES[ext] || 'application/octet-stream');
  fs.createReadStream(resolvedPath).pipe(res);
}

function resolveStaticPath(pathname) {
  const direct = STATIC_FILES.get(pathname);
  if (direct) return path.join(rootDir, direct);

  if (pathname?.startsWith('/css/') || pathname?.startsWith('/js/')) {
    return path.join(rootDir, pathname.replace(/^\//, ''));
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  const { pathname } = parse(req.url || '/', true);

  try {
    if (req.method === 'OPTIONS') {
      return jsonResponse(res, 204, {});
    }

    if (pathname?.startsWith('/api/auth')) {
      return await authRouter(req, res, pathname);
    }

    if (pathname?.startsWith('/api/progress')) {
      return await progressRouter(req, res, pathname);
    }

    if (pathname?.startsWith('/api/leaderboard')) {
      return await leaderboardRouter(req, res, pathname);
    }

    if (pathname === '/health') {
      return jsonResponse(res, 200, { ok: true });
    }

    const staticPath = resolveStaticPath(pathname);
    if (staticPath) {
      return sendStatic(res, staticPath);
    }

    return notFound(res);
  } catch (error) {
    return jsonResponse(res, 500, { error: error?.message || 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Morse trainer server running on http://localhost:${PORT}`);
});
