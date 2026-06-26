// Central site toggles that can be safely edited before each deployment.
window.MORSE_SITE_CONFIG = Object.assign(
  {
    adsenseEnabled: true,
    adsenseClient: 'ca-pub-1195582871220373',
    adsenseMode: 'auto',
  },
  window.MORSE_SITE_CONFIG || {}
);
