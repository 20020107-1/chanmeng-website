# ====== Stage 1: Install dependencies ======
FROM node:22-slim AS deps

WORKDIR /app

# Use Tencent Cloud mirror for Debian packages (faster in mainland China)
RUN sed -i 's|http://deb.debian.org/debian|http://mirrors.cloud.tencent.com/debian|g' /etc/apt/sources.list.d/debian.sources && \
    sed -i 's|http://deb.debian.org/debian-security|http://mirrors.cloud.tencent.com/debian-security|g' /etc/apt/sources.list.d/debian.sources

# Install build tools for native modules (argon2, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config libargon2-dev \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies (including devDependencies for build)
COPY package.json package-lock.json* ./
RUN npm ci

# ====== Stage 2: Build the project ======
FROM node:22-slim AS builder

WORKDIR /app

# Use Tencent Cloud mirror for Debian packages (faster in mainland China)
RUN sed -i 's|http://deb.debian.org/debian|http://mirrors.cloud.tencent.com/debian|g' /etc/apt/sources.list.d/debian.sources && \
    sed -i 's|http://deb.debian.org/debian-security|http://mirrors.cloud.tencent.com/debian-security|g' /etc/apt/sources.list.d/debian.sources

# Install build tools needed during build phase
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config libargon2-dev \
    && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build with standalone output
RUN npm run build

# ====== Stage 3: Production runner ======
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Create non-root user for security
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Ensure correct ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
