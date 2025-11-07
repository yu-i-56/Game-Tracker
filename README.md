# Game Tracker

Portfolio-ready game backlog tracker built with Next.js 16. Register the games you are playing, record release dates, add cover art links, and keep the list searchable.

![Game Tracker screenshot](public/next.svg)

---

## ✨ Features

- Create, update, and delete game entries with platform, genre, and release date
- Instant client-side validation with React Hook Form × Zod
- Searchable/paginated list backed by server actions (Prisma + SQLite/PostgreSQL)
- Toast notifications for create/delete success states
- Responsive UI components (Radix UI, Tailwind CSS)

---

## 🧱 Tech Stack

- **Framework**: Next.js 16 (App Router) / React 19 / TypeScript 5
- **Database**: Prisma ORM (SQLite for local dev, PostgreSQL in production)
- **UI**: Tailwind CSS, Radix UI primitives, Lucide icons
- **Forms**: React Hook Form, @hookform/resolvers, Zod
- **Feedback**: sonner toast notifications

---

## 🚀 Getting Started (Local)

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
echo "DATABASE_URL=file:./dev.db" > .env.local

# 3. Setup database & Prisma client
npx prisma migrate deploy

# 4. Start the dev server
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

> **Tip**: Docker compose files are included for personal use, but a plain Node.js setup is enough for most viewers.

---

## 📦 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production server (after build) |
| `npm run lint` | Execute ESLint |

---

## 🌐 Deployment

1. Provision a managed PostgreSQL instance (Neon/Supabase/etc.).
2. Update `.env.production` (or Vercel env vars) with the `DATABASE_URL`.
3. Run `npx prisma migrate deploy` against the production database.
4. Deploy via Vercel (recommended) or any platform that supports Next.js standalone output.

Detailed step-by-step instructions are documented in [`think/docs/game-tracker-deploy.md`](../think/docs/game-tracker-deploy.md).

---

## 📌 Project Status

This application is under active development. Upcoming items include:

- Review & rating capture for each game
- Time tracking dashboard
- User authentication

---

## 📄 License

This project is released under the MIT License. See `LICENSE` for details.
