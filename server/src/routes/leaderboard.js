import { parseBody, jsonResponse } from '../utils/http.js';
import { verifyToken } from '../utils/auth.js';
import { getLeaderboard, getLeaderboardProfile, getRecentScoreLogs, submitLeaderboardScore } from '../utils/store.js';

function getToken(req) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  return token || null;
}

export async function leaderboardRouter(req, res, pathname) {
  if (req.method === 'GET' && pathname === '/api/leaderboard') {
    const url = new URL(req.url || '/api/leaderboard', 'http://localhost');
    const limit = Number(url.searchParams.get('limit') || 20);
    const leaderboard = await getLeaderboard(limit);
    return jsonResponse(res, 200, { leaderboard });
  }

  const token = getToken(req);
  const userId = token ? verifyToken(token) : null;

  if (req.method === 'GET' && pathname === '/api/leaderboard/me') {
    if (!userId) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const profile = await getLeaderboardProfile(userId);
    return jsonResponse(res, 200, { profile });
  }

  if (req.method === 'GET' && pathname === '/api/leaderboard/history') {
    if (!userId) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const url = new URL(req.url || '/api/leaderboard/history', 'http://localhost');
    const limit = Number(url.searchParams.get('limit') || 10);
    const history = await getRecentScoreLogs(userId, limit);
    return jsonResponse(res, 200, { history });
  }

  if (req.method === 'POST' && pathname === '/api/leaderboard/submit') {
    if (!userId) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const body = await parseBody(req);
    const session = body.session || {};
    if (!session.levelId || !session.modeId) {
      return jsonResponse(res, 400, { error: 'Missing session data' });
    }
    const result = await submitLeaderboardScore(userId, session);
    return jsonResponse(res, 200, result);
  }

  return jsonResponse(res, 404, { error: 'Not found' });
}
