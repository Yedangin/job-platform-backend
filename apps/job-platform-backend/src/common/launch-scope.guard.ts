import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';

const PAID_PREFIXES = ['/payment', '/payments'];
const ADMIN_PREFIXES = ['/admin', '/auth/admin'];
const SENSITIVE_PREFIXES = ['/visa-verification'];
const SOCIAL_PREFIXES = [
  '/auth/google',
  '/auth/facebook',
  '/auth/kakao',
  '/auth/apple',
];

function matchesPrefix(path: string, prefixes: string[]) {
  return prefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

@Injectable()
export class LaunchScopeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const path = request.path;

    const disabled =
      (process.env.PAID_FEATURES_ENABLED !== 'true' &&
        matchesPrefix(path, PAID_PREFIXES)) ||
      (process.env.ADMIN_ROUTES_ENABLED !== 'true' &&
        matchesPrefix(path, ADMIN_PREFIXES)) ||
      (process.env.SENSITIVE_DATA_FEATURES_ENABLED !== 'true' &&
        matchesPrefix(path, SENSITIVE_PREFIXES)) ||
      (process.env.SOCIAL_LOGIN_ENABLED !== 'true' &&
        matchesPrefix(path, SOCIAL_PREFIXES));

    if (disabled) {
      throw new NotFoundException();
    }

    return true;
  }
}
