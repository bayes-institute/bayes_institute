FROM node:22-alpine AS base

RUN corepack enable && corepack prepare pnpm@11.23.0 --activate
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /repo

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY client/apps/web/package.json client/apps/web/package.json
COPY client/apps/auth/package.json client/apps/auth/package.json
COPY client/packages/ui/package.json client/packages/ui/package.json
COPY client/packages/types/package.json client/packages/types/package.json
COPY client/packages/typescript-config/package.json client/packages/typescript-config/package.json
RUN pnpm install --frozen-lockfile

FROM dependencies AS builder

ARG APP_NAME
COPY client ./client
RUN pnpm --filter "@bayes/${APP_NAME}" build

FROM node:22-alpine AS runner

ARG APP_NAME
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    APP_NAME=${APP_NAME}
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /repo/client/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/client/apps/${APP_NAME}/.next/static ./client/apps/${APP_NAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/client/apps/${APP_NAME}/public ./client/apps/${APP_NAME}/public
USER nextjs

EXPOSE 3000
CMD ["sh", "-c", "node client/apps/${APP_NAME}/server.js"]
