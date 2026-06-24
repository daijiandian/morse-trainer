import { parseBody, jsonResponse } from '../utils/http.js';
import { verifyToken } from '../utils/auth.js';
import { getProgress, setProgress } from '../utils/store.js';
import { mergeProgress } from '../utils/merge.js';

function getToken(req) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  return token || null;
}

export async function progressRouter(req, res, pathname) {
  const token = getToken(req);
  const userId = token ? verifyToken(token) : null;
  if (!userId) return jsonResponse(res, 401, { error: 'Unauthorized' });

  if (req.method === 'GET' && pathname === '/api/progress') {
    return jsonResponse(res, 200, { progress: await getProgress(userId) });
  }

  if (req.method === 'POST' && pathname === '/api/progress/sync') {
    const body = await parseBody(req);
    const current = (await getProgress(userId)) || {};
    const merged = mergeProgress(current, body.progress || {});
    await setProgress(userId, merged);
    return jsonResponse(res, 200, { progress: merged });
  }

  if (req.method === 'POST' && pathname === '/api/progress/reset') {
    await setProgress(userId, null);
    return jsonResponse(res, 200, { ok: true });
  }

  if (req.method === 'POST' && pathname === '/api/progress/clear-cloud') {
    await setProgress(userId, null);
    return jsonResponse(res, 200, { ok: true });
  }

  return jsonResponse(res, 404, { error: 'Not found' });
}
