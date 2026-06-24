export function mergeProgress(current = {}, incoming = {}) {
  const currentTime = current.updatedAt || 0;
  const incomingTime = incoming.updatedAt || 0;
  const base = incomingTime >= currentTime ? incoming : current;
  const other = incomingTime >= currentTime ? current : incoming;

  return {
    ...base,
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
