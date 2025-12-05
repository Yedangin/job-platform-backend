FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Prevent Husky from running
ENV HUSKY=0

RUN npm ci

COPY . .

# Generate Prisma clients for Linux Alpine
RUN npm run prisma:generate

RUN npx nx build api-gateway --prod

FROM node:20-alpine AS production

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY --from=builder /app/dist/apps/IN-JOB ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/generated ./generated

EXPOSE 8000

CMD ["node", "main.js"]
