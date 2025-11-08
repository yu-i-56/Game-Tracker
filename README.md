# Game Tracker
※ 現在開発中のプロジェクトです。
  今後は以下の機能を実装予定：
  - ゲーム詳細
  - レビュー・評価機能
  - データ分析機能
  - UX改善
  - UI改善
  
ゲーム体験、レビューを記録するアプリケーションです。
日々の学習のアウトプットとして作成しています。

---

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma
- PostgreSQL (Neon)
- Vercel

---

## 実装済み機能

- ダッシュボード画面
- ゲームの登録
- ゲームの一覧表示
- ゲームの削除
- 一覧内検索
- DB連携

今後は以下の機能を実装予定：
- ゲーム詳細
- レビュー・評価機能
- データ分析機能
- UX改善
- UI改善

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
