import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
}));
jest.mock('../translation/translation.service', () => ({
  TranslationService: class TranslationService {},
}));

import { InfoBoardService } from './info-board.service';
import {
  InfoBoardAudienceEnum,
  InfoBoardBannerThemeEnum,
  InfoBoardLocaleEnum,
  InfoBoardStatusEnum,
} from './dto/info-board.enums';

describe('InfoBoardService', () => {
  const publishedPost = {
    id: BigInt(1),
    title: '한국어 제목',
    content: '한국어 본문',
    category: 'ANNOUNCEMENTS',
    thumbnail: null,
    status: 'PUBLISHED',
    audience: 'ALL',
    isPinned: true,
    isFeatured: true,
    featuredOrder: 2,
    bannerTheme: 'BRAND',
    featuredStartAt: null,
    featuredEndAt: null,
    bannerAssetId: BigInt(7),
    scheduledAt: null,
    publishedAt: new Date('2026-08-03T00:00:00.000Z'),
    createdBy: 'admin-1',
    updatedBy: 'admin-1',
    deletedAt: null,
    deletedBy: null,
    viewCount: 2,
    version: 1,
    createdAt: new Date('2026-08-03T00:00:00.000Z'),
    updatedAt: new Date('2026-08-03T00:00:00.000Z'),
    translations: [
      {
        locale: 'ko',
        title: '한국어 제목',
        summary: '한국어 요약',
        content: '한국어 본문',
      },
      {
        locale: 'en',
        title: 'English title',
        summary: 'English summary',
        content: 'English content',
      },
      {
        locale: 'vi',
        title: 'Tiêu đề tiếng Việt',
        summary: 'Tóm tắt tiếng Việt',
        content: 'Nội dung tiếng Việt',
      },
      {
        locale: 'th',
        title: 'ชื่อภาษาไทย',
        summary: 'สรุปภาษาไทย',
        content: 'เนื้อหาภาษาไทย',
      },
      {
        locale: 'fil',
        title: 'Pamagat sa Filipino',
        summary: 'Buod sa Filipino',
        content: 'Nilalaman sa Filipino',
      },
    ],
    assets: [],
    featuredBanners: [{ locale: 'ko', assetId: BigInt(7), postId: BigInt(1) }],
  };

  let db: any;
  let service: InfoBoardService;
  let translationService: any;

  beforeEach(() => {
    db = {
      infoBoard: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findMany: jest.fn().mockResolvedValue([publishedPost]),
        count: jest.fn().mockResolvedValue(1),
        findFirst: jest.fn().mockResolvedValue(publishedPost),
        update: jest.fn().mockResolvedValue({ ...publishedPost, viewCount: 3 }),
        findUnique: jest.fn().mockResolvedValue(publishedPost),
      },
      infoBoardAsset: {
        create: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
        updateMany: jest.fn(),
        update: jest.fn(),
      },
      infoBoardFeaturedAudit: {
        create: jest.fn(),
        findMany: jest.fn().mockResolvedValue([]),
      },
      infoBoardFeaturedBanner: {
        deleteMany: jest.fn(),
        createMany: jest.fn(),
      },
      infoBoardTranslation: {
        deleteMany: jest.fn(),
        upsert: jest.fn(),
      },
      $transaction: jest.fn(async (callback: (tx: any) => unknown) =>
        callback(db),
      ),
    };
    translationService = {
      isConfigured: jest.fn().mockReturnValue(true),
      translateTexts: jest
        .fn()
        .mockImplementation(async (texts: string[], target: string) =>
          texts.map((text) => `${target}:${text}`),
        ),
    };
    service = new InfoBoardService(db, translationService);
  });

  it('ignores a caller-supplied COMPANY audience on the public list', async () => {
    await service.findAll({
      locale: InfoBoardLocaleEnum.KO,
      audience: InfoBoardAudienceEnum.COMPANY,
    });

    const args = db.infoBoard.findMany.mock.calls[0][0];
    expect(args.where).toMatchObject({
      status: InfoBoardStatusEnum.PUBLISHED,
      deletedAt: null,
      audience: {
        in: [InfoBoardAudienceEnum.ALL],
      },
    });
  });

  it('keeps public detail lookup restricted to ALL audience', async () => {
    await service.findOne(1, {
      audience: InfoBoardAudienceEnum.COMPANY,
    });

    expect(db.infoBoard.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: BigInt(1),
          audience: { in: [InfoBoardAudienceEnum.ALL] },
        }),
      }),
    );
  });

  it('includes ALL and COMPANY only through the company service path', async () => {
    await service.findCompanyAll({});

    expect(db.infoBoard.findMany.mock.calls[0][0].where.audience).toEqual({
      in: [InfoBoardAudienceEnum.ALL, InfoBoardAudienceEnum.COMPANY],
    });
  });

  it('returns draft content through the admin detail service path', async () => {
    db.infoBoard.findUnique.mockResolvedValueOnce({
      ...publishedPost,
      status: InfoBoardStatusEnum.DRAFT,
      audience: InfoBoardAudienceEnum.COMPANY,
      publishedAt: null,
    });

    const result = await service.findAdminOne(1, {
      locale: InfoBoardLocaleEnum.VI,
    });

    expect(result).toMatchObject({
      id: 1,
      status: InfoBoardStatusEnum.DRAFT,
      audience: InfoBoardAudienceEnum.COMPANY,
      locale: InfoBoardLocaleEnum.VI,
      translations: publishedPost.translations,
    });
    expect(db.infoBoard.findUnique).toHaveBeenCalledWith({
      where: { id: BigInt(1) },
      include: { translations: true, assets: true, featuredBanners: true },
    });
  });

  it('falls back from the requested locale to English before Korean', async () => {
    db.infoBoard.findMany.mockResolvedValueOnce([
      {
        ...publishedPost,
        translations: publishedPost.translations.filter((item) =>
          ['ko', 'en'].includes(item.locale),
        ),
      },
    ]);

    const result = await service.findAll({
      locale: InfoBoardLocaleEnum.VI,
    });

    expect(result.items[0]).toMatchObject({
      locale: InfoBoardLocaleEnum.EN,
      title: 'English title',
      content: 'English content',
    });
  });

  it('orders pinned posts before the newest published posts', async () => {
    await service.findAll({});

    expect(db.infoBoard.findMany.mock.calls[0][0].orderBy).toEqual([
      { isPinned: 'desc' },
      { publishedAt: 'desc' },
      { createdAt: 'desc' },
    ]);
  });

  it('returns only public featured posts in administrator-defined order', async () => {
    const result = await service.findFeatured({
      locale: InfoBoardLocaleEnum.EN,
      limit: 4,
    });

    expect(db.infoBoard.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: InfoBoardStatusEnum.PUBLISHED,
          deletedAt: null,
          audience: InfoBoardAudienceEnum.ALL,
          isFeatured: true,
          bannerAssetId: { not: null },
          AND: expect.any(Array),
        }),
        orderBy: [
          { featuredOrder: 'asc' },
          { publishedAt: 'desc' },
          { createdAt: 'desc' },
        ],
        take: 4,
        include: { translations: true, assets: true, featuredBanners: true },
      }),
    );
    expect(result).toMatchObject({
      total: 1,
      limit: 4,
      items: [
        {
          id: 1,
          title: 'English title',
          isFeatured: true,
          featuredOrder: 2,
          bannerTheme: 'BRAND',
        },
      ],
    });
  });

  it('keeps the dedicated banner out of public post attachments', async () => {
    const bannerAsset = {
      id: BigInt(7),
      originalName: 'slider.png',
      mimeType: 'image/png',
      sizeBytes: 1200,
    };
    const documentAsset = {
      id: BigInt(8),
      originalName: 'guide.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 2400,
    };
    db.infoBoard.findFirst.mockResolvedValueOnce({
      ...publishedPost,
      assets: [bannerAsset, documentAsset],
      featuredBanners: [
        { locale: 'ko', assetId: BigInt(7), postId: BigInt(1) },
      ],
    });

    const result = await service.findOne(1);

    expect(result.bannerImage).toBe('/api/info-board/attachments/7/content');
    expect(result.assets).toEqual([
      expect.objectContaining({ id: 8, originalName: 'guide.pdf' }),
    ]);
  });

  it('detaches the previous dedicated banner when an administrator replaces it', async () => {
    const replacement = {
      id: BigInt(9),
      postId: null,
      originalName: 'replacement.png',
      mimeType: 'image/png',
      sizeBytes: 1600,
    };
    db.infoBoardAsset.findMany.mockResolvedValueOnce([replacement]);
    db.infoBoard.findUnique.mockResolvedValueOnce({
      ...publishedPost,
      bannerAssetId: replacement.id,
      assets: [replacement],
      featuredBanners: [
        { locale: 'ko', assetId: replacement.id, postId: BigInt(1) },
      ],
      version: 2,
    });

    await service.configureFeatured(
      1,
      {
        expectedVersion: 1,
        bannerAssets: [{ locale: InfoBoardLocaleEnum.KO, assetId: 9 }],
        featuredOrder: 1,
        bannerTheme: InfoBoardBannerThemeEnum.BRAND,
      },
      'admin-2',
    );

    expect(db.infoBoardAsset.updateMany).toHaveBeenCalledWith({
      where: { id: { in: [BigInt(7)] }, postId: BigInt(1) },
      data: { postId: null },
    });
    expect(db.infoBoardAsset.updateMany).toHaveBeenCalledWith({
      where: {
        id: { in: [BigInt(9)] },
        postId: null,
        uploadedBy: 'admin-2',
      },
      data: { postId: BigInt(1) },
    });
    expect(db.infoBoardFeaturedBanner.createMany).toHaveBeenCalledWith({
      data: [{ postId: BigInt(1), locale: 'ko', assetId: BigInt(9) }],
    });
  });

  it('translates one source draft into each requested locale', async () => {
    const result = await service.translateDraft({
      sourceLocale: InfoBoardLocaleEnum.KO,
      targetLocales: [InfoBoardLocaleEnum.EN, InfoBoardLocaleEnum.VI],
      title: '제목',
      summary: '요약',
      content: '본문',
    });

    expect(translationService.translateTexts).toHaveBeenCalledTimes(2);
    expect(result.translations).toEqual([
      {
        locale: 'en',
        title: 'en:제목',
        summary: 'en:요약',
        content: 'en:본문',
      },
      {
        locale: 'vi',
        title: 'vi:제목',
        summary: 'vi:요약',
        content: 'vi:본문',
      },
    ]);
  });

  it('rejects a featured post that is not public to all visitors', async () => {
    await expect(
      service.update(
        1,
        {
          expectedVersion: 1,
          audience: InfoBoardAudienceEnum.COMPANY,
          isFeatured: true,
        },
        'admin-2',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(db.infoBoard.updateMany).not.toHaveBeenCalled();
  });

  it('keeps all five translations complete when editing a featured post', async () => {
    await expect(
      service.update(
        1,
        {
          expectedVersion: 1,
          translations: [
            {
              locale: InfoBoardLocaleEnum.KO,
              title: '수정 제목',
              summary: '수정 요약',
              content: '수정 본문',
            },
          ],
        },
        'admin-2',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(db.infoBoard.updateMany).not.toHaveBeenCalled();
    expect(db.infoBoardTranslation.deleteMany).not.toHaveBeenCalled();
  });

  it('rejects a stale expectedVersion before any related mutation', async () => {
    await expect(
      service.update(
        1,
        {
          expectedVersion: 2,
          translations: [
            {
              locale: InfoBoardLocaleEnum.KO,
              title: '수정 제목',
              content: '수정 본문',
            },
          ],
          attachmentIds: [10],
        },
        'admin-2',
      ),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(db.infoBoard.updateMany).not.toHaveBeenCalled();
    expect(db.infoBoardTranslation.deleteMany).not.toHaveBeenCalled();
    expect(db.infoBoardTranslation.upsert).not.toHaveBeenCalled();
    expect(db.infoBoardAsset.findMany).not.toHaveBeenCalled();
    expect(db.infoBoardAsset.updateMany).not.toHaveBeenCalled();
  });

  it('returns 409 when the version CAS loses a concurrent update', async () => {
    db.infoBoard.updateMany.mockResolvedValueOnce({ count: 0 });

    await expect(
      service.update(
        1,
        {
          expectedVersion: 1,
          isPinned: false,
        },
        'admin-2',
      ),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(db.infoBoard.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: BigInt(1),
          version: 1,
          deletedAt: null,
        },
      }),
    );
    expect(db.infoBoardTranslation.deleteMany).not.toHaveBeenCalled();
    expect(db.infoBoardTranslation.upsert).not.toHaveBeenCalled();
    expect(db.infoBoardAsset.findMany).not.toHaveBeenCalled();
    expect(db.infoBoardAsset.updateMany).not.toHaveBeenCalled();
  });

  it('increments version after a successful compare-and-swap update', async () => {
    db.infoBoard.updateMany.mockResolvedValueOnce({ count: 1 });
    db.infoBoard.findUnique.mockResolvedValueOnce({
      ...publishedPost,
      isPinned: false,
      version: 2,
      updatedBy: 'admin-2',
    });

    const result = await service.update(
      1,
      { expectedVersion: 1, isPinned: false },
      'admin-2',
    );

    expect(db.infoBoard.updateMany).toHaveBeenCalledWith({
      where: { id: BigInt(1), version: 1, deletedAt: null },
      data: expect.objectContaining({
        isPinned: false,
        updatedBy: 'admin-2',
        version: { increment: 1 },
      }),
    });
    expect(result).toMatchObject({ version: 2, isPinned: false });
  });

  it('persists featured slider order and theme through the admin update', async () => {
    db.infoBoard.updateMany.mockResolvedValueOnce({ count: 1 });
    db.infoBoard.findUnique.mockResolvedValueOnce({
      ...publishedPost,
      featuredOrder: 1,
      bannerTheme: 'GREEN',
      version: 2,
    });

    await service.update(
      1,
      {
        expectedVersion: 1,
        isFeatured: true,
        featuredOrder: 1,
        bannerTheme: InfoBoardBannerThemeEnum.GREEN,
      },
      'admin-2',
    );

    expect(db.infoBoard.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          isFeatured: true,
          featuredOrder: 1,
          bannerTheme: 'GREEN',
        }),
      }),
    );
  });

  it('soft deletes and records the actor', async () => {
    db.infoBoard.updateMany.mockResolvedValueOnce({ count: 1 });

    await expect(service.remove(1, 'admin-2')).resolves.toEqual({
      id: 1,
      deleted: true,
    });
    expect(db.infoBoard.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: BigInt(1), deletedAt: null },
        data: expect.objectContaining({
          deletedBy: 'admin-2',
          updatedBy: 'admin-2',
          deletedAt: expect.any(Date),
        }),
      }),
    );
  });

  it('restores a soft-deleted post and increments its version', async () => {
    db.infoBoard.updateMany.mockResolvedValueOnce({ count: 1 });

    await service.restore(1, 'admin-3');

    expect(db.infoBoard.updateMany).toHaveBeenCalledWith({
      where: { id: BigInt(1), deletedAt: { not: null } },
      data: {
        deletedAt: null,
        deletedBy: null,
        updatedBy: 'admin-3',
        version: { increment: 1 },
      },
    });
  });

  it('rejects an upload when MIME, extension, and magic bytes do not agree', async () => {
    const file = {
      originalname: 'fake.png',
      mimetype: 'image/png',
      size: 12,
      buffer: Buffer.from('not an image'),
    } as Express.Multer.File;

    await expect(
      service.uploadAttachment(file, 'admin-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(db.infoBoardAsset.create).not.toHaveBeenCalled();
  });

  it('restricts public attachment lookup to published ALL posts', async () => {
    db.infoBoardAsset.findFirst.mockResolvedValueOnce(null);

    await expect(service.getPublicAttachment(9)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(db.infoBoardAsset.findFirst).toHaveBeenCalledWith({
      where: {
        id: BigInt(9),
        post: {
          is: {
            status: InfoBoardStatusEnum.PUBLISHED,
            deletedAt: null,
            audience: { in: [InfoBoardAudienceEnum.ALL] },
          },
        },
      },
    });
  });

  it('allows COMPANY attachments only through the company service path', async () => {
    db.infoBoardAsset.findFirst.mockResolvedValueOnce(null);

    await expect(service.getCompanyAttachment(9)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(db.infoBoardAsset.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          post: {
            is: expect.objectContaining({
              audience: {
                in: [InfoBoardAudienceEnum.ALL, InfoBoardAudienceEnum.COMPANY],
              },
            }),
          },
        }),
      }),
    );
  });

  it('refuses to delete an attachment while it is connected to a post', async () => {
    db.infoBoardAsset.findUnique.mockResolvedValueOnce({
      id: BigInt(7),
      postId: BigInt(1),
      storageKey: 'uploads/info-board/attached.pdf',
    });

    await expect(service.deleteAttachment(7)).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(db.infoBoardAsset.delete).not.toHaveBeenCalled();
  });

  it('deletes an unattached asset record before cleaning up its local file', async () => {
    db.infoBoardAsset.findUnique.mockResolvedValueOnce({
      id: BigInt(8),
      postId: null,
      storageKey: 'uploads/info-board/missing.pdf',
    });
    db.infoBoardAsset.delete.mockResolvedValueOnce({ id: BigInt(8) });

    await expect(service.deleteAttachment(8)).resolves.toEqual({
      id: 8,
      deleted: true,
    });
    expect(db.infoBoardAsset.delete).toHaveBeenCalledWith({
      where: { id: BigInt(8) },
    });
  });
});
