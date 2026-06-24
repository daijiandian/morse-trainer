const player = new MorsePlayer();

let trainer = null;
let currentLevel = 'beginner';
let currentMode = 'flashcard';
let enduranceTimer = null;
let questionTimer = null;
let autoPlayTimer = null;
let authMode = 'login';
let sessionRecorded = false;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const appTr = (key, vars = {}) => window.MORSE_I18N?.t?.(key, vars) || key;
const appLang = () => window.MORSE_I18N?.getLanguage?.() || window.MORSE_I18N?.currentLang || 'zh-CN';
const isZhApp = () => appLang() === 'zh-CN';

const screens = {
  home: $('#screen-home'),
  level: $('#screen-level'),
  train: $('#screen-train'),
  stats: $('#screen-stats'),
  leaderboard: $('#screen-leaderboard'),
  plan: $('#screen-plan'),
  profile: $('#screen-profile')
};

function isScreenActive(name) {
  return !!screens[name]?.classList.contains('active');
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

function getFeedbackCorrectHtml() {
  const streakText = trainer.streak > 1 ? appTr('feedbackStreak', { streak: trainer.streak }) : '';
  return `✓ ${appTr('feedbackCorrect', { streak: streakText })}`;
}

function getLeaderboardRows(items) {
  const lang = appLang();
  const units = {
    'zh-CN': { points: '分', sessions: '场' },
    ja: { points: '点', sessions: '回' },
    ko: { points: '점', sessions: '회' },
    es: { points: 'pts', sessions: 'sesiones' },
    en: { points: 'pts', sessions: 'sessions' }
  };
  const unit = units[lang] || units.en;
  return items
    .map(
      (item) => `<div class="stat-row"><span>#${item.rank} ${item.displayName}</span><span>${item.totalPoints} ${unit.points} · ${item.totalSessions} ${unit.sessions}</span></div>`
    )
    .join('');
}

function renderLoadingRow() {
  return `<div class="stat-row"><span>${appTr('loading')}</span><span>${appTr('pleaseWait')}</span></div>`;
}

function renderEmptyLeaderboardRow() {
  return `<div class="stat-row"><span>${appTr('noLeaderboard')}</span><span>${appTr('trainOneMore')}</span></div>`;
}

function renderLeaderboardErrorRow() {
  return `<div class="stat-row"><span>${appTr('leaderboardLoadFailed')}</span><span>${appTr('retryLater')}</span></div>`;
}

function renderHistoryGuestRow() {
  return `<div class="stat-row"><span>${appTr('historyGuest')}</span><span>${appTr('notLoggedIn')}</span></div>`;
}

function renderHistoryEmptyRow() {
  return `<div class="stat-row"><span>${appTr('historyEmpty')}</span><span>${appTr('completeTrainingFirst')}</span></div>`;
}

function renderHistoryErrorRow() {
  return `<div class="stat-row"><span>${appTr('historyLoadFailed')}</span><span>${appTr('retryLater')}</span></div>`;
}

function renderLevels() {
  const grid = $('#level-grid');
  grid.innerHTML = '';

  getLevels().forEach((level) => {
    const unlocked = isLevelUnlocked(level.id);
    const card = document.createElement('div');

    card.className = `level-card ${unlocked ? '' : 'locked'}`;
    card.style.setProperty('--accent', level.color);
    card.innerHTML = `
      <div class="level-icon">${level.icon}</div>
      <h3>${level.name}</h3>
      <p class="level-desc">${level.desc}</p>
      <div class="level-meta">
        <span>${level.wpm} WPM</span>
        ${level.farnsworth ? `<span>Farnsworth ${level.farnsworth}</span>` : ''}
      </div>
      ${unlocked ? '' : `<div class="lock-badge">${appTr('levelLockedHint')}</div>`}
    `;

    if (unlocked) {
      card.addEventListener('click', () => openLevel(level.id));
    }

    grid.appendChild(card);
  });
}

function openLevel(levelId) {
  currentLevel = levelId;

  const level = getLevels().find((item) => item.id === levelId);
  const modes = $('#mode-list');

  $('#level-title').textContent = `${level.icon} ${level.name}`;
  $('#level-subtitle').textContent = level.desc;
  modes.innerHTML = '';

  level.modes.forEach((modeId) => {
    const info = getModeInfo()[modeId];
    const btn = document.createElement('button');

    btn.className = 'mode-btn';
    btn.innerHTML = `<strong>${info.name}</strong><span>${info.desc}</span>`;
    btn.addEventListener('click', () => startTraining(levelId, modeId));
    modes.appendChild(btn);
  });

  showScreen('level');
}

function startTraining(levelId, modeId) {
  currentLevel = levelId;
  currentMode = modeId;
  trainer = new Trainer(levelId, modeId);
  sessionRecorded = false;

  const level = getLevels().find((item) => item.id === levelId);
  const modeInfo = getModeInfo()[modeId];

  $('#train-level-badge').textContent = level.name;
  $('#train-mode-badge').textContent = modeInfo.name;
  $('#train-wpm').textContent = `${level.wpm} WPM`;

  resetTrainUI();
  showScreen('train');
  nextQuestion();
}

function resetTrainUI() {
  $('#score-display').textContent = '0';
  $('#total-display').textContent = '0';
  $('#streak-display').textContent = '0';
  $('#accuracy-display').textContent = '—';
  $('#feedback').className = 'feedback hidden';
  $('#answer-input').value = '';
  $('#answer-input').classList.remove('hidden');
  $('#options-grid').classList.add('hidden');
  $('#flashcard-view').classList.add('hidden');
  $('#morse-display').classList.add('hidden');
  $('#endurance-bar').classList.add('hidden');

  clearEnduranceTimer();
}

function nextQuestion() {
  $('#feedback').classList.add('hidden');
  $('#answer-input').value = '';
  $('#answer-input').disabled = false;

  const question = trainer.nextQuestion();
  const isFlash = trainer.mode === 'flashcard';
  const isChoice = trainer.mode === 'multiple-choice';

  $('#answer-input').classList.toggle('hidden', isFlash || isChoice);
  $('#options-grid').classList.toggle('hidden', !isChoice);
  $('#flashcard-view').classList.toggle('hidden', !isFlash);
  $('#morse-display').classList.toggle('hidden', isFlash);
  $('#play-btn').classList.toggle('hidden', isFlash || isChoice);

  if (isFlash) {
    renderFlashcard(question);
  } else if (isChoice) {
    renderOptions(question);
    autoPlay(question.answer);
  } else {
    $('#morse-display').textContent = showMorseHint()
      ? question.morse || encode(question.answer)
      : '• • •';

    autoPlay(question.answer);

    if (trainer.mode === 'endurance' && !trainer.enduranceActive) {
      startEndurance();
    }
  }

  if (!isFlash && !isChoice) {
    setTimeout(() => $('#answer-input').focus(), 100);
  }
}

function showMorseHint() {
  return currentLevel === 'beginner' || currentLevel === 'elementary';
}

function renderFlashcard(question) {
  $('#flash-letter').textContent = question.answer;
  $('#flash-morse').textContent = question.morse;
  $('#flash-hint').textContent = question.hint;
}

function renderOptions(question) {
  const grid = $('#options-grid');
  grid.innerHTML = '';

  question.options.forEach((option) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => submitAnswer(option));
    grid.appendChild(btn);
  });
}

function autoPlay(text) {
  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
  }

  autoPlayTimer = setTimeout(() => {
    autoPlayTimer = null;
    playCurrent(text);
  }, 300);
}

async function playCurrent(text) {
  if (!trainer || !trainer.currentQuestion) {
    return;
  }

  const question = trainer.currentQuestion;
  const toPlay = text || question.answer;
  const playBtn = $('#play-btn');

  playBtn.disabled = true;
  playBtn.classList.add('playing');

  await player.playMorse(toPlay, trainer.wpm, trainer.farnsworth);

  playBtn.disabled = false;
  playBtn.classList.remove('playing');
}

function submitAnswer(input) {
  if (!trainer.currentQuestion) {
    return;
  }

  const result = trainer.checkAnswer(input);
  const feedback = $('#feedback');

  updateStats();

  feedback.classList.remove('hidden', 'correct', 'wrong');
  feedback.classList.add(result.correct ? 'correct' : 'wrong');
  feedback.innerHTML = result.correct
    ? getFeedbackCorrectHtml()
    : `✗ ${appTr('feedbackWrong', { answer: `<strong>${result.expected}</strong>` })}`;

  $('#answer-input').disabled = true;
  $$('.option-btn').forEach((btn) => {
    btn.disabled = true;
  });

  if (trainer.mode === 'endurance' && trainer.enduranceTimeLeft <= 0) {
    endEndurance();
    return;
  }

  questionTimer = setTimeout(nextQuestion, result.correct ? 800 : 2000);
}

function updateStats() {
  $('#score-display').textContent = trainer.score;
  $('#total-display').textContent = trainer.total;
  $('#streak-display').textContent = trainer.streak;
  $('#accuracy-display').textContent = `${trainer.accuracy}%`;
}

function startEndurance() {
  trainer.enduranceActive = true;
  trainer.enduranceTimeLeft = 60;

  $('#endurance-bar').classList.remove('hidden');
  updateEnduranceBar();

  enduranceTimer = setInterval(() => {
    trainer.enduranceTimeLeft -= 1;
    updateEnduranceBar();

    if (trainer.enduranceTimeLeft <= 0) {
      endEndurance();
    }
  }, 1000);
}

function updateEnduranceBar() {
  $('#endurance-time').textContent = trainer.enduranceTimeLeft;
  $('#endurance-fill').style.width = `${(trainer.enduranceTimeLeft / 60) * 100}%`;
}

function finalizeSession() {
  if (!trainer || sessionRecorded || trainer.total <= 0) {
    return;
  }

  recordSession(currentLevel, currentMode, trainer.score, trainer.total, trainer.streak);
  sessionRecorded = true;
}

function endEndurance() {
  const feedback = $('#feedback');

  clearEnduranceTimer();
  trainer.enduranceActive = false;

  feedback.classList.remove('hidden');
  feedback.classList.add('correct');
  feedback.innerHTML = `⏱ ${appTr('enduranceEnd', {
    score: trainer.score,
    total: trainer.total,
    accuracy: trainer.accuracy
  })}`;

  finalizeSession();
}

function clearEnduranceTimer() {
  if (enduranceTimer) {
    clearInterval(enduranceTimer);
    enduranceTimer = null;
  }
}

function finishSession() {
  clearEnduranceTimer();

  if (questionTimer) {
    clearTimeout(questionTimer);
    questionTimer = null;
  }

  if (autoPlayTimer) {
    clearTimeout(autoPlayTimer);
    autoPlayTimer = null;
  }

  player.stop();
  finalizeSession();
  trainer = null;
  sessionRecorded = false;

  renderLevels();
  showScreen('home');
}

async function renderStats() {
  const progress = loadProgress();
  const breakdown = $('#level-breakdown');
  const leaderboardEl = $('#leaderboard-list');
  const myRankEl = $('#my-rank-summary');
  const accuracy = progress.totalQuestions > 0
    ? Math.round((progress.totalCorrect / progress.totalQuestions) * 100)
    : 0;

  $('#stat-sessions').textContent = progress.totalSessions;
  $('#stat-questions').textContent = progress.totalQuestions;
  $('#stat-accuracy').textContent = `${accuracy}%`;
  $('#stat-streak').textContent = progress.bestStreak;

  breakdown.innerHTML = '';

  getLevels().forEach((level) => {
    const levelStats = progress.levelStats[level.id];
    const row = document.createElement('div');

    row.className = 'stat-row';
    row.innerHTML = levelStats
      ? `<span>${level.icon} ${level.name}</span><span>${appTr('statRowDone', {
          sessions: levelStats.sessions,
          accuracy: Math.round((levelStats.correct / levelStats.questions) * 100) || 0,
          best: levelStats.bestAccuracy
        })}</span>`
      : `<span>${level.icon} ${level.name}</span><span>${appTr('statRowEmpty')}</span>`;

    breakdown.appendChild(row);
  });

  if (leaderboardEl) {
    leaderboardEl.innerHTML = renderLoadingRow();
  }

  if (myRankEl) {
    myRankEl.textContent = getAuthToken() ? appTr('loadingMyRank') : appTr('leaderboardMyRankGuest');
  }

  try {
    const leaderboard = await fetchLeaderboard(10);

    if (leaderboardEl) {
      leaderboardEl.innerHTML = leaderboard.length ? getLeaderboardRows(leaderboard) : renderEmptyLeaderboardRow();
    }
  } catch {
    if (leaderboardEl) {
      leaderboardEl.innerHTML = renderLeaderboardErrorRow();
    }
  }

  try {
    const profile = await fetchMyLeaderboardProfile();

    if (myRankEl) {
      myRankEl.textContent = profile
        ? appTr('myRankLine', {
            rank: profile.rank,
            name: profile.displayName,
            points: profile.totalPoints,
            best: profile.bestSingleScore
          })
        : (getAuthToken() ? appTr('notRankedYet') : appTr('leaderboardMyRankGuest'));
    }
  } catch {
    if (myRankEl) {
      myRankEl.textContent = appTr('myRankUnavailable');
    }
  }
}

async function renderLeaderboard() {
  const leaderboardEl = $('#leaderboard-list');
  const myRankEl = $('#my-rank-summary');
  const historyEl = $('#leaderboard-history');

  if (leaderboardEl) {
    leaderboardEl.innerHTML = renderLoadingRow();
  }

  if (historyEl) {
    historyEl.innerHTML = getAuthToken() ? renderLoadingRow() : renderHistoryGuestRow();
  }

  if (myRankEl) {
    myRankEl.textContent = getAuthToken() ? appTr('loadingMyRank') : appTr('leaderboardMyRankGuest');
  }

  try {
    const leaderboard = await fetchLeaderboard(20);

    if (leaderboardEl) {
      leaderboardEl.innerHTML = leaderboard.length ? getLeaderboardRows(leaderboard) : renderEmptyLeaderboardRow();
    }
  } catch {
    if (leaderboardEl) {
      leaderboardEl.innerHTML = renderLeaderboardErrorRow();
    }
  }

  try {
    const profile = await fetchMyLeaderboardProfile();

    if (myRankEl) {
      myRankEl.textContent = profile
        ? appTr('myRankLine', {
            rank: profile.rank,
            name: profile.displayName,
            points: profile.totalPoints,
            best: profile.bestSingleScore
          })
        : (getAuthToken() ? appTr('notRankedYet') : appTr('leaderboardMyRankGuest'));
    }
  } catch {
    if (myRankEl) {
      myRankEl.textContent = appTr('myRankUnavailable');
    }
  }

  try {
    const history = await fetchMyRecentLeaderboardHistory(8);

    if (historyEl) {
      historyEl.innerHTML = history.length
        ? history
            .map(
              (item) => `<div class="stat-row"><span>${appTr('historyRow', {
                  time: new Date(item.createdAt).toLocaleString(),
                  level: item.levelId,
                  mode: item.modeId
                })}</span><span>${appTr('historyScore', {
                  points: item.points,
                  score: item.score,
                  total: item.total,
                  accuracy: item.accuracy
                })}</span></div>`
            )
            .join('')
        : (getAuthToken() ? renderHistoryEmptyRow() : renderHistoryGuestRow());
    }
  } catch {
    if (historyEl) {
      historyEl.innerHTML = renderHistoryErrorRow();
    }
  }
}

function renderPlan() {
  const progress = loadProgress();
  const planProgress = getPlanProgress(progress);
  const nextStep = getNextStep(progress);
  const kochDay = getCurrentKochDay(progress);
  const continueBtn = $('#btn-continue-plan');
  const roadmap = $('#phase-roadmap');

  $('#plan-title').textContent = STUDY_PLAN.title;
  $('#plan-summary').textContent = STUDY_PLAN.summary;
  $('#plan-progress-fill').style.width = `${planProgress.percent}%`;
  $('#plan-progress-text').textContent = appTr('planProgressText', {
    completed: planProgress.completed,
    total: planProgress.total,
    percent: planProgress.percent
  });

  if (nextStep) {
    continueBtn.textContent = appTr('planContinueStep', {
      phase: nextStep.phase.title,
      step: nextStep.step.title
    });
    continueBtn.disabled = false;
    continueBtn.onclick = () => startTraining(nextStep.step.levelId, nextStep.step.modeId);
  } else {
    continueBtn.textContent = appTr('planDoneCta');
    continueBtn.disabled = false;
    continueBtn.onclick = () => {
      renderLevels();
      showScreen('home');
    };
  }

  $('#daily-routine').innerHTML = STUDY_PLAN.dailyRoutine
    .map(
      (item) => `
        <div class="routine-card">
          <span class="routine-time">${item.time}</span>
          <strong>${item.task}</strong>
          <p>${item.desc}</p>
        </div>
      `
    )
    .join('');

  $('#koch-timeline').innerHTML = KOCH_GROUPS
    .map((group) => {
      const active = group.day <= kochDay;
      const current = group.day === kochDay;

      return `
        <div class="koch-item ${active ? 'done' : ''} ${current ? 'current' : ''}">
          <span class="koch-day">${appTr('kochDayLabel', { day: group.day })}</span>
          <span class="koch-letters">${group.letters}</span>
          <span class="koch-tip">${group.tip}</span>
        </div>
      `;
    })
    .join('');

  roadmap.innerHTML = '';

  PLAN_PHASES.forEach((phase) => {
    const unlocked = isLevelUnlocked(phase.levelId);
    const phaseSteps = phase.steps;
    const phaseDone = phaseSteps.every((step) => isStepComplete(progress, step));
    const phaseProgressCount = phaseSteps.filter((step) => isStepComplete(progress, step)).length;
    const el = document.createElement('div');

    el.className = `phase-card ${unlocked ? '' : 'locked'} ${phaseDone ? 'completed' : ''}`;
    el.style.setProperty('--phase-color', phase.color);

    const stepsHtml = phase.steps
      .map((step) => {
        const done = isStepComplete(progress, step);
        const stats = getStepStats(progress, step);
        const requirement = step.requirement;
        const modeName = getModeInfo()[step.modeId].name;
        const requirementText = requirement.accuracy > 0
          ? appTr('requirementQuestionsAccuracy', { questions: requirement.questions, accuracy: requirement.accuracy })
          : appTr('requirementQuestionsOnly', { questions: requirement.questions });
        const currentAccuracyPart = requirement.accuracy > 0
          ? appTr('currentAccuracyPart', { accuracy: stats.accuracy })
          : '';

        return `
          <div class="step-item ${done ? 'done' : ''}">
            <div class="step-status">${done ? '✓' : '○'}</div>
            <div class="step-body">
              <strong>${step.title}</strong>
              <span class="step-mode">${modeName} · ${step.duration}</span>
              <p>${step.desc}</p>
              <div class="step-meta">
                <span>${appTr('requirementTarget', { text: requirementText })}</span>
                <span>${appTr('requirementCurrent', { questions: stats.questions, accuracyPart: currentAccuracyPart })}</span>
              </div>
              ${unlocked && !done ? `<button class="btn-step-start" data-level="${step.levelId}" data-mode="${step.modeId}">${appTr('planStartStep')}</button>` : ''}
            </div>
          </div>
        `;
      })
      .join('');

    el.innerHTML = `
      <div class="phase-head">
        <div>
          <span class="phase-week">${phase.week}</span>
          <h4>${phase.title}</h4>
          <p class="phase-goal">${phase.goal}</p>
        </div>
        <div class="phase-badge">${phaseProgressCount}/${phaseSteps.length}</div>
      </div>
      <div class="phase-steps">${stepsHtml}</div>
      <ul class="phase-tips">${phase.tips.map((tip) => `<li>${tip}</li>`).join('')}</ul>
    `;

    roadmap.appendChild(el);
  });

  roadmap.querySelectorAll('.btn-step-start').forEach((btn) => {
    btn.addEventListener('click', () => startTraining(btn.dataset.level, btn.dataset.mode));
  });

  $('#plan-principles').innerHTML = STUDY_PLAN.principles.map((item) => `<li>${item}</li>`).join('');
}

function renderProfile() {
  const syncState = loadSyncState();
  const user = syncState.user || null;
  const logs = loadSyncLog();

  $('#profile-email').textContent = user
    ? appTr('currentAccount', { name: user.displayName || user.email, email: user.email })
    : appTr('notLoggedIn');

  $('#profile-last-sync').textContent = syncState.lastSyncAt
    ? appTr('syncLast', { time: new Date(syncState.lastSyncAt).toLocaleString() })
    : appTr('profileLastSyncEmpty');

  $('#profile-logs').innerHTML = logs.length
    ? logs
        .map(
          (log) => `<li class="profile-log ${getSyncLogClass(log.ok)}"><span class="log-time">${new Date(log.at).toLocaleString()}</span><span class="log-type">${log.type}</span><span class="log-message">${log.message}</span></li>`
        )
        .join('')
    : `<li class="profile-log empty">${appTr('profileLogEmpty')}</li>`;
}

function bindClick(id, handler) {
  const el = document.getElementById(id);

  if (el) {
    el.addEventListener('click', handler);
  }
}

function openAuthModal(mode) {
  authMode = mode;

  const displayNameWrap = document.getElementById('auth-display-name-wrap');

  $('#auth-modal-title').textContent = mode === 'login' ? appTr('authLoginTitle') : appTr('authRegisterTitle');
  $('#auth-submit').textContent = mode === 'login' ? appTr('authSubmitLogin') : appTr('authSubmitRegister');
  $('#auth-form').reset();

  if (displayNameWrap) {
    displayNameWrap.classList.toggle('hidden', mode === 'login');
  }

  $('#auth-modal').classList.remove('hidden');
  setTimeout(() => $('#auth-email')?.focus(), 50);
}

function closeAuthModal() {
  $('#auth-modal').classList.add('hidden');
}

function bindNavigationEvents() {
  bindClick('btn-plan', () => {
    renderPlan();
    showScreen('plan');
  });

  bindClick('btn-start', () => {
    startTraining('beginner', 'flashcard');
  });

  bindClick('btn-stats', () => {
    renderStats();
    showScreen('stats');
  });

  bindClick('btn-leaderboard', () => {
    renderLeaderboard();
    showScreen('leaderboard');
  });

  bindClick('btn-profile', () => {
    renderProfile();
    showScreen('profile');
  });

  bindClick('btn-back-profile', () => showScreen('home'));
  bindClick('btn-back-home', () => showScreen('home'));
  bindClick('btn-back-plan', () => showScreen('home'));
  bindClick('btn-exit-train', finishSession);
  bindClick('btn-back-stats', () => {
    renderLevels();
    showScreen('home');
  });
  bindClick('btn-back-leaderboard', () => showScreen('home'));
}

function bindTrainingEvents() {
  bindClick('play-btn', () => {
    if (trainer && trainer.currentQuestion) {
      playCurrent();
    }
  });

  bindClick('flash-play-btn', () => {
    if (trainer && trainer.currentQuestion) {
      playCurrent(trainer.currentQuestion.answer);
    }
  });

  bindClick('flash-next-btn', () => {
    if (trainer && trainer.mode === 'flashcard') {
      nextQuestion();
    }
  });

  const answerInput = document.getElementById('answer-input');
  if (answerInput) {
    answerInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        submitAnswer(event.target.value);
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && screens.train.classList.contains('active')) {
      const active = document.activeElement;

      if (active?.tagName !== 'INPUT') {
        event.preventDefault();

        if (trainer?.currentQuestion) {
          playCurrent();
        }
      }
    }
  });
}

function bindProfileEvents() {
  bindClick('btn-reset-progress', () => {
    if (confirm(appTr('resetConfirm'))) {
      resetProgress();
      renderStats();
    }
  });

  bindClick('btn-login', () => openAuthModal('login'));
  bindClick('btn-register', () => openAuthModal('register'));
  bindClick('btn-close-auth', closeAuthModal);
  bindClick('auth-modal', (event) => {
    if (event.target.id === 'auth-modal' || event.target.classList.contains('modal-backdrop')) {
      closeAuthModal();
    }
  });

  const authForm = document.getElementById('auth-form');
  if (authForm) {
    authForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = $('#auth-email').value.trim();
      const password = $('#auth-password').value.trim();

      try {
        if (authMode === 'login') {
          await loginUser(email, password);
        } else {
          await registerUser(email, password);
        }

        await hydrateProgressFromCloud();
        renderLevels();
        closeAuthModal();
        alert(authMode === 'login' ? appTr('syncLoginOk') : appTr('syncRegisterOk'));
      } catch (error) {
        alert(authMode === 'login'
          ? appTr('loginFailed', { message: error.message })
          : appTr('registerFailed', { message: error.message }));
      }
    });
  }

  bindClick('btn-sync-now', async () => {
    try {
      setSyncMessage(appTr('syncingNow'));
      await syncProgressToCloud();
      renderLevels();
      renderProfile();
    } catch (error) {
      alert(appTr('syncFailedAlert', { message: error.message }));
    }
  });

  bindClick('btn-logout', () => {
    if (confirm(appTr('logoutConfirm'))) {
      logoutUser();
      renderLevels();
      alert(appTr('logoutDone'));
    }
  });

  bindClick('btn-change-password', async () => {
    const oldPassword = prompt(appTr('promptOldPassword'));
    if (!oldPassword) {
      return;
    }

    const newPassword = prompt(appTr('promptNewPassword'));
    if (!newPassword) {
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      alert(appTr('syncPasswordOk'));
    } catch (error) {
      alert(appTr('changePasswordFailed', { message: error.message }));
    }
  });

  bindClick('profile-email', async () => {
    const currentUser = getSyncUser();
    if (!currentUser) {
      return;
    }

    const nextName = prompt(appTr('promptDisplayName'), currentUser.displayName || currentUser.email);
    if (!nextName) {
      return;
    }

    try {
      await updateDisplayName(nextName);
      renderProfile();
      renderStats();
      alert(appTr('updateDisplayNameOk'));
    } catch (error) {
      alert(appTr('updateFailed', { message: error.message }));
    }
  });

  bindClick('btn-clear-cloud', async () => {
    if (!confirm(appTr('clearCloudConfirm'))) {
      return;
    }

    try {
      await clearCloudData();
      await hydrateProgressFromCloud();
      renderProfile();
      alert(appTr('syncClearCloudOk'));
    } catch (error) {
      alert(appTr('clearFailed', { message: error.message }));
    }
  });

  bindClick('btn-manual-sync', async () => {
    try {
      setSyncMessage(appTr('syncRefresh'));
      await hydrateProgressFromCloud();
      renderProfile();
      renderLevels();
      setSyncMessage(appTr('syncRefreshDone'));
    } catch (error) {
      alert(appTr('refreshFailed', { message: error.message }));
    }
  });
}

function bindLanguageEvents() {
  window.addEventListener('morse-language-change', () => {
    renderLevels();
    renderProfile();

    if (isScreenActive('level')) {
      openLevel(currentLevel);
    }

    if (isScreenActive('train') && trainer) {
      const level = getLevels().find((item) => item.id === currentLevel);
      const modeInfo = getModeInfo()[currentMode];
      if (level) {
        $('#train-level-badge').textContent = level.name;
        $('#train-wpm').textContent = `${level.wpm} WPM`;
      }
      if (modeInfo) {
        $('#train-mode-badge').textContent = modeInfo.name;
      }
    }

    if (isScreenActive('stats')) {
      renderStats();
    }

    if (isScreenActive('leaderboard')) {
      renderLeaderboard();
    }

    if ($('#auth-modal') && !$('#auth-modal').classList.contains('hidden')) {
      openAuthModal(authMode);
    }
  });
}

function bindEvents() {
  bindNavigationEvents();
  bindTrainingEvents();
  bindProfileEvents();
  bindLanguageEvents();
}

async function initApp() {
  bindEvents();
  showScreen('home');
  renderLevels();

  try {
    await hydrateProgressFromCloud();
  } catch {
    // Ignore initial cloud sync errors and continue with local data.
  }

  renderLevels();
  renderProfile();
}

initApp();


