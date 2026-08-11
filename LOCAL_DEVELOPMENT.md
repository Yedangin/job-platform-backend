# Local development

This repository uses Node.js 20 and Docker Compose v2 for the local infrastructure.

## First-time setup

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local` and keep the copied file local only.
3. Create the machine-local MongoDB replica-set key.
   - Windows PowerShell: `./scripts/generate-mongo-keyfile.ps1`
   - macOS/Linux: `./scripts/generate-mongo-keyfile.sh`
4. Start local infrastructure:
   `docker compose -f docker-compose.yml -f docker-compose.local.yml up -d postgres mongodb redis notification-postgres`
5. Generate Prisma clients with `npm run prisma:generate`.
6. Apply only the migrations required for the local databases, then run `npm run start:dev`.

`docker-compose.local.yml` maps the main PostgreSQL service to host port `15432` and the notification PostgreSQL service to `15435` to avoid common port collisions. Match the URLs in `.env.local` to those host ports when the backend itself runs outside Docker.

## Secrets

Never commit `.env`, `.env.local`, `mongo-keyfile`, PEM files, signing keys, or production credentials. Create a different `mongo-keyfile` on every development machine.
