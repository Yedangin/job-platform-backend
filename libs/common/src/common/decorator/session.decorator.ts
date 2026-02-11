import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // 1. 쿠키에서 확인
    let sessionId = request.cookies?.sessionId;

    // 2. Authorization 헤더에서 확인 (쿠키가 없으면)
    if (!sessionId) {
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        sessionId = authHeader.substring(7);
      }
    }

    return sessionId;
  },
);
