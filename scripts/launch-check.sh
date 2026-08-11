#!/usr/bin/env bash
set -euo pipefail

load_env_file() {
  local env_file="$1"
  local key value

  while IFS='=' read -r key value || [[ -n "${key}" ]]; do
    key="${key#$'\xEF\xBB\xBF'}"
    key="${key%$'\r'}"
    value="${value%$'\r'}"
    [[ -z "${key}" || "${key}" == \#* ]] && continue
    [[ "${key}" =~ ^[A-Za-z_][A-Za-z0-9_]*$ ]] || continue

    if [[ "${value}" == \"*\" && "${value}" == *\" ]]; then
      value="${value:1:${#value}-2}"
    elif [[ "${value}" == \'*\' && "${value}" == *\' ]]; then
      value="${value:1:${#value}-2}"
    fi
    export "${key}=${value}"
  done < "${env_file}"
}

for env_file in .env .env.local; do
  if [[ -f "${env_file}" ]]; then
    load_env_file "${env_file}"
  fi
done

for flag in PAID_FEATURES_ENABLED ADMIN_ROUTES_ENABLED SENSITIVE_DATA_FEATURES_ENABLED SOCIAL_LOGIN_ENABLED; do
  if [[ "${!flag:-false}" != "true" ]]; then
    echo "ERROR: ${flag} must be true for a full-service launch." >&2
    exit 1
  fi
done

for secret in \
  PORTONE_STORE_ID PORTONE_CHANNEL_KEY PORTONE_IDENTITY_CHANNEL_KEY \
  PORTONE_V2_API_SECRET PORTONE_WEBHOOK_SECRET \
  IDENTITY_DATA_KEY IDENTITY_LOOKUP_PEPPER; do
  value="${!secret:-}"
  lowered="${value,,}"
  if [[ -z "${value}" || "${lowered}" == *"..."* || "${lowered}" == *"your-"* || "${lowered}" == *"replace"* || "${lowered}" == *"change-me"* ]]; then
    echo "ERROR: ${secret} must contain a real test or production credential for full-service launch." >&2
    exit 1
  fi
done

if [[ "${STRIPE_VISA_PLANNER_ENABLED:-false}" == "true" ]]; then
  for secret in STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET; do
    value="${!secret:-}"
    lowered="${value,,}"
    if [[ -z "${value}" || "${lowered}" == *"..."* || "${lowered}" == *"replace"* || "${lowered}" == *"change-me"* ]]; then
      echo "ERROR: ${secret} must contain a real credential when Stripe visa-planner payments are enabled." >&2
      exit 1
    fi
  done
else
  echo "Stripe visa-planner payment routes are disabled pending the security audit."
fi

if [[ "${NTS_BUSINESS_VERIFICATION_ENABLED:-false}" == "true" ]]; then
  value="${NTS_API_SERVICE_KEY:-}"
  lowered="${value,,}"
  if [[ -z "${value}" || "${lowered}" == *"..."* || "${lowered}" == *"your-"* || "${lowered}" == *"replace"* || "${lowered}" == *"change-me"* ]]; then
    echo "ERROR: NTS_API_SERVICE_KEY must contain a real credential when NTS business verification is enabled." >&2
    exit 1
  fi
else
  echo "NTS business verification is disabled pending external-data approval."
fi

if [[ "${LEGACY_JOB_PAYMENT_ENABLED:-false}" == "true" ]]; then
  for secret in IAMPORT_API_KEY IAMPORT_API_SECRET IAMPORT_STORE_ID IAMPORT_PG_PROVIDER; do
    value="${!secret:-}"
    lowered="${value,,}"
    if [[ -z "${value}" || "${lowered}" == *"..."* || "${lowered}" == *"your-"* || "${lowered}" == *"replace"* || "${lowered}" == *"change-me"* ]]; then
      echo "ERROR: ${secret} must contain a real credential when legacy PortOne V1 checkout is enabled." >&2
      exit 1
    fi
  done
else
  echo "Legacy PortOne V1 job-payment checkout is disabled; PortOne V2 remains the supported path."
fi

if [[ ${#IDENTITY_LOOKUP_PEPPER} -lt 32 ]]; then
  echo "ERROR: IDENTITY_LOOKUP_PEPPER must be at least 32 characters." >&2
  exit 1
fi

node -e "const key=Buffer.from(process.env.IDENTITY_DATA_KEY||'', 'base64'); if(key.length!==32){console.error('ERROR: IDENTITY_DATA_KEY must decode to exactly 32 bytes.'); process.exit(1)}"

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
  apps/job-platform-backend/src/common/csrf.guard.spec.ts \
  apps/job-platform-backend/src/member-verification/member-verification.security.spec.ts \
  apps/job-platform-backend/src/identity-verification/identity-crypto.service.spec.ts \
  --runInBand

echo "Checking for critical/high dependency findings..."
npm audit --audit-level=high

echo "Backend launch checks passed."
