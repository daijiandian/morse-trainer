import { createHmac, randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto';

const TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || 'morse-trainer-dev-secret';
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const PASSWORD_ITERATIONS = 100000;
const PASSWORD_KEYLEN = 32;
const PASSWORD_DIGEST = 'sha256';

function base64UrlEncode(input) {
  return Buffer.from(input).toString('base64url');
}

function base64UrlDecode(input) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function sign(data) {
  return createHmac('sha256', TOKEN_SECRET).update(data).digest('base64url');
}

export function hashPassword(password) {
  const salt = randomBytes(16).toString('base64url');
  const hash = pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_KEYLEN, PASSWORD_DIGEST).toString('base64url');
  return `pbkdf2$${PASSWORD_ITERATIONS}$${salt}$${hash}`;
}

export function verifyPassword(password, hash) {
  if (!hash) return false;

  if (hash.startsWith('pbkdf2$')) {
    const [, iterationsStr, salt, storedHash] = hash.split('$');
    const iterations = Number(iterationsStr);
    if (!iterations || !salt || !storedHash) return false;
    const derived = pbkdf2Sync(password, salt, iterations, PASSWORD_KEYLEN, PASSWORD_DIGEST).toString('base64url');
    return timingSafeEqual(Buffer.from(derived), Buffer.from(storedHash));
  }

  // Legacy fallback for old records.
  return hashPasswordLegacy(password) === hash;
}

function hashPasswordLegacy(password) {
  return createHmac('sha256', 'legacy-morse-password').update(password).digest('hex');
}

export function createToken(userId) {
  const payload = {
    sub: userId,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(body);
  return `${body}.${signature}`;
}

export function verifyToken(token) {
  try {
    const [body, signature] = token.split('.');
    if (!body || !signature) return null;
    const expected = sign(body);
    if (expected.length !== signature.length) return null;
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
    const payload = JSON.parse(base64UrlDecode(body));
    if (!payload?.sub || !payload?.exp || Date.now() > payload.exp) return null;
    return payload.sub;
  } catch {
    return null;
  }
}

export function makePasswordHash(password) {
  return hashPassword(password);
}
