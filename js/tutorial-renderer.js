(function () {
  const data = window.MORSE_TUTORIAL_DATA;
  if (!data) return;
  const SITE_URL = 'https://www.mmccode.com';
  const SITE_NAME = 'Morse Trainer';

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

  function setNamedMeta(name, content) {
    const meta = document.querySelector(`meta[name="${name}"]`);
    if (meta) meta.setAttribute('content', content);
  }

  function setPropertyMeta(property, content) {
    const meta = document.querySelector(`meta[property="${property}"]`);
    if (meta) meta.setAttribute('content', content);
  }

  function setCanonical(url) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', url);
  }

  function setJsonLd(id, schema) {
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  function buildOrganization() {
    return {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL + '/'
    };
  }

  function buildBreadcrumb(items) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  function toPublicUrl(href) {
    if (!href) return SITE_URL + '/';
    if (/^https?:\/\//.test(href)) return href;
    const cleaned = href.replace(/^\.\//, '').replace(/^\.\.\//, '');
    if (cleaned.startsWith('tutorials/')) return `${SITE_URL}/${cleaned}`;
    if (document.body.dataset.tutorialPage === 'article') return `${SITE_URL}/tutorials/${cleaned}`;
    return `${SITE_URL}/${cleaned}`;
  }

  function collectLinkedCards(sections) {
    return sections.reduce((items, section) => {
      (section.cards || []).forEach((card) => {
        if (card.href) items.push(card);
      });
      return items;
    }, []);
  }

  function setMeta(title, description, url, type) {
    document.title = title;
    setNamedMeta('description', description);
    setPropertyMeta('og:title', title);
    setPropertyMeta('og:description', description);
    setPropertyMeta('og:url', url);
    if (type) setPropertyMeta('og:type', type);
    setCanonical(url);
  }

  function setToolbar(lang) {
    const home = document.getElementById('tutorial-home-link');
    if (home) home.textContent = pickLocalized(data.ui.backHome, lang);
    const back = document.getElementById('tutorial-back-link');
    if (back) back.textContent = pickLocalized(data.ui.backTutorials, lang);
  }

  function setHeader(localized, url, type) {
    document.documentElement.lang = getLang();
    const title = document.getElementById('tutorial-page-title');
    const summary = document.getElementById('tutorial-page-summary');
    if (title) title.textContent = localized.title;
    if (summary) summary.textContent = localized.summary;
    setMeta(localized.pageTitle, localized.metaDescription, url, type);
  }

  function setDirectoryStructuredData(lang, localized) {
    const pageUrl = `${SITE_URL}/tutorials.html`;
    const items = collectLinkedCards(localized.sections);
    setJsonLd('tutorial-primary-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: localized.title,
      headline: localized.title,
      description: localized.metaDescription,
      inLanguage: lang,
      url: pageUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL + '/'
      }
    });
    setJsonLd('tutorial-list-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map((card, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: card.title,
        url: toPublicUrl(card.href)
      }))
    });
    setJsonLd('tutorial-breadcrumb-jsonld', buildBreadcrumb([
      { name: SITE_NAME, url: SITE_URL + '/' },
      { name: localized.title, url: pageUrl }
    ]));
  }

  function setArticleStructuredData(lang, slug, localized) {
    const pageUrl = `${SITE_URL}/tutorials/${slug}.html`;
    const directoryTitle = getDirectory(lang)?.title || 'Tutorial Catalog';
    setJsonLd('tutorial-primary-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: localized.title,
      description: localized.metaDescription,
      inLanguage: lang,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      author: buildOrganization(),
      publisher: buildOrganization(),
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL + '/'
      }
    });
    setJsonLd('tutorial-breadcrumb-jsonld', buildBreadcrumb([
      { name: SITE_NAME, url: SITE_URL + '/' },
      { name: directoryTitle, url: `${SITE_URL}/tutorials.html` },
      { name: localized.title, url: pageUrl }
    ]));
  }

  function renderDirectory(lang) {
    const localized = getDirectory(lang);
    if (!localized) return;
    setToolbar(lang);
    setHeader(localized, `${SITE_URL}/tutorials.html`, 'website');
    setDirectoryStructuredData(lang, localized);
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
    setHeader(localized, `${SITE_URL}/tutorials/${slug}.html`, 'article');
    setArticleStructuredData(lang, slug, localized);
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
