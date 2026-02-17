import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { LoggingService } from './logging.service';

/**
 * 전역 에러 로그 ExceptionFilter — 모든 예외 기록
 * Global error log filter — records all exceptions
 *
 * 기존 응답 포맷 유지, 로그만 MongoDB에 기록
 * Preserves original response format, only logs to MongoDB
 *
 * 500 에러는 별도 플래그(is500) 설정
 * 500 errors are flagged separately (is500)
 */
@Catch()
export class ErrorLogFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorLogFilter.name);

  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let errorType = 'UnknownException';
    let stack: string | undefined;
    let responseBody: any;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exResponse = exception.getResponse();
      errorType = exception.constructor.name;
      stack = exception.stack;

      // 기존 HttpException 응답 포맷 유지 / Preserve original HttpException response
      if (typeof exResponse === 'string') {
        message = exResponse;
        responseBody = { statusCode, message, error: errorType };
      } else {
        message = (exResponse as any)?.message || exception.message;
        responseBody = exResponse;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorType = exception.constructor.name;
      stack = exception.stack;
      responseBody = { statusCode, message: 'Internal server error' };
    } else {
      responseBody = { statusCode, message: 'Internal server error' };
    }

    // 민감정보 마스킹 (stack에서 password 등 제거)
    // Mask sensitive data in stack trace
    if (stack) {
      stack = stack.replace(
        /(password|token|secret|authorization)[:=]\s*[^\s,}]*/gi,
        '$1=***',
      );
    }

    const userId = request?.session?.userId || null;
    const path = request?.url || request?.path || '';
    const method = request?.method || '';

    // 비동기 에러 로그 저장 (응답 차단 안함) / Async error log save (non-blocking)
    this.loggingService.logError({
      errorType,
      message: typeof message === 'string' ? message : JSON.stringify(message),
      stack,
      userId,
      path,
      method,
      statusCode,
    });

    // 500 에러는 콘솔에도 출력 / Log 500 errors to console too
    if (statusCode >= 500) {
      this.logger.error(
        `[${method}] ${path} — ${statusCode} ${errorType}: ${typeof message === 'string' ? message : JSON.stringify(message)}`,
      );
    }

    // 기존 응답 포맷 그대로 전송 / Send original response format
    response.status(statusCode).json(responseBody);
  }
}
