import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', '..', 'data');
const dbPath = path.join(dataDir, 'morse.db');

function ensureDb() {
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      display_name TEXT,
      password_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS progress (
      user_id TEXT PRIMARY KEY,
      payload TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS leaderboard (
      user_id TEXT PRIMARY KEY,
      total_points INTEGER NOT NULL DEFAULT 0,
      total_sessions INTEGER NOT NULL DEFAULT 0,
      best_single_score INTEGER NOT NULL DEFAULT 0,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS score_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      level_id TEXT NOT NULL,
      mode_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      total INTEGER NOT NULL,
      streak INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      points INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
  const columns = db.prepare(`PRAGMA table_info(users)`).all();
  const hasDisplayName = columns.some((column) => column.name === 'display_name');
  if (!hasDisplayName) {
    db.exec(`ALTER TABLE users ADD COLUMN display_name TEXT`);
  }
  return db;
}

function serializeProgress(progress) {
  return JSON.stringify(progress || null);
}

function deserializeProgress(payload) {
  return payload ? JSON.parse(payload) : null;
}

function normalizeDisplayName(displayName, email) {
  const cleaned = String(displayName || '').trim().slice(0, 32);
  if (cleaned) return cleaned;
  return String(email || '').split('@')[0].slice(0, 32) || 'Morse User';
}

export async function createUser(email, passwordHash, displayName = '') {
  const db = ensureDb();
  const user = {
    id: crypto.randomUUID(),
    email,
    displayName: normalizeDisplayName(displayName, email),
    passwordHash,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  db.prepare(`INSERT INTO users (id, email, display_name, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(user.id, user.email, user.displayName, user.passwordHash, user.createdAt, user.updatedAt);
  return user;
}

export async function findUserByEmail(email) {
  const db = ensureDb();
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) || null;
}

export async function findUserById(id) {
  const db = ensureDb();
  return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id) || null;
}

export async function updateUserPassword(userId, passwordHash) {
  const db = ensureDb();
  const updatedAt = Date.now();
  db.prepare(`UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?`).run(passwordHash, updatedAt, userId);
  return findUserById(userId);
}

export async function updateUserDisplayName(userId, displayName) {
  const db = ensureDb();
  const user = await findUserById(userId);
  if (!user) return null;
  const updatedAt = Date.now();
  const normalized = normalizeDisplayName(displayName, user.email);
  db.prepare(`UPDATE users SET display_name = ?, updated_at = ? WHERE id = ?`).run(normalized, updatedAt, userId);
  return findUserById(userId);
}

export async function getProgress(userId) {
  const db = ensureDb();
  const row = db.prepare(`SELECT payload FROM progress WHERE user_id = ?`).get(userId);
  return row ? deserializeProgress(row.payload) : null;
}

export async function setProgress(userId, progress) {
  const db = ensureDb();
  if (progress === null) {
    db.prepare(`DELETE FROM progress WHERE user_id = ?`).run(userId);
  } else {
    db.prepare(`INSERT INTO progress (user_id, payload, updated_at) VALUES (?, ?, ?)\n      ON CONFLICT(user_id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at`)
      .run(userId, serializeProgress(progress), Date.now());
  }
  return progress;
}

export function calculateLeaderboardPoints({ levelId, modeId, score, total, streak }) {
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

export async function submitLeaderboardScore(userId, session) {
  const db = ensureDb();
  const createdAt = Date.now();
  const result = calculateLeaderboardPoints(session);
  if (!result.counted) {
    return { ...result, totalPoints: null, totalSessions: null, rank: null };
  }

  db.prepare(`
    INSERT INTO score_logs (id, user_id, level_id, mode_id, score, total, streak, accuracy, points, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
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
  );

  const existing = db.prepare(`SELECT total_points, total_sessions, best_single_score FROM leaderboard WHERE user_id = ?`).get(userId);
  const totalPoints = (existing?.total_points || 0) + result.points;
  const totalSessions = (existing?.total_sessions || 0) + 1;
  const bestSingleScore = Math.max(existing?.best_single_score || 0, result.points);

  db.prepare(`
    INSERT INTO leaderboard (user_id, total_points, total_sessions, best_single_score, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      total_points = excluded.total_points,
      total_sessions = excluded.total_sessions,
      best_single_score = excluded.best_single_score,
      updated_at = excluded.updated_at
  `).run(userId, totalPoints, totalSessions, bestSingleScore, createdAt);

  const rank = db.prepare(`
    SELECT COUNT(*) + 1 AS rank
    FROM leaderboard
    WHERE total_points > ?
  `).get(totalPoints)?.rank || 1;

  return { ...result, totalPoints, totalSessions, bestSingleScore, rank };
}

export async function getLeaderboard(limit = 20) {
  const db = ensureDb();
  const safeLimit = Math.max(1, Math.min(Number(limit) || 20, 100));
  return db.prepare(`
    SELECT l.user_id, u.email, u.display_name, l.total_points, l.total_sessions, l.best_single_score, l.updated_at
    FROM leaderboard l
    JOIN users u ON u.id = l.user_id
    ORDER BY l.total_points DESC, l.updated_at ASC
    LIMIT ?
  `).all(safeLimit).map((row, index) => ({
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

export async function getLeaderboardProfile(userId) {
  const db = ensureDb();
  const row = db.prepare(`
    SELECT l.user_id, u.email, u.display_name, l.total_points, l.total_sessions, l.best_single_score, l.updated_at
    FROM leaderboard l
    JOIN users u ON u.id = l.user_id
    WHERE l.user_id = ?
  `).get(userId);

  if (!row) return null;

  const rank = db.prepare(`
    SELECT COUNT(*) + 1 AS rank
    FROM leaderboard
    WHERE total_points > ?
  `).get(row.total_points)?.rank || 1;

  return {
    rank,
    userId: row.user_id,
    email: row.email,
    displayName: row.display_name || String(row.email || '').split('@')[0] || 'Morse User',
    totalPoints: row.total_points,
    totalSessions: row.total_sessions,
    bestSingleScore: row.best_single_score,
    updatedAt: row.updated_at,
  };
}

export async function getRecentScoreLogs(userId, limit = 10) {
  const db = ensureDb();
  const safeLimit = Math.max(1, Math.min(Number(limit) || 10, 50));
  return db.prepare(`
    SELECT level_id, mode_id, score, total, streak, accuracy, points, created_at
    FROM score_logs
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT ?
  `).all(userId, safeLimit).map((row) => ({
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
