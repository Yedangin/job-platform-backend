import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * 소셜 로그인 초기 요청에서 platform, userType 쿼리 파라미터를 쿠키에 저장
 * OAuth 리다이렉트 라운드트립 후 콜백에서 읽을 수 있도록 함
 *
 * Saves platform & userType query params as cookies on initial OAuth requests,
 * so handleSocialLogin() can read them after the OAuth redirect round-trip.
 */
@Injectable()
export class AuthPlatformMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthPlatformMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const platform = req.query.platform as string | undefined;
    const userType = req.query.userType as string | undefined;

    // 앱에서 호출 시 platform 쿠키 설정 / Set platform cookie when called from app
    if (platform) {
      res.cookie('pending_platform', platform, {
        maxAge: 5 * 60 * 1000, // 5분 / 5 minutes
        path: '/',
        httpOnly: false,
      });
      this.logger.log(
        `[소셜 로그인 미들웨어] platform=${platform} 쿠키 설정 / Set pending_platform cookie`,
      );
    }

    // userType 쿠키 설정 (앱에서는 프록시 없이 직접 호출하므로 여기서 설정)
    // Set userType cookie (app calls backend directly without proxy)
    if (userType && !req.cookies?.pending_user_type) {
      res.cookie('pending_user_type', userType, {
        maxAge: 5 * 60 * 1000, // 5분 / 5 minutes
        path: '/',
        httpOnly: false,
      });
      this.logger.log(
        `[소셜 로그인 미들웨어] userType=${userType} 쿠키 설정 / Set pending_user_type cookie`,
      );
    }

    next();
  }
}
