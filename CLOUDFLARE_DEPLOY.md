# Cloudflare no-card deployment

This project can avoid Render by using:

- Frontend: GitHub Pages (`www.mmccode.com`)
- API: Cloudflare Workers
- Database: Cloudflare D1

## Why this route

- No Render credit card step
- No local SQLite persistence risk on ephemeral hosts
- Better overseas latency for a lightweight API

Official references:

- Cloudflare Workers free plan pricing: <https://developers.cloudflare.com/workers/platform/pricing/>
- Cloudflare D1 free plan FAQ: <https://developers.cloudflare.com/d1/reference/faq/>
- Supabase free plan pricing: <https://supabase.com/pricing>

## 1. Create Cloudflare account

Create a free Cloudflare account if you do not already have one.

## 2. Create a D1 database

In Cloudflare dashboard:

1. Go to `Workers & Pages`
2. Open `D1 SQL Database`
3. Create database: `morse-trainer`
4. Save the generated database ID

## 3. Create the API Worker

In Cloudflare dashboard:

1. Go to `Workers & Pages`
2. Click `Create`
3. Choose `Workers`
4. Name it `morse-trainer-api`

The Worker source is in:

- `E:\1-XM\3-摩斯密码\worker-api\src\index.js`

## 4. Bind the D1 database

In Worker settings, add a D1 binding:

- Variable name: `DB`
- Database: `morse-trainer`

Also add a plain text environment variable:

- `AUTH_TOKEN_SECRET`

Use a long random value and keep it private.

## 5. Initialize the database schema

In the D1 console, run the SQL from:

- `E:\1-XM\3-摩斯密码\worker-api\schema.sql`

## 6. Deploy the Worker

After deployment, your API URL will look like:

- `https://morse-trainer-api.<your-subdomain>.workers.dev`

Check:

- `https://morse-trainer-api.<your-subdomain>.workers.dev/health`

Expected response:

```json
{"ok":true}
```

## 7. Bind custom API domain

After the Worker is live, add custom domain:

- `api.mmccode.com`

If Cloudflare manages your DNS, bind it directly in Worker custom domains.
If Alibaba Cloud keeps your DNS, add a record as instructed by Cloudflare.

## 8. Point the frontend to the new API

After the Worker is live, set:

```html
window.MORSE_API_BASE = 'https://api.mmccode.com';
```

The current frontend bootstrap line is in:

- `E:\1-XM\3-摩斯密码\index.html`

## Notes

- Keep the old `server/` folder for local development or backup.
- The new production API does not depend on local SQLite files.
