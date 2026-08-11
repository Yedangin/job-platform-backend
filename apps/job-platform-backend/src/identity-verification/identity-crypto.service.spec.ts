import { ConfigService } from '@nestjs/config';
import { IdentityCryptoService } from './identity-crypto.service';

describe('IdentityCryptoService', () => {
  const key = Buffer.alloc(32, 7).toString('base64');
  const pepper = 'identity-lookup-test-pepper-with-more-than-32-characters';

  function service(overrides: Record<string, string> = {}) {
    const values = {
      IDENTITY_DATA_KEY: key,
      IDENTITY_LOOKUP_PEPPER: pepper,
      ...overrides,
    };
    return new IdentityCryptoService({
      get: (name: string) => values[name as keyof typeof values],
    } as ConfigService);
  }

  it('encrypts with random IVs and decrypts with the matching AAD', () => {
    const crypto = service();
    const first = crypto.encrypt('verified-value', 'user:verification:ci:v1');
    const second = crypto.encrypt('verified-value', 'user:verification:ci:v1');

    expect(first.ciphertext).not.toBe(second.ciphertext);
    expect(first.iv).not.toBe(second.iv);
    expect(crypto.decrypt(first, 'user:verification:ci:v1')).toBe(
      'verified-value',
    );
  });

  it('rejects ciphertext replayed under another account or field', () => {
    const crypto = service();
    const value = crypto.encrypt('verified-value', 'user-a:request-a:ci:v1');

    expect(() => crypto.decrypt(value, 'user-b:request-a:ci:v1')).toThrow();
    expect(() => crypto.decrypt(value, 'user-a:request-a:di:v1')).toThrow();
  });

  it('creates deterministic keyed lookup hashes without exposing the CI', () => {
    const crypto = service();
    const first = crypto.lookupHash('ci-value');
    const second = crypto.lookupHash('ci-value');

    expect(first).toBe(second);
    expect(first).toMatch(/^[a-f0-9]{64}$/);
    expect(first).not.toContain('ci-value');
  });

  it('fails closed with missing or malformed encryption configuration', () => {
    expect(service().isConfigured()).toBe(true);
    expect(service({ IDENTITY_DATA_KEY: 'not-a-key' }).isConfigured()).toBe(
      false,
    );
    expect(() =>
      service({ IDENTITY_DATA_KEY: 'not-a-key' }).assertConfigured(),
    ).toThrow(/IDENTITY_DATA_KEY/);
    expect(service({ IDENTITY_LOOKUP_PEPPER: 'short' }).isConfigured()).toBe(
      false,
    );
    expect(() =>
      service({ IDENTITY_LOOKUP_PEPPER: 'short' }).assertConfigured(),
    ).toThrow(/IDENTITY_LOOKUP_PEPPER/);
  });
});
