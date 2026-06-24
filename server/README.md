# Morse Trainer Server

Minimal Node.js server for login and progress sync.

## Run

```bash
cd server
npm install
npm run dev
```

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/progress`
- `POST /api/progress/sync`
- `POST /api/progress/reset`
