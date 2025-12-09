# ----------------------------
# 1. BUILDER STAGE
# ----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

# Copy only package files first -> better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies (production + dev)
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Generate Prisma Client
RUN pnpm exec prisma generate

# Create optimized Next.js production build
RUN pnpm run build


# ----------------------------
# 2. RUNNER STAGE
# ----------------------------
FROM node:22-alpine AS runner

WORKDIR /app

RUN corepack enable

# Copy only required files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist

RUN pnpm install --frozen-lockfile --prod

EXPOSE 3000

CMD ["pnpm", "start"]