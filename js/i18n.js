const MORSE_LANG_KEY = 'morse-trainer-lang-v2';

const TRANSLATIONS = {
  'zh-CN': {
    langLabel: '语言',
    pageTitle: '摩斯密码训练器 | Morse Learning Platform',
    heroEyebrow: 'Morse Learning Platform',
    heroTitle: '摩斯密码训练器',
    heroSubtitle: '系统训练、学习路线、内容教程与进度同步，适合长期练习的在线 Morse 平台',
    heroQuickTitle: '快速了解这个站点',
    heroMetric1: '界面语言',
    heroMetric2: '训练视图',
    heroMetric3: '浏览器可用',
    heroQuick1Title: '练习',
    heroQuick1Desc: '从闪卡、听音选字母到输入训练，适合逐步建立节奏感。',
    heroQuick2Title: '进阶',
    heroQuick2Desc: '内置 Koch 学习路线与阶段计划，不只是一个播放工具。',
    heroQuick3Title: '沉淀',
    heroQuick3Desc: '支持统计、账号同步和排行榜，适合做长期留存与内容扩展。',
    btnPlan: '查看学习方案',
    btnStart: '立即开始训练',
    btnStats: '学习统计',
    btnLeaderboard: '积分排行榜',
    btnProfile: '个人中心',
    syncLocal: '本地模式',
    syncEnabled: '云端同步已启用',
    btnLogin: '登录',
    btnRegister: '注册',
    btnSyncNow: '立即同步',
    btnLogout: '退出登录',
    syncUserCurrent: '当前账号：{name}',
    syncUserGuest: '未登录',
    syncLast: '上次同步：{time}',
    homeLevelsEyebrow: 'Training Tracks',
    homeLevels: '训练等级',
    homeWhatEyebrow: 'Core Experience',
    homeWhatTitle: '你可以在这里做什么',
    homeWhat1Title: '从零开始学习',
    homeWhat1Desc: '通过闪卡、听音选字母和听打输入，建立摩斯码基本感觉。',
    homeWhat2Title: '按路线系统进阶',
    homeWhat2Desc: '结合 Koch 渐进法和阶段计划，从单字母一路练到句子和报文。',
    homeWhat3Title: '保存长期记录',
    homeWhat3Desc: '登录后可同步训练进度、学习统计和阶段完成情况。',
    homeTutorialsEyebrow: 'Content Engine',
    homeTutorialsTitle: '教程与内容',
    homeTutorial1Title: '教程目录',
    homeTutorial1Desc: '查看完整的学习文章目录，适合搜索流量和长期内容扩展。',
    homeTutorial2Title: '什么是摩斯密码',
    homeTutorial2Desc: '从最基础的概念开始，了解它为什么现在仍然值得学习。',
    homeTutorial3Title: 'Koch 学习法是什么',
    homeTutorial3Desc: '理解系统训练路线背后的方法论。',
    homeTutorialsCta: '查看全部教程',
    homeInfoEyebrow: 'Launch Essentials',
    homeInfoTitle: '站点信息',
    homeInfo1Title: 'About',
    homeInfo1Desc: '了解项目定位、用途和未来规划。',
    homeInfo2Title: 'Privacy Policy',
    homeInfo2Desc: '查看隐私与数据处理说明，这是广告和收录的重要基础页。',
    homeInfo3Title: 'Contact',
    homeInfo3Desc: '提供联系邮箱和反馈渠道，建议正式上线前换成你自己的信息。',
    profileTitle: '个人中心',
    profileCurrent: '当前账号',
    profileLastSyncEmpty: '上次同步：—',
    btnChangePassword: '修改密码',
    btnClearCloud: '清空云端数据',
    btnManualSync: '刷新云端进度',
    profileSyncHistory: '同步历史',
    back: '返回',
    exit: '退出',
    statCorrect: '正确',
    statTotal: '总计',
    statStreak: '连击',
    statAccuracy: '准确率',
    enduranceLeft: '剩余 {seconds} 秒',
    endurancePrefix: '剩余',
    enduranceSuffix: '秒',
    btnPlayMorse: '播放摩斯码',
    btnPlay: '播放',
    btnNextCard: '下一张',
    answerPlaceholder: '输入答案后按 Enter...',
    planDaily: '每日学习安排（约 20 分钟）',
    planKoch: 'Koch 渐进法 · 字母学习顺序',
    planKochDesc: '国际通用的摩斯码学习法，每次只增加 2 个新字母，与已学字母混合练习',
    planRoadmap: '分阶段路线图',
    planPrinciples: '学习原则',
    planContinue: '继续学习',
    statsTitle: '学习统计',
    statSessions: '训练次数',
    statQuestions: '总题数',
    statAccuracyTotal: '总准确率',
    statBestStreak: '最佳连击',
    levelBreakdown: '各等级进度',
    btnResetProgress: '重置进度',
    leaderboardTitle: '积分排行榜',
    leaderboardRules: '积分怎么算',
    leaderboardRule1: '难度越高，积分越高',
    leaderboardRule1Desc: '训练等级越高，单题积分权重越高，鼓励用户逐步挑战更高难度。',
    leaderboardRule2: '训练模式越难，积分越高',
    leaderboardRule2Desc: '输入、句子、耐力等模式会比基础模式获得更高积分权重。',
    leaderboardRule3: '准确率和连击有加成',
    leaderboardRule3Desc: '准确率越高、连击越稳定，单场得分越高；低准确率不会拿到理想积分。',
    leaderboardRuleNote: '为避免刷分，题量过少的训练不会有效记分，单场积分也设有上限。',
    leaderboardCurrent: '当前榜单',
    leaderboardMyRankGuest: '登录后可参与积分排行榜',
    leaderboardHistory: '我的最近战绩',
    leaderboardHistoryDesc: '显示最近几场有效记分训练，帮助你了解积分变化。',
    authDisplayName: '显示名',
    authEmail: '邮箱',
    authPassword: '密码',
    authDisplayNamePlaceholder: '例如：摩斯学徒',
    authPasswordPlaceholder: '请输入密码',
    authEmailPlaceholder: 'name@example.com',
    authLoginTitle: '登录',
    authRegisterTitle: '注册',
    authSubmitLogin: '登录',
    authSubmitRegister: '注册',
    currentAccount: '{name}（{email}）',
    notLoggedIn: '未登录',
    loading: '加载中...',
    pleaseWait: '请稍候',
    noLeaderboard: '暂无排行数据',
    trainOneMore: '先去训练一场吧',
    leaderboardLoadFailed: '排行榜加载失败',
    retryLater: '稍后再试',
    myRankLine: '我的排名：#{rank} · {name} · {points} 分 · 最佳单场 {best} 分',
    loadingMyRank: '正在加载我的排名...',
    notRankedYet: '你还没有上榜记录，先完成一场有效训练吧',
    myRankUnavailable: '我的排名暂时无法获取',
    historyGuest: '登录后可查看最近战绩',
    historyEmpty: '暂无最近战绩',
    completeTrainingFirst: '先完成一场训练吧',
    historyLoadFailed: '最近战绩加载失败',
    historyRow: '{time} · {level} / {mode}',
    historyScore: '{points} 分 · {score}/{total} · {accuracy}%',
    feedbackCorrect: '正确！{streak}',
    feedbackWrong: '错误 — 正确答案: {answer}',
    feedbackStreak: '连击 ×{streak}',
    enduranceEnd: '时间到！正确 {score}/{total}，准确率 {accuracy}%',
    statRowDone: '{sessions} 次 · {accuracy}% · 最高 {best}%',
    statRowEmpty: '尚未练习',
    levelLockedHint: '🔒 完成上一级 80% 正确率解锁',
    planProgressText: '已完成 {completed}/{total} 步骤（{percent}%）',
    planContinueStep: '继续：{phase} · {step}',
    planDoneCta: '🎉 全部完成！自由训练巩固',
    kochDayLabel: 'Day {day}',
    requirementQuestionsOnly: '{questions} 题',
    requirementQuestionsAccuracy: '{questions} 题 · ≥ {accuracy}%',
    requirementTarget: '目标：{text}',
    requirementCurrent: '当前：{questions} 题{accuracyPart}',
    currentAccuracyPart: ' · {accuracy}%',
    planStartStep: '开始此步骤',
    syncNeedLogin: '请先登录后再同步',
    syncCannotRunGuest: '未登录，无法同步',
    syncRegisterOk: '注册成功',
    syncLoginOk: '登录成功',
    syncingNow: '正在同步...',
    syncPasswordOk: '密码修改成功',
    syncClearCloudOk: '云端数据已清空',
    syncOk: '同步成功',
    syncFailed: '同步失败：{message}',
    syncRefresh: '正在刷新云端进度...',
    syncRefreshDone: '云端进度已刷新',
    logoutDone: '已退出登录',
    resetConfirm: '确定要重置所有学习进度吗？',
    logoutConfirm: '确定要退出登录吗？',
    clearCloudConfirm: '确定要清空云端数据吗？此操作不可恢复。',
    promptOldPassword: '请输入旧密码',
    promptNewPassword: '请输入新密码',
    promptDisplayName: '请输入新的显示名',
    updateDisplayNameOk: '显示名已更新',
    updateFailed: '更新失败：{message}',
    loginFailed: '登录失败：{message}',
    registerFailed: '注册失败：{message}',
    changePasswordFailed: '修改失败：{message}',
    clearFailed: '清空失败：{message}',
    refreshFailed: '刷新失败：{message}',
    syncFailedAlert: '同步失败：{message}',
    profileLogEmpty: '暂无同步记录',
    footerLine1: '在线摩斯密码学习工具 · 可直接在浏览器中运行 · 按 Space 重播',
    footerLine2: '建议正式上线前补齐真实联系邮箱、域名和站点备案/主体信息，再申请广告平台。'
  },
  en: {
    langLabel: 'Language', pageTitle: 'Morse Trainer | Morse Learning Platform', aboutPageTitle: 'About | Morse Trainer', privacyPageTitle: 'Privacy Policy | Morse Trainer', contactPageTitle: 'Contact | Morse Trainer', aboutPageTitle: 'About | Morse Trainer', privacyPageTitle: 'Privacy Policy | Morse Trainer', contactPageTitle: 'Contact | Morse Trainer', heroEyebrow: 'Morse Learning Platform', heroTitle: 'Morse Trainer', heroSubtitle: 'Structured practice, study plans, tutorial content, and sync for long-term Morse learning.', heroQuickTitle: 'Quick Look at the Platform', heroMetric1: 'UI Languages', heroMetric2: 'Training Views', heroMetric3: 'Browser Ready', heroQuick1Title: 'Practice', heroQuick1Desc: 'From flashcards and listening choices to typing drills, built for steady rhythm training.', heroQuick2Title: 'Progress', heroQuick2Desc: 'Includes Koch progression and staged learning plans, not just a simple playback tool.', heroQuick3Title: 'Retention', heroQuick3Desc: 'Supports stats, account sync, and leaderboard features for long-term product growth.', btnPlan: 'Study Plan', btnStart: 'Start Training', btnStats: 'Statistics', btnLeaderboard: 'Leaderboard', btnProfile: 'Profile', syncLocal: 'Local mode', syncEnabled: 'Cloud sync enabled', btnLogin: 'Login', btnRegister: 'Register', btnSyncNow: 'Sync now', btnLogout: 'Logout', syncUserCurrent: 'Account: {name}', syncUserGuest: 'Not logged in', syncLast: 'Last sync: {time}', homeLevelsEyebrow: 'Training Tracks', homeLevels: 'Training Levels', homeWhatEyebrow: 'Core Experience', homeWhatTitle: 'What You Can Do Here', homeWhat1Title: 'Start From Zero', homeWhat1Desc: 'Build your Morse foundation with flashcards, listening choices, and typed answers.', homeWhat2Title: 'Advance Systematically', homeWhat2Desc: 'Follow Koch-style progress and stage plans from letters to sentences and messages.', homeWhat3Title: 'Keep Long-Term Records', homeWhat3Desc: 'After login, sync your practice progress, stats, and completed milestones.', homeTutorialsEyebrow: 'Content Engine', homeTutorialsTitle: 'Tutorials and Content', homeTutorial1Title: 'Tutorial Directory', homeTutorial1Desc: 'Browse the full article index for long-term learning and search-friendly content.', homeTutorial2Title: 'What Is Morse Code?', homeTutorial2Desc: 'Start with the basics and understand why Morse is still worth learning today.', homeTutorial3Title: 'What Is the Koch Method?', homeTutorial3Desc: 'Understand the method behind a structured Morse learning path.', homeTutorialsCta: 'View All Tutorials', homeInfoEyebrow: 'Launch Essentials', homeInfoTitle: 'Site Information', homeInfo1Title: 'About', homeInfo1Desc: 'Learn the project purpose, positioning, and roadmap.', homeInfo2Title: 'Privacy Policy', homeInfo2Desc: 'Review privacy and data handling details, which are important for public launch.', homeInfo3Title: 'Contact', homeInfo3Desc: 'See contact and feedback channels. Replace them with your own before launch.', profileTitle: 'Profile', profileCurrent: 'Current Account', profileLastSyncEmpty: 'Last sync: —', btnChangePassword: 'Change Password', btnClearCloud: 'Clear Cloud Data', btnManualSync: 'Refresh Cloud Progress', profileSyncHistory: 'Sync History', back: 'Back', exit: 'Exit', statCorrect: 'Correct', statTotal: 'Total', statStreak: 'Streak', statAccuracy: 'Accuracy', enduranceLeft: '{seconds}s left', endurancePrefix: 'Remaining', enduranceSuffix: 'seconds', btnPlayMorse: 'Play Morse', btnPlay: 'Play', btnNextCard: 'Next Card', answerPlaceholder: 'Type your answer and press Enter...', planDaily: 'Daily Plan (about 20 min)', planKoch: 'Koch Method · Letter Order', planKochDesc: 'A globally used Morse learning method that adds only 2 new letters at a time and mixes them with earlier ones.', planRoadmap: 'Stage Roadmap', planPrinciples: 'Study Principles', planContinue: 'Continue Learning', planContinueStep: 'Continue: {phase} · {step}', statsTitle: 'Statistics', statSessions: 'Sessions', statQuestions: 'Questions', statAccuracyTotal: 'Total Accuracy', statBestStreak: 'Best Streak', levelBreakdown: 'Progress by Level', btnResetProgress: 'Reset Progress', leaderboardTitle: 'Leaderboard', leaderboardRules: 'How Points Work', leaderboardRule1: 'Higher difficulty earns more', leaderboardRule1Desc: 'Higher training levels have larger point weights per correct answer.', leaderboardRule2: 'Harder modes earn more', leaderboardRule2Desc: 'Typing, sentence and endurance modes give higher score weights.', leaderboardRule3: 'Accuracy and streak matter', leaderboardRule3Desc: 'Higher accuracy and stable streaks increase your single-session score.', leaderboardRuleNote: 'Very short sessions do not count, and single-session points have a cap.', leaderboardCurrent: 'Current Rankings', leaderboardMyRankGuest: 'Log in to join the leaderboard', leaderboardHistory: 'My Recent Results', leaderboardHistoryDesc: 'See your most recent scored sessions and how your points changed.', authDisplayName: 'Display Name', authEmail: 'Email', authPassword: 'Password', authDisplayNamePlaceholder: 'e.g. Morse Rookie', authPasswordPlaceholder: 'Enter password', authEmailPlaceholder: 'name@example.com', authLoginTitle: 'Login', authRegisterTitle: 'Register', authSubmitLogin: 'Login', authSubmitRegister: 'Register', currentAccount: '{name} ({email})', notLoggedIn: 'Not logged in', loading: 'Loading...', pleaseWait: 'Please wait', noLeaderboard: 'No ranking data yet', trainOneMore: 'Finish a session to get started', leaderboardLoadFailed: 'Failed to load leaderboard', retryLater: 'Try again later', myRankLine: 'My rank: #{rank} · {name} · {points} pts · Best session {best} pts', loadingMyRank: 'Loading my rank...', notRankedYet: 'You are not ranked yet. Complete a valid session first.', myRankUnavailable: 'My rank is temporarily unavailable', historyGuest: 'Log in to view recent results', historyEmpty: 'No recent scored sessions', completeTrainingFirst: 'Complete a training session first', historyLoadFailed: 'Failed to load recent results', historyRow: '{time} · {level} / {mode}', historyScore: '{points} pts · {score}/{total} · {accuracy}%', feedbackCorrect: 'Correct! {streak}', feedbackWrong: 'Wrong — correct answer: {answer}', feedbackStreak: 'Streak x{streak}', enduranceEnd: 'Time up! Correct {score}/{total}, accuracy {accuracy}%', statRowDone: '{sessions} sessions · {accuracy}% · best {best}%', statRowEmpty: 'No practice yet', levelLockedHint: '🔒 Unlock by completing the previous level with 80% accuracy', planProgressText: 'Completed {completed}/{total} steps ({percent}%)', planDoneCta: '🎉 All done! Keep practicing freely', kochDayLabel: 'Day {day}', requirementQuestionsOnly: '{questions} questions', requirementQuestionsAccuracy: '{questions} questions · ≥ {accuracy}%', requirementTarget: 'Target: {text}', requirementCurrent: 'Current: {questions} questions{accuracyPart}', currentAccuracyPart: ' · {accuracy}%', planStartStep: 'Start This Step', syncNeedLogin: 'Please log in before syncing', syncCannotRunGuest: 'Not logged in, cannot sync', syncRegisterOk: 'Registration successful', syncLoginOk: 'Login successful', syncingNow: 'Syncing...', syncPasswordOk: 'Password changed successfully', syncClearCloudOk: 'Cloud data cleared', syncOk: 'Sync successful', syncFailed: 'Sync failed: {message}', syncRefresh: 'Refreshing cloud progress...', syncRefreshDone: 'Cloud progress refreshed', logoutDone: 'Logged out', resetConfirm: 'Reset all progress?', logoutConfirm: 'Log out now?', clearCloudConfirm: 'Clear all cloud data? This cannot be undone.', promptOldPassword: 'Enter old password', promptNewPassword: 'Enter new password', promptDisplayName: 'Enter a new display name', updateDisplayNameOk: 'Display name updated', updateFailed: 'Update failed: {message}', loginFailed: 'Login failed: {message}', registerFailed: 'Registration failed: {message}', changePasswordFailed: 'Change failed: {message}', clearFailed: 'Clear failed: {message}', refreshFailed: 'Refresh failed: {message}', syncFailedAlert: 'Sync failed: {message}', profileLogEmpty: 'No sync history yet', footerLine1: 'Online Morse learning tool · Runs directly in your browser · Press Space to replay', footerLine2: 'Before public launch, replace contact email, domain, and site owner information.'
  },
  ja: { langLabel: '言語', pageTitle: 'モールス信号トレーナー | Morse Learning Platform', heroTitle: 'モールス信号トレーナー', heroSubtitle: '体系的な練習、学習プラン、チュートリアル、同期機能を備えた長期学習向けプラットフォーム。', btnPlan: '学習プラン', btnStart: '練習開始', btnStats: '統計', btnLeaderboard: 'ランキング', btnProfile: 'プロフィール', syncLocal: 'ローカルモード', syncEnabled: 'クラウド同期が有効', btnLogin: 'ログイン', btnRegister: '登録', btnSyncNow: '今すぐ同期', btnLogout: 'ログアウト', syncUserCurrent: 'アカウント: {name}', syncUserGuest: '未ログイン', syncLast: '最終同期: {time}', homeLevels: 'トレーニングレベル', homeWhatTitle: 'ここでできること', homeWhat1Title: 'ゼロから始める', homeWhat1Desc: 'フラッシュカード、聞き取り選択、入力練習でモールスの土台を作ります。', homeWhat2Title: '段階的に上達する', homeWhat2Desc: 'Koch方式と段階計画に沿って文字から文やメッセージまで進みます。', homeWhat3Title: '長期記録を残す', homeWhat3Desc: 'ログイン後は進捗、統計、達成ステップを同期できます。', homeTutorialsTitle: 'チュートリアルと内容', homeTutorial1Title: 'チュートリアル一覧', homeTutorial1Desc: '長期学習や検索流入向けに記事一覧をまとめて確認できます。', homeTutorial2Title: 'モールス信号とは', homeTutorial2Desc: '基礎から学び、今も学ぶ価値がある理由を理解します。', homeTutorial3Title: 'Koch方式とは', homeTutorial3Desc: '体系的な学習ルートを支える考え方を理解します。', homeTutorialsCta: 'すべてのチュートリアルを見る', homeInfoTitle: 'サイト情報', homeInfo1Title: 'About', homeInfo1Desc: 'プロジェクトの目的、位置付け、今後の計画を確認します。', homeInfo2Title: 'Privacy Policy', homeInfo2Desc: '公開前に重要なプライバシーとデータ処理の内容を確認します。', homeInfo3Title: 'Contact', homeInfo3Desc: '連絡先やフィードバック窓口を表示します。公開前に自分の情報へ置き換えてください。', profileTitle: 'プロフィール', profileCurrent: '現在のアカウント', profileLastSyncEmpty: '最終同期: —', btnChangePassword: 'パスワード変更', btnClearCloud: 'クラウドデータ削除', btnManualSync: 'クラウド進捗更新', profileSyncHistory: '同期履歴', back: '戻る', exit: '終了', statCorrect: '正解', statTotal: '合計', statStreak: '連続', statAccuracy: '正確率', enduranceLeft: '残り {seconds} 秒', endurancePrefix: '残り', enduranceSuffix: '秒', btnPlayMorse: 'モールス再生', btnPlay: '再生', btnNextCard: '次へ', answerPlaceholder: '答えを入力して Enter...', statsTitle: '統計', statSessions: '回数', statQuestions: '問題数', statAccuracyTotal: '総合正確率', statBestStreak: '最高連続', levelBreakdown: 'レベル別進捗', btnResetProgress: '進捗リセット', leaderboardTitle: 'ランキング', leaderboardRules: 'ポイント計算', leaderboardRule1: '難易度が高いほど高得点', leaderboardRule1Desc: '難しいレベルほど正解1問あたりの重みが高くなります。', leaderboardRule2: '難しいモードほど高得点', leaderboardRule2Desc: '入力、文章、耐久モードはより高い配点になります。', leaderboardRule3: '正確率と連続正解にボーナス', leaderboardRule3Desc: '正確率が高く、連続正解が安定しているほど1回の得点が上がります。', leaderboardRuleNote: '短すぎる練習は集計対象外で、1回の得点には上限があります。', leaderboardCurrent: '現在のランキング', leaderboardMyRankGuest: 'ログインすると参加できます', leaderboardHistory: '最近の成績', leaderboardHistoryDesc: '最近の有効スコア練習を表示します。', authDisplayName: '表示名', authEmail: 'メール', authPassword: 'パスワード', authDisplayNamePlaceholder: '例: Morse Rookie', authPasswordPlaceholder: 'パスワードを入力', authEmailPlaceholder: 'name@example.com', authLoginTitle: 'ログイン', authRegisterTitle: '登録', authSubmitLogin: 'ログイン', authSubmitRegister: '登録', currentAccount: '{name}（{email}）', notLoggedIn: '未ログイン', loading: '読み込み中...', pleaseWait: 'しばらくお待ちください', noLeaderboard: 'ランキングデータがありません', trainOneMore: 'まずは練習を完了してください', leaderboardLoadFailed: 'ランキングの読み込みに失敗しました', retryLater: '後でもう一度お試しください', myRankLine: '私の順位: #{rank} · {name} · {points} 点 · 最高 {best} 点', loadingMyRank: '自分の順位を読み込み中...', notRankedYet: 'まだランクインしていません。まず有効な練習を完了してください。', myRankUnavailable: '順位を取得できません', historyGuest: 'ログインすると最近の成績を確認できます', historyEmpty: '最近の成績はありません', completeTrainingFirst: 'まずは練習を完了してください', historyLoadFailed: '最近の成績の読み込みに失敗しました', historyRow: '{time} · {level} / {mode}', historyScore: '{points} 点 · {score}/{total} · {accuracy}%', feedbackCorrect: '正解！{streak}', feedbackWrong: '不正解 — 正解: {answer}', feedbackStreak: '連続 x{streak}', enduranceEnd: '時間終了！ 正解 {score}/{total}、正確率 {accuracy}%', statRowDone: '{sessions} 回 · {accuracy}% · 最高 {best}%', statRowEmpty: 'まだ練習していません', levelLockedHint: '🔒 1つ前のレベルを正確率80%で完了すると解放', planProgressText: '{completed}/{total} ステップ完了（{percent}%）', planContinue: '学習を続ける', planContinueStep: '続き: {phase} · {step}', planDoneCta: '🎉 すべて完了！自由練習で定着させましょう', kochDayLabel: '{day}日目', requirementQuestionsOnly: '{questions} 問', requirementQuestionsAccuracy: '{questions} 問 · {accuracy}%以上', requirementTarget: '目標: {text}', requirementCurrent: '現在: {questions} 問{accuracyPart}', currentAccuracyPart: ' · {accuracy}%', planStartStep: 'このステップを開始', syncNeedLogin: '同期する前にログインしてください', syncCannotRunGuest: '未ログインのため同期できません', syncRegisterOk: '登録完了', syncLoginOk: 'ログイン成功', syncingNow: '同期中...', syncPasswordOk: 'パスワード変更成功', syncClearCloudOk: 'クラウドデータを削除しました', syncOk: '同期成功', syncFailed: '同期失敗: {message}', syncRefresh: 'クラウド進捗を更新中...', syncRefreshDone: 'クラウド進捗を更新しました', logoutDone: 'ログアウトしました', resetConfirm: 'すべての進捗をリセットしますか？', logoutConfirm: 'ログアウトしますか？', clearCloudConfirm: 'クラウドデータをすべて削除しますか？この操作は元に戻せません。', promptOldPassword: '現在のパスワードを入力', promptNewPassword: '新しいパスワードを入力', promptDisplayName: '新しい表示名を入力', updateDisplayNameOk: '表示名を更新しました', updateFailed: '更新失敗: {message}', loginFailed: 'ログイン失敗: {message}', registerFailed: '登録失敗: {message}', changePasswordFailed: '変更失敗: {message}', clearFailed: '削除失敗: {message}', refreshFailed: '更新失敗: {message}', syncFailedAlert: '同期失敗: {message}', profileLogEmpty: '同期履歴はまだありません', footerLine1: 'オンラインモールス学習ツール · ブラウザで直接動作 · Space で再生', footerLine2: '公開前に連絡先メール、ドメイン、運営情報を差し替えてください。' },
  ko: { langLabel: '언어', pageTitle: '모스 부호 트레이너 | Morse Learning Platform', heroTitle: '모스 부호 트레이너', heroSubtitle: '체계적인 연습, 학습 계획, 튜토리얼, 동기화를 제공하는 장기 학습용 플랫폼입니다.', btnPlan: '학습 계획', btnStart: '훈련 시작', btnStats: '통계', btnLeaderboard: '랭킹', btnProfile: '프로필', syncLocal: '로컬 모드', syncEnabled: '클라우드 동기화 사용 중', btnLogin: '로그인', btnRegister: '회원가입', btnSyncNow: '지금 동기화', btnLogout: '로그아웃', syncUserCurrent: '계정: {name}', syncUserGuest: '로그인 안 됨', syncLast: '마지막 동기화: {time}', homeLevels: '훈련 레벨', homeWhatTitle: '여기서 할 수 있는 것', homeWhat1Title: '처음부터 시작', homeWhat1Desc: '플래시카드, 듣기 선택, 입력 연습으로 모스의 기초를 만듭니다.', homeWhat2Title: '체계적으로 성장', homeWhat2Desc: 'Koch 방식과 단계 계획에 따라 문자에서 문장과 메시지까지 올라갑니다.', homeWhat3Title: '장기 기록 유지', homeWhat3Desc: '로그인 후 진행도, 통계, 완료한 단계를 동기화할 수 있습니다.', homeTutorialsTitle: '튜토리얼과 콘텐츠', homeTutorial1Title: '튜토리얼 목록', homeTutorial1Desc: '장기 학습과 검색 유입에 맞춘 전체 글 목록을 둘러볼 수 있습니다.', homeTutorial2Title: '모스 부호란?', homeTutorial2Desc: '기초부터 시작해 지금도 배울 가치가 있는 이유를 이해합니다.', homeTutorial3Title: 'Koch 방식이란?', homeTutorial3Desc: '체계적인 학습 경로 뒤에 있는 방법론을 이해합니다.', homeTutorialsCta: '전체 튜토리얼 보기', homeInfoTitle: '사이트 정보', homeInfo1Title: 'About', homeInfo1Desc: '프로젝트 목적, 포지셔닝, 향후 계획을 확인합니다.', homeInfo2Title: 'Privacy Policy', homeInfo2Desc: '공개 전 중요한 개인정보 및 데이터 처리 내용을 검토합니다.', homeInfo3Title: 'Contact', homeInfo3Desc: '연락처와 피드백 채널을 보여줍니다. 공개 전 본인 정보로 교체하세요.', profileTitle: '프로필', profileCurrent: '현재 계정', profileLastSyncEmpty: '마지막 동기화: —', btnChangePassword: '비밀번호 변경', btnClearCloud: '클라우드 데이터 삭제', btnManualSync: '클라우드 진행 새로고침', profileSyncHistory: '동기화 기록', back: '뒤로', exit: '종료', statCorrect: '정답', statTotal: '총합', statStreak: '연속', statAccuracy: '정확도', enduranceLeft: '{seconds}초 남음', endurancePrefix: '남은', enduranceSuffix: '초', btnPlayMorse: '모스 재생', btnPlay: '재생', btnNextCard: '다음', answerPlaceholder: '정답을 입력하고 Enter...', statsTitle: '통계', statSessions: '훈련 횟수', statQuestions: '문항 수', statAccuracyTotal: '전체 정확도', statBestStreak: '최고 연속', levelBreakdown: '레벨별 진행도', btnResetProgress: '진행 초기화', leaderboardTitle: '랭킹', leaderboardRules: '점수 계산 방식', leaderboardRule1: '난도가 높을수록 고득점', leaderboardRule1Desc: '상위 레벨일수록 문제당 점수 가중치가 높습니다.', leaderboardRule2: '어려운 모드일수록 고득점', leaderboardRule2Desc: '입력, 문장, 내구 모드는 더 높은 점수 가중치를 가집니다.', leaderboardRule3: '정확도와 연속 정답 보너스', leaderboardRule3Desc: '정확도가 높고 연속 정답이 안정적일수록 한 세션 점수가 높아집니다.', leaderboardRuleNote: '너무 짧은 세션은 점수에 반영되지 않으며, 한 세션 최대 점수 제한이 있습니다.', leaderboardCurrent: '현재 랭킹', leaderboardMyRankGuest: '로그인하면 랭킹에 참여할 수 있습니다', leaderboardHistory: '최근 기록', leaderboardHistoryDesc: '최근 유효 점수 세션을 확인할 수 있습니다.', authDisplayName: '표시 이름', authEmail: '이메일', authPassword: '비밀번호', authDisplayNamePlaceholder: '예: Morse Rookie', authPasswordPlaceholder: '비밀번호 입력', authEmailPlaceholder: 'name@example.com', authLoginTitle: '로그인', authRegisterTitle: '회원가입', authSubmitLogin: '로그인', authSubmitRegister: '회원가입', currentAccount: '{name} ({email})', notLoggedIn: '로그인 안 됨', loading: '불러오는 중...', pleaseWait: '잠시만 기다려 주세요', noLeaderboard: '랭킹 데이터가 없습니다', trainOneMore: '먼저 한 번 훈련해 보세요', leaderboardLoadFailed: '랭킹을 불러오지 못했습니다', retryLater: '나중에 다시 시도하세요', myRankLine: '내 순위: #{rank} · {name} · {points}점 · 최고 세션 {best}점', loadingMyRank: '내 순위를 불러오는 중...', notRankedYet: '아직 랭킹 기록이 없습니다. 먼저 유효한 훈련을 완료하세요.', myRankUnavailable: '내 순위를 불러올 수 없습니다', historyGuest: '로그인하면 최근 기록을 볼 수 있습니다', historyEmpty: '최근 기록이 없습니다', completeTrainingFirst: '먼저 훈련을 완료하세요', historyLoadFailed: '최근 기록을 불러오지 못했습니다', historyRow: '{time} · {level} / {mode}', historyScore: '{points}점 · {score}/{total} · {accuracy}%', feedbackCorrect: '정답! {streak}', feedbackWrong: '오답 — 정답: {answer}', feedbackStreak: '연속 x{streak}', enduranceEnd: '시간 종료! 정답 {score}/{total}, 정확도 {accuracy}%', statRowDone: '{sessions}회 · {accuracy}% · 최고 {best}%', statRowEmpty: '아직 훈련 기록 없음', levelLockedHint: '🔒 이전 레벨을 정확도 80%로 완료하면 해제', planProgressText: '{completed}/{total} 단계 완료 ({percent}%)', planContinue: '학습 계속', planContinueStep: '계속: {phase} · {step}', planDoneCta: '🎉 전부 완료! 자유 연습으로 굳혀 보세요', kochDayLabel: '{day}일차', requirementQuestionsOnly: '{questions}문항', requirementQuestionsAccuracy: '{questions}문항 · {accuracy}% 이상', requirementTarget: '목표: {text}', requirementCurrent: '현재: {questions}문항{accuracyPart}', currentAccuracyPart: ' · {accuracy}%', planStartStep: '이 단계 시작', syncNeedLogin: '동기화 전에 로그인하세요', syncCannotRunGuest: '로그인하지 않아 동기화할 수 없습니다', syncRegisterOk: '회원가입 성공', syncLoginOk: '로그인 성공', syncingNow: '동기화 중...', syncPasswordOk: '비밀번호가 변경되었습니다', syncClearCloudOk: '클라우드 데이터가 삭제되었습니다', syncOk: '동기화 성공', syncFailed: '동기화 실패: {message}', syncRefresh: '클라우드 진행 새로고침 중...', syncRefreshDone: '클라우드 진행을 새로고침했습니다', logoutDone: '로그아웃되었습니다', resetConfirm: '모든 진행을 초기화할까요?', logoutConfirm: '로그아웃할까요?', clearCloudConfirm: '모든 클라우드 데이터를 삭제할까요? 되돌릴 수 없습니다.', promptOldPassword: '기존 비밀번호 입력', promptNewPassword: '새 비밀번호 입력', promptDisplayName: '새 표시 이름 입력', updateDisplayNameOk: '표시 이름이 업데이트되었습니다', updateFailed: '업데이트 실패: {message}', loginFailed: '로그인 실패: {message}', registerFailed: '회원가입 실패: {message}', changePasswordFailed: '변경 실패: {message}', clearFailed: '삭제 실패: {message}', refreshFailed: '새로고침 실패: {message}', syncFailedAlert: '동기화 실패: {message}', profileLogEmpty: '동기화 기록이 아직 없습니다', footerLine1: '온라인 모스 학습 도구 · 브라우저에서 바로 실행 · Space로 다시 재생', footerLine2: '공개 전 실제 연락처, 도메인, 사이트 운영 정보를 교체하세요.' },
  es: { langLabel: 'Idioma', pageTitle: 'Entrenador de Morse | Morse Learning Platform', aboutPageTitle: 'Acerca de | Morse Trainer', privacyPageTitle: 'Política de privacidad | Morse Trainer', contactPageTitle: 'Contacto | Morse Trainer', aboutPageTitle: 'Acerca de | Morse Trainer', privacyPageTitle: 'Política de privacidad | Morse Trainer', contactPageTitle: 'Contacto | Morse Trainer', heroEyebrow: 'Morse Learning Platform', heroTitle: 'Entrenador de Morse', heroSubtitle: 'Práctica estructurada, plan de estudio, tutoriales y sincronización para aprender Morse a largo plazo.', btnPlan: 'Plan de estudio', btnStart: 'Empezar', btnStats: 'Estadísticas', btnLeaderboard: 'Clasificación', btnProfile: 'Perfil', syncLocal: 'Modo local', syncEnabled: 'Sincronización en la nube activada', btnLogin: 'Iniciar sesión', btnRegister: 'Registrarse', btnSyncNow: 'Sincronizar ahora', btnLogout: 'Cerrar sesión', syncUserCurrent: 'Cuenta: {name}', syncUserGuest: 'Sin iniciar sesión', syncLast: 'Última sincronización: {time}', homeLevels: 'Niveles de entrenamiento', homeWhatTitle: 'Qué puedes hacer aquí', homeWhat1Title: 'Empezar desde cero', homeWhat1Desc: 'Construye tu base con tarjetas, opciones auditivas y respuestas escritas.', homeWhat2Title: 'Avanzar con método', homeWhat2Desc: 'Sigue el progreso estilo Koch y un plan por etapas desde letras hasta frases y mensajes.', homeWhat3Title: 'Guardar historial a largo plazo', homeWhat3Desc: 'Tras iniciar sesión, sincroniza tu progreso, estadísticas y pasos completados.', homeTutorialsTitle: 'Tutoriales y contenido', homeTutorial1Title: 'Directorio de tutoriales', homeTutorial1Desc: 'Consulta el índice completo de artículos para aprendizaje continuo y contenido buscable.', homeTutorial2Title: '¿Qué es el código Morse?', homeTutorial2Desc: 'Empieza por lo básico y entiende por qué sigue valiendo la pena aprenderlo hoy.', homeTutorial3Title: '¿Qué es el método Koch?', homeTutorial3Desc: 'Comprende la metodología detrás de una ruta de aprendizaje estructurada.', homeTutorialsCta: 'Ver todos los tutoriales', homeInfoTitle: 'Información del sitio', homeInfo1Title: 'About', homeInfo1Desc: 'Conoce el objetivo, posicionamiento y hoja de ruta del proyecto.', homeInfo2Title: 'Privacy Policy', homeInfo2Desc: 'Revisa la privacidad y el tratamiento de datos, clave antes del lanzamiento público.', homeInfo3Title: 'Contact', homeInfo3Desc: 'Muestra las vías de contacto y comentarios. Sustitúyelas por las tuyas antes de publicar.', profileTitle: 'Perfil', profileCurrent: 'Cuenta actual', profileLastSyncEmpty: 'Última sincronización: —', btnChangePassword: 'Cambiar contraseña', btnClearCloud: 'Borrar datos de la nube', btnManualSync: 'Actualizar progreso en la nube', profileSyncHistory: 'Historial de sincronización', back: 'Volver', exit: 'Salir', statCorrect: 'Correctas', statTotal: 'Total', statStreak: 'Racha', statAccuracy: 'Precisión', enduranceLeft: 'Quedan {seconds}s', endurancePrefix: 'Quedan', enduranceSuffix: 'segundos', btnPlayMorse: 'Reproducir Morse', btnPlay: 'Reproducir', btnNextCard: 'Siguiente', answerPlaceholder: 'Escribe tu respuesta y pulsa Enter...', statsTitle: 'Estadísticas', statSessions: 'Sesiones', statQuestions: 'Preguntas', statAccuracyTotal: 'Precisión total', statBestStreak: 'Mejor racha', levelBreakdown: 'Progreso por nivel', btnResetProgress: 'Reiniciar progreso', leaderboardTitle: 'Clasificación', leaderboardRules: 'Cómo se calculan los puntos', leaderboardRule1: 'Mayor dificultad, más puntos', leaderboardRule1Desc: 'Los niveles más altos tienen más peso por cada respuesta correcta.', leaderboardRule2: 'Los modos difíciles dan más puntos', leaderboardRule2Desc: 'Escritura, frases y resistencia tienen un peso mayor.', leaderboardRule3: 'Precisión y racha suman bonus', leaderboardRule3Desc: 'Cuanta más precisión y estabilidad tengas, mejor será tu puntuación.', leaderboardRuleNote: 'Las sesiones muy cortas no cuentan y existe un límite por sesión.', leaderboardCurrent: 'Clasificación actual', leaderboardMyRankGuest: 'Inicia sesión para participar', leaderboardHistory: 'Mis resultados recientes', leaderboardHistoryDesc: 'Muestra tus últimas sesiones válidas y cómo cambian tus puntos.', authDisplayName: 'Nombre visible', authEmail: 'Correo', authPassword: 'Contraseña', authDisplayNamePlaceholder: 'ej. Morse Rookie', authPasswordPlaceholder: 'Introduce la contraseña', authEmailPlaceholder: 'name@example.com', authLoginTitle: 'Iniciar sesión', authRegisterTitle: 'Registrarse', authSubmitLogin: 'Iniciar sesión', authSubmitRegister: 'Registrarse', currentAccount: '{name} ({email})', notLoggedIn: 'Sin iniciar sesión', loading: 'Cargando...', pleaseWait: 'Espera un momento', noLeaderboard: 'Aún no hay datos', trainOneMore: 'Completa una sesión para empezar', leaderboardLoadFailed: 'No se pudo cargar la clasificación', retryLater: 'Inténtalo más tarde', myRankLine: 'Mi puesto: #{rank} · {name} · {points} pts · Mejor sesión {best} pts', loadingMyRank: 'Cargando mi puesto...', notRankedYet: 'Aún no apareces en la clasificación. Completa una sesión válida primero.', myRankUnavailable: 'No se pudo obtener tu puesto', historyGuest: 'Inicia sesión para ver tus resultados recientes', historyEmpty: 'No hay resultados recientes', completeTrainingFirst: 'Completa una sesión primero', historyLoadFailed: 'No se pudo cargar el historial reciente', historyRow: '{time} · {level} / {mode}', historyScore: '{points} pts · {score}/{total} · {accuracy}%', feedbackCorrect: '¡Correcto! {streak}', feedbackWrong: 'Incorrecto — respuesta correcta: {answer}', feedbackStreak: 'Racha x{streak}', enduranceEnd: '¡Tiempo! Correctas {score}/{total}, precisión {accuracy}%', statRowDone: '{sessions} sesiones · {accuracy}% · mejor {best}%', statRowEmpty: 'Sin práctica aún', levelLockedHint: '🔒 Se desbloquea al completar el nivel anterior con 80% de precisión', planProgressText: '{completed}/{total} pasos completados ({percent}%)', planContinue: 'Seguir estudiando', planContinueStep: 'Continuar: {phase} · {step}', planDoneCta: '🎉 ¡Todo completado! Sigue practicando libremente', kochDayLabel: 'Día {day}', requirementQuestionsOnly: '{questions} preguntas', requirementQuestionsAccuracy: '{questions} preguntas · ≥ {accuracy}%', requirementTarget: 'Objetivo: {text}', requirementCurrent: 'Actual: {questions} preguntas{accuracyPart}', currentAccuracyPart: ' · {accuracy}%', planStartStep: 'Empezar este paso', syncNeedLogin: 'Inicia sesión antes de sincronizar', syncCannotRunGuest: 'Sin iniciar sesión, no se puede sincronizar', syncRegisterOk: 'Registro exitoso', syncLoginOk: 'Inicio de sesión exitoso', syncingNow: 'Sincronizando...', syncPasswordOk: 'Contraseña cambiada', syncClearCloudOk: 'Datos de la nube borrados', syncOk: 'Sincronización exitosa', syncFailed: 'Fallo de sincronización: {message}', syncRefresh: 'Actualizando progreso en la nube...', syncRefreshDone: 'Progreso en la nube actualizado', logoutDone: 'Sesión cerrada', resetConfirm: '¿Reiniciar todo el progreso?', logoutConfirm: '¿Cerrar sesión ahora?', clearCloudConfirm: '¿Borrar todos los datos de la nube? No se puede deshacer.', promptOldPassword: 'Introduce la contraseña anterior', promptNewPassword: 'Introduce la nueva contraseña', promptDisplayName: 'Introduce un nuevo nombre visible', updateDisplayNameOk: 'Nombre visible actualizado', updateFailed: 'Error al actualizar: {message}', loginFailed: 'Error de inicio de sesión: {message}', registerFailed: 'Error de registro: {message}', changePasswordFailed: 'Error al cambiar: {message}', clearFailed: 'Error al borrar: {message}', refreshFailed: 'Error al actualizar: {message}', syncFailedAlert: 'Fallo de sincronización: {message}', profileLogEmpty: 'Aún no hay historial de sincronización', footerLine1: 'Herramienta online para aprender Morse · Funciona directamente en el navegador · Pulsa Space para repetir', footerLine2: 'Antes del lanzamiento público, reemplaza el correo de contacto, el dominio y la información real del sitio.' }
};

function getLanguage() {
  const saved = localStorage.getItem(MORSE_LANG_KEY);
  if (saved && TRANSLATIONS[saved]) return saved;
  return 'en';
}

function format(template, vars = {}) {
  return String(template || '').replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}

function t(key, vars = {}) {
  const lang = window.MORSE_I18N?.currentLang || getLanguage();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS['zh-CN'];
  const fallback = TRANSLATIONS.en?.[key] || TRANSLATIONS['zh-CN'][key] || key;
  return format(dict[key] || fallback, vars);
}

function applyTranslations() {
  const lang = window.MORSE_I18N.currentLang;
  document.documentElement.lang = lang;
  const pageTitleKey = document.body?.dataset?.pageTitle || 'pageTitle';
  document.title = t(pageTitleKey);
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });
  const select = document.getElementById('language-select');
  if (select) {
    select.value = lang;
    const optionLabels = {
      en: 'English',
      'zh-CN': '中文',
      ja: '日本語',
      ko: '한국어',
      es: 'Español',
    };
    Array.from(select.options).forEach((option) => {
      if (optionLabels[option.value]) option.textContent = optionLabels[option.value];
    });
  }
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  window.MORSE_I18N.currentLang = lang;
  localStorage.setItem(MORSE_LANG_KEY, lang);
  applyTranslations();
  window.dispatchEvent(new CustomEvent('morse-language-change', { detail: { lang } }));
}

window.MORSE_I18N = {
  currentLang: getLanguage(),
  t,
  setLanguage,
  getLanguage: () => window.MORSE_I18N.currentLang,
  applyTranslations,
};

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  const select = document.getElementById('language-select');
  if (select) {
    select.value = window.MORSE_I18N.currentLang;
    select.addEventListener('change', (event) => setLanguage(event.target.value));
  }
});
