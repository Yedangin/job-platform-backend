import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
} from 'crypto';

export interface EncryptedValue {
  ciphertext: string;
  iv: string;
  tag: string;
}

@Injectable()
export class IdentityCryptoService {
  private readonly key: Buffer | null;
  private readonly lookupPepper: string | null;

  constructor(private readonly config: ConfigService) {
    const encodedKey = this.config.get<string>('IDENTITY_DATA_KEY');
    const pepper = this.config.get<string>('IDENTITY_LOOKUP_PEPPER');
    this.key = encodedKey ? Buffer.from(encodedKey, 'base64') : null;
    this.lookupPepper = pepper || null;
  }

  isConfigured(): boolean {
    return Boolean(
      this.key &&
        this.key.length === 32 &&
        this.lookupPepper &&
        this.lookupPepper.length >= 32,
    );
  }

  assertConfigured(): void {
    if (!this.key || this.key.length !== 32) {
      throw new ServiceUnavailableException(
        'IDENTITY_DATA_KEY must be a base64-encoded 32-byte key',
      );
    }
    if (!this.lookupPepper || this.lookupPepper.length < 32) {
      throw new ServiceUnavailableException(
        'IDENTITY_LOOKUP_PEPPER must contain at least 32 characters',
      );
    }
  }

  encrypt(value: string, aad: string): EncryptedValue {
    this.assertConfigured();
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', this.key!, iv);
    cipher.setAAD(Buffer.from(aad, 'utf8'));
    const ciphertext = Buffer.concat([
      cipher.update(value, 'utf8'),
      cipher.final(),
    ]);

    return {
      ciphertext: ciphertext.toString('base64'),
      iv: iv.toString('base64'),
      tag: cipher.getAuthTag().toString('base64'),
    };
  }

  decrypt(value: EncryptedValue, aad: string): string {
    this.assertConfigured();
    const decipher = createDecipheriv(
      'aes-256-gcm',
      this.key!,
      Buffer.from(value.iv, 'base64'),
    );
    decipher.setAAD(Buffer.from(aad, 'utf8'));
    decipher.setAuthTag(Buffer.from(value.tag, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(value.ciphertext, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  }

  lookupHash(value: string): string {
    this.assertConfigured();
    return createHmac('sha256', this.lookupPepper!)
      .update(value.trim(), 'utf8')
      .digest('hex');
  }

  ipHash(value: string | undefined): string | null {
    if (!value || !this.lookupPepper) return null;
    return createHmac('sha256', this.lookupPepper)
      .update(value, 'utf8')
      .digest('hex');
  }
}
