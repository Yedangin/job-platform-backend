import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { LaunchScopeGuard } from './launch-scope.guard';

describe('LaunchScopeGuard', () => {
  const guard = new LaunchScopeGuard();

  function context(path: string): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ path }),
      }),
    } as unknown as ExecutionContext;
  }

  beforeEach(() => {
    delete process.env.PAID_FEATURES_ENABLED;
    delete process.env.ADMIN_ROUTES_ENABLED;
    delete process.env.SENSITIVE_DATA_FEATURES_ENABLED;
    delete process.env.SOCIAL_LOGIN_ENABLED;
  });

  it.each([
    '/payments/orders',
    '/payment/confirm',
    '/admin/payments',
    '/auth/admin/stats',
    '/visa-verification/me',
    '/auth/google',
  ])('blocks disabled launch endpoint %s', (path) => {
    expect(() => guard.canActivate(context(path))).toThrow(NotFoundException);
  });

  it('allows public endpoints', () => {
    expect(guard.canActivate(context('/auth/register'))).toBe(true);
  });

  it('allows explicitly approved feature endpoints', () => {
    process.env.PAID_FEATURES_ENABLED = 'true';
    expect(guard.canActivate(context('/payments/orders'))).toBe(true);
  });
});
