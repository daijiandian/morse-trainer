(function () {
  const config = window.MORSE_SITE_CONFIG || {};
  const enabled = config.adsenseEnabled === true;
  const client = String(config.adsenseClient || '').trim();
  const validClient = /^ca-pub-\d{16}$/.test(client);
  const pathname = (window.location?.pathname || '/').replace(/\/+$/, '') || '/';
  const allowedPaths = new Set([
    '/tutorials.html',
    '/history.html',
    '/practice-guides.html',
    '/morse-glossary.html',
    '/start-here.html',
    '/how-it-works.html',
    '/learning-roadmap.html',
  ]);
  const isTutorialArticle = /^\/tutorials\/[^/]+\.html$/.test(pathname);
  const allowAdsenseHere = isTutorialArticle || allowedPaths.has(pathname);

  if (!allowAdsenseHere) {
    document.documentElement.dataset.adsense = 'disabled';
    return;
  }

  if (!enabled) {
    document.documentElement.dataset.adsense = 'disabled';
    return;
  }

  if (!validClient) {
    document.documentElement.dataset.adsense = 'invalid';
    return;
  }

  if (
    document.querySelector(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    )
  ) {
    document.documentElement.dataset.adsense = 'enabled';
    return;
  }

  if (document.querySelector('script[data-morse-adsense-loader="true"]')) {
    document.documentElement.dataset.adsense = 'enabled';
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.dataset.morseAdsenseLoader = 'true';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  document.head.appendChild(script);

  document.documentElement.dataset.adsense = 'enabled';
})();
