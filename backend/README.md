# Form Backend

Node.js + MongoDB backend for a simple form submission.

Setup

1. Copy `.env.example` to `.env` and set `MONGODB_URI`.
2. Install dependencies:

```bash
cd backend
npm install
```

Run

```bash
npm start
# or for development with auto-reload
npm run dev
```

Endpoints

- `POST /api/form` - JSON body: `{ "email": "...", "name": "..." }` (email required)
- `GET /api/form` - List submissions
