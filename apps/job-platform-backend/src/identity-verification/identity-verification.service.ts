import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'crypto';
import { AuthPrismaService } from 'libs/common/src';
import { CompleteIdentityVerificationDto } from './dto/complete-identity-verification.dto';
import { StartIdentityVerificationDto } from './dto/start-identity-verification.dto';
import {
  EncryptedValue,
  IdentityCryptoService,
} from './identity-crypto.service';

interface PortoneIdentityVerification {
  id?: string;
  status?: 'READY' | 'VERIFIED' | 'FAILED';
  storeId?: string;
  channel?: { key?: string };
  verifiedCustomer?: {
    name?: string;
    ci?: string;
    di?: string;
    phoneNumber?: string;
  };
  verifiedAt?: string;
}

interface VerifiedIdentityRow {
  authId: string;
  providerVerificationId: string;
  nameCiphertext: string;
  nameIv: string;
  nameTag: string;
  phoneCiphertext: string | null;
  phoneIv: string | null;
  phoneTag: string | null;
  verifiedAt: Date;
}

@Injectable()
export class IdentityVerificationService {
  private readonly logger = new Logger(IdentityVerificationService.name);
  private readonly storeId: string;
  private readonly channelKey: string;
  private readonly apiSecret: string;
  private readonly clientUrl: string;
  private readonly redirectUrl: string;
  private readonly bridgeUrl: string;
  private readonly consentPolicyVersion: string;
  private readonly cpTitle: string;

  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly config: ConfigService,
    private readonly crypto: IdentityCryptoService,
  ) {
    this.storeId = this.config.get<string>('PORTONE_STORE_ID') || '';
    this.channelKey =
      this.config.get<string>('PORTONE_IDENTITY_CHANNEL_KEY') || '';
    this.apiSecret = this.config.get<string>('PORTONE_V2_API_SECRET') || '';
    this.clientUrl = (this.config.get<string>('CLIENT_URL') || '').replace(
      /\/$/,
      '',
    );
    this.redirectUrl =
      this.config.get<string>('IDENTITY_VERIFICATION_REDIRECT_URL') ||
      `${this.clientUrl}/identity-verification/complete`;
    this.bridgeUrl =
      this.config.get<string>('IDENTITY_VERIFICATION_BRIDGE_URL') ||
      `${this.clientUrl}/identity-verification/mobile`;
    this.consentPolicyVersion =
      this.config.get<string>('IDENTITY_CONSENT_POLICY_VERSION') ||
      '2026-08-04';
    this.cpTitle =
      this.config.get<string>('PORTONE_DANAL_CP_TITLE') || '잡차자';
  }

  isEnabled(): boolean {
    return Boolean(
      this.channelKey &&
        this.storeId &&
        this.apiSecret &&
        this.clientUrl &&
        this.crypto.isConfigured(),
    );
  }

  getConfiguration() {
    return {
      enabled: this.isEnabled(),
      provider: 'DANAL',
      consentPolicyVersion: this.consentPolicyVersion,
    };
  }

  async start(
    authId: string,
    dto: StartIdentityVerificationDto,
    ipAddress?: string,
    userAgent?: string,
  ) {
    this.assertConfigured();
    const identityVerificationId = `iv${randomUUID().replace(/-/g, '')}`;
    const state = randomBytes(32).toString('base64url');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.$transaction(async (tx) => {
      await tx.identityVerificationAttempt.updateMany({
        where: { authId, purpose: dto.purpose, status: 'READY' },
        data: { status: 'EXPIRED' },
      });
      await tx.identityVerificationAttempt.create({
        data: {
          authId,
          purpose: dto.purpose,
          provider: 'PORTONE_DANAL',
          providerVerificationId: identityVerificationId,
          stateHash: this.hashState(state),
          status: 'READY',
          expiresAt,
          requesterIpHash: this.crypto.ipHash(ipAddress),
        },
      });
      await tx.consentRecord.create({
        data: {
          authId,
          consentType: 'IDENTITY_VERIFICATION',
          policyVersion: this.consentPolicyVersion,
          granted: true,
          channel: dto.clientPlatform,
          ipAddress: this.crypto.ipHash(ipAddress),
          userAgent: userAgent?.slice(0, 1000),
        },
      });
    });

    return {
      storeId: this.storeId,
      channelKey: this.channelKey,
      identityVerificationId,
      state,
      redirectUrl: this.redirectUrl,
      bypass: { danal: { CPTITLE: this.cpTitle } },
      expiresAt,
      appLaunchUrl: `${this.bridgeUrl}#identityVerificationId=${encodeURIComponent(
        identityVerificationId,
      )}&state=${encodeURIComponent(state)}`,
    };
  }

  async getBridgeConfiguration(dto: CompleteIdentityVerificationDto) {
    this.assertConfigured();
    await this.getReadyAttempt(dto);
    return {
      storeId: this.storeId,
      channelKey: this.channelKey,
      identityVerificationId: dto.identityVerificationId,
      state: dto.state,
      redirectUrl: `${this.redirectUrl}?clientPlatform=APP`,
      bypass: { danal: { CPTITLE: this.cpTitle } },
    };
  }

  async complete(dto: CompleteIdentityVerificationDto) {
    this.assertConfigured();
    const attempt = await this.getAttempt(dto);
    if (attempt.status === 'VERIFIED') {
      return this.getVerifiedIdentitySummary(attempt.authId);
    }
    if (attempt.status !== 'READY' || attempt.expiresAt <= new Date()) {
      if (attempt.status === 'READY') {
        await this.prisma.identityVerificationAttempt.update({
          where: { attemptId: attempt.attemptId },
          data: { status: 'EXPIRED' },
        });
      }
      throw new BadRequestException(
        '본인인증 요청이 만료되었습니다 / Identity verification request expired',
      );
    }

    const providerResult = await this.fetchPortoneVerification(
      dto.identityVerificationId,
    );
    if (providerResult.status !== 'VERIFIED') {
      if (providerResult.status === 'FAILED') {
        await this.prisma.identityVerificationAttempt.updateMany({
          where: { attemptId: attempt.attemptId, status: 'READY' },
          data: { status: 'FAILED', failureCode: 'PROVIDER_REJECTED' },
        });
      }
      throw new BadRequestException(
        '본인인증이 완료되지 않았습니다 / Identity verification is not complete',
      );
    }

    this.validateProviderResult(providerResult, dto.identityVerificationId);
    const customer = providerResult.verifiedCustomer!;
    const verifiedAt = providerResult.verifiedAt
      ? new Date(providerResult.verifiedAt)
      : new Date();
    if (Number.isNaN(verifiedAt.getTime())) {
      throw new BadGatewayException(
        'Identity provider returned an invalid verification timestamp',
      );
    }
    if (verifiedAt.getTime() > Date.now() + 5 * 60 * 1000) {
      throw new BadGatewayException(
        'Identity provider returned a future verification timestamp',
      );
    }

    const ciLookupHash = this.crypto.lookupHash(customer.ci!);
    const diLookupHash = this.crypto.lookupHash(customer.di!);
    const existingIdentity = await this.prisma.verifiedIdentity.findUnique({
      where: { authId: attempt.authId },
      select: { ciLookupHash: true, diLookupHash: true },
    });
    if (
      existingIdentity &&
      (existingIdentity.ciLookupHash !== ciLookupHash ||
        existingIdentity.diLookupHash !== diLookupHash)
    ) {
      throw new ConflictException(
        '기존 본인인증 정보와 다른 사용자입니다. 고객센터에 문의해주세요 / A different identity is already linked to this account',
      );
    }
    const duplicate = await this.prisma.verifiedIdentity.findFirst({
      where: {
        OR: [{ ciLookupHash }, { diLookupHash }],
        NOT: { authId: attempt.authId },
      },
      select: { verifiedIdentityId: true },
    });
    if (duplicate) {
      throw new ConflictException(
        '이미 다른 계정에서 인증된 사용자입니다 / Identity is already linked to another account',
      );
    }

    const aad = (field: string) =>
      this.aad(attempt.authId, dto.identityVerificationId, field);
    const ci = this.crypto.encrypt(customer.ci!, aad('ci'));
    const di = this.crypto.encrypt(customer.di!, aad('di'));
    const name = this.crypto.encrypt(customer.name!, aad('name'));
    const phone = customer.phoneNumber
      ? this.crypto.encrypt(customer.phoneNumber, aad('phone'))
      : null;

    try {
      await this.prisma.$transaction(async (tx) => {
        const claimed = await tx.identityVerificationAttempt.updateMany({
          where: { attemptId: attempt.attemptId, status: 'READY' },
          data: { status: 'VERIFIED', verifiedAt, consumedAt: new Date() },
        });
        if (claimed.count !== 1) return;
        await tx.verifiedIdentity.upsert({
          where: { authId: attempt.authId },
          create: this.verifiedIdentityData({
            authId: attempt.authId,
            purpose: attempt.purpose,
            verificationId: dto.identityVerificationId,
            ci,
            di,
            name,
            phone,
            ciLookupHash,
            diLookupHash,
            verifiedAt,
          }),
          update: this.verifiedIdentityData({
            authId: attempt.authId,
            purpose: attempt.purpose,
            verificationId: dto.identityVerificationId,
            ci,
            di,
            name,
            phone,
            ciLookupHash,
            diLookupHash,
            verifiedAt,
          }),
        });
      });
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          '이미 다른 계정에서 인증된 사용자입니다 / Identity is already linked to another account',
        );
      }
      throw error;
    }

    this.logger.log(
      `Identity verification completed: auth=${this.shortHash(
        attempt.authId,
      )} verification=${this.shortHash(dto.identityVerificationId)}`,
    );
    return this.getVerifiedIdentitySummary(attempt.authId);
  }

  async getVerifiedIdentitySummary(authId: string) {
    const identity = await this.prisma.verifiedIdentity.findUnique({
      where: { authId },
    });
    if (!identity) return { verified: false };
    const phone = identity.phoneCiphertext
      ? this.decryptField(identity, 'phone')
      : null;
    return {
      verified: true,
      name: this.decryptField(identity, 'name'),
      phoneMasked: this.maskPhone(phone),
      verifiedAt: identity.verifiedAt,
      provider: 'DANAL',
    };
  }

  async hasVerifiedNameMatch(authId: string, expectedName: string) {
    const identity = await this.prisma.verifiedIdentity.findUnique({
      where: { authId },
    });
    if (!identity) return false;
    return (
      this.normalizeName(this.decryptField(identity, 'name')) ===
      this.normalizeName(expectedName)
    );
  }

  async getVerifiedContact(authId: string) {
    const identity = await this.prisma.verifiedIdentity.findUnique({
      where: { authId },
    });
    if (!identity) return null;
    return {
      name: this.decryptField(identity, 'name'),
      phone: identity.phoneCiphertext
        ? this.decryptField(identity, 'phone')
        : null,
      verifiedAt: identity.verifiedAt,
    };
  }

  @Cron('0 40 3 * * *', { timeZone: 'Asia/Seoul' })
  async deleteExpiredAttempts(): Promise<void> {
    const retentionDays = 30;
    const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
    const result = await this.prisma.identityVerificationAttempt.deleteMany({
      where: { createdAt: { lt: cutoff } },
    });
    if (result.count > 0) {
      this.logger.log(`Deleted ${result.count} expired identity attempts`);
    }
  }

  private verifiedIdentityData(input: {
    authId: string;
    purpose: 'CORPORATE_MANAGER';
    verificationId: string;
    ci: EncryptedValue;
    di: EncryptedValue;
    name: EncryptedValue;
    phone: EncryptedValue | null;
    ciLookupHash: string;
    diLookupHash: string;
    verifiedAt: Date;
  }) {
    return {
      authId: input.authId,
      provider: 'PORTONE_DANAL' as const,
      purpose: input.purpose,
      providerVerificationId: input.verificationId,
      ciCiphertext: input.ci.ciphertext,
      ciIv: input.ci.iv,
      ciTag: input.ci.tag,
      ciLookupHash: input.ciLookupHash,
      diCiphertext: input.di.ciphertext,
      diIv: input.di.iv,
      diTag: input.di.tag,
      diLookupHash: input.diLookupHash,
      nameCiphertext: input.name.ciphertext,
      nameIv: input.name.iv,
      nameTag: input.name.tag,
      phoneCiphertext: input.phone?.ciphertext ?? null,
      phoneIv: input.phone?.iv ?? null,
      phoneTag: input.phone?.tag ?? null,
      keyVersion: 1,
      verifiedAt: input.verifiedAt,
    };
  }

  private async getReadyAttempt(dto: CompleteIdentityVerificationDto) {
    const attempt = await this.getAttempt(dto);
    if (attempt.status !== 'READY' || attempt.expiresAt <= new Date()) {
      throw new BadRequestException(
        '본인인증 요청이 만료되었습니다 / Identity verification request expired',
      );
    }
    return attempt;
  }

  private async getAttempt(dto: CompleteIdentityVerificationDto) {
    const attempt = await this.prisma.identityVerificationAttempt.findUnique({
      where: { providerVerificationId: dto.identityVerificationId },
    });
    if (!attempt || !this.stateMatches(attempt.stateHash, dto.state)) {
      throw new UnauthorizedException(
        '유효하지 않은 본인인증 요청입니다 / Invalid identity verification request',
      );
    }
    return attempt;
  }

  private validateProviderResult(
    result: PortoneIdentityVerification,
    expectedId: string,
  ): void {
    const customer = result.verifiedCustomer;
    if (
      result.id !== expectedId ||
      result.storeId !== this.storeId ||
      result.channel?.key !== this.channelKey ||
      !customer?.ci ||
      !customer.di ||
      !customer.name ||
      customer.ci.length > 500 ||
      customer.di.length > 500 ||
      customer.name.length > 200 ||
      (customer.phoneNumber?.length ?? 0) > 50
    ) {
      this.logger.error(
        `Identity integrity check failed: verification=${this.shortHash(
          expectedId,
        )}`,
      );
      throw new BadGatewayException(
        '본인인증 결과의 무결성을 확인할 수 없습니다 / Identity result integrity check failed',
      );
    }
  }

  private async fetchPortoneVerification(
    identityVerificationId: string,
  ): Promise<PortoneIdentityVerification> {
    const url = `https://api.portone.io/identity-verifications/${encodeURIComponent(
      identityVerificationId,
    )}`;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await fetch(url, {
          headers: { Authorization: `PortOne ${this.apiSecret}` },
          signal: AbortSignal.timeout(10_000),
        });
        if (response.ok) {
          return (await response.json()) as PortoneIdentityVerification;
        }
        if ([401, 403].includes(response.status)) {
          throw new ServiceUnavailableException(
            'PortOne API credentials are invalid',
          );
        }
        if (response.status === 404) {
          throw new BadRequestException(
            '본인인증 결과를 찾을 수 없습니다 / Identity result not found',
          );
        }
        if (response.status < 500 && response.status !== 429) {
          throw new BadGatewayException(
            'Identity provider rejected the verification lookup',
          );
        }
      } catch (error) {
        if (
          error instanceof BadRequestException ||
          error instanceof ServiceUnavailableException ||
          error instanceof BadGatewayException
        ) {
          throw error;
        }
        if (attempt === 2) {
          throw new BadGatewayException(
            '본인인증 제공사 응답이 지연되고 있습니다 / Identity provider is unavailable',
          );
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
    throw new BadGatewayException('Identity provider is unavailable');
  }

  private assertConfigured(): void {
    if (!this.channelKey) {
      throw new ServiceUnavailableException(
        '본인인증 채널이 아직 설정되지 않았습니다 / Identity channel is not configured',
      );
    }
    if (!this.storeId || !this.apiSecret || !this.clientUrl) {
      throw new ServiceUnavailableException(
        'PortOne identity verification server configuration is incomplete',
      );
    }
    this.crypto.assertConfigured();
    for (const target of [this.redirectUrl, this.bridgeUrl]) {
      let parsed: URL;
      try {
        parsed = new URL(target);
      } catch {
        throw new ServiceUnavailableException(
          'Identity verification URL configuration is invalid',
        );
      }
      if (process.env.NODE_ENV === 'production' && parsed.protocol !== 'https:') {
        throw new ServiceUnavailableException(
          'Identity verification URLs must use HTTPS in production',
        );
      }
    }
  }

  private decryptField(
    identity: VerifiedIdentityRow,
    field: 'name' | 'phone',
  ): string {
    const value: EncryptedValue =
      field === 'name'
        ? {
            ciphertext: identity.nameCiphertext,
            iv: identity.nameIv,
            tag: identity.nameTag,
          }
        : {
            ciphertext: identity.phoneCiphertext!,
            iv: identity.phoneIv!,
            tag: identity.phoneTag!,
          };
    return this.crypto.decrypt(
      value,
      this.aad(identity.authId, identity.providerVerificationId, field),
    );
  }

  private aad(authId: string, verificationId: string, field: string): string {
    return `${authId}:${verificationId}:${field}:v1`;
  }

  private hashState(state: string): string {
    return createHash('sha256').update(state, 'utf8').digest('hex');
  }

  private stateMatches(expectedHash: string, state: string): boolean {
    const actual = Buffer.from(this.hashState(state), 'hex');
    const expected = Buffer.from(expectedHash, 'hex');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  }

  private normalizeName(value: string): string {
    return value.normalize('NFKC').replace(/\s+/g, '').toLocaleLowerCase('ko');
  }

  private maskPhone(phone: string | null): string | null {
    if (!phone) return null;
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7) return '***';
    return `${digits.slice(0, 3)}-****-${digits.slice(-4)}`;
  }

  private shortHash(value: string): string {
    return createHash('sha256').update(value).digest('hex').slice(0, 12);
  }
}
