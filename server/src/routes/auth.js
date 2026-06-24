import { parseBody, jsonResponse } from '../utils/http.js';
import { createToken, hashPassword, verifyPassword, verifyToken } from '../utils/auth.js';
import { createUser, findUserByEmail, findUserById, updateUserDisplayName, updateUserPassword } from '../utils/store.js';

function getToken(req) {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');
  return token || null;
}

function serializeUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name || user.displayName || String(user.email || '').split('@')[0] || 'Morse User',
    updatedAt: user.updated_at || user.updatedAt,
  };
}

export async function authRouter(req, res, pathname) {
  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const token = getToken(req);
    if (!token) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const userId = verifyToken(token);
    if (!userId) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const user = await findUserById(userId);
    if (!user) return jsonResponse(res, 404, { error: 'User not found' });
    return jsonResponse(res, 200, { user: serializeUser(user) });
  }

  if (pathname === '/api/auth/change-password' && req.method === 'POST') {
    const token = getToken(req);
    if (!token) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const userId = verifyToken(token);
    if (!userId) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const body = await parseBody(req);
    const { oldPassword, newPassword } = body;
    if (!oldPassword || !newPassword) {
      return jsonResponse(res, 400, { error: 'Old password and new password are required' });
    }
    const user = await findUserById(userId);
    if (!user || !verifyPassword(oldPassword, user.password_hash || user.passwordHash)) {
      return jsonResponse(res, 401, { error: 'Old password is incorrect' });
    }
    await updateUserPassword(userId, hashPassword(newPassword));
    return jsonResponse(res, 200, { ok: true });
  }

  if (pathname === '/api/auth/display-name' && req.method === 'POST') {
    const token = getToken(req);
    if (!token) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const userId = verifyToken(token);
    if (!userId) return jsonResponse(res, 401, { error: 'Unauthorized' });
    const body = await parseBody(req);
    if (!body.displayName) return jsonResponse(res, 400, { error: 'Display name is required' });
    const user = await updateUserDisplayName(userId, body.displayName);
    if (!user) return jsonResponse(res, 404, { error: 'User not found' });
    return jsonResponse(res, 200, { user: serializeUser(user) });
  }

  if (req.method !== 'POST') {
    return jsonResponse(res, 405, { error: 'Method not allowed' });
  }

  const body = await parseBody(req);

  if (pathname === '/api/auth/register') {
    const { email, password, displayName } = body;
    if (!email || !password) return jsonResponse(res, 400, { error: 'Email and password are required' });
    if (await findUserByEmail(email)) return jsonResponse(res, 409, { error: 'User already exists' });
    const user = await createUser(email, hashPassword(password), displayName);
    const token = createToken(user.id);
    return jsonResponse(res, 200, { token, user: serializeUser(user) });
  }

  if (pathname === '/api/auth/login') {
    const { email, password } = body;
    if (!email || !password) return jsonResponse(res, 400, { error: 'Email and password are required' });
    const user = await findUserByEmail(email);
    if (!user || !verifyPassword(password, user.password_hash || user.passwordHash)) {
      return jsonResponse(res, 401, { error: 'Invalid credentials' });
    }
    const token = createToken(user.id);
    return jsonResponse(res, 200, { token, user: serializeUser(user) });
  }

  return jsonResponse(res, 404, { error: 'Not found' });
}
