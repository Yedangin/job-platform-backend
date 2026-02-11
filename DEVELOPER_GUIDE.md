# JobChaja Backend - Developer Setup Guide

## Prerequisites

- **Node.js** 20+ (recommended: use `nvm`)
- **Docker & Docker Compose** (for database services)
- **Git**

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-org/job-platform-backend.git
cd job-platform-backend
git checkout feat/admin-profile-auth
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values. Ask the team lead for OAuth secrets and API keys.

Key variables for local development:

| Variable | Local Default | Description |
|----------|--------------|-------------|
| `USER_DATABASE_URL` | `postgres://postgres:password@localhost:5432/users` | PostgreSQL connection |
| `REDIS_HOST` | `localhost` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `API_GATEWAY_PORT` | `8000` | Backend API port |
| `JWT_SECRET` | (set any string) | JWT signing key |
| `GOOGLE_CALLBACK_URL` | `http://localhost:8000/auth/google/callback` | Google OAuth callback |
| `KAKAO_AUTH_CALLBACK_URL` | `http://localhost:8000/auth/kakao/callback` | Kakao OAuth callback |

### 4. Start database services

Start PostgreSQL, MongoDB, and Redis using Docker:

```bash
docker compose up -d postgres mongodb redis
```

This starts:
- **PostgreSQL** on port `5432` (user: `postgres`, password: `password`, db: `users`)
- **MongoDB** on port `27017` (user: `admin`, password: `password`)
- **Redis** on port `6379`

### 5. Generate Prisma client & push schema

```bash
npx prisma generate --schema=./prisma/user/user.schema.prisma
npx prisma db push --schema=./prisma/user/user.schema.prisma
```

> **Note:** Only the User DB schema is required for core functionality. Other schemas (job, payment, notification, log) are optional and may fail if their databases don't exist locally. This is expected.

### 6. Start the backend

```bash
npm run start:dev
```

The server will start at `http://localhost:8000`.

On first startup, an **admin account** is automatically created. Ask the team lead for the admin credentials.

### 7. Verify it's running

```bash
curl http://localhost:8000/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email","password":"your-password"}'
```

You should get a successful response with a session cookie.

---

## Project Structure

```
job-platform-backend/
├── apps/
│   └── job-platform-backend/
│       └── src/
│           ├── auth/           # Authentication (login, register, OAuth, admin)
│           ├── profile/        # User profile & dashboard stats
│           ├── app.module.ts   # Root module
│           └── main.ts         # Entry point
├── prisma/
│   ├── user/                   # User DB schema (primary)
│   ├── job/                    # Job DB schema
│   ├── payment/                # Payment DB schema
│   ├── notification/           # Notification DB schema
│   └── log/                    # Log DB schema
├── libs/common/                # Shared decorators & utilities
├── docker-compose.yml          # Docker services (DB + backend)
├── Dockerfile                  # Production Docker build
└── .env.example                # Environment variables template
```

## Key API Endpoints

### Auth (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Email login |
| GET | `/auth/logout` | Logout (clear session) |
| GET | `/auth/profile` | Get current user profile |
| GET | `/auth/kakao` | Kakao OAuth login |
| GET | `/auth/google` | Google OAuth login |
| POST | `/auth/change-password` | Change password |
| POST | `/auth/delete-account` | Soft delete account |
| GET | `/auth/my/notification-settings` | Get notification settings |
| PUT | `/auth/my/notification-settings` | Update notification settings |
| POST | `/auth/support-ticket` | Create support ticket |
| GET | `/auth/my/support-tickets` | List my support tickets |
| GET | `/auth/my/profile-detail` | Full profile details |

### Admin (`/auth/admin`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/admin/dashboard` | Admin dashboard stats |
| GET | `/auth/admin/users` | List all users |
| PUT | `/auth/admin/users/:id/status` | Toggle user active status |
| GET | `/auth/admin/activity-logs` | Activity logs (sortable, filterable) |
| GET | `/auth/admin/support-tickets` | All support tickets |
| PUT | `/auth/admin/support-tickets/:id` | Answer a support ticket |

### Profile (`/profile`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile/my/dashboard-stats` | Dashboard statistics |
| GET | `/profile/my/applications` | My job applications |
| GET | `/profile/my/interviews` | My interview schedule |

## Database

- **Primary DB**: PostgreSQL `users` database
- **ORM**: Prisma with `@map("snake_case")` column naming
- **Session Store**: Redis (`session:{sessionId}` key pattern)

> **Important:** Do NOT add `JobPrismaService` to any module unless the Jobs database is confirmed available. It will crash the entire server on startup.

---

## Production Deployment (Server)

The production server uses Docker Compose with a shared `webnet` network to connect frontend and backend containers.

### Server docker-compose.yml

The server's `docker-compose.yml` includes a `webnet` external network:

```yaml
networks:
  webnet:
    external: true
```

This allows the frontend container (`job-frontend`) to reach the backend via `http://job-backend:8000`.

### Deployment steps

```bash
# On the server
cd ~/job-platform-backend
git pull origin feat/admin-profile-auth

# Rebuild and restart
docker compose up --build -d

# Verify
docker logs job-backend --tail 5
```

The `docker-compose.yml` command automatically runs `prisma db push` before starting the server.

---

## Troubleshooting

### "Database 'jobs' does not exist"
This is expected if the Jobs DB isn't set up locally. The core auth functionality only needs the `users` database.

### Prisma migration errors
If you get schema conflicts, reset the database:
```bash
docker exec -it postgres psql -U postgres -d users -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npx prisma db push --schema=./prisma/user/user.schema.prisma
```

### Redis connection refused
Make sure Redis is running: `docker compose up -d redis`
