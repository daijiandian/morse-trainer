const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const PASSWORD_ITERATIONS = 100000;
const PASSWORD_KEYLEN = 32;

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    try {
      if (request.method === 'GET' && pathname === '/health') {
        return jsonResponse(200, { ok: true });
      }

      if (pathname.startsWith('/api/auth')) {
        return await handleAuth(request, env, pathname);
      }

      if (pathname.startsWith('/api/progress')) {
        return await handleProgress(request, env, pathname);
      }

      if (pathname.startsWith('/api/leaderboard')) {
        return await handleLeaderboard(request, env, pathname);
      }

      return jsonResponse(404, { error: 'Not found' });
    } catch (error) {
      return jsonResponse(500, { error: error?.message || 'Internal server error' });
    }
  },
};

function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(),
    },
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

async function parseBody(request) {
  const text = await request.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Invalid JSON');
  }
}

function getToken(request) {
  const header = request.headers.get('authorization') || '';
  const [, token] = header.split(' ');
  return token || null;
}

function normalizeDisplayName(displayName, email) {
  const cleaned = String(displayName || '').trim().slice(0, 32);
  if (cleaned) return cleaned;
  return String(email || '').split('@')[0].slice(0, 32) || 'Morse User';
}

function serializeUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name || user.displayName || String(user.email || '').split('@')[0] || 'Morse User',
    updatedAt: user.updated_at || user.updatedAt,
  };
}

async function handleAuth(request, env, pathname) {
  if (pathname === '/api/auth/me' && request.method === 'GET') {
    const userId = await requireUserId(request, env);
    if (!userId) return jsonResponse(401, { error: 'Unauthorized' });
    const user = await findUserById(env, userId);
    if (!user) return jsonResponse(404, { error: 'User not found' });
    return jsonResponse(200, { user: serializeUser(user) });
  }

  if (pathname === '/api/auth/change-password' && request.method === 'POST') {
    const userId = await requireUserId(request, env);
    if (!userId) return jsonResponse(401, { error: 'Unauthorized' });
    const body = await parseBody(request);
    const { oldPassword, newPassword } = body;
    if (!oldPassword || !newPassword) {
      return jsonResponse(400, { error: 'Old password and new password are required' });
    }
    const user = await findUserById(env, userId);
    if (!user || !(await verifyPassword(oldPassword, user.password_hash || user.passwordHash))) {
      return jsonResponse(401, { error: 'Old password is incorrect' });
    }
    await updateUserPassword(env, userId, await hashPassword(newPassword));
    return jsonResponse(200, { ok: true });
  }

  if (pathname === '/api/auth/display-name' && request.method === 'POST') {
    const userId = await requireUserId(request, env);
    if (!userId) return jsonResponse(401, { error: 'Unauthorized' });
    const body = await parseBody(request);
    if (!body.displayName) return jsonResponse(400, { error: 'Display name is required' });
    const user = await updateUserDisplayName(env, userId, body.displayName);
    if (!user) return jsonResponse(404, { error: 'User not found' });
    return jsonResponse(200, { user: serializeUser(user) });
  }

  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  const body = await parseBody(request);

  if (pathname === '/api/auth/register') {
    const { email, password, displayName } = body;
    if (!email || !password) return jsonResponse(400, { error: 'Email and password are required' });
    if (await findUserByEmail(env, email)) return jsonResponse(409, { error: 'User already exists' });
    const user = await createUser(env, email, await hashPassword(password), displayName);
    const token = await createToken(env, user.id);
    return jsonResponse(200, { token, user: serializeUser(user) });
  }

  if (pathname === '/api/auth/login') {
    const { email, password } = body;
    if (!email || !password) return jsonResponse(400, { error: 'Email and password are required' });
    const user = await findUserByEmail(env, email);
    if (!user || !(await verifyPassword(password, user.password_hash || user.passwordHash))) {
      return jsonResponse(401, { error: 'Invalid credentials' });
    }
    const token = await createToken(env, user.id);
    return jsonResponse(200, { token, user: serializeUser(user) });
  }

  return jsonResponse(404, { error: 'Not found' });
}

async function handleProgress(request, env, pathname) {
  const userId = await requireUserId(request, env);
  if (!userId) return jsonResponse(401, { error: 'Unauthorized' });

  if (request.method === 'GET' && pathname === '/api/progress') {
    return jsonResponse(200, { progress: await getProgress(env, userId) });
  }

  if (request.method === 'POST' && (pathname === '/api/progress/sync' || pathname === '/api/progress/reset' || pathname === '/api/progress/clear-cloud')) {
    if (pathname !== '/api/progress/sync') {
      await setProgress(env, userId, null);
      return jsonResponse(200, { ok: true });
    }

    const body = await parseBody(request);
    const current = (await getProgress(env, userId)) || {};
    const merged = mergeProgress(current, body.progress || {});
    await setProgress(env, userId, merged);
    return jsonResponse(200, { progress: merged });
  }

  return jsonResponse(404, { error: 'Not found' });
}

async function handleLeaderboard(request, env, pathname) {
  if (request.method === 'GET' && pathname === '/api/leaderboard') {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') || 20);
    const leaderboard = await getLeaderboard(env, limit);
    return jsonResponse(200, { leaderboard });
  }

  const userId = await requireUserId(request, env);

  if (request.method === 'GET' && pathname === '/api/leaderboard/me') {
    if (!userId) return jsonResponse(401, { error: 'Unauthorized' });
    const profile = await getLeaderboardProfile(env, userId);
    return jsonResponse(200, { profile });
  }

  if (request.method === 'GET' && pathname === '/api/leaderboard/history') {
    if (!userId) return jsonResponse(401, { error: 'Unauthorized' });
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') || 10);
    const history = await getRecentScoreLogs(env, userId, limit);
    return jsonResponse(200, { history });
  }

  if (request.method === 'POST' && pathname === '/api/leaderboard/submit') {
    if (!userId) return jsonResponse(401, { error: 'Unauthorized' });
    const body = await parseBody(request);
    const session = body.session || {};
    if (!session.levelId || !session.modeId) {
      return jsonResponse(400, { error: 'Missing session data' });
    }
    const result = await submitLeaderboardScore(env, userId, session);
    return jsonResponse(200, result);
  }

  return jsonResponse(404, { error: 'Not found' });
}

async function requireUserId(request, env) {
  const token = getToken(request);
  if (!token) return null;
  return verifyToken(env, token);
}

async function createUser(env, email, passwordHash, displayName = '') {
  const user = {
    id: crypto.randomUUID(),
    email,
    displayName: normalizeDisplayName(displayName, email),
    passwordHash,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await env.DB.prepare(
    'INSERT INTO users (id, email, display_name, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(user.id, user.email, user.displayName, user.passwordHash, user.createdAt, user.updatedAt).run();
  return user;
}

async function findUserByEmail(env, email) {
  return await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
}

async function findUserById(env, id) {
  return await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
}

async function updateUserPassword(env, userId, passwordHash) {
  const updatedAt = Date.now();
  await env.DB.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?')
    .bind(passwordHash, updatedAt, userId)
    .run();
  return findUserById(env, userId);
}

async function updateUserDisplayName(env, userId, displayName) {
  const user = await findUserById(env, userId);
  if (!user) return null;
  const updatedAt = Date.now();
  const normalized = normalizeDisplayName(displayName, user.email);
  await env.DB.prepare('UPDATE users SET display_name = ?, updated_at = ? WHERE id = ?')
    .bind(normalized, updatedAt, userId)
    .run();
  return findUserById(env, userId);
}

async function getProgress(env, userId) {
  const row = await env.DB.prepare('SELECT payload FROM progress WHERE user_id = ?').bind(userId).first();
  return row?.payload ? JSON.parse(row.payload) : null;
}

async function setProgress(env, userId, progress) {
  if (progress === null) {
    await env.DB.prepare('DELETE FROM progress WHERE user_id = ?').bind(userId).run();
    return null;
  }

  await env.DB.prepare(
    'INSERT INTO progress (user_id, payload, updated_at) VALUES (?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at'
  ).bind(userId, JSON.stringify(progress || null), Date.now()).run();
  return progress;
}

function calculateLeaderboardPoints({ levelId, modeId, score, total, streak }) {
  const numericScore = Number(score) || 0;
  const numericTotal = Number(total) || 0;
  const numericStreak = Number(streak) || 0;
  if (numericTotal < 5 || numericScore <= 0) {
    return { points: 0, accuracy: 0, counted: false };
  }

  const levelWeights = {
    beginner: 1,
    elementary: 2,
    intermediate: 3,
    advanced: 4,
    expert: 5,
    master: 6,
  };

  const modeWeights = {
    flashcard: 0.6,
    'multiple-choice': 1,
    typing: 1.2,
    word: 1.4,
    sentence: 1.8,
    endurance: 2,
  };

  const accuracy = Math.round((numericScore / numericTotal) * 100);
  const basePoints = numericScore * (levelWeights[levelId] || 1) * (modeWeights[modeId] || 1);
  const accuracyBonus = accuracy >= 90 ? 1.3 : accuracy >= 80 ? 1.15 : accuracy >= 60 ? 1 : 0.75;
  const streakBonus = Math.min(numericStreak, 20) * 0.2;
  const rawPoints = basePoints * accuracyBonus + streakBonus;
  const points = Math.min(500, Math.max(0, Math.round(rawPoints)));

  return { points, accuracy, counted: points > 0 };
}

async function submitLeaderboardScore(env, userId, session) {
  const createdAt = Date.now();
  const result = calculateLeaderboardPoints(session);
  if (!result.counted) {
    return { ...result, totalPoints: null, totalSessions: null, rank: null };
  }

  await env.DB.prepare(
    'INSERT INTO score_logs (id, user_id, level_id, mode_id, score, total, streak, accuracy, points, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    crypto.randomUUID(),
    userId,
    session.levelId,
    session.modeId,
    Number(session.score) || 0,
    Number(session.total) || 0,
    Number(session.streak) || 0,
    result.accuracy,
    result.points,
    createdAt
  ).run();

  const existing = await env.DB.prepare(
    'SELECT total_points, total_sessions, best_single_score FROM leaderboard WHERE user_id = ?'
  ).bind(userId).first();
  const totalPoints = (existing?.total_points || 0) + result.points;
  const totalSessions = (existing?.total_sessions || 0) + 1;
  const bestSingleScore = Math.max(existing?.best_single_score || 0, result.points);

  await env.DB.prepare(
    'INSERT INTO leaderboard (user_id, total_points, total_sessions, best_single_score, updated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET total_points = excluded.total_points, total_sessions = excluded.total_sessions, best_single_score = excluded.best_single_score, updated_at = excluded.updated_at'
  ).bind(userId, totalPoints, totalSessions, bestSingleScore, createdAt).run();

  const rankRow = await env.DB.prepare(
    'SELECT COUNT(*) + 1 AS rank FROM leaderboard WHERE total_points > ?'
  ).bind(totalPoints).first();

  return {
    ...result,
    totalPoints,
    totalSessions,
    bestSingleScore,
    rank: rankRow?.rank || 1,
  };
}

async function getLeaderboard(env, limit = 20) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 20, 100));
  const rows = await env.DB.prepare(
    'SELECT l.user_id, u.email, u.display_name, l.total_points, l.total_sessions, l.best_single_score, l.updated_at FROM leaderboard l JOIN users u ON u.id = l.user_id ORDER BY l.total_points DESC, l.updated_at ASC LIMIT ?'
  ).bind(safeLimit).all();
  return (rows.results || []).map((row, index) => ({
    rank: index + 1,
    userId: row.user_id,
    email: row.email,
    displayName: row.display_name || String(row.email || '').split('@')[0] || 'Morse User',
    totalPoints: row.total_points,
    totalSessions: row.total_sessions,
    bestSingleScore: row.best_single_score,
    updatedAt: row.updated_at,
  }));
}

async function getLeaderboardProfile(env, userId) {
  const row = await env.DB.prepare(
    'SELECT l.user_id, u.email, u.display_name, l.total_points, l.total_sessions, l.best_single_score, l.updated_at FROM leaderboard l JOIN users u ON u.id = l.user_id WHERE l.user_id = ?'
  ).bind(userId).first();
  if (!row) return null;

  const rankRow = await env.DB.prepare(
    'SELECT COUNT(*) + 1 AS rank FROM leaderboard WHERE total_points > ?'
  ).bind(row.total_points).first();

  return {
    rank: rankRow?.rank || 1,
    userId: row.user_id,
    email: row.email,
    displayName: row.display_name || String(row.email || '').split('@')[0] || 'Morse User',
    totalPoints: row.total_points,
    totalSessions: row.total_sessions,
    bestSingleScore: row.best_single_score,
    updatedAt: row.updated_at,
  };
}

async function getRecentScoreLogs(env, userId, limit = 10) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 10, 50));
  const rows = await env.DB.prepare(
    'SELECT level_id, mode_id, score, total, streak, accuracy, points, created_at FROM score_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT ?'
  ).bind(userId, safeLimit).all();
  return (rows.results || []).map((row) => ({
    levelId: row.level_id,
    modeId: row.mode_id,
    score: row.score,
    total: row.total,
    streak: row.streak,
    accuracy: row.accuracy,
    points: row.points,
    createdAt: row.created_at,
  }));
}

function mergeProgress(current = {}, incoming = {}) {
  const currentTime = current.updatedAt || 0;
  const incomingTime = incoming.updatedAt || 0;

  return {
    ...(incomingTime >= currentTime ? current : incoming),
    ...(incomingTime >= currentTime ? incoming : current),
    unlockedLevels: uniq([...(current.unlockedLevels || []), ...(incoming.unlockedLevels || [])]),
    completedSteps: uniq([...(current.completedSteps || []), ...(incoming.completedSteps || [])]),
    levelStats: mergeLevelStats(current.levelStats || {}, incoming.levelStats || {}),
    bestStreak: Math.max(current.bestStreak || 0, incoming.bestStreak || 0),
    updatedAt: Math.max(currentTime, incomingTime, Date.now()),
  };
}

function uniq(list) {
  return [...new Set(list)];
}

function mergeLevelStats(a, b) {
  const out = { ...a };
  for (const [levelId, stat] of Object.entries(b)) {
    if (!out[levelId]) {
      out[levelId] = stat;
      continue;
    }

    const prev = out[levelId];
    out[levelId] = {
      ...prev,
      ...stat,
      modeStats: mergeModeStats(prev.modeStats || {}, stat.modeStats || {}),
      bestAccuracy: Math.max(prev.bestAccuracy || 0, stat.bestAccuracy || 0),
    };
  }
  return out;
}

function mergeModeStats(a, b) {
  const out = { ...a };
  for (const [modeId, stat] of Object.entries(b)) {
    if (!out[modeId]) {
      out[modeId] = stat;
      continue;
    }

    const prev = out[modeId];
    out[modeId] = {
      ...prev,
      ...stat,
      bestAccuracy: Math.max(prev.bestAccuracy || 0, stat.bestAccuracy || 0),
    };
  }
  return out;
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hashBytes = await derivePbkdf2(password, salt, PASSWORD_ITERATIONS);
  return `pbkdf2$${PASSWORD_ITERATIONS}$${base64UrlEncode(salt)}$${base64UrlEncode(hashBytes)}`;
}

async function verifyPassword(password, hash) {
  if (!hash) return false;

  if (hash.startsWith('pbkdf2$')) {
    const [, iterationsStr, saltB64, storedHashB64] = hash.split('$');
    const iterations = Number(iterationsStr);
    if (!iterations || !saltB64 || !storedHashB64) return false;
    const derived = await derivePbkdf2(password, base64UrlDecodeToBytes(saltB64), iterations);
    return timingSafeEqual(derived, base64UrlDecodeToBytes(storedHashB64));
  }

  const legacy = await sha256Hex(`legacy-morse-password${password}`);
  return legacy === hash;
}

async function derivePbkdf2(password, saltBytes, iterations) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: saltBytes,
      iterations,
    },
    key,
    PASSWORD_KEYLEN * 8
  );
  return new Uint8Array(bits);
}

async function sha256Hex(text) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function createToken(env, userId) {
  const payload = {
    sub: userId,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const body = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await sign(env.AUTH_TOKEN_SECRET, body);
  return `${body}.${signature}`;
}

async function verifyToken(env, token) {
  try {
    const [body, signature] = token.split('.');
    if (!body || !signature) return null;
    const expected = await sign(env.AUTH_TOKEN_SECRET, body);
    if (!timingSafeEqual(base64UrlDecodeToBytes(expected), base64UrlDecodeToBytes(signature))) return null;
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecodeToBytes(body)));
    if (!payload?.sub || !payload?.exp || Date.now() > payload.exp) return null;
    return payload.sub;
  } catch {
    return null;
  }
}

async function sign(secret, data) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return base64UrlEncode(new Uint8Array(signature));
}

function base64UrlEncode(input) {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecodeToBytes(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(normalized + padding);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) {
    diff |= a[index] ^ b[index];
  }
  return diff === 0;
}
