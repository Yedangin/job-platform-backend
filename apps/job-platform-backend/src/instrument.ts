// Sentry 초기화 / Sentry initialization
// 이 파일은 main.ts 에서 가장 먼저 import 되어야 합니다
// This file must be imported first in main.ts

import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  environment: process.env.NODE_ENV || 'development',
  // 프로덕션에서만 활성화 / Only active in production
  enabled: !!process.env.SENTRY_DSN,
  // 성능 모니터링 샘플 비율 / Performance monitoring sample rate
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
});
