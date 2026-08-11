import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { LaunchScopeGuard } from './launch-scope.guard';

describe('LaunchScopeGuard', () => {
  const guard = new LaunchScopeGuard();

  function context(path: string, method = 'GET'): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ path, method }),
      }),
    } as unknown as ExecutionContext;
  }

  beforeEach(() => {
    delete process.env.PAID_FEATURES_ENABLED;
    delete process.env.ADMIN_ROUTES_ENABLED;
    delete process.env.SENSITIVE_DATA_FEATURES_ENABLED;
    delete process.env.SOCIAL_LOGIN_ENABLED;
    delete process.env.STRIPE_VISA_PLANNER_ENABLED;
    delete process.env.NTS_BUSINESS_VERIFICATION_ENABLED;
    delete process.env.LEGACY_JOB_PAYMENT_ENABLED;
  });

  it.each([
    '/payments/orders',
    '/payment/confirm',
    '/admin/payments',
    '/auth/admin/stats',
    '/visa-verification/me',
    '/auth/google',
    '/visa-planner/checkout',
    '/visa-planner/checkout/verify',
    '/visa-planner/premium-result/1',
    '/visa-planner/refund/1',
    '/visa-planner/stripe-webhook',
    '/auth/verify-business-number',
  ])('blocks disabled launch endpoint %s', (path) => {
    expect(() => guard.canActivate(context(path))).toThrow(NotFoundException);
  });

  it('allows public endpoints', () => {
    expect(guard.canActivate(context('/auth/register'))).toBe(true);
  });

  it('allows only the read-only viewing-credit balance while payments are disabled', () => {
    expect(
      guard.canActivate(context('/payments/viewing-credits/balance')),
    ).toBe(true);
    expect(() =>
      guard.canActivate(context('/payments/viewing-credits/balance', 'POST')),
    ).toThrow(NotFoundException);
  });

  it('allows explicitly approved feature endpoints', () => {
    process.env.PAID_FEATURES_ENABLED = 'true';
    expect(guard.canActivate(context('/payments/orders'))).toBe(true);
  });

  it('keeps Stripe visa-planner routes on a separate explicit gate', () => {
    process.env.PAID_FEATURES_ENABLED = 'true';
    expect(() =>
      guard.canActivate(context('/visa-planner/checkout', 'POST')),
    ).toThrow(NotFoundException);

    process.env.STRIPE_VISA_PLANNER_ENABLED = 'true';
    expect(guard.canActivate(context('/visa-planner/checkout', 'POST'))).toBe(
      true,
    );
  });

  it('requires explicit approval before NTS business data transmission', () => {
    process.env.SENSITIVE_DATA_FEATURES_ENABLED = 'true';
    expect(() =>
      guard.canActivate(context('/auth/verify-business-number', 'POST')),
    ).toThrow(NotFoundException);

    process.env.NTS_BUSINESS_VERIFICATION_ENABLED = 'true';
    expect(
      guard.canActivate(context('/auth/verify-business-number', 'POST')),
    ).toBe(true);
  });

  it('keeps legacy PortOne V1 checkout mutations disabled by default', () => {
    process.env.PAID_FEATURES_ENABLED = 'true';
    expect(guard.canActivate(context('/payment/products'))).toBe(true);
    expect(guard.canActivate(context('/payment/admin/stats'))).toBe(true);
    expect(() => guard.canActivate(context('/payment/orders', 'POST'))).toThrow(
      NotFoundException,
    );
    expect(() =>
      guard.canActivate(context('/payment/orders/ORD-1/verify', 'POST')),
    ).toThrow(NotFoundException);
    expect(() =>
      guard.canActivate(context('/payment/admin/revoke-premium/1', 'POST')),
    ).toThrow(NotFoundException);

    process.env.LEGACY_JOB_PAYMENT_ENABLED = 'true';
    expect(guard.canActivate(context('/payment/orders', 'POST'))).toBe(true);
  });
});
