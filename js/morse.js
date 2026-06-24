/** Morse code engine — encode/decode and Web Audio playback */

const MORSE_MAP = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
  '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
  '$': '...-..-', '@': '.--.-.',
};

const REVERSE_MORSE = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

const PROSIGNS = {
  AR: '.-.-.',   // end of message
  SK: '...-.-',  // end of contact
  BT: '-...-',   // break / new paragraph
  KN: '-.--.',   // invitation to transmit
};

const COMMON_WORDS = [
  'THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL',
  'CAN', 'HER', 'WAS', 'ONE', 'OUR', 'OUT', 'DAY', 'GET',
  'HAS', 'HIM', 'HIS', 'HOW', 'MAN', 'NEW', 'NOW', 'OLD',
  'SEE', 'TWO', 'WAY', 'WHO', 'BOY', 'DID', 'ITS', 'LET',
  'PUT', 'SAY', 'SHE', 'TOO', 'USE', 'CALL', 'CQ', 'DE',
  'RST', 'QRZ', 'QTH', 'QSL', 'TEST', 'HELP', 'SOS',
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NUMBERS = '0123456789'.split('');

function encode(text) {
  return text
    .toUpperCase()
    .split('')
    .map(ch => {
      if (ch === ' ') return '/';
      return MORSE_MAP[ch] || '';
    })
    .filter(Boolean)
    .join(' ');
}

function decode(morse) {
  return morse
    .trim()
    .split(/\s+/)
    .map(code => {
      if (code === '/') return ' ';
      return REVERSE_MORSE[code] || '?';
    })
    .join('');
}

function randomChar(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function randomWord(minLen = 3, maxLen = 5) {
  const filtered = COMMON_WORDS.filter(w => w.length >= minLen && w.length <= maxLen);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function randomLetters(count, pool = LETTERS) {
  let result = '';
  for (let i = 0; i < count; i++) result += randomChar(pool);
  return result;
}

function randomSentence(wordCount = 5) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]);
  }
  return words.join(' ');
}

class MorsePlayer {
  constructor() {
    this.ctx = null;
    this.gain = null;
    this.frequency = 600;
    this._playing = false;
    this._abort = false;
  }

  _ensureContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.gain = this.ctx.createGain();
      this.gain.connect(this.ctx.destination);
      this.gain.gain.value = 0.3;
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  /** Unit duration in seconds at given WPM (PARIS standard) */
  unitDuration(wpm) {
    return 1.2 / wpm;
  }

  async playTone(duration) {
    if (this._abort) return;
    this._ensureContext();
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = this.frequency;
    osc.connect(this.gain);
    osc.start();
    await this._sleep(duration * 1000);
    osc.stop();
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async playMorse(text, wpm = 15, farnsworth = null) {
    this._abort = false;
    this._playing = true;
    const dit = this.unitDuration(wpm);
    const dah = dit * 3;
    const intraChar = dit;
    const interChar = dit * 3;
    const interWord = dit * 7;
    const letterGap = farnsworth ? this.unitDuration(farnsworth) * 3 : interChar;

    const morse = encode(text);

    for (const token of morse.split(' ')) {
      if (this._abort) break;
      if (token === '/') {
        await this._sleep(interWord * 1000);
        continue;
      }
      for (const symbol of token) {
        if (this._abort) break;
        await this.playTone(symbol === '.' ? dit : dah);
        await this._sleep(intraChar * 1000);
      }
      await this._sleep(letterGap * 1000);
    }

    this._playing = false;
  }

  stop() {
    this._abort = true;
    this._playing = false;
  }

  get isPlaying() {
    return this._playing;
  }
}
