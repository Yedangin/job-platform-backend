import { ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CsrfGuard } from 'libs/common/src/common/guard/csrf.guard';

describe('CsrfGuard origin validation', () => {
  const originalEnv = process.env;

  function context(options: {
    method?: string;
    origin?: string;
    referer?: string;
    authorization?: string;
    sessionId?: string;
  }): ExecutionContext {
    const headers: Record<string, string> = {};
    if (options.origin) headers.origin = options.origin;
    if (options.referer) headers.referer = options.referer;
    if (options.authorization) headers.authorization = options.authorization;

    return {
      getHandler: () => context,
      getClass: () => CsrfGuard,
      switchToHttp: () => ({
        getRequest: () => ({
          method: options.method ?? 'POST',
          headers,
          cookies: options.sessionId
            ? { sessionId: options.sessionId }
            : undefined,
        }),
      }),
    } as unknown as ExecutionContext;
  }

  function guard(): CsrfGuard {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(false),
    } as unknown as Reflector;
    return new CsrfGuard(reflector);
  }

  beforeEach(() => {
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
    process.env = { ...originalEnv, NODE_ENV: 'test' };
    delete process.env.CLIENT_URL;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = originalEnv;
  });

  it('allows an exact configured origin and a same-origin referer path', () => {
    process.env.CLIENT_URL = 'https://app.jobchaja.com/some/config/path';
    const csrfGuard = guard();

    expect(
      csrfGuard.canActivate(context({ origin: 'https://app.jobchaja.com' })),
    ).toBe(true);
    expect(
      csrfGuard.canActivate(
        context({ referer: 'https://app.jobchaja.com/account/profile' }),
      ),
    ).toBe(true);
  });

  it.each([
    'https://jobchaja.com.attacker.invalid',
    'https://jobchaja.com@attacker.invalid',
    'https://jobchaja.com.evil.example/path',
  ])('blocks origin prefix and userinfo bypass: %s', (origin) => {
    expect(() => guard().canActivate(context({ origin }))).toThrow(
      ForbiddenException,
    );
  });

  it.each(['null', 'not-a-url', 'file:///etc/passwd'])(
    'blocks malformed or non-HTTP origins: %s',
    (origin) => {
      expect(() => guard().canActivate(context({ origin }))).toThrow(
        ForbiddenException,
      );
    },
  );

  it('allows localhost only outside production', () => {
    expect(
      guard().canActivate(context({ origin: 'http://localhost:3000' })),
    ).toBe(true);

    process.env.NODE_ENV = 'production';
    process.env.CLIENT_URL = 'http://localhost:3000';
    expect(() =>
      guard().canActivate(context({ origin: 'http://localhost:3000' })),
    ).toThrow(ForbiddenException);
  });

  it('rejects an insecure configured origin in production', () => {
    process.env.NODE_ENV = 'production';
    process.env.CLIENT_URL = 'http://app.jobchaja.com';

    expect(() =>
      guard().canActivate(context({ origin: 'http://app.jobchaja.com' })),
    ).toThrow(ForbiddenException);
    expect(
      guard().canActivate(context({ origin: 'https://jobchaja.com' })),
    ).toBe(true);
  });

  it('fails closed for localhost when NODE_ENV is missing', () => {
    delete process.env.NODE_ENV;
    process.env.CLIENT_URL = 'http://localhost:3000';

    expect(() =>
      guard().canActivate(context({ origin: 'http://localhost:3000' })),
    ).toThrow(ForbiddenException);
  });

  it('preserves safe-method and signed bearer request handling', () => {
    const csrfGuard = guard();

    expect(
      csrfGuard.canActivate(
        context({ method: 'GET', origin: 'https://attacker.invalid' }),
      ),
    ).toBe(true);
    expect(
      csrfGuard.canActivate(context({ authorization: 'Bearer a.b.c' })),
    ).toBe(true);
  });

  it('blocks cookie-authenticated state changes with no source headers', () => {
    expect(() =>
      guard().canActivate(context({ sessionId: 'session-id' })),
    ).toThrow(ForbiddenException);
  });
});
