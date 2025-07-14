# Use official Bun image (small and fast)
FROM oven/bun:1.2.12 as base

WORKDIR /app

# Copy only the api app and monorepo libs it depends on
COPY apps/api ./apps/api
COPY libs ./libs
COPY package.json tsconfig.base.json ./

# Install only production dependencies
RUN bun install

# Set environment variables (optional, can be overridden by deployment platform)
ENV PORT=3000

# Expose the port Bun server listens on
EXPOSE 3000

# Start the Bun API server
CMD ["bun", "run", "apps/api/src/server.ts"]