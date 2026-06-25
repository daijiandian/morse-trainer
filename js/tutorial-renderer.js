(function () {
  const data = window.MORSE_TUTORIAL_DATA;
  if (!data) return;

  function getLang() {
    return window.MORSE_I18N?.getLanguage?.() || 'en';
  }

  function pickLocalized(map, lang) {
    return map?.[lang] || map?.en || map?.['zh-CN'] || '';
  }

  function getDirectory(lang) {
    return data.directory.localizations[lang] || data.directory.localizations.en || data.directory.localizations['zh-CN'];
  }

  function getArticle(slug, lang) {
    const article = data.articles[slug];
    if (!article) return null;
    return article.localizations[lang] || article.localizations.en || article.localizations['zh-CN'];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderCard(card) {
    const title = escapeHtml(card.title);
    const desc = escapeHtml(card.desc);
    const titleHtml = card.href ? `<a href="${escapeHtml(card.href)}">${title}</a>` : title;
    return `<div class="routine-card"><strong>${titleHtml}</strong><p>${desc}</p></div>`;
  }

  function setMeta(title, description) {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }

  function setToolbar(lang) {
    const home = document.getElementById('tutorial-home-link');
    if (home) home.textContent = pickLocalized(data.ui.backHome, lang);
    const back = document.getElementById('tutorial-back-link');
    if (back) back.textContent = pickLocalized(data.ui.backTutorials, lang);
  }

  function setHeader(localized) {
    document.documentElement.lang = getLang();
    const title = document.getElementById('tutorial-page-title');
    const summary = document.getElementById('tutorial-page-summary');
    if (title) title.textContent = localized.title;
    if (summary) summary.textContent = localized.summary;
    setMeta(localized.pageTitle, localized.metaDescription);
  }

  function renderDirectory(lang) {
    const localized = getDirectory(lang);
    if (!localized) return;
    setToolbar(lang);
    setHeader(localized);
    const root = document.getElementById('tutorial-content-root');
    if (!root) return;
    root.innerHTML = localized.sections.map((section) => `
      <section class="plan-section">
        <h2>${escapeHtml(section.title)}</h2>
        <div class="daily-routine">${section.cards.map(renderCard).join('')}</div>
      </section>
    `).join('');
  }

  function renderArticle(lang, slug) {
    const localized = getArticle(slug, lang);
    if (!localized) return;
    setToolbar(lang);
    setHeader(localized);
    const root = document.getElementById('tutorial-content-root');
    if (!root) return;
    const intro = localized.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
    const sections = localized.sections.map((section) => `
      <div class="tutorial-article-block">
        <h3>${escapeHtml(section.heading)}</h3>
        ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
      </div>
    `).join('');
    const related = localized.related.map(renderCard).join('');
    root.innerHTML = `
      <section class="plan-section tutorial-article-section">
        ${intro}
        ${sections}
      </section>
      <section class="plan-section">
        <h3>${escapeHtml(localized.relatedHeading)}</h3>
        <div class="daily-routine">${related}</div>
      </section>
    `;
  }

  function renderCurrentTutorialPage() {
    const lang = getLang();
    const type = document.body.dataset.tutorialPage;
    if (type === 'directory') {
      renderDirectory(lang);
      return;
    }
    if (type === 'article') {
      renderArticle(lang, document.body.dataset.tutorialSlug);
    }
  }

  document.addEventListener('DOMContentLoaded', renderCurrentTutorialPage);
  window.addEventListener('morse-language-change', renderCurrentTutorialPage);
})();
