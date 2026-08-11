import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';

const PAID_PREFIXES = ['/payment', '/payments'];
const PAID_READ_ONLY_EXEMPTIONS = new Set([
  '/payments/viewing-credits/balance',
]);
const ADMIN_PREFIXES = ['/admin', '/auth/admin'];
const SENSITIVE_PREFIXES = ['/visa-verification'];
const SOCIAL_PREFIXES = [
  '/auth/google',
  '/auth/facebook',
  '/auth/kakao',
  '/auth/apple',
];
const STRIPE_VISA_PLANNER_PREFIXES = ['/visa-planner'];
const NTS_BUSINESS_VERIFICATION_PREFIXES = ['/auth/verify-business-number'];

function matchesPrefix(path: string, prefixes: string[]) {
  return prefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

function isLegacyJobPaymentMutation(path: string, method: string) {
  if (method !== 'POST') return false;
  return (
    path === '/payment/orders' ||
    path.startsWith('/payment/orders/') ||
    path === '/payment/upgrade-to-premium' ||
    path.startsWith('/payment/upgrade-to-premium/') ||
    path.startsWith('/payment/admin/revoke-premium/')
  );
}

@Injectable()
export class LaunchScopeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.path;
    const isPaidReadOnlyExemption =
      request.method === 'GET' && PAID_READ_ONLY_EXEMPTIONS.has(path);

    const disabled =
      (process.env.PAID_FEATURES_ENABLED !== 'true' &&
        matchesPrefix(path, PAID_PREFIXES) &&
        !isPaidReadOnlyExemption) ||
      (process.env.ADMIN_ROUTES_ENABLED !== 'true' &&
        matchesPrefix(path, ADMIN_PREFIXES)) ||
      (process.env.SENSITIVE_DATA_FEATURES_ENABLED !== 'true' &&
        matchesPrefix(path, SENSITIVE_PREFIXES)) ||
      (process.env.SOCIAL_LOGIN_ENABLED !== 'true' &&
        matchesPrefix(path, SOCIAL_PREFIXES)) ||
      (process.env.STRIPE_VISA_PLANNER_ENABLED !== 'true' &&
        matchesPrefix(path, STRIPE_VISA_PLANNER_PREFIXES)) ||
      (process.env.NTS_BUSINESS_VERIFICATION_ENABLED !== 'true' &&
        matchesPrefix(path, NTS_BUSINESS_VERIFICATION_PREFIXES)) ||
      (process.env.LEGACY_JOB_PAYMENT_ENABLED !== 'true' &&
        isLegacyJobPaymentMutation(path, request.method));

    if (disabled) {
      throw new NotFoundException();
    }

    return true;
  }
}
