const STORAGE_KEY = 'morse-trainer-progress';
const SYNC_KEY = 'morse-trainer-sync';
const SYNC_LOG_KEY = 'morse-trainer-sync-log';
const API_BASE = window.MORSE_API_BASE || window.location.origin;
const progressTr = (key, vars = {}) => window.MORSE_I18N?.t?.(key, vars) || key;

function setSyncMessage(message = '') {
  const el = document.getElementById('sync-message');
  if (el) {
    el.textContent = message;
  }
}

function pushSyncLog(entry) {
  try {
    const logs = JSON.parse(localStorage.getItem(SYNC_LOG_KEY) || '[]');
    logs.unshift({ ...entry, at: Date.now() });
    localStorage.setItem(SYNC_LOG_KEY, JSON.stringify(logs.slice(0, 20)));
  } catch {
    localStorage.setItem(SYNC_LOG_KEY, JSON.stringify([{ ...entry, at: Date.now() }]));
  }
}

function getSyncLogClass(ok) {
  return ok ? 'ok' : 'error';
}

function loadSyncLog() {
  try {
    return JSON.parse(localStorage.getItem(SYNC_LOG_KEY) || '[]');
  } catch {
    return [];
  }
}

function setSyncStateUI(state) {
  const dot = document.getElementById('sync-indicator');
  const text = document.getElementById('sync-text');
  const user = document.getElementById('sync-user');
  const logoutBtn = document.getElementById('btn-logout');
  const lastSync = document.getElementById('sync-last-time');
  const lastSyncWrap = document.getElementById('sync-last-wrap');

  if (!dot || !text || !user) {
    return;
  }

  const loggedIn = !!state?.token;

  dot.classList.toggle('offline', !loggedIn);
  dot.classList.toggle('online', loggedIn);
  text.textContent = loggedIn ? progressTr('syncEnabled') : progressTr('syncLocal');
  user.textContent = loggedIn && state.user
    ? progressTr('syncUserCurrent', { name: state.user.displayName || state.user.email })
    : progressTr('syncUserGuest');

  if (logoutBtn) {
    logoutBtn.classList.toggle('hidden', !loggedIn);
  }

  if (lastSyncWrap && lastSync) {
    const stamp = state?.lastSyncAt ? new Date(state.lastSyncAt).toLocaleString() : '';
    lastSyncWrap.classList.toggle('hidden', !loggedIn || !stamp);
    lastSync.textContent = stamp ? progressTr('syncLast', { time: stamp }) : '';
  }
}

const defaultProgress = () => ({
  totalSessions: 0,
  totalQuestions: 0,
  totalCorrect: 0,
  bestStreak: 0,
  levelStats: {},
  unlockedLevels: ['beginner'],
  lastLevel: 'beginner',
  lastMode: 'flashcard',
  completedSteps: [],
  updatedAt: Date.now()
});

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultProgress();
    }

    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

function saveProgress(progress) {
  progress.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function saveSyncState(state) {
  localStorage.setItem(SYNC_KEY, JSON.stringify(state));
  setSyncStateUI(state);
}

function loadSyncState() {
  try {
    const state = JSON.parse(localStorage.getItem(SYNC_KEY) || '{}');
    setSyncStateUI(state);
    return state;
  } catch {
    return {};
  }
}

function getAuthToken() {
  return loadSyncState().token || '';
}

async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const token = getAuthToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

async function registerUser(email, password) {
  const displayName = document.getElementById('auth-display-name')?.value?.trim() || '';
  const data = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, displayName })
  });

  saveSyncState({ token: data.token, user: data.user, lastSyncAt: Date.now() });
  pushSyncLog({ type: 'register', ok: true, message: progressTr('syncRegisterOk') });

  return data.user;
}

async function loginUser(email, password) {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  saveSyncState({ token: data.token, user: data.user, lastSyncAt: Date.now() });
  pushSyncLog({ type: 'login', ok: true, message: progressTr('syncLoginOk') });

  return data.user;
}

async function getCurrentUser() {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  const data = await apiRequest('/api/auth/me', { method: 'GET' });
  return data.user || null;
}

async function changePassword(oldPassword, newPassword) {
  const data = await apiRequest('/api/auth/change-password', {
    method: 'POST',
    body: JSON.stringify({ oldPassword, newPassword })
  });

  pushSyncLog({ type: 'password', ok: true, message: progressTr('syncPasswordOk') });
  return data.ok;
}

async function updateDisplayName(displayName) {
  const data = await apiRequest('/api/auth/display-name', {
    method: 'POST',
    body: JSON.stringify({ displayName })
  });
  const syncState = loadSyncState();

  saveSyncState({
    ...syncState,
    user: data.user,
    token: syncState.token,
    lastSyncAt: syncState.lastSyncAt
  });

  return data.user;
}

async function clearCloudData() {
  const data = await apiRequest('/api/progress/clear-cloud', {
    method: 'POST',
    body: JSON.stringify({})
  });

  pushSyncLog({ type: 'clear-cloud', ok: true, message: progressTr('syncClearCloudOk') });
  return data.ok;
}

async function syncProgressToCloud() {
  const token = getAuthToken();

  if (!token) {
    setSyncMessage(progressTr('syncNeedLogin'));
    pushSyncLog({ type: 'sync', ok: false, message: progressTr('syncCannotRunGuest') });
    return null;
  }

  try {
    const local = loadProgress();
    const data = await apiRequest('/api/progress/sync', {
      method: 'POST',
      body: JSON.stringify({ progress: local })
    });

    if (data.progress) {
      saveProgress(data.progress);
    }

    const syncState = loadSyncState();
    saveSyncState({
      ...syncState,
      lastSyncAt: Date.now(),
      token: syncState.token,
      user: syncState.user
    });

    setSyncMessage(progressTr('syncOk'));
    pushSyncLog({ type: 'sync', ok: true, message: progressTr('syncOk') });

    return data.progress;
  } catch (error) {
    setSyncMessage(progressTr('syncFailed', { message: error.message }));
    pushSyncLog({ type: 'sync', ok: false, message: error.message });
    throw error;
  }
}

async function hydrateProgressFromCloud() {
  const token = getAuthToken();
  if (!token) {
    return loadProgress();
  }

  const data = await apiRequest('/api/progress');
  if (data.progress) {
    const merged = { ...defaultProgress(), ...data.progress };
    saveProgress(merged);
    return merged;
  }

  return loadProgress();
}

async function submitLeaderboardSession(levelId, modeId, score, total, streak) {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  return apiRequest('/api/leaderboard/submit', {
    method: 'POST',
    body: JSON.stringify({
      session: { levelId, modeId, score, total, streak }
    })
  });
}

async function fetchLeaderboard(limit = 10) {
  const data = await apiRequest(`/api/leaderboard?limit=${encodeURIComponent(limit)}`, {
    method: 'GET'
  });
  return data.leaderboard || [];
}

async function fetchMyLeaderboardProfile() {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  const data = await apiRequest('/api/leaderboard/me', { method: 'GET' });
  return data.profile || null;
}

async function fetchMyRecentLeaderboardHistory(limit = 10) {
  const token = getAuthToken();
  if (!token) {
    return [];
  }

  const data = await apiRequest(`/api/leaderboard/history?limit=${encodeURIComponent(limit)}`, {
    method: 'GET'
  });
  return data.history || [];
}

function clearSyncState() {
  localStorage.removeItem(SYNC_KEY);
  setSyncStateUI({});

  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.classList.add('hidden');
  }
}

function getSyncUser() {
  return loadSyncState().user || null;
}

function logoutUser() {
  clearSyncState();
  renderLevels?.();
}

function refreshSyncStateUI() {
  setSyncStateUI(loadSyncState());
}

function recordSession(levelId, modeId, score, total, streak) {
  const progress = loadProgress();

  progress.totalSessions += 1;
  progress.totalQuestions += total;
  progress.totalCorrect += score;
  progress.bestStreak = Math.max(progress.bestStreak, streak);
  progress.lastLevel = levelId;
  progress.lastMode = modeId;

  if (!progress.levelStats[levelId]) {
    progress.levelStats[levelId] = {
      sessions: 0,
      questions: 0,
      correct: 0,
      bestAccuracy: 0,
      modeStats: {}
    };
  }

  const levelStats = progress.levelStats[levelId];
  levelStats.sessions += 1;
  levelStats.questions += total;
  levelStats.correct += score;

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
  levelStats.bestAccuracy = Math.max(levelStats.bestAccuracy, accuracy);

  checkAndMarkSteps(progress, levelId, modeId, score, total);

  if (accuracy >= 80 && total >= 10) {
    unlockNextLevel(progress, levelId);
  }

  saveProgress(progress);
  syncProgressToCloud().catch(() => {});
  submitLeaderboardSession(levelId, modeId, score, total, streak).catch(() => {});

  return progress;
}

function unlockNextLevel(progress, currentLevelId) {
  const order = ['beginner', 'elementary', 'intermediate', 'advanced', 'expert', 'master'];
  const idx = order.indexOf(currentLevelId);

  if (idx >= 0 && idx < order.length - 1) {
    const next = order[idx + 1];
    if (!progress.unlockedLevels.includes(next)) {
      progress.unlockedLevels.push(next);
    }
  }
}

function isLevelUnlocked(levelId) {
  const progress = loadProgress();
  return progress.unlockedLevels.includes(levelId);
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

