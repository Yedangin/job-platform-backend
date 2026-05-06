import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isPublic } from '../decorator/public.decorator';

// CSRF 검증 제외 데코레이터 키 / CSRF skip decorator key
export const SKIP_CSRF_KEY = 'skipCsrf';

/**
 * CSRF 방어 가드: Origin 헤더 검증
 * CSRF defense guard: Origin header verification
 *
 * SameSite cookie + httpOnly 위에 추가 방어 계층으로 작동
 * Works as an additional defense layer on top of SameSite cookie + httpOnly
 *
 * - GET/HEAD/OPTIONS 요청은 항상 통과 (안전한 메서드)
 * - POST/PUT/DELETE 요청은 Origin 또는 Referer 헤더 검증
 * - @Public() 또는 @SkipCsrf() 데코레이터가 적용된 핸들러는 제외
 */
@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly logger = new Logger(CsrfGuard.name);

  // 허용 Origin 목록 / Allowed origins
  private readonly allowedOrigins: string[];

  constructor(private readonly reflector: Reflector) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    this.allowedOrigins = [
      clientUrl,
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://jobchaja.com',
      'https://jobchaja.com',
    ];
  }

  canActivate(context: ExecutionContext): boolean {
    // @Public() 핸들러는 CSRF 검증 제외 / Skip CSRF for @Public() handlers
    const _isPublic = isPublic(context, this.reflector);
    if (_isPublic) return true;

    // @SkipCsrf() 핸들러는 CSRF 검증 제외 / Skip CSRF for @SkipCsrf() handlers
    const skipCsrf = this.reflector.getAllAndOverride<boolean>(SKIP_CSRF_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipCsrf) return true;

    const request = context.switchToHttp().getRequest();
    const method = request.method?.toUpperCase();

    // 안전한 메서드는 항상 통과 / Safe methods always pass
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return true;
    }

    // Origin 또는 Referer 헤더 검증 / Verify Origin or Referer header
    const origin = request.headers?.origin;
    const referer = request.headers?.referer;

    // 내부 서비스 호출 (Origin 없음, Authorization 헤더 사용)은 통과
    // Internal service calls (no Origin, using Authorization header) pass through
    if (!origin && !referer) {
      // JWT Bearer 토큰(header.payload.signature)만 직접 API 호출로 간주
      // Only JWT Bearer tokens (3-part dot-separated) bypass CSRF — session UUIDs do not
      const authHeader = request.headers?.authorization;
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        const isJwt = token.split('.').length === 3;
        if (isJwt) return true;
      }

      // 쿠키 기반 요청에 Origin/Referer 없으면 의심 → 차단
      // Cookie-based request without Origin/Referer is suspicious → block
      if (request.cookies?.sessionId) {
        this.logger.warn(
          `[CSRF 차단] Origin/Referer 헤더 없는 상태변경 요청 / [CSRF blocked] State-changing request without Origin/Referer`,
        );
        throw new ForbiddenException(
          '잘못된 요청입니다. / Invalid request origin.',
        );
      }

      // 비인증 요청(로그인 등)은 Origin 없어도 통과 / Unauthenticated requests pass
      return true;
    }

    // Origin 또는 Referer가 허용 목록에 있는지 확인
    // Check if Origin or Referer is in allowed list
    const checkValue = origin || referer || '';
    const isAllowed = this.allowedOrigins.some((allowed) =>
      checkValue.startsWith(allowed),
    );

    if (!isAllowed) {
      this.logger.warn(
        `[CSRF 차단] 허용되지 않은 Origin: ${checkValue} / [CSRF blocked] Unauthorized Origin`,
      );
      throw new ForbiddenException(
        '허용되지 않은 요청 출처입니다. / Unauthorized request origin.',
      );
    }

    return true;
  }
}
