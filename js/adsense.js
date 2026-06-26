(function () {
  const config = window.MORSE_SITE_CONFIG || {};
  const enabled = config.adsenseEnabled === true;
  const client = String(config.adsenseClient || '').trim();
  const validClient = /^ca-pub-\d{16}$/.test(client);

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
