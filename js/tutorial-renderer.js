(function () {
  const data = window.MORSE_TUTORIAL_DATA;
  if (!data) return;
  const SITE_URL = 'https://www.mmccode.com';
  const SITE_NAME = 'Morse Trainer';
  const LAST_UPDATED = 'July 18, 2026';
  const TRUST_COPY = {
    en: {
      note: `Last updated: ${LAST_UPDATED} · Maintained as part of the public Morse Trainer tutorial library on mmccode.com.`,
      sectionTitle: 'Public site and editorial links',
      sectionDesc: 'Tutorial content is maintained independently of advertising decisions. For corrections, support, privacy requests, and public policy details, use the pages below.',
      aboutTitle: 'About',
      aboutDesc: 'Learn what the project offers, who it helps, and how the site is maintained.',
      editorialTitle: 'Editorial Policy',
      editorialDesc: 'See how tutorials are reviewed, corrected, and kept separate from advertising decisions.',
      privacyTitle: 'Privacy Policy',
      privacyDesc: 'Review how account, cookie, and infrastructure-related data handling works.',
      glossaryTitle: 'Morse Code Glossary',
      glossaryDesc: 'Use a practical reference page for learning terms, on-air shorthand, and equipment vocabulary.',
      contactTitle: 'Contact',
      contactDesc: 'Use the public support page for corrections, privacy requests, and direct help.',
      footerLine: 'Structured Morse learning platform · Tutorials, practice, and public support pages',
      footerTutorials: 'Tutorials',
      footerStartHere: 'Start Here',
      footerHowItWorks: 'How It Works',
      footerRoadmap: 'Roadmap',
      footerSiteMap: 'Site Map',
      footerAbout: 'About',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms',
      footerAds: 'Advertising',
      footerEditorial: 'Editorial Policy',
      footerHelp: 'Help Center',
      footerFaq: 'FAQ',
      footerContact: 'Contact'
    },
    'zh-CN': {
      note: `最后更新：2026 年 7 月 18 日 · 本页属于 mmccode.com 公开维护的 Morse Trainer 教程内容体系。`,
      sectionTitle: '公开站点与编辑说明',
      sectionDesc: '教程内容独立于广告决策进行维护。如需查看纠错方式、支持渠道、隐私说明或站点政策，请使用下列公开页面。',
      aboutTitle: '关于',
      aboutDesc: '了解项目提供什么、适合谁使用，以及站点如何持续维护。',
      editorialTitle: '编辑政策',
      editorialDesc: '查看教程内容如何审核、纠错，以及如何与广告决策保持分离。',
      privacyTitle: '隐私政策',
      privacyDesc: '了解账号、Cookie 与基础设施相关的数据处理方式。',
      glossaryTitle: '摩斯术语表',
      glossaryDesc: '通过一个实用参考页快速理解训练术语、无线电缩写和设备词汇。',
      contactTitle: '联系',
      contactDesc: '如需纠错、隐私请求或直接支持，请使用公开联系页。',
      footerLine: '结构化摩斯学习平台 · 教程、训练与公开支持页面',
      footerTutorials: '教程',
      footerStartHere: '新手开始',
      footerHowItWorks: '工作原理',
      footerRoadmap: '学习路线图',
      footerSiteMap: '站点地图',
      footerAbout: '关于',
      footerPrivacy: '隐私政策',
      footerTerms: '使用条款',
      footerAds: '广告说明',
      footerEditorial: '编辑政策',
      footerHelp: '帮助中心',
      footerFaq: '常见问题',
      footerContact: '联系'
    },
    ja: {
      note: `最終更新: 2026年7月18日 · このページは mmccode.com で公開運用されている Morse Trainer のチュートリアル体系の一部です。`,
      sectionTitle: '公開サイトと編集案内',
      sectionDesc: 'チュートリアル内容は広告判断から独立して運用されています。修正方針、サポート窓口、プライバシー説明、サイトポリシーを確認したい場合は、下の公開ページを利用してください。',
      aboutTitle: 'About',
      aboutDesc: 'このプロジェクトが何を提供し、誰に役立ち、サイトがどう維持されているかを確認できます。',
      editorialTitle: 'Editorial Policy',
      editorialDesc: 'チュートリアルの確認方法、修正方針、広告判断との分離について説明します。',
      privacyTitle: 'Privacy Policy',
      privacyDesc: 'アカウント、Cookie、基盤サービスに関するデータ処理を確認できます。',
      glossaryTitle: 'モールス用語集',
      glossaryDesc: '学習用語、無線略語、機材語彙をまとめて確認できる実用リファレンスです。',
      contactTitle: 'Contact',
      contactDesc: '修正依頼、プライバシー相談、直接サポートが必要な場合は公開窓口を利用してください。',
      footerLine: '構造化されたモールス学習プラットフォーム · チュートリアル、練習、公開サポートページ',
      footerTutorials: 'チュートリアル',
      footerStartHere: 'Start Here',
      footerHowItWorks: 'How It Works',
      footerRoadmap: 'Roadmap',
      footerSiteMap: 'サイトマップ',
      footerAbout: 'About',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms',
      footerAds: 'Advertising',
      footerEditorial: 'Editorial Policy',
      footerHelp: 'Help Center',
      footerFaq: 'FAQ',
      footerContact: 'Contact'
    },
    ko: {
      note: `마지막 업데이트: 2026년 7월 18일 · 이 페이지는 mmccode.com 에서 공개 운영 중인 Morse Trainer 튜토리얼 라이브러리의 일부입니다.`,
      sectionTitle: '공개 사이트 및 편집 안내',
      sectionDesc: '튜토리얼 내용은 광고 결정과 독립적으로 운영됩니다. 수정 기준, 지원 경로, 개인정보 안내, 사이트 정책을 확인하려면 아래 공개 페이지를 이용하세요.',
      aboutTitle: 'About',
      aboutDesc: '이 프로젝트가 무엇을 제공하고 누구에게 도움이 되며 사이트가 어떻게 유지되는지 확인합니다.',
      editorialTitle: 'Editorial Policy',
      editorialDesc: '튜토리얼이 어떻게 검토되고 수정되며 광고 판단과 분리되는지 설명합니다.',
      privacyTitle: 'Privacy Policy',
      privacyDesc: '계정, 쿠키, 인프라 관련 데이터 처리 방식을 검토합니다.',
      glossaryTitle: '모스 용어집',
      glossaryDesc: '학습 용어, 무선 약어, 장비 어휘를 정리한 실용 참고 페이지를 확인하세요.',
      contactTitle: 'Contact',
      contactDesc: '수정 요청, 개인정보 문의, 직접 지원이 필요하면 공개 문의 페이지를 이용하세요.',
      footerLine: '구조화된 모스 학습 플랫폼 · 튜토리얼, 훈련, 공개 지원 페이지',
      footerTutorials: '튜토리얼',
      footerStartHere: 'Start Here',
      footerHowItWorks: 'How It Works',
      footerRoadmap: 'Roadmap',
      footerSiteMap: '사이트 맵',
      footerAbout: 'About',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms',
      footerAds: 'Advertising',
      footerEditorial: 'Editorial Policy',
      footerHelp: 'Help Center',
      footerFaq: 'FAQ',
      footerContact: 'Contact'
    },
    es: {
      note: `Última actualización: 18 de julio de 2026 · Esta página forma parte de la biblioteca pública de tutoriales de Morse Trainer mantenida en mmccode.com.`,
      sectionTitle: 'Enlaces públicos y política editorial',
      sectionDesc: 'El contenido de los tutoriales se mantiene de forma independiente de las decisiones publicitarias. Si necesitas ver correcciones, soporte, privacidad o políticas públicas del sitio, usa las páginas siguientes.',
      aboutTitle: 'About',
      aboutDesc: 'Descubre qué ofrece el proyecto, a quién ayuda y cómo se mantiene el sitio.',
      editorialTitle: 'Editorial Policy',
      editorialDesc: 'Explica cómo se revisan y corrigen los tutoriales y cómo se separan de las decisiones publicitarias.',
      privacyTitle: 'Privacy Policy',
      privacyDesc: 'Revisa cómo se manejan los datos de cuenta, las cookies y la infraestructura del sitio.',
      glossaryTitle: 'Glosario del código Morse',
      glossaryDesc: 'Usa una referencia práctica para entender términos de aprendizaje, abreviaturas de radio y vocabulario de equipos.',
      contactTitle: 'Contact',
      contactDesc: 'Usa la página pública de contacto para correcciones, solicitudes de privacidad y ayuda directa.',
      footerLine: 'Plataforma estructurada para aprender Morse · Tutoriales, práctica y páginas públicas de soporte',
      footerTutorials: 'Tutoriales',
      footerStartHere: 'Start Here',
      footerHowItWorks: 'How It Works',
      footerRoadmap: 'Roadmap',
      footerSiteMap: 'Mapa del sitio',
      footerAbout: 'About',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms',
      footerAds: 'Advertising',
      footerEditorial: 'Editorial Policy',
      footerHelp: 'Help Center',
      footerFaq: 'FAQ',
      footerContact: 'Contact'
    }
  };

  function getLang() {
    return window.MORSE_I18N?.getLanguage?.() || 'en';
  }

  function pickLocalized(map, lang) {
    return map?.[lang] || map?.en || map?.['zh-CN'] || '';
  }

  function getDirectory(lang) {
    return data.directory.localizations[lang] || data.directory.localizations.en || data.directory.localizations['zh-CN'];
  }

  function getHistoryHub(lang) {
    return data.historyHub?.localizations?.[lang] || data.historyHub?.localizations?.en || data.historyHub?.localizations?.['zh-CN'];
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

  function getTrustCopy(lang) {
    return TRUST_COPY[lang] || TRUST_COPY.en;
  }

  function getUiLabel(key, fallback) {
    return window.MORSE_I18N?.t?.(key) || fallback;
  }

  function ensureHeaderNote(lang) {
    const header = document.querySelector('.plan-header');
    if (!header) return;
    let note = header.querySelector('.tutorial-meta-note');
    if (!note) {
      note = document.createElement('p');
      note.className = 'section-desc tutorial-meta-note';
      header.appendChild(note);
    }
    note.textContent = getTrustCopy(lang).note;
  }

  function ensureTrustSection(lang) {
    const root = document.getElementById('tutorial-content-root');
    if (!root) return;
    let section = document.getElementById('tutorial-trust-section');
    if (!section) {
      section = document.createElement('section');
      section.id = 'tutorial-trust-section';
      section.className = 'plan-section';
      root.appendChild(section);
    }
    const copy = getTrustCopy(lang);
    section.innerHTML = `
      <h3>${escapeHtml(copy.sectionTitle)}</h3>
      <p class="section-desc">${escapeHtml(copy.sectionDesc)}</p>
      <div class="daily-routine feature-grid">
        ${renderCard({ href: '../about.html', title: getUiLabel('footerAbout', copy.aboutTitle), desc: copy.aboutDesc }).replace('href="../about.html"', 'href="' + escapeHtml(document.body.dataset.tutorialPage === 'article' ? '../about.html' : 'about.html') + '"')}
        ${renderCard({ href: '../editorial-policy.html', title: getUiLabel('footerEditorial', copy.editorialTitle), desc: copy.editorialDesc }).replace('href="../editorial-policy.html"', 'href="' + escapeHtml(document.body.dataset.tutorialPage === 'article' ? '../editorial-policy.html' : 'editorial-policy.html') + '"')}
        ${renderCard({ href: '../privacy.html', title: getUiLabel('footerPrivacy', copy.privacyTitle), desc: copy.privacyDesc }).replace('href="../privacy.html"', 'href="' + escapeHtml(document.body.dataset.tutorialPage === 'article' ? '../privacy.html' : 'privacy.html') + '"')}
        ${renderCard({ href: '../morse-glossary.html', title: copy.glossaryTitle, desc: copy.glossaryDesc }).replace('href="../morse-glossary.html"', 'href="' + escapeHtml(document.body.dataset.tutorialPage === 'article' ? '../morse-glossary.html' : 'morse-glossary.html') + '"')}
        ${renderCard({ href: '../contact.html', title: getUiLabel('footerContact', copy.contactTitle), desc: copy.contactDesc }).replace('href="../contact.html"', 'href="' + escapeHtml(document.body.dataset.tutorialPage === 'article' ? '../contact.html' : 'contact.html') + '"')}
      </div>
    `;
  }

  function ensureFooter(lang) {
    const copy = getTrustCopy(lang);
    let footer = document.querySelector('footer.footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.className = 'footer';
      document.body.appendChild(footer);
    }
    const prefix = document.body.dataset.tutorialPage === 'article' ? '../' : '';
    footer.innerHTML = `
      <p>${escapeHtml(copy.footerLine)}</p>
      <p>
        <a href="${prefix}tutorials.html">${escapeHtml(getUiLabel('footerTutorials', copy.footerTutorials))}</a>
        &middot; <a href="${prefix}start-here.html">${escapeHtml(getUiLabel('footerStartHere', copy.footerStartHere))}</a>
        &middot; <a href="${prefix}how-it-works.html">${escapeHtml(getUiLabel('footerHowItWorks', copy.footerHowItWorks))}</a>
        &middot; <a href="${prefix}learning-roadmap.html">${escapeHtml(getUiLabel('footerRoadmap', copy.footerRoadmap))}</a>
        &middot; <a href="${prefix}site-map.html">${escapeHtml(getUiLabel('footerSiteMap', copy.footerSiteMap))}</a>
        &middot; <a href="${prefix}about.html">${escapeHtml(getUiLabel('footerAbout', copy.footerAbout))}</a>
        &middot; <a href="${prefix}privacy.html">${escapeHtml(getUiLabel('footerPrivacy', copy.footerPrivacy))}</a>
        &middot; <a href="${prefix}terms.html">${escapeHtml(getUiLabel('footerTerms', copy.footerTerms))}</a>
        &middot; <a href="${prefix}advertising.html">${escapeHtml(getUiLabel('footerAds', copy.footerAds))}</a>
        &middot; <a href="${prefix}editorial-policy.html">${escapeHtml(getUiLabel('footerEditorial', copy.footerEditorial))}</a>
        &middot; <a href="${prefix}help.html">${escapeHtml(getUiLabel('footerHelp', copy.footerHelp))}</a>
        &middot; <a href="${prefix}faq.html">${escapeHtml(getUiLabel('footerFaq', copy.footerFaq))}</a>
        &middot; <a href="${prefix}contact.html">${escapeHtml(getUiLabel('footerContact', copy.footerContact))}</a>
      </p>
    `;
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

  function setCollectionStructuredData(lang, localized, pageUrl, breadcrumbItems) {
    const items = collectLinkedCards(localized.sections);
    setJsonLd('tutorial-primary-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: localized.title,
      headline: localized.title,
      description: localized.metaDescription,
      inLanguage: lang,
      url: pageUrl,
      dateModified: '2026-07-18',
      author: buildOrganization(),
      publisher: buildOrganization(),
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
    setJsonLd('tutorial-breadcrumb-jsonld', buildBreadcrumb(breadcrumbItems));
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
      dateModified: '2026-07-18',
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

  function renderCollection(localized, url, breadcrumbItems, lang) {
    if (!localized) return;
    setToolbar(lang);
    setHeader(localized, url, 'website');
    setCollectionStructuredData(lang, localized, url, breadcrumbItems);
    const root = document.getElementById('tutorial-content-root');
    if (!root) return;
    root.innerHTML = localized.sections.map((section) => `
      <section class="plan-section">
        <h2>${escapeHtml(section.title)}</h2>
        <div class="daily-routine">${section.cards.map(renderCard).join('')}</div>
      </section>
    `).join('');
    ensureHeaderNote(lang);
    ensureTrustSection(lang);
    ensureFooter(lang);
  }

  function renderDirectory(lang) {
    const localized = getDirectory(lang);
    renderCollection(localized, `${SITE_URL}/tutorials.html`, [
      { name: SITE_NAME, url: SITE_URL + '/' },
      { name: localized?.title || 'Tutorial Catalog', url: `${SITE_URL}/tutorials.html` }
    ], lang);
  }

  function renderHistoryHub(lang) {
    const localized = getHistoryHub(lang);
    const directoryTitle = getDirectory(lang)?.title || 'Tutorial Catalog';
    renderCollection(localized, `${SITE_URL}/history.html`, [
      { name: SITE_NAME, url: SITE_URL + '/' },
      { name: directoryTitle, url: `${SITE_URL}/tutorials.html` },
      { name: localized?.title || 'Morse Code History Hub', url: `${SITE_URL}/history.html` }
    ], lang);
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
    ensureHeaderNote(lang);
    ensureTrustSection(lang);
    ensureFooter(lang);
  }

  function renderCurrentTutorialPage() {
    const lang = getLang();
    const type = document.body.dataset.tutorialPage;
    if (type === 'directory') {
      renderDirectory(lang);
      return;
    }
    if (type === 'history-hub') {
      renderHistoryHub(lang);
      return;
    }
    if (type === 'article') {
      renderArticle(lang, document.body.dataset.tutorialSlug);
    }
  }

  document.addEventListener('DOMContentLoaded', renderCurrentTutorialPage);
  window.addEventListener('morse-language-change', renderCurrentTutorialPage);
})();
