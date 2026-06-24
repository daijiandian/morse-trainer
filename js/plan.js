/** Study plan data */

const PLAN_LOCALES = {
  'zh-CN': {
    studyPlan: {
      title: '摩斯密码系统学习方案',
      summary: '基于 Koch 渐进法和分级听打训练，大约 4 到 8 周从零基础进阶到熟练抄收。',
      dailyMinutes: 20,
      dailyRoutine: [
        { time: '5 分钟', task: '闪卡复习', desc: '快速复习已学字母，强化“声音 - 形态”对应。' },
        { time: '10 分钟', task: '听打练习', desc: '按当前阶段模式进行听辨与输入训练。' },
        { time: '5 分钟', task: '自测检验', desc: '完成一组练习，正确率达到 80% 后再进入下一步。' }
      ],
      principles: [
        '先听辨、后记形，不要一开始就死背对照表。',
        '速度宁慢勿快，准确率达到 80% 再提速或升级。',
        '每天固定练习，比一次练很久更有效。',
        '错误字母要单独加练，不要反复刷已经掌握的内容。'
      ]
    },
    kochGroups: [
      { day: 1, letters: 'K M', tip: '从差异最大的两个字母开始。' },
      { day: 2, letters: 'R S', tip: '一个长划和三个短点，节奏差异明显。' },
      { day: 3, letters: 'U A', tip: '注意短划数量和位置差异。' },
      { day: 4, letters: 'W P', tip: '点划数量接近，重点分辨顺序。' },
      { day: 5, letters: 'L N', tip: '进入中等长度字母。' },
      { day: 6, letters: 'D B', tip: '三划组合，方向相反。' },
      { day: 7, letters: 'C F', tip: '四划字母，需要更多耐心。' },
      { day: 8, letters: 'G H', tip: '都很常见，但容易混淆。' },
      { day: 9, letters: 'J Q', tip: '较长编码，需要反复练习。' },
      { day: 10, letters: 'V Y', tip: '逐步接近完成字母表。' },
      { day: 11, letters: 'X Z', tip: '补全剩余字母。' },
      { day: 12, letters: 'E T I', tip: '最短编码，在高速下最容易混。' },
      { day: 13, letters: 'O', tip: '长音连续划，单独强化。' },
      { day: 14, letters: '全部字母', tip: '混合复习，准备进入完整听打。' }
    ],
    phases: [
      {
        id: 'phase-beginner', levelId: 'beginner', week: '第 1 周', title: '认识摩斯码', goal: '建立字母与点划声音之间的联系，不急于默写。', duration: '3 到 4 天', color: '#4ade80',
        steps: [
          { id: 'beginner-flashcard', levelId: 'beginner', modeId: 'flashcard', title: '闪卡学习 26 个字母', desc: '看字母、听声音、记点划，至少完整过一遍字母表。', requirement: { questions: 26, accuracy: 0 }, duration: '15 分钟/天' },
          { id: 'beginner-choice', levelId: 'beginner', modeId: 'multiple-choice', title: '听音选字母', desc: '关闭视觉提示，纯靠耳朵辨认，20 题正确率达到 80%。', requirement: { questions: 20, accuracy: 80 }, duration: '10 分钟/天' }
        ],
        tips: ['先用 8 WPM 慢速，确保每个点划都能听清。', '优先熟悉 E(.)、T(-)、I(..)、A(.-) 这几个高频字母。']
      },
      {
        id: 'phase-elementary', levelId: 'elementary', week: '第 2 周', title: '字母听打', goal: '听到摩斯码后能立刻打出对应字母，形成输入反射。', duration: '5 到 7 天', color: '#60a5fa',
        steps: [
          { id: 'elementary-listen', levelId: 'elementary', modeId: 'listen-type', title: '听打单字母', desc: '听一个、打一个，15 题正确率达到 85%。', requirement: { questions: 15, accuracy: 85 }, duration: '15 分钟/天' },
          { id: 'elementary-drill', levelId: 'elementary', modeId: 'letter-drill', title: '字母速练', desc: '连续听打，20 题正确率达到 80%，速度 12 WPM。', requirement: { questions: 20, accuracy: 80 }, duration: '10 分钟/天' }
        ],
        tips: ['不要在心里数点划，要整体感知声音轮廓。', '错误字母可回到闪卡模式单独复习。']
      },
      {
        id: 'phase-intermediate', levelId: 'intermediate', week: '第 3 周', title: '单词与组合', goal: '从单字母过渡到单词，掌握高频字母组合。', duration: '5 到 7 天', color: '#fbbf24',
        steps: [
          { id: 'intermediate-combo', levelId: 'intermediate', modeId: 'combo-drill', title: '高频组合训练', desc: '练习 TH、ER、AN 等高频组合，15 题达到 80%。', requirement: { questions: 15, accuracy: 80 }, duration: '10 分钟/天' },
          { id: 'intermediate-word', levelId: 'intermediate', modeId: 'word-listen', title: '短词听打', desc: '练习 3 到 5 个字母的常见词，20 题达到 80%。', requirement: { questions: 20, accuracy: 80 }, duration: '15 分钟/天' }
        ],
        tips: ['单词练习时要尽量听出完整节奏。', '先猜词形，再逐个字母核对。']
      },
      {
        id: 'phase-advanced', levelId: 'advanced', week: '第 4 周', title: '数字与混合内容', goal: '掌握数字编码，并适应字母数字混合抄收。', duration: '5 到 7 天', color: '#f97316',
        steps: [
          { id: 'advanced-word', levelId: 'advanced', modeId: 'word-type', title: '随机单词', desc: '练习更随机的单词，20 题达到 80%。', requirement: { questions: 20, accuracy: 80 }, duration: '15 分钟/天' },
          { id: 'advanced-number', levelId: 'advanced', modeId: 'number-mix', title: '字母数字混合', desc: '模拟呼号、编号等场景，20 题达到 75%。', requirement: { questions: 20, accuracy: 75 }, duration: '10 分钟/天' }
        ],
        tips: ['5(.....) 和 0(-----) 很容易混淆，建议单独加强。', '要逐步熟悉类似 AB1CDE 的呼号结构。']
      },
      {
        id: 'phase-expert', levelId: 'expert', week: '第 5 到 6 周', title: '句子与标点', goal: '能抄收完整句子，并处理标点和更快节奏。', duration: '7 到 10 天', color: '#a78bfa',
        steps: [
          { id: 'expert-sentence', levelId: 'expert', modeId: 'sentence-type', title: '句子听打', desc: '完整句子抄收，15 题正确率达到 75%。', requirement: { questions: 15, accuracy: 75 }, duration: '20 分钟/天' },
          { id: 'expert-punct', levelId: 'expert', modeId: 'punctuation', title: '标点符号练习', desc: '练习句号、逗号、问号等，15 题正确率达到 75%。', requirement: { questions: 15, accuracy: 75 }, duration: '10 分钟/天' }
        ],
        tips: ['句子抄收时先抓关键词，再补全细节。', '标点有固定编码，需要单独记忆。']
      },
      {
        id: 'phase-master', levelId: 'master', week: '第 7 周以后', title: '大师挑战', goal: '适应连续报文、业余无线电通联和高速耐力训练。', duration: '持续练习', color: '#f472b6',
        steps: [
          { id: 'master-headcopy', levelId: 'master', modeId: 'head-copy', title: '抄收报文', desc: '连续抄收 5 到 12 个字符，20 题达到 70%。', requirement: { questions: 20, accuracy: 70 }, duration: '15 分钟/天' },
          { id: 'master-qso', levelId: 'master', modeId: 'qso-practice', title: '通联练习', desc: '练习 CQ、RST、QTH 等通联用语，15 题达到 70%。', requirement: { questions: 15, accuracy: 70 }, duration: '10 分钟/天' },
          { id: 'master-endurance', levelId: 'master', modeId: 'endurance', title: '耐力挑战', desc: '60 秒内尽可能多地正确抄收，目标至少 15 题。', requirement: { questions: 15, accuracy: 60 }, duration: '每日 1 次' }
        ],
        tips: ['Farnsworth：字符 25 WPM，字符间隔按 15 WPM 拉开。', 'CQ、DE、RST、599 这些通联短语要做到滚瓜烂熟。']
      }
    ]
  },
  en: {
    studyPlan: {
      title: 'Structured Morse Learning Plan',
      summary: 'A Koch-style, staged training path that can take you from zero to confident copy in about 4 to 8 weeks.',
      dailyMinutes: 20,
      dailyRoutine: [
        { time: '5 min', task: 'Flashcard review', desc: 'Quickly review learned letters and reinforce the sound-shape link.' },
        { time: '10 min', task: 'Copy practice', desc: 'Do listening and typing drills for your current stage.' },
        { time: '5 min', task: 'Self-check', desc: 'Finish one practice set and move on only after reaching 80% accuracy.' }
      ],
      principles: [
        'Train your ear first, not the lookup chart.',
        'Keep speed controlled and raise it only after reaching about 80% accuracy.',
        'Short daily practice beats occasional long sessions.',
        'Drill weak letters separately instead of over-practicing what you already know.'
      ]
    },
    kochGroups: [
      { day: 1, letters: 'K M', tip: 'Start with two letters that sound very different.' },
      { day: 2, letters: 'R S', tip: 'Focus on the strong rhythm contrast.' },
      { day: 3, letters: 'U A', tip: 'Pay attention to the position of short and long elements.' },
      { day: 4, letters: 'W P', tip: 'The counts feel close, so order matters.' },
      { day: 5, letters: 'L N', tip: 'Move into medium-length patterns.' },
      { day: 6, letters: 'D B', tip: 'Both are three-part patterns but reversed in feel.' },
      { day: 7, letters: 'C F', tip: 'Longer patterns need extra patience.' },
      { day: 8, letters: 'G H', tip: 'Common letters, easy to mix up at speed.' },
      { day: 9, letters: 'J Q', tip: 'Long codes need repetition.' },
      { day: 10, letters: 'V Y', tip: 'You are close to a complete alphabet.' },
      { day: 11, letters: 'X Z', tip: 'Fill in the last uncommon letters.' },
      { day: 12, letters: 'E T I', tip: 'Shortest codes are often the hardest at speed.' },
      { day: 13, letters: 'O', tip: 'Long repeated dashes deserve focused reinforcement.' },
      { day: 14, letters: 'All letters', tip: 'Mixed review before full copy practice.' }
    ],
    phases: [
      {
        id: 'phase-beginner', levelId: 'beginner', week: 'Week 1', title: 'Meet Morse', goal: 'Build the first connection between letters and Morse sounds without rushing into writing.', duration: '3 to 4 days', color: '#4ade80',
        steps: [
          { id: 'beginner-flashcard', levelId: 'beginner', modeId: 'flashcard', title: 'Learn 26 letters with flashcards', desc: 'See the letter, hear the sound, and get through the alphabet at least once.', requirement: { questions: 26, accuracy: 0 }, duration: '15 min/day' },
          { id: 'beginner-choice', levelId: 'beginner', modeId: 'multiple-choice', title: 'Pick the heard letter', desc: 'Hide visual cues and rely on your ear until you reach 80% over 20 questions.', requirement: { questions: 20, accuracy: 80 }, duration: '10 min/day' }
        ],
        tips: ['Start slow at 8 WPM so every element is clear.', 'Get comfortable first with E(.), T(-), I(..), and A(.-).']
      },
      {
        id: 'phase-elementary', levelId: 'elementary', week: 'Week 2', title: 'Letter Copy', goal: 'Hear Morse and type the matching letter with fast recognition.', duration: '5 to 7 days', color: '#60a5fa',
        steps: [
          { id: 'elementary-listen', levelId: 'elementary', modeId: 'listen-type', title: 'Type single letters', desc: 'Hear one, type one, and reach 85% over 15 questions.', requirement: { questions: 15, accuracy: 85 }, duration: '15 min/day' },
          { id: 'elementary-drill', levelId: 'elementary', modeId: 'letter-drill', title: 'Fast letter drill', desc: 'Do continuous copy and reach 80% over 20 questions at 12 WPM.', requirement: { questions: 20, accuracy: 80 }, duration: '10 min/day' }
        ],
        tips: ['Do not count dots and dashes in your head; hear the whole shape.', 'Use flashcards again for letters that still fail often.']
      },
      {
        id: 'phase-intermediate', levelId: 'intermediate', week: 'Week 3', title: 'Words and Common Combos', goal: 'Move from single letters into word rhythm and frequent clusters.', duration: '5 to 7 days', color: '#fbbf24',
        steps: [
          { id: 'intermediate-combo', levelId: 'intermediate', modeId: 'combo-drill', title: 'High-frequency combos', desc: 'Practice TH, ER, AN, and similar groups until you hit 80% over 15 questions.', requirement: { questions: 15, accuracy: 80 }, duration: '10 min/day' },
          { id: 'intermediate-word', levelId: 'intermediate', modeId: 'word-listen', title: 'Short word copy', desc: 'Practice common 3 to 5 letter words and reach 80% over 20 questions.', requirement: { questions: 20, accuracy: 80 }, duration: '15 min/day' }
        ],
        tips: ['Try to hear the full rhythm of the word.', 'Guess the word shape first, then confirm each letter.']
      },
      {
        id: 'phase-advanced', levelId: 'advanced', week: 'Week 4', title: 'Numbers and Mixed Copy', goal: 'Add number codes and get used to mixed letter-number copy.', duration: '5 to 7 days', color: '#f97316',
        steps: [
          { id: 'advanced-word', levelId: 'advanced', modeId: 'word-type', title: 'Random words', desc: 'Train on less predictable words and reach 80% over 20 questions.', requirement: { questions: 20, accuracy: 80 }, duration: '15 min/day' },
          { id: 'advanced-number', levelId: 'advanced', modeId: 'number-mix', title: 'Letters and numbers', desc: 'Simulate call signs and IDs, aiming for 75% over 20 questions.', requirement: { questions: 20, accuracy: 75 }, duration: '10 min/day' }
        ],
        tips: ['5(.....) and 0(-----) are easy to confuse, so isolate them if needed.', 'Get used to call-sign-like structures such as AB1CDE.']
      },
      {
        id: 'phase-expert', levelId: 'expert', week: 'Weeks 5-6', title: 'Sentences and Punctuation', goal: 'Copy complete sentences and handle punctuation at a faster pace.', duration: '7 to 10 days', color: '#a78bfa',
        steps: [
          { id: 'expert-sentence', levelId: 'expert', modeId: 'sentence-type', title: 'Sentence copy', desc: 'Copy full sentences and reach 75% over 15 questions.', requirement: { questions: 15, accuracy: 75 }, duration: '20 min/day' },
          { id: 'expert-punct', levelId: 'expert', modeId: 'punctuation', title: 'Punctuation drill', desc: 'Practice period, comma, question mark, and more to 75% over 15 questions.', requirement: { questions: 15, accuracy: 75 }, duration: '10 min/day' }
        ],
        tips: ['Catch the key words first, then fill in the details.', 'Punctuation has fixed codes and needs separate practice.']
      },
      {
        id: 'phase-master', levelId: 'master', week: 'Week 7 and beyond', title: 'Master Challenge', goal: 'Adapt to message bursts, amateur radio phrases, and endurance copy.', duration: 'Ongoing', color: '#f472b6',
        steps: [
          { id: 'master-headcopy', levelId: 'master', modeId: 'head-copy', title: 'Head copy messages', desc: 'Copy bursts of 5 to 12 characters and reach 70% over 20 questions.', requirement: { questions: 20, accuracy: 70 }, duration: '15 min/day' },
          { id: 'master-qso', levelId: 'master', modeId: 'qso-practice', title: 'QSO phrases', desc: 'Practice CQ, RST, QTH, and similar on-air patterns to 70% over 15 questions.', requirement: { questions: 15, accuracy: 70 }, duration: '10 min/day' },
          { id: 'master-endurance', levelId: 'master', modeId: 'endurance', title: 'Endurance challenge', desc: 'Copy as many items as possible in 60 seconds, with a target of at least 15.', requirement: { questions: 15, accuracy: 60 }, duration: '1 run/day' }
        ],
        tips: ['Farnsworth target: 25 WPM characters with 15 WPM spacing.', 'CQ, DE, RST, and 599 should become automatic.']
      }
    ]
  },
  ja: {
    studyPlan: {
      title: 'モールス学習プラン',
      summary: 'Koch方式と段階的な受信練習を組み合わせ、約4〜8週間でゼロから実用レベルを目指します。',
      dailyMinutes: 20,
      dailyRoutine: [
        { time: '5分', task: 'フラッシュカード復習', desc: '覚えた文字を素早く確認し、音と形の結び付きを強めます。' },
        { time: '10分', task: '受信練習', desc: '現在の段階に合わせて聞き取りと入力の練習を行います。' },
        { time: '5分', task: 'セルフチェック', desc: '1セット終えたら、正確率80%を超えてから次に進みます。' }
      ],
      principles: [
        '対応表を丸暗記する前に、まず耳を鍛えましょう。',
        '正確率80%前後を安定して超えてから速度を上げます。',
        'たまに長くやるより、毎日短く続ける方が効果的です。',
        '苦手な文字は個別に反復し、できるものばかり繰り返さないようにします。'
      ]
    },
    kochGroups: [
      { day: 1, letters: 'K M', tip: '音の違いが大きい2文字から始めます。' },
      { day: 2, letters: 'R S', tip: 'リズムの差をはっきり感じましょう。' },
      { day: 3, letters: 'U A', tip: '短点と長点の位置に注目します。' },
      { day: 4, letters: 'W P', tip: '長さが近いので順序の聞き分けが大切です。' },
      { day: 5, letters: 'L N', tip: '中くらいの長さの符号に入ります。' },
      { day: 6, letters: 'D B', tip: 'どちらも3要素ですが印象が逆です。' },
      { day: 7, letters: 'C F', tip: '長めの符号は落ち着いて聞きましょう。' },
      { day: 8, letters: 'G H', tip: 'よく使う文字ですが高速では混同しやすいです。' },
      { day: 9, letters: 'J Q', tip: '長い符号は反復で慣れます。' },
      { day: 10, letters: 'V Y', tip: '完成まであと少しです。' },
      { day: 11, letters: 'X Z', tip: '残りの少ない文字を埋めます。' },
      { day: 12, letters: 'E T I', tip: '最短の符号ほど高速では混ざりやすいです。' },
      { day: 13, letters: 'O', tip: '長いダッシュの連続を個別に強化します。' },
      { day: 14, letters: '全ての文字', tip: '総復習して本格的な受信に備えます。' }
    ],
    phases: [
      {
        id: 'phase-beginner', levelId: 'beginner', week: '第1週', title: 'モールスに慣れる', goal: '文字とモールス音の最初の結び付きを作り、まだ書き取りを急がない段階です。', duration: '3〜4日', color: '#4ade80',
        steps: [
          { id: 'beginner-flashcard', levelId: 'beginner', modeId: 'flashcard', title: '26文字をフラッシュカードで学ぶ', desc: '文字を見て音を聞き、少なくとも一度は全アルファベットを通します。', requirement: { questions: 26, accuracy: 0 }, duration: '15分/日' },
          { id: 'beginner-choice', levelId: 'beginner', modeId: 'multiple-choice', title: '聞こえた文字を選ぶ', desc: '視覚ヒントを外し、20問で80%に達するまで耳で判断します。', requirement: { questions: 20, accuracy: 80 }, duration: '10分/日' }
        ],
        tips: ['8 WPM から始め、各要素を明確に聞き取ります。', 'E(.)、T(-)、I(..)、A(.-) などの高頻度文字に先に慣れます。']
      },
      {
        id: 'phase-elementary', levelId: 'elementary', week: '第2週', title: '文字の受信入力', goal: 'モールスを聞いた瞬間に対応する文字を素早く入力できるようにします。', duration: '5〜7日', color: '#60a5fa',
        steps: [
          { id: 'elementary-listen', levelId: 'elementary', modeId: 'listen-type', title: '単文字を入力', desc: '1文字ずつ聞いて入力し、15問で85%を目指します。', requirement: { questions: 15, accuracy: 85 }, duration: '15分/日' },
          { id: 'elementary-drill', levelId: 'elementary', modeId: 'letter-drill', title: '高速文字ドリル', desc: '12 WPM で連続練習し、20問で80%を目指します。', requirement: { questions: 20, accuracy: 80 }, duration: '10分/日' }
        ],
        tips: ['点や線を数えず、音の輪郭全体で覚えます。', '苦手な文字はフラッシュカードに戻って個別に復習します。']
      },
      {
        id: 'phase-intermediate', levelId: 'intermediate', week: '第3週', title: '単語と頻出パターン', goal: '単文字から単語のリズムへ進み、頻出の組み合わせを身に付けます。', duration: '5〜7日', color: '#fbbf24',
        steps: [
          { id: 'intermediate-combo', levelId: 'intermediate', modeId: 'combo-drill', title: '高頻度コンボ', desc: 'TH、ER、AN などを15問で80%に達するまで練習します。', requirement: { questions: 15, accuracy: 80 }, duration: '10分/日' },
          { id: 'intermediate-word', levelId: 'intermediate', modeId: 'word-listen', title: '短い単語のコピー', desc: '3〜5文字の単語を20問で80%まで練習します。', requirement: { questions: 20, accuracy: 80 }, duration: '15分/日' }
        ],
        tips: ['単語全体のリズムを聞く意識を持ちます。', 'まず語形を推測し、その後で各文字を確認します。']
      },
      {
        id: 'phase-advanced', levelId: 'advanced', week: '第4週', title: '数字と混合コピー', goal: '数字の符号を加え、文字と数字が混ざった受信に慣れます。', duration: '5〜7日', color: '#f97316',
        steps: [
          { id: 'advanced-word', levelId: 'advanced', modeId: 'word-type', title: 'ランダム単語', desc: '予測しにくい単語を20問で80%まで練習します。', requirement: { questions: 20, accuracy: 80 }, duration: '15分/日' },
          { id: 'advanced-number', levelId: 'advanced', modeId: 'number-mix', title: '文字と数字', desc: 'コールサインや番号を想定し、20問で75%を目指します。', requirement: { questions: 20, accuracy: 75 }, duration: '10分/日' }
        ],
        tips: ['5(.....) と 0(-----) は混同しやすいので個別練習が有効です。', 'AB1CDE のようなコールサイン構造に慣れましょう。']
      },
      {
        id: 'phase-expert', levelId: 'expert', week: '第5〜6週', title: '文と句読点', goal: '文章全体をコピーし、句読点を含む速めのテンポにも対応します。', duration: '7〜10日', color: '#a78bfa',
        steps: [
          { id: 'expert-sentence', levelId: 'expert', modeId: 'sentence-type', title: '文章コピー', desc: '15問で75%に達するまで文全体をコピーします。', requirement: { questions: 15, accuracy: 75 }, duration: '20分/日' },
          { id: 'expert-punct', levelId: 'expert', modeId: 'punctuation', title: '句読点ドリル', desc: 'ピリオド、カンマ、疑問符などを15問で75%まで練習します。', requirement: { questions: 15, accuracy: 75 }, duration: '10分/日' }
        ],
        tips: ['まずキーワードを取り、後から細部を補います。', '句読点は固定符号なので個別練習が必要です。']
      },
      {
        id: 'phase-master', levelId: 'master', week: '第7週以降', title: '達人チャレンジ', goal: '長いメッセージ、アマチュア無線フレーズ、耐久受信に適応します。', duration: '継続', color: '#f472b6',
        steps: [
          { id: 'master-headcopy', levelId: 'master', modeId: 'head-copy', title: 'ヘッドコピー', desc: '5〜12文字のまとまりを20問で70%までコピーします。', requirement: { questions: 20, accuracy: 70 }, duration: '15分/日' },
          { id: 'master-qso', levelId: 'master', modeId: 'qso-practice', title: 'QSOフレーズ', desc: 'CQ、RST、QTH などを15問で70%まで練習します。', requirement: { questions: 15, accuracy: 70 }, duration: '10分/日' },
          { id: 'master-endurance', levelId: 'master', modeId: 'endurance', title: '耐久チャレンジ', desc: '60秒でできるだけ多くコピーし、最低15問を目標にします。', requirement: { questions: 15, accuracy: 60 }, duration: '1回/日' }
        ],
        tips: ['目安は文字速度25 WPM、文字間隔15 WPM の Farnsworth です。', 'CQ、DE、RST、599 などの定型句を自動化しましょう。']
      }
    ]
  },
  ko: {
    studyPlan: {
      title: '모스 학습 계획',
      summary: 'Koch 방식과 단계별 청취 훈련을 결합해 약 4~8주 안에 초보에서 실전 수준까지 올라가는 계획입니다.',
      dailyMinutes: 20,
      dailyRoutine: [
        { time: '5분', task: '플래시카드 복습', desc: '배운 문자를 빠르게 복습하며 소리와 형태 연결을 강화합니다.' },
        { time: '10분', task: '받아쓰기 연습', desc: '현재 단계에 맞춰 듣기와 입력 훈련을 진행합니다.' },
        { time: '5분', task: '자가 점검', desc: '한 세트를 끝낸 뒤 정확도 80%를 넘기면 다음 단계로 이동합니다.' }
      ],
      principles: [
        '대조표 암기보다 먼저 귀를 훈련하세요.',
        '정확도 80% 안팎을 안정적으로 넘긴 뒤 속도를 올리세요.',
        '가끔 오래 하는 것보다 매일 짧게 하는 편이 더 효과적입니다.',
        '약한 문자는 따로 반복하고 이미 익숙한 것만 계속 돌리지 마세요.'
      ]
    },
    kochGroups: [
      { day: 1, letters: 'K M', tip: '소리 차이가 큰 두 문자부터 시작합니다.' },
      { day: 2, letters: 'R S', tip: '리듬 대비를 분명히 느껴 보세요.' },
      { day: 3, letters: 'U A', tip: '짧은 신호와 긴 신호의 위치에 집중합니다.' },
      { day: 4, letters: 'W P', tip: '길이가 비슷해 순서 구분이 중요합니다.' },
      { day: 5, letters: 'L N', tip: '중간 길이 패턴으로 넘어갑니다.' },
      { day: 6, letters: 'D B', tip: '둘 다 3요소지만 느낌이 반대입니다.' },
      { day: 7, letters: 'C F', tip: '긴 패턴은 더 차분히 들어야 합니다.' },
      { day: 8, letters: 'G H', tip: '자주 쓰이지만 속도가 올라가면 헷갈리기 쉽습니다.' },
      { day: 9, letters: 'J Q', tip: '긴 부호는 반복이 답입니다.' },
      { day: 10, letters: 'V Y', tip: '전체 알파벳 완성이 가까워집니다.' },
      { day: 11, letters: 'X Z', tip: '남은 드문 문자를 채웁니다.' },
      { day: 12, letters: 'E T I', tip: '가장 짧은 부호일수록 빠르면 더 헷갈립니다.' },
      { day: 13, letters: 'O', tip: '긴 대시 반복을 따로 강화합니다.' },
      { day: 14, letters: '전체 문자', tip: '종합 복습 후 본격적인 수신으로 넘어갑니다.' }
    ],
    phases: [
      {
        id: 'phase-beginner', levelId: 'beginner', week: '1주차', title: '모스와 친해지기', goal: '문자와 모스 소리 사이의 첫 연결을 만들고, 아직 받아쓰기를 서두르지 않습니다.', duration: '3~4일', color: '#4ade80',
        steps: [
          { id: 'beginner-flashcard', levelId: 'beginner', modeId: 'flashcard', title: '플래시카드로 26자 익히기', desc: '문자를 보고 소리를 들으며 최소 한 번은 전체 알파벳을 훑습니다.', requirement: { questions: 26, accuracy: 0 }, duration: '15분/일' },
          { id: 'beginner-choice', levelId: 'beginner', modeId: 'multiple-choice', title: '들은 문자 고르기', desc: '시각 힌트를 끄고 20문제에서 정확도 80%를 달성할 때까지 귀로 판단합니다.', requirement: { questions: 20, accuracy: 80 }, duration: '10분/일' }
        ],
        tips: ['8 WPM부터 시작해 각 요소를 또렷하게 듣습니다.', 'E(.), T(-), I(..), A(.-) 같은 고빈도 문자를 먼저 익히세요.']
      },
      {
        id: 'phase-elementary', levelId: 'elementary', week: '2주차', title: '문자 받아쓰기', goal: '모스를 들으면 바로 해당 문자를 입력하는 반응을 만듭니다.', duration: '5~7일', color: '#60a5fa',
        steps: [
          { id: 'elementary-listen', levelId: 'elementary', modeId: 'listen-type', title: '단일 문자 입력', desc: '한 글자씩 듣고 입력하며 15문제에서 85%를 목표로 합니다.', requirement: { questions: 15, accuracy: 85 }, duration: '15분/일' },
          { id: 'elementary-drill', levelId: 'elementary', modeId: 'letter-drill', title: '빠른 문자 드릴', desc: '12 WPM에서 연속 훈련하며 20문제 80%를 목표로 합니다.', requirement: { questions: 20, accuracy: 80 }, duration: '10분/일' }
        ],
        tips: ['점과 선을 세지 말고 소리의 전체 윤곽을 익히세요.', '약한 문자는 플래시카드로 돌아가 따로 복습하세요.']
      },
      {
        id: 'phase-intermediate', levelId: 'intermediate', week: '3주차', title: '단어와 자주 쓰는 조합', goal: '단일 문자에서 단어 리듬으로 넘어가고 빈도 높은 조합을 익힙니다.', duration: '5~7일', color: '#fbbf24',
        steps: [
          { id: 'intermediate-combo', levelId: 'intermediate', modeId: 'combo-drill', title: '고빈도 조합', desc: 'TH, ER, AN 같은 조합을 15문제 80%까지 연습합니다.', requirement: { questions: 15, accuracy: 80 }, duration: '10분/일' },
          { id: 'intermediate-word', levelId: 'intermediate', modeId: 'word-listen', title: '짧은 단어 받아쓰기', desc: '3~5글자 단어를 20문제 80%까지 연습합니다.', requirement: { questions: 20, accuracy: 80 }, duration: '15분/일' }
        ],
        tips: ['단어 전체의 리듬을 듣는 감각을 키우세요.', '먼저 단어 형태를 추측하고 각 문자를 확인하세요.']
      },
      {
        id: 'phase-advanced', levelId: 'advanced', week: '4주차', title: '숫자와 혼합 수신', goal: '숫자 부호를 추가하고 문자+숫자 혼합 수신에 익숙해집니다.', duration: '5~7일', color: '#f97316',
        steps: [
          { id: 'advanced-word', levelId: 'advanced', modeId: 'word-type', title: '랜덤 단어', desc: '예측하기 어려운 단어를 20문제 80%까지 훈련합니다.', requirement: { questions: 20, accuracy: 80 }, duration: '15분/일' },
          { id: 'advanced-number', levelId: 'advanced', modeId: 'number-mix', title: '문자와 숫자', desc: '호출부호와 식별번호를 가정해 20문제 75%를 목표로 합니다.', requirement: { questions: 20, accuracy: 75 }, duration: '10분/일' }
        ],
        tips: ['5(.....)와 0(-----)는 자주 헷갈리니 따로 연습하세요.', 'AB1CDE 같은 호출부호 구조에 익숙해지세요.']
      },
      {
        id: 'phase-expert', levelId: 'expert', week: '5~6주차', title: '문장과 구두점', goal: '문장 전체를 받아쓰고 더 빠른 속도에서 구두점도 처리합니다.', duration: '7~10일', color: '#a78bfa',
        steps: [
          { id: 'expert-sentence', levelId: 'expert', modeId: 'sentence-type', title: '문장 받아쓰기', desc: '15문제에서 75%까지 문장 전체를 복사합니다.', requirement: { questions: 15, accuracy: 75 }, duration: '20분/일' },
          { id: 'expert-punct', levelId: 'expert', modeId: 'punctuation', title: '구두점 드릴', desc: '마침표, 쉼표, 물음표 등을 15문제 75%까지 연습합니다.', requirement: { questions: 15, accuracy: 75 }, duration: '10분/일' }
        ],
        tips: ['먼저 핵심 단어를 잡고 나중에 세부를 채우세요.', '구두점은 고정 부호라 따로 익혀야 합니다.']
      },
      {
        id: 'phase-master', levelId: 'master', week: '7주차 이후', title: '마스터 챌린지', goal: '장문 메시지, 아마추어 무선 문구, 지구력 수신에 적응합니다.', duration: '계속', color: '#f472b6',
        steps: [
          { id: 'master-headcopy', levelId: 'master', modeId: 'head-copy', title: '헤드 카피', desc: '5~12글자 묶음을 20문제 70%까지 받아씁니다.', requirement: { questions: 20, accuracy: 70 }, duration: '15분/일' },
          { id: 'master-qso', levelId: 'master', modeId: 'qso-practice', title: 'QSO 문구', desc: 'CQ, RST, QTH 등을 15문제 70%까지 연습합니다.', requirement: { questions: 15, accuracy: 70 }, duration: '10분/일' },
          { id: 'master-endurance', levelId: 'master', modeId: 'endurance', title: '지구력 챌린지', desc: '60초 안에 가능한 한 많이 복사하고 최소 15문제를 목표로 합니다.', requirement: { questions: 15, accuracy: 60 }, duration: '1회/일' }
        ],
        tips: ['기준은 문자 속도 25 WPM, 문자 간격 15 WPM의 Farnsworth입니다.', 'CQ, DE, RST, 599 같은 정형 문구를 자동화하세요.']
      }
    ]
  },
  es: {
    studyPlan: {
      title: 'Plan de estudio Morse',
      summary: 'Un recorrido por etapas con método Koch que te lleva de cero a una copia segura en unas 4 a 8 semanas.',
      dailyMinutes: 20,
      dailyRoutine: [
        { time: '5 min', task: 'Repaso con tarjetas', desc: 'Repasa rápidamente las letras aprendidas y refuerza el vínculo entre sonido y forma.' },
        { time: '10 min', task: 'Práctica de copia', desc: 'Haz ejercicios de escucha y escritura según tu etapa actual.' },
        { time: '5 min', task: 'Autoevaluación', desc: 'Termina una tanda y pasa solo cuando superes el 80% de precisión.' }
      ],
      principles: [
        'Primero entrena el oído, no la tabla de referencia.',
        'Mantén la velocidad controlada y súbela cuando superes alrededor del 80% de precisión.',
        'Practicar poco cada día funciona mejor que sesiones largas esporádicas.',
        'Refuerza por separado las letras débiles en lugar de repetir solo lo que ya dominas.'
      ]
    },
    kochGroups: [
      { day: 1, letters: 'K M', tip: 'Empieza con dos letras que suenan muy distintas.' },
      { day: 2, letters: 'R S', tip: 'Concéntrate en el contraste de ritmo.' },
      { day: 3, letters: 'U A', tip: 'Fíjate en la posición de los elementos cortos y largos.' },
      { day: 4, letters: 'W P', tip: 'Como el conteo es parecido, el orden importa mucho.' },
      { day: 5, letters: 'L N', tip: 'Entra ya en patrones de longitud media.' },
      { day: 6, letters: 'D B', tip: 'Ambos tienen tres partes, pero la sensación se invierte.' },
      { day: 7, letters: 'C F', tip: 'Los patrones largos piden más paciencia.' },
      { day: 8, letters: 'G H', tip: 'Son comunes, pero se confunden con facilidad a velocidad.' },
      { day: 9, letters: 'J Q', tip: 'Los códigos largos necesitan repetición.' },
      { day: 10, letters: 'V Y', tip: 'Ya estás cerca de completar el alfabeto.' },
      { day: 11, letters: 'X Z', tip: 'Completa las últimas letras poco frecuentes.' },
      { day: 12, letters: 'E T I', tip: 'Los códigos más cortos suelen ser los más traicioneros en rápido.' },
      { day: 13, letters: 'O', tip: 'Los guiones largos repetidos merecen una práctica aparte.' },
      { day: 14, letters: 'Todas las letras', tip: 'Haz un repaso mixto antes de la copia completa.' }
    ],
    phases: [
      {
        id: 'phase-beginner', levelId: 'beginner', week: 'Semana 1', title: 'Conocer Morse', goal: 'Construye la primera conexión entre letras y sonidos Morse sin lanzarte aún a escribir.', duration: '3 a 4 días', color: '#4ade80',
        steps: [
          { id: 'beginner-flashcard', levelId: 'beginner', modeId: 'flashcard', title: 'Aprender 26 letras con tarjetas', desc: 'Mira la letra, escucha el sonido y recorre el alfabeto completo al menos una vez.', requirement: { questions: 26, accuracy: 0 }, duration: '15 min/día' },
          { id: 'beginner-choice', levelId: 'beginner', modeId: 'multiple-choice', title: 'Elegir la letra oída', desc: 'Oculta las pistas visuales y llega al 80% en 20 preguntas usando solo el oído.', requirement: { questions: 20, accuracy: 80 }, duration: '10 min/día' }
        ],
        tips: ['Empieza a 8 WPM para escuchar con claridad cada elemento.', 'Familiarízate primero con E(.), T(-), I(..) y A(.-).']
      },
      {
        id: 'phase-elementary', levelId: 'elementary', week: 'Semana 2', title: 'Copia de letras', goal: 'Escucha Morse y escribe la letra correspondiente con reconocimiento rápido.', duration: '5 a 7 días', color: '#60a5fa',
        steps: [
          { id: 'elementary-listen', levelId: 'elementary', modeId: 'listen-type', title: 'Escribir letras sueltas', desc: 'Escucha una, escribe una y alcanza el 85% en 15 preguntas.', requirement: { questions: 15, accuracy: 85 }, duration: '15 min/día' },
          { id: 'elementary-drill', levelId: 'elementary', modeId: 'letter-drill', title: 'Drill rápido de letras', desc: 'Haz práctica continua y alcanza el 80% en 20 preguntas a 12 WPM.', requirement: { questions: 20, accuracy: 80 }, duration: '10 min/día' }
        ],
        tips: ['No cuentes puntos y rayas mentalmente; escucha la forma completa.', 'Vuelve a las tarjetas para las letras que aún fallan mucho.']
      },
      {
        id: 'phase-intermediate', levelId: 'intermediate', week: 'Semana 3', title: 'Palabras y combos comunes', goal: 'Pasa de letras sueltas al ritmo de palabras y a los grupos frecuentes.', duration: '5 a 7 días', color: '#fbbf24',
        steps: [
          { id: 'intermediate-combo', levelId: 'intermediate', modeId: 'combo-drill', title: 'Combos de alta frecuencia', desc: 'Practica TH, ER, AN y grupos similares hasta llegar al 80% en 15 preguntas.', requirement: { questions: 15, accuracy: 80 }, duration: '10 min/día' },
          { id: 'intermediate-word', levelId: 'intermediate', modeId: 'word-listen', title: 'Copia de palabras cortas', desc: 'Practica palabras comunes de 3 a 5 letras y alcanza el 80% en 20 preguntas.', requirement: { questions: 20, accuracy: 80 }, duration: '15 min/día' }
        ],
        tips: ['Intenta oír el ritmo completo de la palabra.', 'Adivina primero la forma y luego confirma cada letra.']
      },
      {
        id: 'phase-advanced', levelId: 'advanced', week: 'Semana 4', title: 'Números y copia mixta', goal: 'Añade los números y acostúmbrate a copiar combinaciones de letras y cifras.', duration: '5 a 7 días', color: '#f97316',
        steps: [
          { id: 'advanced-word', levelId: 'advanced', modeId: 'word-type', title: 'Palabras aleatorias', desc: 'Entrena con palabras menos previsibles y llega al 80% en 20 preguntas.', requirement: { questions: 20, accuracy: 80 }, duration: '15 min/día' },
          { id: 'advanced-number', levelId: 'advanced', modeId: 'number-mix', title: 'Letras y números', desc: 'Simula indicativos e identificadores y apunta al 75% en 20 preguntas.', requirement: { questions: 20, accuracy: 75 }, duration: '10 min/día' }
        ],
        tips: ['5(.....) y 0(-----) se confunden con facilidad; aísla ambos si hace falta.', 'Acostúmbrate a estructuras tipo AB1CDE.']
      },
      {
        id: 'phase-expert', levelId: 'expert', week: 'Semanas 5-6', title: 'Frases y puntuación', goal: 'Copia frases completas y maneja la puntuación a un ritmo más rápido.', duration: '7 a 10 días', color: '#a78bfa',
        steps: [
          { id: 'expert-sentence', levelId: 'expert', modeId: 'sentence-type', title: 'Copia de frases', desc: 'Copia frases completas y alcanza el 75% en 15 preguntas.', requirement: { questions: 15, accuracy: 75 }, duration: '20 min/día' },
          { id: 'expert-punct', levelId: 'expert', modeId: 'punctuation', title: 'Drill de puntuación', desc: 'Practica punto, coma, interrogación y más hasta el 75% en 15 preguntas.', requirement: { questions: 15, accuracy: 75 }, duration: '10 min/día' }
        ],
        tips: ['Capta primero las palabras clave y luego completa los detalles.', 'La puntuación tiene códigos fijos y necesita práctica aparte.']
      },
      {
        id: 'phase-master', levelId: 'master', week: 'Semana 7 en adelante', title: 'Reto maestro', goal: 'Adáptate a ráfagas largas, frases de radioafición y copia de resistencia.', duration: 'Continuo', color: '#f472b6',
        steps: [
          { id: 'master-headcopy', levelId: 'master', modeId: 'head-copy', title: 'Copia mental de mensajes', desc: 'Copia bloques de 5 a 12 caracteres y llega al 70% en 20 preguntas.', requirement: { questions: 20, accuracy: 70 }, duration: '15 min/día' },
          { id: 'master-qso', levelId: 'master', modeId: 'qso-practice', title: 'Frases QSO', desc: 'Practica CQ, RST, QTH y otros patrones al 70% en 15 preguntas.', requirement: { questions: 15, accuracy: 70 }, duration: '10 min/día' },
          { id: 'master-endurance', levelId: 'master', modeId: 'endurance', title: 'Reto de resistencia', desc: 'Copia tantas unidades como puedas en 60 segundos con meta mínima de 15.', requirement: { questions: 15, accuracy: 60 }, duration: '1 sesión/día' }
        ],
        tips: ['Objetivo Farnsworth: caracteres a 25 WPM con espaciado de 15 WPM.', 'CQ, DE, RST y 599 deberían volverse automáticos.']
      }
    ]
  }
};

function getPlanLanguage() {
  const lang = window.MORSE_I18N?.getLanguage?.() || window.MORSE_I18N?.currentLang || 'zh-CN';
  if (PLAN_LOCALES[lang]) return lang;
  const short = lang.split('-')[0];
  if (PLAN_LOCALES[short]) return short;
  return 'zh-CN';
}

function getPlanLocale() {
  return PLAN_LOCALES[getPlanLanguage()] || PLAN_LOCALES['zh-CN'];
}

Object.defineProperty(window, 'STUDY_PLAN', { get() { return getPlanLocale().studyPlan; } });
Object.defineProperty(window, 'KOCH_GROUPS', { get() { return getPlanLocale().kochGroups; } });
Object.defineProperty(window, 'PLAN_PHASES', { get() { return getPlanLocale().phases; } });

function getAllSteps() {
  return PLAN_PHASES.flatMap((p) => p.steps);
}

function getStepStats(progress, step) {
  const ls = progress.levelStats[step.levelId];
  if (!ls || !ls.modeStats || !ls.modeStats[step.modeId]) {
    return { questions: 0, accuracy: 0, sessions: 0 };
  }

  const modeStats = ls.modeStats[step.modeId];
  const acc = modeStats.questions > 0 ? Math.round((modeStats.correct / modeStats.questions) * 100) : 0;
  return { questions: modeStats.questions, accuracy: acc, sessions: modeStats.sessions };
}

function isStepComplete(progress, step) {
  if (progress.completedSteps && progress.completedSteps.includes(step.id)) return true;
  const stats = getStepStats(progress, step);
  const req = step.requirement;
  if (stats.questions < req.questions) return false;
  if (req.accuracy > 0 && stats.accuracy < req.accuracy) return false;
  return stats.questions >= req.questions;
}

function getPlanProgress(progress) {
  const steps = getAllSteps();
  const completed = steps.filter((s) => isStepComplete(progress, s)).length;
  return { completed, total: steps.length, percent: Math.round((completed / steps.length) * 100) };
}

function getNextStep(progress) {
  for (const phase of PLAN_PHASES) {
    if (!isLevelUnlocked(phase.levelId)) continue;
    for (const step of phase.steps) {
      if (!isStepComplete(progress, step)) return { phase, step };
    }
  }
  return null;
}

function checkAndMarkSteps(progress, levelId, modeId, score, total) {
  if (!progress.completedSteps) progress.completedSteps = [];
  if (!progress.modeStats) progress.modeStats = {};

  if (!progress.levelStats[levelId]) {
    progress.levelStats[levelId] = { sessions: 0, questions: 0, correct: 0, bestAccuracy: 0, modeStats: {} };
  }
  const ls = progress.levelStats[levelId];
  if (!ls.modeStats) ls.modeStats = {};
  if (!ls.modeStats[modeId]) {
    ls.modeStats[modeId] = { sessions: 0, questions: 0, correct: 0, bestAccuracy: 0 };
  }
  const ms = ls.modeStats[modeId];
  ms.sessions += 1;
  ms.questions += total;
  ms.correct += score;
  const acc = total > 0 ? Math.round((score / total) * 100) : 0;
  ms.bestAccuracy = Math.max(ms.bestAccuracy, acc);

  for (const step of getAllSteps()) {
    if (step.levelId === levelId && step.modeId === modeId && isStepComplete(progress, step)) {
      if (!progress.completedSteps.includes(step.id)) {
        progress.completedSteps.push(step.id);
      }
    }
  }
  return progress;
}

function getCurrentKochDay(progress) {
  const completed = getPlanProgress(progress).completed;
  if (completed <= 1) return 1;
  if (completed <= 3) return 4;
  if (completed <= 5) return 8;
  if (completed <= 8) return 11;
  return 14;
}
