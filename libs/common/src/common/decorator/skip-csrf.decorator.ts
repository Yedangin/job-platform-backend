import { SetMetadata } from '@nestjs/common';
import { SKIP_CSRF_KEY } from '../guard/csrf.guard';

/**
 * CSRF 검증 제외 데코레이터 / Skip CSRF verification decorator
 * 웹훅, OAuth 콜백 등 외부 요청을 받는 엔드포인트에 적용
 * Apply to endpoints that receive external requests (webhooks, OAuth callbacks)
 */
export const SkipCsrf = () => SetMetadata(SKIP_CSRF_KEY, true);
