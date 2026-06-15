#!/usr/bin/env bash
set -euo pipefail

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

for flag in PAID_FEATURES_ENABLED ADMIN_ROUTES_ENABLED SENSITIVE_DATA_FEATURES_ENABLED SOCIAL_LOGIN_ENABLED; do
  if [[ "${!flag:-false}" != "true" ]]; then
    echo "ERROR: ${flag} must be true for a full-service launch." >&2
    exit 1
  fi
done

for secret in STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET PORTONE_V2_API_SECRET PORTONE_WEBHOOK_SECRET; do
  if [[ -z "${!secret:-}" || "${!secret}" == *"..."* ]]; then
    echo "ERROR: ${secret} must contain a real test or production credential for full-service launch." >&2
    exit 1
  fi
done

echo "Validating user schema and consent migration..."
npx prisma validate --schema=prisma/user/user.schema.prisma

echo "Checking user database migrations..."
npx prisma migrate status --schema=prisma/user/user.schema.prisma

echo "Building backend..."
npm run build

echo "Running authentication and consent regression tests..."
npx jest \
  apps/job-platform-backend/src/auth/__tests__/auth.service.spec.ts \
  apps/job-platform-backend/src/common/launch-scope.guard.spec.ts \
  --runInBand

echo "Checking for critical/high dependency findings..."
npm audit --audit-level=high

echo "Backend launch checks passed."
