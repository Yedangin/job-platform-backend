import {
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import type { AuthPrismaService, RedisLockService } from 'libs/common/src';

jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
  RedisLockService: class RedisLockService {},
}));

import { JobPaymentService } from './job-payment.service';

describe('JobPaymentService security boundaries', () => {
  const corporateProfileFindUnique = jest.fn();
  const productFindUnique = jest.fn();
  const postingFindUnique = jest.fn();
  const orderFindFirst = jest.fn();
  const orderCreate = jest.fn();
  const acquireLock = jest.fn();
  const releaseLock = jest.fn();

  const prisma = {
    corporateProfile: { findUnique: corporateProfileFindUnique },
    jobProduct: { findUnique: productFindUnique },
    jobPosting: { findUnique: postingFindUnique },
    jobOrder: { findFirst: orderFindFirst, create: orderCreate },
  } as unknown as AuthPrismaService;

  const lock = {
    acquireLock,
    releaseLock,
  } as unknown as RedisLockService;

  const product = {
    id: 10n,
    productCode: 'STANDARD_ALBA',
    boardType: 'PART_TIME',
    tierType: 'STANDARD',
    nameKo: '알바 공고',
    originalPrice: 10_000,
    discountPrice: 10_000,
    discountPercent: 0,
    durationDays: 30,
    features: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const;

  const posting = {
    id: 20n,
    corporateId: 30n,
    boardType: 'PART_TIME',
    tierType: 'STANDARD',
    status: 'DRAFT',
    orderId: null,
  };

  let service: JobPaymentService;

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.IAMPORT_API_KEY;
    delete process.env.IAMPORT_API_SECRET;
    delete process.env.IAMPORT_STORE_ID;
    delete process.env.IAMPORT_PG_PROVIDER;

    corporateProfileFindUnique.mockResolvedValue({ companyId: 30n });
    productFindUnique.mockResolvedValue(product);
    postingFindUnique.mockResolvedValue(posting);
    orderFindFirst.mockResolvedValue(null);
    acquireLock.mockResolvedValue('lock-token');
    releaseLock.mockResolvedValue(true);
    service = new JobPaymentService(prisma, lock);
  });

  it('rejects missing provider configuration before persisting a paid order', async () => {
    await expect(
      service.createOrder('corporate-user', {
        productCode: 'STANDARD_ALBA',
        jobPostingId: '20',
      }),
    ).rejects.toThrow(ServiceUnavailableException);

    expect(orderCreate).not.toHaveBeenCalled();
    expect(releaseLock).toHaveBeenCalledWith(
      expect.stringMatching(/^job-payment:/),
      'lock-token',
    );
  });

  it('rejects placeholder provider credentials', async () => {
    process.env.IAMPORT_API_KEY = 'replace-with-portone-v1-api-key';
    process.env.IAMPORT_API_SECRET = 'replace-with-portone-v1-api-secret';
    process.env.IAMPORT_STORE_ID = 'imp-example';
    process.env.IAMPORT_PG_PROVIDER = 'html5_inicis';

    await expect(
      service.createOrder('corporate-user', {
        productCode: 'STANDARD_ALBA',
        jobPostingId: '20',
      }),
    ).rejects.toThrow(ServiceUnavailableException);
    expect(orderCreate).not.toHaveBeenCalled();
  });

  it('rejects malformed payment identifiers before querying an order', async () => {
    await expect(
      service.verifyPayment('corporate-user', 'bad-order', {
        impUid: 'not-an-imp-uid',
      }),
    ).rejects.toThrow(BadRequestException);

    expect(corporateProfileFindUnique).not.toHaveBeenCalled();
  });
});
