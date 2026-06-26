# AdSense Integration Notes

## What is already prepared

- `ads.txt` exists at the site root as a placeholder template.
- Every public HTML page can now load AdSense through:
  - `js/site-config.js`
  - `js/adsense.js`
- AdSense loading is disabled by default, so deployment is safe until you enter the real account data.

## How to enable AdSense later

1. Open `js/site-config.js`
2. Replace:

```js
adsenseEnabled: false,
adsenseClient: '',
```

with your real values:

```js
adsenseEnabled: true,
adsenseClient: 'ca-pub-1234567890123456',
```

## Important ID difference

- In `js/site-config.js`, use the full client ID:
  - `ca-pub-1234567890123456`
- In `ads.txt`, use the publisher ID without `ca-`:
  - `pub-1234567890123456`

Your final `ads.txt` line should look like:

```txt
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

## Recommended launch order

1. Add your domain to AdSense
2. Get the real AdSense code snippet and publisher ID
3. Update `js/site-config.js`
4. Update `ads.txt`
5. Deploy
6. Confirm:
   - `https://www.mmccode.com/ads.txt` returns HTTP 200
   - the site is live over HTTPS
   - AdSense "Sites" status can be reviewed in your account

## EEA / UK / Switzerland note

If you serve traffic in the EEA, UK, or Switzerland, you should also prepare a compliant consent flow or Google-certified CMP before enabling personalized ads.
