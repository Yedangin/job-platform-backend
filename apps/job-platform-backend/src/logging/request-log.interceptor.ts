import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

/**
 * 전역 요청 로그 인터셉터 — 모든 HTTP 요청 기록
 * Global request log interceptor — records all HTTP requests
 *
 * 민감정보 마스킹: password, token, secret, authorization
 * Sensitive data masking: password, token, secret, authorization
 */
@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  // 민감정보 필드 마스킹 목록 / Fields to mask
  private static readonly SENSITIVE_KEYS = [
    'password',
    'token',
    'secret',
    'authorization',
    'accessToken',
    'refreshToken',
    'sessionId',
  ];

  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();

    const method = request.method;
    const path = request.url || request.path;
    const ip = request.ip || request.headers?.['x-forwarded-for'] || 'unknown';
    const userAgent = request.headers?.['user-agent'] || '';

    // 세션에서 userId 추출 / Extract userId from session
    const userId = request.session?.userId || null;

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
          const responseTime = Date.now() - startTime;

          // 비동기 로그 저장 (응답 차단하지 않음) / Async log save (non-blocking)
          this.loggingService.logRequest({
            method,
            path: this.maskSensitiveInPath(path),
            statusCode,
            userId,
            responseTime,
            ip,
            userAgent,
          });
        },
        error: () => {
          // 에러 시에도 요청 로그 기록 / Log request even on error
          const responseTime = Date.now() - startTime;

          this.loggingService.logRequest({
            method,
            path: this.maskSensitiveInPath(path),
            statusCode: 500,
            userId,
            responseTime,
            ip,
            userAgent,
          });
        },
      }),
    );
  }

  /**
   * 경로의 민감한 쿼리 파라미터 마스킹
   * Mask sensitive query parameters in path
   */
  private maskSensitiveInPath(path: string): string {
    try {
      if (!path.includes('?')) return path;
      const [basePath, query] = path.split('?');
      const params = new URLSearchParams(query);
      for (const key of params.keys()) {
        if (
          RequestLogInterceptor.SENSITIVE_KEYS.some((sk) =>
            key.toLowerCase().includes(sk.toLowerCase()),
          )
        ) {
          params.set(key, '***');
        }
      }
      return `${basePath}?${params.toString()}`;
    } catch {
      return path;
    }
  }
}
