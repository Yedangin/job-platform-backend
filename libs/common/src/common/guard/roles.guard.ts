import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/role.decorator';

/**
 * 역할 기반 접근 제어 가드 / Role-based access control guard
 *
 * 세션의 role 값이 문자열('ADMIN') 또는 숫자(5) 어느 형태든 처리합니다.
 * Handles session role values whether stored as string ('ADMIN') or number (5).
 *
 * 숫자 → 문자열 매핑 / Numeric → string role mapping:
 *   4 → 'CORPORATE' (기업회원)
 *   5 → 'ADMIN' (관리자)
 *   6 → 'SUPERADMIN' (최고관리자)
 */
// 숫자 역할 값을 문자열로 변환하는 매핑 테이블
// Mapping table to convert numeric role values to strings
const NUMERIC_ROLE_MAP: Record<number, string> = {
  1: 'GUEST',
  2: 'MEMBER',
  3: 'INDIVIDUAL',
  4: 'CORPORATE',
  5: 'ADMIN',
  6: 'SUPERADMIN',
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session || session.role === undefined || session.role === null) {
      throw new ForbiddenException(
        '접근 거부: 세션에 역할 정보 없음 / Access denied: No role found in session',
      );
    }

    // 세션 역할 값을 문자열로 정규화 / Normalize session role value to string
    const rawRole = session.role;
    let normalizedRole: string;

    if (typeof rawRole === 'number') {
      // 숫자인 경우 매핑 테이블로 변환 / Convert numeric value via mapping table
      normalizedRole = NUMERIC_ROLE_MAP[rawRole] || String(rawRole);
    } else {
      const parsed = Number(rawRole);
      if (!isNaN(parsed) && NUMERIC_ROLE_MAP[parsed]) {
        // 숫자 문자열인 경우 ('5' → 'ADMIN') / Numeric string ('5' → 'ADMIN')
        normalizedRole = NUMERIC_ROLE_MAP[parsed];
      } else {
        // 이미 문자열 역할명인 경우 ('ADMIN') / Already a string role name ('ADMIN')
        normalizedRole = String(rawRole).toUpperCase();
      }
    }

    const hasRole = requiredRoles.some(
      (role) => normalizedRole === role.toUpperCase(),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `접근 거부: 필요 역할: ${requiredRoles.join(', ')} / Access denied: Required roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
