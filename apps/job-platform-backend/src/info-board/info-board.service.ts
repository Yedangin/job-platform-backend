import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';
import { basename, extname, resolve, sep } from 'path';
import { AuthPrismaService } from 'libs/common/src';
import {
  CreateInfoBoardDto,
  InfoBoardTranslationDto,
} from './dto/create-info-board.dto';
import { UpdateInfoBoardDto } from './dto/update-info-board.dto';
import { TranslateInfoBoardDto } from './dto/translate-info-board.dto';
import {
  ConfigureFeaturedInfoBoardDto,
  ReorderFeaturedInfoBoardDto,
} from './dto/featured-info-board.dto';
import {
  AdminInfoBoardQueryDto,
  FeaturedInfoBoardQueryDto,
  InfoBoardLocaleQueryDto,
  InfoBoardQueryDto,
} from './dto/info-board-query.dto';
import {
  InfoBoardAudienceEnum,
  InfoBoardBannerThemeEnum,
  InfoBoardLocaleEnum,
  InfoBoardStatusEnum,
} from './dto/info-board.enums';
import { TranslationService } from '../translation/translation.service';

const SUPPORTED_INFO_BOARD_LOCALES = Object.values(InfoBoardLocaleEnum);

/**
 * 정보 게시판 서비스 — 외국인 생활 가이드 CRUD
 * Info board service — foreign worker life guide CRUD
 */
@Injectable()
export class InfoBoardService {
  private readonly uploadRoot = resolve(process.cwd(), 'uploads', 'info-board');

  constructor(
    private readonly authPrisma: AuthPrismaService,
    private readonly translationService: TranslationService,
  ) {}

  private get db(): any {
    return this.authPrisma as any;
  }

  async findAll(query: InfoBoardQueryDto) {
    return this.findPublishedAll(query, [InfoBoardAudienceEnum.ALL]);
  }

  async findOne(id: number, query: InfoBoardLocaleQueryDto = {}) {
    return this.findPublishedOne(id, query, [InfoBoardAudienceEnum.ALL]);
  }

  async findFeatured(query: FeaturedInfoBoardQueryDto) {
    await this.promoteScheduledPosts();
    const limit = query.limit ?? 8;
    const now = new Date();
    const items = await this.db.infoBoard.findMany({
      where: {
        status: InfoBoardStatusEnum.PUBLISHED,
        deletedAt: null,
        audience: InfoBoardAudienceEnum.ALL,
        isFeatured: true,
        bannerAssetId: { not: null },
        AND: [
          { OR: [{ featuredStartAt: null }, { featuredStartAt: { lte: now } }] },
          { OR: [{ featuredEndAt: null }, { featuredEndAt: { gt: now } }] },
          ...SUPPORTED_INFO_BOARD_LOCALES.map((locale) => ({
            translations: { some: { locale } },
          })),
        ],
      },
      orderBy: [
        { featuredOrder: 'asc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
      include: { translations: true, assets: true, featuredBanners: true },
    });

    return {
      items: items.map((post: any) =>
        this.serializePost(
          post,
          query.locale ?? InfoBoardLocaleEnum.KO,
          false,
        ),
      ),
      total: items.length,
      limit,
    };
  }

  async findAdminFeatured(query: InfoBoardLocaleQueryDto = {}) {
    const items = await this.db.infoBoard.findMany({
      where: { isFeatured: true, deletedAt: null },
      orderBy: [{ featuredOrder: 'asc' }, { updatedAt: 'desc' }],
      take: 8,
      include: { translations: true, assets: true, featuredBanners: true },
    });
    return {
      items: items.map((post: any) =>
        this.serializePost(
          post,
          query.locale ?? InfoBoardLocaleEnum.KO,
          true,
        ),
      ),
      total: items.length,
      limit: 8,
    };
  }

  async findFeaturedAudit() {
    const items = await this.db.infoBoardFeaturedAudit.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { post: { select: { title: true } } },
    });
    return {
      items: items.map((item: any) => ({
        id: Number(item.id),
        postId: item.postId === null ? null : Number(item.postId),
        postTitle: item.post?.title ?? null,
        action: item.action,
        previousState: item.previousState,
        nextState: item.nextState,
        actorId: item.actorId,
        createdAt: item.createdAt,
      })),
      total: items.length,
    };
  }

  async translateDraft(dto: TranslateInfoBoardDto) {
    if (!this.translationService.isConfigured()) {
      throw new ServiceUnavailableException(
        'The translation service is not configured',
      );
    }
    const targets = dto.targetLocales.filter(
      (locale) => locale !== dto.sourceLocale,
    );
    if (targets.length !== dto.targetLocales.length) {
      throw new BadRequestException(
        'The source locale cannot also be a target locale',
      );
    }

    const translations = await Promise.all(
      targets.map(async (locale) => {
        const [title, summary, content] =
          await this.translationService.translateTexts(
            [dto.title, dto.summary ?? '', dto.content],
            locale,
            dto.sourceLocale,
          );
        return { locale, title, summary, content };
      }),
    );
    return { translations };
  }

  async reorderFeatured(dto: ReorderFeaturedInfoBoardDto, actorId: string) {
    const orders = dto.items.map((item) => item.order);
    if (new Set(orders).size !== orders.length) {
      throw new BadRequestException('Featured orders must be unique');
    }

    const postIds = dto.items.map((item) => BigInt(item.id));
    const posts = await this.db.$transaction(async (tx: any) => {
      const existing = await tx.infoBoard.findMany({
        where: {
          id: { in: postIds },
          isFeatured: true,
          audience: InfoBoardAudienceEnum.ALL,
          deletedAt: null,
        },
      });
      if (existing.length !== dto.items.length) {
        throw new BadRequestException('Invalid featured slider posts');
      }
      const existingById = new Map<number, any>(
        existing.map((post: any) => [Number(post.id), post]),
      );

      for (const item of dto.items) {
        const post = existingById.get(item.id);
        if (!post || post.version !== item.expectedVersion) {
          throw new ConflictException(
            'Slider was modified by another administrator. Reload and try again.',
          );
        }
        const updated = await tx.infoBoard.updateMany({
          where: {
            id: BigInt(item.id),
            version: item.expectedVersion,
            isFeatured: true,
            deletedAt: null,
          },
          data: {
            featuredOrder: item.order,
            updatedBy: actorId,
            version: { increment: 1 },
          },
        });
        if (updated.count !== 1) {
          throw new ConflictException(
            'Slider was modified by another administrator. Reload and try again.',
          );
        }
        await tx.infoBoardFeaturedAudit.create({
          data: {
            postId: BigInt(item.id),
            action: 'REORDERED',
            previousState: this.featuredSnapshot(post),
            nextState: this.featuredSnapshot({ ...post, featuredOrder: item.order }),
            actorId,
          },
        });
      }

      return tx.infoBoard.findMany({
        where: { id: { in: postIds } },
        orderBy: [{ featuredOrder: 'asc' }, { updatedAt: 'desc' }],
        include: { translations: true, assets: true, featuredBanners: true },
      });
    });

    return {
      items: posts.map((post: any) =>
        this.serializePost(post, InfoBoardLocaleEnum.KO, true),
      ),
      total: posts.length,
      limit: 8,
    };
  }

  async removeFeatured(id: number, expectedVersion: number, actorId: string) {
    const post = await this.db.$transaction(async (tx: any) => {
      const existing = await tx.infoBoard.findFirst({
        where: { id: BigInt(id), isFeatured: true, deletedAt: null },
      });
      this.assertPostExists(existing, id);
      if (existing.version !== expectedVersion) {
        throw new ConflictException(
          'Slider was modified by another administrator. Reload and try again.',
        );
      }
      const updated = await tx.infoBoard.updateMany({
        where: { id: BigInt(id), version: expectedVersion, deletedAt: null },
        data: {
          isFeatured: false,
          featuredOrder: null,
          featuredStartAt: null,
          featuredEndAt: null,
          updatedBy: actorId,
          version: { increment: 1 },
        },
      });
      if (updated.count !== 1) {
        throw new ConflictException(
          'Slider was modified by another administrator. Reload and try again.',
        );
      }
      await tx.infoBoardFeaturedAudit.create({
        data: {
          postId: BigInt(id),
          action: 'REMOVED',
          previousState: this.featuredSnapshot(existing),
          nextState: this.featuredSnapshot({
            ...existing,
            isFeatured: false,
            featuredOrder: null,
            featuredStartAt: null,
            featuredEndAt: null,
          }),
          actorId,
        },
      });
      return tx.infoBoard.findUnique({
        where: { id: BigInt(id) },
        include: { translations: true, assets: true, featuredBanners: true },
      });
    });
    return this.serializePost(post, InfoBoardLocaleEnum.KO, true);
  }

  async configureFeatured(
    id: number,
    dto: ConfigureFeaturedInfoBoardDto,
    actorId: string,
  ) {
    const post = await this.db.$transaction(async (tx: any) => {
      const existing = await tx.infoBoard.findFirst({
        where: { id: BigInt(id), deletedAt: null },
        include: { translations: true, assets: true, featuredBanners: true },
      });
      this.assertPostExists(existing, id);
      if (existing.version !== dto.expectedVersion) {
        throw new ConflictException(
          'Slider was modified by another administrator. Reload and try again.',
        );
      }
      if (existing.audience !== InfoBoardAudienceEnum.ALL) {
        throw new BadRequestException(
          'Featured notices must use the ALL audience',
        );
      }
      if (
        ![
          InfoBoardStatusEnum.PUBLISHED,
          InfoBoardStatusEnum.SCHEDULED,
        ].includes(existing.status)
      ) {
        throw new BadRequestException(
          'Only published or scheduled posts can be added to the slider',
        );
      }
      if (!existing.isFeatured) {
        const configuredCount = await tx.infoBoard.count({
          where: { isFeatured: true, deletedAt: null },
        });
        if (configuredCount >= 8) {
          throw new BadRequestException('The slider supports up to 8 items');
        }
      }

      this.assertCompleteFeaturedTranslations(existing.translations);

      const bannerAssets = new Map(
        dto.bannerAssets.map((item) => [item.locale, BigInt(item.assetId)]),
      );
      if (bannerAssets.size < 1 || bannerAssets.size > SUPPORTED_INFO_BOARD_LOCALES.length) {
        throw new BadRequestException(
          'Provide one base slider image and up to four locale overrides',
        );
      }
      const bannerAssetIds = [...new Set(bannerAssets.values())];
      const assets = await tx.infoBoardAsset.findMany({
        where: {
          id: { in: bannerAssetIds },
          OR: [
            { postId: BigInt(id) },
            { postId: null, uploadedBy: actorId },
          ],
        },
      });
      if (
        assets.length !== bannerAssetIds.length ||
        assets.some((asset: any) => !asset.mimeType.startsWith('image/'))
      ) {
        throw new BadRequestException(
          'Every configured slider image must be a valid image asset',
        );
      }

      const defaultBannerAssetId = (
        bannerAssets.get(InfoBoardLocaleEnum.KO)
        ?? bannerAssets.get(InfoBoardLocaleEnum.EN)
        ?? bannerAssets.values().next().value
      ) as bigint;

      const featured = this.resolveFeaturedData({
        audience: InfoBoardAudienceEnum.ALL,
        isFeatured: true,
        featuredOrder: dto.featuredOrder,
        bannerTheme: dto.bannerTheme,
        featuredStartAt: dto.featuredStartAt,
        featuredEndAt: dto.featuredEndAt,
        bannerAssetId: defaultBannerAssetId,
      });
      const updated = await tx.infoBoard.updateMany({
        where: {
          id: BigInt(id),
          version: dto.expectedVersion,
          deletedAt: null,
        },
        data: {
          ...featured,
          bannerAssetId: defaultBannerAssetId,
          updatedBy: actorId,
          version: { increment: 1 },
        },
      });
      if (updated.count !== 1) {
        throw new ConflictException(
          'Slider was modified by another administrator. Reload and try again.',
        );
      }
      const previousBannerAssetIds = new Set<bigint>([
        ...(existing.featuredBanners ?? []).map(
          (item: any) => item.assetId as bigint,
        ),
        ...(existing.bannerAssetId ? [existing.bannerAssetId as bigint] : []),
      ]);
      const obsoleteBannerAssetIds = [...previousBannerAssetIds].filter(
        (assetId) => !bannerAssetIds.includes(assetId),
      );
      if (obsoleteBannerAssetIds.length > 0) {
        await tx.infoBoardAsset.updateMany({
          where: {
            id: { in: obsoleteBannerAssetIds },
            postId: BigInt(id),
          },
          data: { postId: null },
        });
      }
      await tx.infoBoardAsset.updateMany({
        where: {
          id: { in: bannerAssetIds },
          postId: null,
          uploadedBy: actorId,
        },
        data: { postId: BigInt(id) },
      });
      await tx.infoBoardFeaturedBanner.deleteMany({
        where: { postId: BigInt(id) },
      });
      await tx.infoBoardFeaturedBanner.createMany({
        data: [...bannerAssets.entries()].map(([locale, assetId]) => ({
          postId: BigInt(id),
          locale,
          assetId,
        })),
      });
      const result = await tx.infoBoard.findUnique({
        where: { id: BigInt(id) },
        include: { translations: true, assets: true, featuredBanners: true },
      });
      await tx.infoBoardFeaturedAudit.create({
        data: {
          postId: BigInt(id),
          action: existing.isFeatured ? 'UPDATED' : 'ADDED',
          previousState: this.featuredSnapshot(existing),
          nextState: this.featuredSnapshot(result),
          actorId,
        },
      });
      return result;
    });
    return this.serializePost(post, InfoBoardLocaleEnum.KO, true);
  }

  async findCompanyAll(query: InfoBoardQueryDto) {
    return this.findPublishedAll(query, [
      InfoBoardAudienceEnum.ALL,
      InfoBoardAudienceEnum.COMPANY,
    ]);
  }

  async findCompanyOne(id: number, query: InfoBoardLocaleQueryDto = {}) {
    return this.findPublishedOne(id, query, [
      InfoBoardAudienceEnum.ALL,
      InfoBoardAudienceEnum.COMPANY,
    ]);
  }

  async findWorkerAll(query: InfoBoardQueryDto) {
    return this.findPublishedAll(query, [
      InfoBoardAudienceEnum.ALL,
      InfoBoardAudienceEnum.WORKER,
    ]);
  }

  async findWorkerOne(id: number, query: InfoBoardLocaleQueryDto = {}) {
    return this.findPublishedOne(id, query, [
      InfoBoardAudienceEnum.ALL,
      InfoBoardAudienceEnum.WORKER,
    ]);
  }

  private async findPublishedAll(
    query: InfoBoardQueryDto,
    audiences: InfoBoardAudienceEnum[],
  ) {
    await this.promoteScheduledPosts();
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;
    const where = this.buildPublishedWhere(query, audiences);

    const [items, total] = await Promise.all([
      this.db.infoBoard.findMany({
        where,
        orderBy: [
          { isPinned: 'desc' },
          { publishedAt: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
        include: { translations: true, assets: true, featuredBanners: true },
      }),
      this.db.infoBoard.count({ where }),
    ]);

    return {
      items: items.map((post: any) =>
        this.serializePost(post, query.locale ?? InfoBoardLocaleEnum.KO, false),
      ),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private async findPublishedOne(
    id: number,
    query: InfoBoardLocaleQueryDto,
    audiences: InfoBoardAudienceEnum[],
  ) {
    await this.promoteScheduledPosts();
    const where = {
      ...this.buildPublishedWhere(query, audiences),
      id: BigInt(id),
    };
    const post = await this.db.infoBoard.findFirst({
      where,
      include: { translations: true, assets: true, featuredBanners: true },
    });
    this.assertPostExists(post, id);

    const viewed = await this.db.infoBoard.updateMany({
      where,
      data: { viewCount: { increment: 1 } },
    });
    if (viewed.count !== 1) this.assertPostExists(null, id);
    return this.serializePost(
      { ...post, viewCount: (post.viewCount ?? 0) + 1 },
      query.locale ?? InfoBoardLocaleEnum.KO,
      false,
    );
  }

  async findAdminAll(query: AdminInfoBoardQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const where: Record<string, unknown> = {};
    if (!query.includeDeleted) where.deletedAt = null;
    if (query.category) where.category = query.category;
    if (query.status) where.status = query.status;
    if (query.audience) where.audience = query.audience;
    Object.assign(where, this.buildSearchWhere(query.search));

    const [items, total] = await Promise.all([
      this.db.infoBoard.findMany({
        where,
        orderBy: [
          { isPinned: 'desc' },
          { publishedAt: 'desc' },
          { createdAt: 'desc' },
        ],
        skip: (page - 1) * limit,
        take: limit,
        include: { translations: true, assets: true, featuredBanners: true },
      }),
      this.db.infoBoard.count({ where }),
    ]);

    return {
      items: items.map((post: any) =>
        this.serializePost(post, query.locale ?? InfoBoardLocaleEnum.KO, true),
      ),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAdminOne(id: number, query: InfoBoardLocaleQueryDto = {}) {
    const post = await this.db.infoBoard.findUnique({
      where: { id: BigInt(id) },
      include: { translations: true, assets: true, featuredBanners: true },
    });
    this.assertPostExists(post, id);
    return this.serializePost(
      post,
      query.locale ?? InfoBoardLocaleEnum.KO,
      true,
    );
  }

  async create(dto: CreateInfoBoardDto, actorId: string) {
    this.validateThumbnail(dto.thumbnail);
    const featured = this.resolveFeaturedData({
      audience: dto.audience ?? InfoBoardAudienceEnum.ALL,
      isFeatured: dto.isFeatured ?? false,
      featuredOrder: dto.featuredOrder,
      bannerTheme: dto.bannerTheme,
      featuredStartAt: dto.featuredStartAt,
      featuredEndAt: dto.featuredEndAt,
      bannerAssetId: dto.bannerAssetId,
    });
    const translations = this.normalizeCreateTranslations(dto);
    if (featured.isFeatured) {
      this.assertCompleteFeaturedTranslations(translations);
    }
    const canonical = this.resolveTranslation(
      translations,
      InfoBoardLocaleEnum.KO,
      dto.title,
      dto.content,
    );
    const publication = this.getPublicationData(
      dto.status ?? InfoBoardStatusEnum.DRAFT,
      dto.scheduledAt,
    );
    const attachmentIds = this.normalizeIds(dto.attachmentIds);
    if (
      featured.isFeatured &&
      !attachmentIds.includes(featured.bannerAssetId as bigint)
    ) {
      throw new BadRequestException(
        'bannerAssetId must be included in attachmentIds',
      );
    }

    const post = await this.db.$transaction(async (tx: any) => {
      await this.assertAttachableAssets(tx, attachmentIds, actorId);
      const created = await tx.infoBoard.create({
        data: {
          title: canonical.title,
          content: canonical.content,
          category: dto.category,
          thumbnail: dto.thumbnail,
          status: publication.status,
          audience: dto.audience ?? InfoBoardAudienceEnum.ALL,
          isPinned: dto.isPinned ?? false,
          isFeatured: featured.isFeatured,
          featuredOrder: featured.featuredOrder,
          bannerTheme: featured.bannerTheme,
          featuredStartAt: featured.featuredStartAt,
          featuredEndAt: featured.featuredEndAt,
          bannerAssetId: featured.bannerAssetId,
          scheduledAt:
            publication.status === InfoBoardStatusEnum.SCHEDULED
              ? publication.scheduledAt
              : null,
          publishedAt: publication.publishedAt,
          createdBy: actorId,
          updatedBy: actorId,
          translations: {
            create: translations.map((translation) => ({
              locale: translation.locale,
              title: translation.title.trim(),
              summary: translation.summary?.trim() || null,
              content: translation.content.trim(),
            })),
          },
        },
      });
      if (attachmentIds.length > 0) {
        await tx.infoBoardAsset.updateMany({
          where: {
            id: { in: attachmentIds },
            postId: null,
            uploadedBy: actorId,
          },
          data: { postId: created.id },
        });
      }
      if (featured.isFeatured) {
        await tx.infoBoardFeaturedAudit.create({
          data: {
            postId: created.id,
            action: 'ADDED',
            previousState: undefined,
            nextState: this.featuredSnapshot({ ...created, ...featured }),
            actorId,
          },
        });
      }
      return tx.infoBoard.findUnique({
        where: { id: created.id },
        include: { translations: true, assets: true, featuredBanners: true },
      });
    });
    return this.serializePost(post, InfoBoardLocaleEnum.KO, true);
  }

  async update(id: number, dto: UpdateInfoBoardDto, actorId: string) {
    this.validateThumbnail(dto.thumbnail);
    const post = await this.db.$transaction(async (tx: any) => {
      const existing = await tx.infoBoard.findFirst({
        where: { id: BigInt(id), deletedAt: null },
        include: { translations: true, assets: true, featuredBanners: true },
      });
      this.assertPostExists(existing, id);
      if (existing.version !== dto.expectedVersion) {
        throw new ConflictException(
          'Post was modified by another administrator. Reload and try again.',
        );
      }

      const translations = this.normalizeUpdateTranslations(dto, existing);
      const canonical = translations
        ? this.resolveTranslation(
            translations,
            InfoBoardLocaleEnum.KO,
            dto.title ?? existing.title,
            dto.content ?? existing.content,
          )
        : null;
      const nextStatus = dto.status ?? existing.status;
      const featured = this.resolveFeaturedData({
        audience: dto.audience ?? existing.audience,
        isFeatured: dto.isFeatured ?? existing.isFeatured,
        featuredOrder:
          dto.featuredOrder !== undefined
            ? dto.featuredOrder
            : existing.featuredOrder,
        bannerTheme: dto.bannerTheme ?? existing.bannerTheme,
        featuredStartAt:
          dto.featuredStartAt !== undefined
            ? dto.featuredStartAt
            : existing.featuredStartAt,
        featuredEndAt:
          dto.featuredEndAt !== undefined
            ? dto.featuredEndAt
            : existing.featuredEndAt,
        bannerAssetId:
          dto.bannerAssetId !== undefined
            ? dto.bannerAssetId
            : existing.bannerAssetId,
      });
      if (featured.isFeatured) {
        this.assertCompleteFeaturedTranslations(
          translations ?? existing.translations,
        );
      }
      const publication = this.getPublicationData(
        nextStatus,
        dto.scheduledAt ?? existing.scheduledAt?.toISOString(),
        existing.status,
        existing.publishedAt,
      );

      const data: Record<string, unknown> = {
        updatedBy: actorId,
        version: { increment: 1 },
        status: publication.status,
        publishedAt: publication.publishedAt,
        scheduledAt:
          publication.status === InfoBoardStatusEnum.SCHEDULED
            ? publication.scheduledAt
            : null,
      };
      if (dto.category !== undefined) data.category = dto.category;
      if (dto.thumbnail !== undefined) data.thumbnail = dto.thumbnail;
      if (dto.audience !== undefined) data.audience = dto.audience;
      if (dto.isPinned !== undefined) data.isPinned = dto.isPinned;
      data.isFeatured = featured.isFeatured;
      data.featuredOrder = featured.featuredOrder;
      data.bannerTheme = featured.bannerTheme;
      data.featuredStartAt = featured.featuredStartAt;
      data.featuredEndAt = featured.featuredEndAt;
      data.bannerAssetId = featured.bannerAssetId;
      if (canonical) {
        data.title = canonical.title;
        data.content = canonical.content;
      } else {
        if (dto.title !== undefined) data.title = dto.title.trim();
        if (dto.content !== undefined) data.content = dto.content.trim();
      }

      const updated = await tx.infoBoard.updateMany({
        where: {
          id: BigInt(id),
          version: dto.expectedVersion,
          deletedAt: null,
        },
        data,
      });
      if (updated.count !== 1) {
        throw new ConflictException(
          'Post was modified by another administrator. Reload and try again.',
        );
      }

      if (translations) {
        const locales = translations.map((translation) => translation.locale);
        await tx.infoBoardTranslation.deleteMany({
          where: { postId: BigInt(id), locale: { notIn: locales } },
        });
        for (const translation of translations) {
          await tx.infoBoardTranslation.upsert({
            where: {
              postId_locale: { postId: BigInt(id), locale: translation.locale },
            },
            create: {
              postId: BigInt(id),
              locale: translation.locale,
              title: translation.title.trim(),
              summary: translation.summary?.trim() || null,
              content: translation.content.trim(),
            },
            update: {
              title: translation.title.trim(),
              summary: translation.summary?.trim() || null,
              content: translation.content.trim(),
            },
          });
        }
      }

      if (dto.attachmentIds !== undefined) {
        const attachmentIds = this.normalizeIds(dto.attachmentIds);
        await this.assertAttachableAssets(
          tx,
          attachmentIds,
          actorId,
          BigInt(id),
        );
        await tx.infoBoardAsset.updateMany({
          where: { postId: BigInt(id), id: { notIn: attachmentIds } },
          data: { postId: null },
        });
        if (attachmentIds.length > 0) {
          await tx.infoBoardAsset.updateMany({
            where: {
              id: { in: attachmentIds },
              OR: [
                { postId: BigInt(id) },
                { postId: null, uploadedBy: actorId },
              ],
            },
            data: { postId: BigInt(id) },
          });
        }
      }

      const result = await tx.infoBoard.findUnique({
        where: { id: BigInt(id) },
        include: { translations: true, assets: true, featuredBanners: true },
      });
      const previousFeatured = this.featuredSnapshot(existing);
      const nextFeatured = this.featuredSnapshot(result);
      if (JSON.stringify(previousFeatured) !== JSON.stringify(nextFeatured)) {
        await tx.infoBoardFeaturedAudit.create({
          data: {
            postId: BigInt(id),
            action: !existing.isFeatured && result.isFeatured
              ? 'ADDED'
              : existing.isFeatured && !result.isFeatured
                ? 'REMOVED'
                : 'UPDATED',
            previousState: previousFeatured,
            nextState: nextFeatured,
            actorId,
          },
        });
      }
      return result;
    });
    return this.serializePost(post, InfoBoardLocaleEnum.KO, true);
  }

  async remove(id: number, actorId: string) {
    const result = await this.db.infoBoard.updateMany({
      where: { id: BigInt(id), deletedAt: null },
      data: {
        deletedAt: new Date(),
        deletedBy: actorId,
        updatedBy: actorId,
        version: { increment: 1 },
      },
    });
    if (result.count !== 1) this.assertPostExists(null, id);
    return { id, deleted: true };
  }

  async restore(id: number, actorId: string) {
    const result = await this.db.infoBoard.updateMany({
      where: { id: BigInt(id), deletedAt: { not: null } },
      data: {
        deletedAt: null,
        deletedBy: null,
        updatedBy: actorId,
        version: { increment: 1 },
      },
    });
    if (result.count !== 1) this.assertPostExists(null, id);
    const post = await this.db.infoBoard.findUnique({
      where: { id: BigInt(id) },
      include: { translations: true, assets: true, featuredBanners: true },
    });
    return this.serializePost(post, InfoBoardLocaleEnum.KO, true);
  }

  async uploadAttachment(file: Express.Multer.File, actorId: string) {
    if (!file?.buffer) throw new BadRequestException('file is required');
    const detected = this.detectFileType(file);
    await fs.mkdir(this.uploadRoot, { recursive: true });
    const fileName = `${randomUUID()}.${detected.extension}`;
    const absolutePath = resolve(this.uploadRoot, fileName);
    this.assertWithinUploadRoot(absolutePath);
    await fs.writeFile(absolutePath, file.buffer, { flag: 'wx' });

    try {
      const asset = await this.db.infoBoardAsset.create({
        data: {
          storageKey: `uploads/info-board/${fileName}`,
          originalName: basename(file.originalname).slice(0, 255),
          mimeType: detected.mimeType,
          sizeBytes: file.buffer.length,
          uploadedBy: actorId,
        },
      });
      return this.serializeAsset(asset, '/api/info-board/admin/attachments');
    } catch (error) {
      await fs.unlink(absolutePath).catch(() => undefined);
      throw error;
    }
  }

  async deleteAttachment(id: number) {
    const asset = await this.db.infoBoardAsset.findUnique({
      where: { id: BigInt(id) },
    });
    if (!asset) throw new NotFoundException('Attachment not found');
    if (asset.postId !== null) {
      throw new ConflictException(
        'Attached files must be detached from the post before deletion',
      );
    }

    const absolutePath = resolve(process.cwd(), asset.storageKey);
    this.assertWithinUploadRoot(absolutePath);
    await this.db.infoBoardAsset.delete({ where: { id: BigInt(id) } });
    await fs.unlink(absolutePath).catch(() => undefined);
    return { id, deleted: true };
  }

  async getPublicAttachment(id: number) {
    return this.getPublishedAttachment(id, [InfoBoardAudienceEnum.ALL]);
  }

  async getAdminAttachment(id: number) {
    const asset = await this.db.infoBoardAsset.findUnique({
      where: { id: BigInt(id) },
    });
    if (!asset) throw new NotFoundException('Attachment not found');
    const absolutePath = resolve(process.cwd(), asset.storageKey);
    this.assertWithinUploadRoot(absolutePath);
    const buffer = await fs.readFile(absolutePath).catch(() => {
      throw new NotFoundException('Attachment file not found');
    });
    return {
      buffer,
      mimeType: asset.mimeType,
      originalName: asset.originalName,
    };
  }

  async getCompanyAttachment(id: number) {
    return this.getPublishedAttachment(id, [
      InfoBoardAudienceEnum.ALL,
      InfoBoardAudienceEnum.COMPANY,
    ]);
  }

  async getWorkerAttachment(id: number) {
    return this.getPublishedAttachment(id, [
      InfoBoardAudienceEnum.ALL,
      InfoBoardAudienceEnum.WORKER,
    ]);
  }

  private async getPublishedAttachment(
    id: number,
    audiences: InfoBoardAudienceEnum[],
  ) {
    const asset = await this.db.infoBoardAsset.findFirst({
      where: {
        id: BigInt(id),
        post: {
          is: {
            status: InfoBoardStatusEnum.PUBLISHED,
            deletedAt: null,
            audience: { in: audiences },
          },
        },
      },
    });
    if (!asset) throw new NotFoundException('Attachment not found');
    const absolutePath = resolve(process.cwd(), asset.storageKey);
    this.assertWithinUploadRoot(absolutePath);
    const buffer = await fs.readFile(absolutePath).catch(() => {
      throw new NotFoundException('Attachment file not found');
    });
    return {
      buffer,
      mimeType: asset.mimeType,
      originalName: asset.originalName,
    };
  }

  private async promoteScheduledPosts() {
    await this.db.infoBoard.updateMany({
      where: {
        status: InfoBoardStatusEnum.SCHEDULED,
        deletedAt: null,
        scheduledAt: { lte: new Date() },
      },
      data: {
        status: InfoBoardStatusEnum.PUBLISHED,
        publishedAt: new Date(),
        version: { increment: 1 },
      },
    });
  }

  private buildPublishedWhere(
    query: InfoBoardLocaleQueryDto & Partial<InfoBoardQueryDto>,
    audiences: InfoBoardAudienceEnum[],
  ) {
    const where: Record<string, unknown> = {
      status: InfoBoardStatusEnum.PUBLISHED,
      deletedAt: null,
      audience: { in: audiences },
    };
    const listQuery = query as Partial<InfoBoardQueryDto>;
    if (listQuery.category) where.category = listQuery.category;
    Object.assign(where, this.buildSearchWhere(listQuery.search));
    return where;
  }

  private buildSearchWhere(search?: string) {
    const term = search?.trim();
    if (!term) return {};
    return {
      OR: [
        { title: { contains: term, mode: 'insensitive' } },
        { content: { contains: term, mode: 'insensitive' } },
        {
          translations: {
            some: {
              OR: [
                { title: { contains: term, mode: 'insensitive' } },
                { summary: { contains: term, mode: 'insensitive' } },
                { content: { contains: term, mode: 'insensitive' } },
              ],
            },
          },
        },
      ],
    };
  }

  private normalizeCreateTranslations(dto: CreateInfoBoardDto) {
    if (dto.translations?.length) return dto.translations;
    if (!dto.title?.trim() || !dto.content?.trim()) {
      throw new BadRequestException(
        'translations or legacy title/content are required',
      );
    }
    return [
      {
        locale: InfoBoardLocaleEnum.KO,
        title: dto.title.trim(),
        content: dto.content.trim(),
      },
    ];
  }

  private normalizeUpdateTranslations(dto: UpdateInfoBoardDto, existing: any) {
    if (dto.translations?.length) return dto.translations;
    if (dto.title === undefined && dto.content === undefined) return null;
    const korean = existing.translations.find(
      (translation: any) => translation.locale === InfoBoardLocaleEnum.KO,
    );
    return [
      {
        locale: InfoBoardLocaleEnum.KO,
        title: (dto.title ?? korean?.title ?? existing.title).trim(),
        summary: korean?.summary ?? undefined,
        content: (dto.content ?? korean?.content ?? existing.content).trim(),
      },
    ];
  }

  private resolveTranslation(
    translations: InfoBoardTranslationDto[] | any[],
    locale: InfoBoardLocaleEnum,
    legacyTitle?: string,
    legacyContent?: string,
  ) {
    const preferredLocales = [
      locale,
      InfoBoardLocaleEnum.EN,
      InfoBoardLocaleEnum.KO,
    ];
    for (const preferred of preferredLocales) {
      const translation = translations.find(
        (item) => item.locale === preferred,
      );
      if (translation) return translation;
    }
    if (translations[0]) return translations[0];
    return {
      locale: InfoBoardLocaleEnum.KO,
      title: legacyTitle ?? '',
      content: legacyContent ?? '',
      summary: null,
    };
  }

  private getPublicationData(
    status: InfoBoardStatusEnum,
    scheduledAtValue?: string,
    previousStatus?: InfoBoardStatusEnum,
    previousPublishedAt?: Date | null,
  ) {
    const scheduledAt = scheduledAtValue ? new Date(scheduledAtValue) : null;
    if (status === InfoBoardStatusEnum.SCHEDULED && !scheduledAt) {
      throw new BadRequestException('scheduledAt is required for SCHEDULED');
    }
    return {
      status,
      scheduledAt,
      publishedAt:
        status === InfoBoardStatusEnum.PUBLISHED
          ? previousStatus === InfoBoardStatusEnum.PUBLISHED &&
            previousPublishedAt
            ? previousPublishedAt
            : new Date()
          : (previousPublishedAt ?? null),
    };
  }

  private async assertAttachableAssets(
    tx: any,
    ids: bigint[],
    actorId: string,
    postId?: bigint,
  ) {
    if (ids.length === 0) return;
    const assets = await tx.infoBoardAsset.findMany({
      where: {
        id: { in: ids },
        OR: [
          { postId: null, uploadedBy: actorId },
          ...(postId ? [{ postId }] : []),
        ],
      },
      select: { id: true },
    });
    if (assets.length !== ids.length) {
      throw new BadRequestException('Invalid or already-owned attachmentIds');
    }
  }

  private normalizeIds(ids?: number[]) {
    return [...new Set(ids ?? [])].map((id) => BigInt(id));
  }

  private validateThumbnail(thumbnail?: string) {
    if (!thumbnail) return;
    try {
      const url = new URL(thumbnail);
      if (url.protocol !== 'https:') throw new Error('invalid protocol');
    } catch {
      throw new BadRequestException('thumbnail must be a valid HTTPS URL');
    }
  }

  private resolveFeaturedData(input: {
    audience: InfoBoardAudienceEnum;
    isFeatured: boolean;
    featuredOrder?: number | null;
    bannerTheme?: InfoBoardBannerThemeEnum | null;
    featuredStartAt?: string | Date | null;
    featuredEndAt?: string | Date | null;
    bannerAssetId?: number | bigint | null;
  }) {
    if (input.isFeatured && input.audience !== InfoBoardAudienceEnum.ALL) {
      throw new BadRequestException(
        'Featured notices must use the ALL audience',
      );
    }
    const featuredStartAt = input.featuredStartAt
      ? new Date(input.featuredStartAt)
      : null;
    const featuredEndAt = input.featuredEndAt
      ? new Date(input.featuredEndAt)
      : null;
    if (
      input.isFeatured &&
      featuredStartAt &&
      featuredEndAt &&
      featuredStartAt >= featuredEndAt
    ) {
      throw new BadRequestException(
        'featuredEndAt must be later than featuredStartAt',
      );
    }
    if (input.isFeatured && !input.bannerAssetId) {
      throw new BadRequestException(
        'A dedicated slider image is required for featured notices',
      );
    }
    return {
      isFeatured: input.isFeatured,
      featuredOrder: input.isFeatured ? (input.featuredOrder ?? 1) : null,
      bannerTheme: input.bannerTheme ?? InfoBoardBannerThemeEnum.BRAND,
      featuredStartAt: input.isFeatured ? featuredStartAt : null,
      featuredEndAt: input.isFeatured ? featuredEndAt : null,
      bannerAssetId: input.isFeatured
        ? BigInt(input.bannerAssetId as number | bigint)
        : null,
    };
  }

  private featuredSnapshot(post: any) {
    return {
      isFeatured: Boolean(post?.isFeatured),
      featuredOrder: post?.featuredOrder ?? null,
      bannerTheme: post?.bannerTheme ?? InfoBoardBannerThemeEnum.BRAND,
      featuredStartAt: post?.featuredStartAt
        ? new Date(post.featuredStartAt).toISOString()
        : null,
      featuredEndAt: post?.featuredEndAt
        ? new Date(post.featuredEndAt).toISOString()
        : null,
      bannerAssetId: post?.bannerAssetId ? Number(post.bannerAssetId) : null,
      bannerAssets: Object.fromEntries(
        (post?.featuredBanners ?? []).map((item: any) => [
          item.locale,
          Number(item.assetId),
        ]),
      ),
    };
  }

  private assertCompleteFeaturedTranslations(translations: any[]) {
    const translationsByLocale = new Map(
      (translations ?? []).map((translation: any) => [
        translation.locale,
        translation,
      ]),
    );
    const missing = SUPPORTED_INFO_BOARD_LOCALES.filter((locale) => {
      const translation = translationsByLocale.get(locale);
      return !translation?.title?.trim()
        || !translation?.summary?.trim()
        || !translation?.content?.trim();
    });
    if (missing.length > 0) {
      throw new BadRequestException(
        `Featured posts require complete title, summary, and content translations: ${missing.join(', ')}`,
      );
    }
  }

  private detectFileType(file: Express.Multer.File) {
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize || file.buffer.length > maxSize) {
      throw new BadRequestException('File exceeds 5MB limit');
    }
    const originalExtension = extname(file.originalname).toLowerCase();
    const candidates = [
      {
        mimeType: 'image/jpeg',
        extensions: ['.jpg', '.jpeg'],
        extension: 'jpg',
        matches: (buffer: Buffer) =>
          buffer.length >= 3 &&
          buffer[0] === 0xff &&
          buffer[1] === 0xd8 &&
          buffer[2] === 0xff,
      },
      {
        mimeType: 'image/png',
        extensions: ['.png'],
        extension: 'png',
        matches: (buffer: Buffer) =>
          buffer.length >= 8 &&
          buffer
            .subarray(0, 8)
            .equals(
              Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
            ),
      },
      {
        mimeType: 'image/webp',
        extensions: ['.webp'],
        extension: 'webp',
        matches: (buffer: Buffer) =>
          buffer.length >= 12 &&
          buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
          buffer.subarray(8, 12).toString('ascii') === 'WEBP',
      },
      {
        mimeType: 'application/pdf',
        extensions: ['.pdf'],
        extension: 'pdf',
        matches: (buffer: Buffer) =>
          buffer.length >= 5 &&
          buffer.subarray(0, 5).toString('ascii') === '%PDF-',
      },
    ];
    const detected = candidates.find((candidate) =>
      candidate.matches(file.buffer),
    );
    if (
      !detected ||
      detected.mimeType !== file.mimetype.toLowerCase() ||
      !detected.extensions.includes(originalExtension)
    ) {
      throw new BadRequestException(
        'Only valid jpeg, png, webp, and pdf files are allowed',
      );
    }
    return detected;
  }

  private assertWithinUploadRoot(absolutePath: string) {
    const root = `${this.uploadRoot}${sep}`;
    if (!absolutePath.startsWith(root)) {
      throw new BadRequestException('Invalid attachment path');
    }
  }

  private serializePost(
    post: any,
    locale: InfoBoardLocaleEnum,
    admin: boolean,
  ) {
    const translation = this.resolveTranslation(
      post.translations ?? [],
      locale,
      post.title,
      post.content,
    );
    const attachmentBaseUrl = admin
      ? '/api/info-board/admin/attachments'
      : this.getAttachmentBaseUrl(post);
    const localizedBannerAssetIds = new Set(
      (post.featuredBanners ?? []).map((item: any) => item.assetId),
    );
    if (post.bannerAssetId) localizedBannerAssetIds.add(post.bannerAssetId);
    const bannerImages: Partial<Record<InfoBoardLocaleEnum, string>> =
      Object.fromEntries(
      (post.featuredBanners ?? []).flatMap((item: any) => {
        const asset = (post.assets ?? []).find(
          (candidate: any) => candidate.id === item.assetId,
        );
        return asset && attachmentBaseUrl
          ? [[item.locale, `${attachmentBaseUrl}/${Number(asset.id)}/content`]]
          : [];
      }),
    );
    const result: Record<string, unknown> = {
      id: Number(post.id),
      title: translation.title,
      summary: translation.summary ?? null,
      content: translation.content,
      locale: translation.locale,
      availableLocales: (post.translations ?? []).map(
        (item: any) => item.locale,
      ),
      category: post.category,
      audience: post.audience,
      status: post.status,
      isPinned: post.isPinned,
      isFeatured: post.isFeatured ?? false,
      featuredOrder: post.featuredOrder ?? null,
      bannerTheme: post.bannerTheme ?? InfoBoardBannerThemeEnum.BRAND,
      featuredStartAt: post.featuredStartAt ?? null,
      featuredEndAt: post.featuredEndAt ?? null,
      bannerAssetId: post.bannerAssetId ? Number(post.bannerAssetId) : null,
      thumbnail: post.thumbnail,
      scheduledAt: post.scheduledAt,
      publishedAt: post.publishedAt,
      viewCount: post.viewCount,
      version: post.version,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      assets: (post.assets ?? [])
        .filter((asset: any) => !localizedBannerAssetIds.has(asset.id))
        .map((asset: any) => this.serializeAsset(asset, attachmentBaseUrl)),
    };
    const bannerAsset = (post.assets ?? []).find(
      (asset: any) => asset.id === post.bannerAssetId,
    );
    const legacyBannerImage = bannerAsset && attachmentBaseUrl
      ? `${attachmentBaseUrl}/${Number(bannerAsset.id)}/content`
      : post.thumbnail ?? null;
    result.bannerAssets = Object.fromEntries(
      (post.featuredBanners ?? []).map((item: any) => [
        item.locale,
        Number(item.assetId),
      ]),
    );
    result.bannerImages = bannerImages;
    result.bannerImage = bannerImages[locale]
      ?? bannerImages[InfoBoardLocaleEnum.EN]
      ?? bannerImages[InfoBoardLocaleEnum.KO]
      ?? Object.values(bannerImages)[0]
      ?? legacyBannerImage;
    if (admin) {
      result.translations = post.translations ?? [];
      result.createdBy = post.createdBy;
      result.updatedBy = post.updatedBy;
      result.deletedAt = post.deletedAt;
      result.deletedBy = post.deletedBy;
    }
    return result;
  }

  private getAttachmentBaseUrl(post: any) {
    if (
      post.status !== InfoBoardStatusEnum.PUBLISHED ||
      post.deletedAt !== null
    ) {
      return undefined;
    }
    if (post.audience === InfoBoardAudienceEnum.COMPANY) {
      return '/api/info-board/company/attachments';
    }
    if (post.audience === InfoBoardAudienceEnum.WORKER) {
      return '/api/info-board/worker/attachments';
    }
    return '/api/info-board/attachments';
  }

  private serializeAsset(asset: any, contentBaseUrl?: string) {
    return {
      id: Number(asset.id),
      originalName: asset.originalName,
      mimeType: asset.mimeType,
      sizeBytes: asset.sizeBytes,
      ...(contentBaseUrl
        ? { url: `${contentBaseUrl}/${Number(asset.id)}/content` }
        : {}),
    };
  }

  private assertPostExists(post: any, id: number): asserts post {
    if (!post) {
      throw new NotFoundException(
        `게시글을 찾을 수 없습니다 (id: ${id}) / Post not found`,
      );
    }
  }
}
