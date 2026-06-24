/** Training modes from beginner to master */

const TRAINER_LEVELS = {
  'zh-CN': [
    {
      id: 'beginner',
      name: '新手',
      icon: '🌱',
      color: '#4ade80',
      desc: '认识字母与摩斯码对应关系，先从听音选字母开始。',
      wpm: 8,
      modes: ['flashcard', 'multiple-choice']
    },
    {
      id: 'elementary',
      name: '入门',
      icon: '📘',
      color: '#60a5fa',
      desc: '听摩斯码输入字母，巩固 26 个英文字母。',
      wpm: 12,
      modes: ['listen-type', 'letter-drill']
    },
    {
      id: 'intermediate',
      name: '进阶',
      icon: '⚡',
      color: '#fbbf24',
      desc: '练习常用字母组合与短词听打。',
      wpm: 15,
      modes: ['word-listen', 'combo-drill']
    },
    {
      id: 'advanced',
      name: '高级',
      icon: '🎯',
      color: '#f97316',
      desc: '完整字母表加数字，进行随机词组听打。',
      wpm: 18,
      modes: ['word-type', 'number-mix']
    },
    {
      id: 'expert',
      name: '专家',
      icon: '🏅',
      color: '#a78bfa',
      desc: '句子听打，包含标点符号，并提高速度。',
      wpm: 22,
      modes: ['sentence-type', 'punctuation']
    },
    {
      id: 'master',
      name: '大师',
      icon: '🧠',
      color: '#f472b6',
      desc: '连续抄收报文、通联用语与 Farnsworth 高速挑战。',
      wpm: 25,
      farnsworth: 15,
      modes: ['head-copy', 'qso-practice', 'endurance']
    }
  ],
  en: [
    {
      id: 'beginner',
      name: 'Beginner',
      icon: '🌱',
      color: '#4ade80',
      desc: 'Learn basic letter-to-Morse mapping, starting with listening and recognition.',
      wpm: 8,
      modes: ['flashcard', 'multiple-choice']
    },
    {
      id: 'elementary',
      name: 'Elementary',
      icon: '📘',
      color: '#60a5fa',
      desc: 'Type letters from Morse audio and reinforce the 26-letter alphabet.',
      wpm: 12,
      modes: ['listen-type', 'letter-drill']
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      icon: '⚡',
      color: '#fbbf24',
      desc: 'Practice common letter combinations and short-word copying.',
      wpm: 15,
      modes: ['word-listen', 'combo-drill']
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: '🎯',
      color: '#f97316',
      desc: 'Use the full alphabet plus numbers in random word-copy practice.',
      wpm: 18,
      modes: ['word-type', 'number-mix']
    },
    {
      id: 'expert',
      name: 'Expert',
      icon: '🏅',
      color: '#a78bfa',
      desc: 'Copy full sentences with punctuation at higher speeds.',
      wpm: 22,
      modes: ['sentence-type', 'punctuation']
    },
    {
      id: 'master',
      name: 'Master',
      icon: '🧠',
      color: '#f472b6',
      desc: 'Handle message copy, QSO phrases, and high-speed Farnsworth challenges.',
      wpm: 25,
      farnsworth: 15,
      modes: ['head-copy', 'qso-practice', 'endurance']
    }
  ],
  ja: [
    {
      id: 'beginner',
      name: '初級',
      icon: '🌱',
      color: '#4ade80',
      desc: '文字とモールス音の対応を学び、聞き取りと識別から始めます。',
      wpm: 8,
      modes: ['flashcard', 'multiple-choice']
    },
    {
      id: 'elementary',
      name: '入門',
      icon: '📘',
      color: '#60a5fa',
      desc: 'モールス音を聞いて文字を入力し、アルファベット26文字を定着させます。',
      wpm: 12,
      modes: ['listen-type', 'letter-drill']
    },
    {
      id: 'intermediate',
      name: '中級',
      icon: '⚡',
      color: '#fbbf24',
      desc: 'よく使う文字の組み合わせと短い単語の聞き取り入力を練習します。',
      wpm: 15,
      modes: ['word-listen', 'combo-drill']
    },
    {
      id: 'advanced',
      name: '上級',
      icon: '🎯',
      color: '#f97316',
      desc: '数字を含む完全な文字セットでランダムな単語コピーを行います。',
      wpm: 18,
      modes: ['word-type', 'number-mix']
    },
    {
      id: 'expert',
      name: '熟練',
      icon: '🏅',
      color: '#a78bfa',
      desc: '句読点を含む文をより速い速度で聞き取り入力します。',
      wpm: 22,
      modes: ['sentence-type', 'punctuation']
    },
    {
      id: 'master',
      name: '達人',
      icon: '🧠',
      color: '#f472b6',
      desc: '長文抄受、QSO定型文、高速Farnsworthチャレンジに取り組みます。',
      wpm: 25,
      farnsworth: 15,
      modes: ['head-copy', 'qso-practice', 'endurance']
    }
  ],
  ko: [
    {
      id: 'beginner',
      name: '초급',
      icon: '🌱',
      color: '#4ade80',
      desc: '문자와 모스 음의 대응을 익히고, 듣기와 식별부터 시작합니다.',
      wpm: 8,
      modes: ['flashcard', 'multiple-choice']
    },
    {
      id: 'elementary',
      name: '입문',
      icon: '📘',
      color: '#60a5fa',
      desc: '모스 소리를 듣고 문자를 입력하며 26개 알파벳을 익힙니다.',
      wpm: 12,
      modes: ['listen-type', 'letter-drill']
    },
    {
      id: 'intermediate',
      name: '중급',
      icon: '⚡',
      color: '#fbbf24',
      desc: '자주 쓰는 문자 조합과 짧은 단어 받아쓰기를 연습합니다.',
      wpm: 15,
      modes: ['word-listen', 'combo-drill']
    },
    {
      id: 'advanced',
      name: '고급',
      icon: '🎯',
      color: '#f97316',
      desc: '숫자를 포함한 전체 문자 세트로 랜덤 단어 훈련을 진행합니다.',
      wpm: 18,
      modes: ['word-type', 'number-mix']
    },
    {
      id: 'expert',
      name: '전문가',
      icon: '🏅',
      color: '#a78bfa',
      desc: '문장과 구두점을 더 빠른 속도로 받아씁니다.',
      wpm: 22,
      modes: ['sentence-type', 'punctuation']
    },
    {
      id: 'master',
      name: '마스터',
      icon: '🧠',
      color: '#f472b6',
      desc: '장문 수신, QSO 문구, 고속 Farnsworth 도전에 익숙해집니다.',
      wpm: 25,
      farnsworth: 15,
      modes: ['head-copy', 'qso-practice', 'endurance']
    }
  ],
  es: [
    {
      id: 'beginner',
      name: 'Principiante',
      icon: '🌱',
      color: '#4ade80',
      desc: 'Aprende la relación entre letras y Morse empezando por escucha y reconocimiento.',
      wpm: 8,
      modes: ['flashcard', 'multiple-choice']
    },
    {
      id: 'elementary',
      name: 'Inicial',
      icon: '📘',
      color: '#60a5fa',
      desc: 'Escucha Morse y escribe letras para reforzar el alfabeto de 26 caracteres.',
      wpm: 12,
      modes: ['listen-type', 'letter-drill']
    },
    {
      id: 'intermediate',
      name: 'Intermedio',
      icon: '⚡',
      color: '#fbbf24',
      desc: 'Practica combinaciones frecuentes y copia de palabras cortas.',
      wpm: 15,
      modes: ['word-listen', 'combo-drill']
    },
    {
      id: 'advanced',
      name: 'Avanzado',
      icon: '🎯',
      color: '#f97316',
      desc: 'Usa el alfabeto completo y números en ejercicios de palabras aleatorias.',
      wpm: 18,
      modes: ['word-type', 'number-mix']
    },
    {
      id: 'expert',
      name: 'Experto',
      icon: '🏅',
      color: '#a78bfa',
      desc: 'Copia frases completas con puntuación a mayor velocidad.',
      wpm: 22,
      modes: ['sentence-type', 'punctuation']
    },
    {
      id: 'master',
      name: 'Maestro',
      icon: '🧠',
      color: '#f472b6',
      desc: 'Trabaja mensajes largos, frases de QSO y retos rápidos con Farnsworth.',
      wpm: 25,
      farnsworth: 15,
      modes: ['head-copy', 'qso-practice', 'endurance']
    }
  ]
};

const TRAINER_MODE_INFO = {
  'zh-CN': {
    flashcard: { name: '闪卡学习', desc: '看字母学摩斯码，点击播放音频。' },
    'multiple-choice': { name: '听音选字母', desc: '听摩斯码，从 4 个选项中选出正确字母。' },
    'listen-type': { name: '听打字母', desc: '听摩斯码，用键盘输入对应字母。' },
    'letter-drill': { name: '字母速练', desc: '连续练习随机字母，提升听打反应。' },
    'word-listen': { name: '短词听打', desc: '听常见英文短词，输入完整单词。' },
    'combo-drill': { name: '字母组合', desc: '练习常见字母组合，如 TH、ER、AN。' },
    'word-type': { name: '随机单词', desc: '听随机单词并输入。' },
    'number-mix': { name: '字母数字混合', desc: '字母与数字混合练习。' },
    'sentence-type': { name: '句子听打', desc: '听完整句子并输入。' },
    punctuation: { name: '标点符号', desc: '练习包含标点的摩斯码。' },
    'head-copy': { name: '抄收报文', desc: '连续抄收报文，训练记忆与节奏感。' },
    'qso-practice': { name: '通联练习', desc: '模拟业余无线电通联场景。' },
    endurance: { name: '耐力挑战', desc: '60 秒内尽可能多地正确抄收。' }
  },
  en: {
    flashcard: { name: 'Flashcards', desc: 'Study letters and their Morse patterns, then replay the audio.' },
    'multiple-choice': { name: 'Pick the Letter', desc: 'Listen to Morse and choose the correct letter from four options.' },
    'listen-type': { name: 'Type the Letter', desc: 'Listen to Morse and type the matching letter.' },
    'letter-drill': { name: 'Letter Drill', desc: 'Practice random letters continuously to improve reaction speed.' },
    'word-listen': { name: 'Short Words', desc: 'Listen to common short English words and type the full word.' },
    'combo-drill': { name: 'Letter Combos', desc: 'Practice common clusters such as TH, ER, and AN.' },
    'word-type': { name: 'Random Words', desc: 'Listen to random words and type them back.' },
    'number-mix': { name: 'Letters + Numbers', desc: 'Practice mixed letters and digits together.' },
    'sentence-type': { name: 'Sentence Copy', desc: 'Listen to full sentences and type them in.' },
    punctuation: { name: 'Punctuation', desc: 'Practice Morse sequences that include punctuation marks.' },
    'head-copy': { name: 'Head Copy', desc: 'Copy longer message bursts to train rhythm and memory.' },
    'qso-practice': { name: 'QSO Practice', desc: 'Simulate amateur radio contact phrases and patterns.' },
    endurance: { name: 'Endurance', desc: 'Copy as many items correctly as possible in 60 seconds.' }
  },
  ja: {
    flashcard: { name: 'フラッシュカード', desc: '文字とモールス符号を見て覚え、音を再生します。' },
    'multiple-choice': { name: '聞いて文字を選ぶ', desc: 'モールス音を聞いて4択から正しい文字を選びます。' },
    'listen-type': { name: '文字を入力', desc: 'モールス音を聞いて対応する文字を入力します。' },
    'letter-drill': { name: '文字ドリル', desc: 'ランダムな文字を連続で練習して反応速度を上げます。' },
    'word-listen': { name: '短い単語', desc: 'よく使う短い英単語を聞いて単語全体を入力します。' },
    'combo-drill': { name: '文字コンボ', desc: 'TH、ER、AN など頻出の組み合わせを練習します。' },
    'word-type': { name: 'ランダム単語', desc: 'ランダムな単語を聞いて入力します。' },
    'number-mix': { name: '文字と数字', desc: '文字と数字を混ぜた練習を行います。' },
    'sentence-type': { name: '文のコピー', desc: '文全体を聞いて入力します。' },
    punctuation: { name: '句読点', desc: '句読点を含むモールス符号を練習します。' },
    'head-copy': { name: 'ヘッドコピー', desc: '長めのメッセージを抄受して記憶とリズムを鍛えます。' },
    'qso-practice': { name: 'QSO練習', desc: 'アマチュア無線の定型フレーズを想定して練習します。' },
    endurance: { name: '耐久チャレンジ', desc: '60秒でできるだけ多く正しく抄受します。' }
  },
  ko: {
    flashcard: { name: '플래시카드', desc: '문자와 모스 패턴을 보며 익히고 소리를 다시 재생합니다.' },
    'multiple-choice': { name: '글자 고르기', desc: '모스 소리를 듣고 4개 보기 중 정답 문자를 고릅니다.' },
    'listen-type': { name: '문자 입력', desc: '모스 소리를 듣고 해당 문자를 입력합니다.' },
    'letter-drill': { name: '문자 드릴', desc: '랜덤 문자를 연속으로 연습해 반응 속도를 높입니다.' },
    'word-listen': { name: '짧은 단어', desc: '자주 쓰는 짧은 영어 단어를 듣고 전체 단어를 입력합니다.' },
    'combo-drill': { name: '문자 조합', desc: 'TH, ER, AN 같은 자주 나오는 조합을 연습합니다.' },
    'word-type': { name: '랜덤 단어', desc: '랜덤 단어를 듣고 다시 입력합니다.' },
    'number-mix': { name: '문자 + 숫자', desc: '문자와 숫자를 섞어 함께 연습합니다.' },
    'sentence-type': { name: '문장 받아쓰기', desc: '전체 문장을 듣고 입력합니다.' },
    punctuation: { name: '구두점', desc: '구두점이 포함된 모스 부호를 연습합니다.' },
    'head-copy': { name: '헤드 카피', desc: '긴 메시지를 받아 적으며 리듬과 기억력을 훈련합니다.' },
    'qso-practice': { name: 'QSO 연습', desc: '아마추어 무선 교신 문구와 패턴을 연습합니다.' },
    endurance: { name: '지구력 챌린지', desc: '60초 안에 가능한 한 많이 정확히 받아씁니다.' }
  },
  es: {
    flashcard: { name: 'Tarjetas', desc: 'Estudia letras y patrones Morse y vuelve a reproducir el audio.' },
    'multiple-choice': { name: 'Elige la letra', desc: 'Escucha el Morse y elige la letra correcta entre cuatro opciones.' },
    'listen-type': { name: 'Escribe la letra', desc: 'Escucha el Morse y escribe la letra correspondiente.' },
    'letter-drill': { name: 'Drill de letras', desc: 'Practica letras aleatorias de forma continua para mejorar tu reacción.' },
    'word-listen': { name: 'Palabras cortas', desc: 'Escucha palabras cortas comunes y escribe la palabra completa.' },
    'combo-drill': { name: 'Combos de letras', desc: 'Practica grupos frecuentes como TH, ER y AN.' },
    'word-type': { name: 'Palabras aleatorias', desc: 'Escucha palabras aleatorias y escríbelas de nuevo.' },
    'number-mix': { name: 'Letras + números', desc: 'Practica letras y dígitos mezclados al mismo tiempo.' },
    'sentence-type': { name: 'Copiar frases', desc: 'Escucha frases completas y escríbelas.' },
    punctuation: { name: 'Puntuación', desc: 'Practica secuencias Morse que incluyen signos de puntuación.' },
    'head-copy': { name: 'Copia mental', desc: 'Copia ráfagas más largas para entrenar memoria y ritmo.' },
    'qso-practice': { name: 'Práctica QSO', desc: 'Simula frases y patrones típicos de contactos de radioafición.' },
    endurance: { name: 'Resistencia', desc: 'Copia tantos elementos correctamente como puedas en 60 segundos.' }
  }
};

function getTrainerLanguage() {
  const lang = window.MORSE_I18N?.getLanguage?.() || window.MORSE_I18N?.currentLang || 'zh-CN';
  if (TRAINER_LEVELS[lang] && TRAINER_MODE_INFO[lang]) {
    return lang;
  }
  const short = lang.split('-')[0];
  if (TRAINER_LEVELS[short] && TRAINER_MODE_INFO[short]) {
    return short;
  }
  return 'zh-CN';
}

function getLevels() {
  return TRAINER_LEVELS[getTrainerLanguage()] || TRAINER_LEVELS['zh-CN'];
}

function getModeInfo() {
  return TRAINER_MODE_INFO[getTrainerLanguage()] || TRAINER_MODE_INFO['zh-CN'];
}

const COMBOS = [
  'TH', 'HE', 'IN', 'ER', 'AN', 'RE', 'ON', 'AT', 'EN', 'ND',
  'TI', 'ES', 'OR', 'TE', 'OF', 'ED', 'IS', 'IT', 'AL', 'AR',
  'ST', 'TO', 'NT', 'NG', 'SE', 'HA', 'AS', 'OU', 'IO', 'LE'
];

const QSO_TEMPLATES = [
  'CQ CQ DE {call} {call} K',
  'DE {call} RST 599 QTH BEIJING',
  'QRZ QRZ DE {call}',
  'QSL QSL TNX FB 73',
  'TEST TEST DE {call} K',
  '{call} UR RST 579 HR COPY OK'
];

const PUNCTUATION_CHARS = ['.', ',', '?', '!', '/'];

class Trainer {
  constructor(levelId, modeId) {
    this.level = getLevels().find((item) => item.id === levelId) || getLevels()[0];
    this.mode = modeId;
    this.score = 0;
    this.total = 0;
    this.streak = 0;
    this.currentQuestion = null;
    this.flashIndex = 0;
    this.enduranceTimeLeft = 60;
    this.enduranceActive = false;
  }

  get wpm() {
    return this.level.wpm;
  }

  get farnsworth() {
    return this.level.farnsworth || null;
  }

  nextQuestion() {
    switch (this.mode) {
      case 'flashcard':
        return this._flashcard();
      case 'multiple-choice':
        return this._multipleChoice();
      case 'listen-type':
      case 'letter-drill':
        return this._listenType(LETTERS);
      case 'word-listen':
        return this._wordQuestion(3, 5);
      case 'combo-drill':
        return this._comboQuestion();
      case 'word-type':
        return this._wordQuestion(3, 8);
      case 'number-mix':
        return this._numberMix();
      case 'sentence-type':
        return this._sentenceQuestion();
      case 'punctuation':
        return this._punctuationQuestion();
      case 'head-copy':
        return this._headCopy();
      case 'qso-practice':
        return this._qsoQuestion();
      case 'endurance':
        return this._listenType([...LETTERS, ...NUMBERS]);
      default:
        return this._listenType(LETTERS);
    }
  }

  _flashcard() {
    const letter = randomChar(LETTERS);
    this.currentQuestion = {
      type: 'flashcard',
      answer: letter,
      morse: MORSE_MAP[letter],
      hint: `${letter} = ${MORSE_MAP[letter]}`
    };
    return this.currentQuestion;
  }

  _multipleChoice() {
    const answer = randomChar(LETTERS);
    const options = new Set([answer]);
    while (options.size < 4) options.add(randomChar(LETTERS));
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    this.currentQuestion = {
      type: 'multiple-choice',
      answer,
      morse: MORSE_MAP[answer],
      options: shuffled
    };
    return this.currentQuestion;
  }

  _listenType(pool) {
    const answer = randomChar(pool);
    this.currentQuestion = {
      type: 'listen-type',
      answer,
      morse: MORSE_MAP[answer] || encodeChar(answer),
      pool
    };
    return this.currentQuestion;
  }

  _wordQuestion(minLen, maxLen) {
    const answer = randomWord(minLen, maxLen);
    this.currentQuestion = {
      type: 'word',
      answer
    };
    return this.currentQuestion;
  }

  _comboQuestion() {
    const answer = COMBOS[Math.floor(Math.random() * COMBOS.length)];
    this.currentQuestion = {
      type: 'combo',
      answer
    };
    return this.currentQuestion;
  }

  _numberMix() {
    const len = 3 + Math.floor(Math.random() * 4);
    const pool = [...LETTERS, ...NUMBERS];
    const answer = randomLetters(len, pool);
    this.currentQuestion = {
      type: 'number-mix',
      answer
    };
    return this.currentQuestion;
  }

  _sentenceQuestion() {
    const answer = randomSentence(3 + Math.floor(Math.random() * 4));
    this.currentQuestion = {
      type: 'sentence',
      answer
    };
    return this.currentQuestion;
  }

  _punctuationQuestion() {
    const base = randomWord(2, 4);
    const punct = randomChar(PUNCTUATION_CHARS);
    const answer = base + punct;
    this.currentQuestion = {
      type: 'punctuation',
      answer
    };
    return this.currentQuestion;
  }

  _headCopy() {
    const len = 5 + Math.floor(Math.random() * 8);
    const answer = randomLetters(len);
    this.currentQuestion = {
      type: 'head-copy',
      answer,
      noRepeat: true
    };
    return this.currentQuestion;
  }

  _qsoQuestion() {
    const call = randomLetters(3) + randomChar(NUMBERS.slice(0, 3));
    const template = QSO_TEMPLATES[Math.floor(Math.random() * QSO_TEMPLATES.length)];
    const answer = template.replace(/\{call\}/g, call);
    this.currentQuestion = {
      type: 'qso',
      answer
    };
    return this.currentQuestion;
  }

  checkAnswer(input) {
    const normalized = input.trim().toUpperCase();
    const expected = this.currentQuestion.answer.toUpperCase();
    const correct = normalized === expected;
    this.total += 1;
    if (correct) {
      this.score += 1;
      this.streak += 1;
    } else {
      this.streak = 0;
    }
    return {
      correct,
      expected,
      input: normalized
    };
  }

  get accuracy() {
    return this.total === 0 ? 0 : Math.round((this.score / this.total) * 100);
  }
}

function encodeChar(ch) {
  return MORSE_MAP[ch] || PROSIGNS[ch] || '';
}

Object.defineProperty(window, 'LEVELS', {
  get() {
    return getLevels();
  }
});

Object.defineProperty(window, 'MODE_INFO', {
  get() {
    return getModeInfo();
  }
});

window.getLevels = getLevels;
window.getModeInfo = getModeInfo;
window.Trainer = Trainer;
