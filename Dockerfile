# ========================================
# ステージ1: 依存関係のインストール
# ========================================
FROM node:20-alpine AS deps

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
# これにより、依存関係が変更されない限りキャッシュが有効になる
COPY package.json package-lock.json ./

# 依存関係をインストール
# --frozen-lockfile: package-lock.jsonを厳密に使用
RUN npm ci --frozen-lockfile

# ========================================
# ステージ2: ビルド環境
# ========================================
FROM node:20-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をdepsステージからコピー
COPY --from=deps /app/node_modules ./node_modules

# アプリケーションのソースコードをコピー
COPY . .

# Prismaクライアントを生成
# データベーススキーマからTypeScript型を生成
RUN npx prisma generate

# Next.jsアプリケーションをビルド
# --webpackオプションは元のpackage.jsonから引き継ぎ
RUN npm run build

# ========================================
# ステージ3: 本番環境
# ========================================
FROM node:20-alpine AS runner

# 作業ディレクトリを設定
WORKDIR /app

# 本番環境であることを明示
ENV NODE_ENV=production

# セキュリティのため、非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.jsの静的ファイルをコピー
COPY --from=builder /app/public ./public

# Next.jsのビルド出力をコピー
# --chown: nextjsユーザーに所有権を変更
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prismaスキーマとクライアントをコピー
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/src/generated ./src/generated

# データベースファイル用のディレクトリを作成
RUN mkdir -p /app/prisma && chown -R nextjs:nodejs /app/prisma

# nextjsユーザーに切り替え
USER nextjs

# アプリケーションがリッスンするポートを公開
EXPOSE 3000

# 環境変数でポートを設定
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# アプリケーションを起動
CMD ["node", "server.js"]

