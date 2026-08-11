# Use Node.js official image
FROM node:20-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies (including devDeps for build)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy app source
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/user/user.schema.prisma && \
    npx prisma generate --schema=./prisma/job/job.schema.prisma && \
    npx prisma generate --schema=./prisma/payment/payment.schema.prisma && \
    npx prisma generate --schema=./prisma/notification/notification.schema.prisma && \
    npx prisma generate --schema=./prisma/log/log.schema.prisma

# Build NestJS app
RUN npm run build

# Remove devDependencies
RUN npm prune --omit=dev

# Copy email templates
RUN cp -r apps/notification-service/src/email/templates dist/apps/notification-service/templates 2>/dev/null || true

# Production stage - copy everything from builder (no npm install)
FROM node:20-alpine

WORKDIR /app

# Copy all files from builder (including pruned node_modules)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/proto ./proto
COPY --from=builder /app/package*.json ./

# Expose the configured app port
EXPOSE 8000

# Start the app
CMD ["node", "dist/apps/job-platform-backend/main"]
