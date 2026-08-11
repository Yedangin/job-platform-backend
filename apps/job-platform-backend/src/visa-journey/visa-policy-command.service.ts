import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';
import { RuleEngineService } from '../visa-rules/rule-engine.service';
import { RollbackVisaPolicyDto, VisaPolicyReasonDto } from './dto';
import { VisaPolicyAuditService } from './visa-policy-audit.service';
import { VisaPolicyIntegrityService } from './visa-policy-integrity.service';

/** 정책 검토·배포 상태 전이 / Policy review and deployment transitions */
@Injectable()
export class VisaPolicyCommandService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly ruleEngine: RuleEngineService,
    private readonly audit: VisaPolicyAuditService,
    private readonly integrity: VisaPolicyIntegrityService,
  ) {}

  async submitReview(actorId: string, id: string, dto: VisaPolicyReasonDto) {
    const release = await this.getRelease(id, 'DRAFT');
    const [rules, pathways] = await Promise.all([
      this.prisma.visaRule.count({
        where: { policyReleaseId: id, status: 'DRAFT' },
      }),
      this.prisma.visaPathwayDefinition.count({
        where: { policyReleaseId: id, status: 'DRAFT' },
      }),
    ]);
    if (rules === 0 || pathways === 0)
      throw new BadRequestException(
        '규칙과 5단계 경로가 모두 필요합니다. / Rules and pathways are required.',
      );
    return this.prisma.$transaction(async (tx) => {
      const contentHash = await this.integrity.computeReleaseHash(id, tx);
      const updated = await tx.visaPolicyRelease.update({
        where: { id },
        data: { status: 'UNDER_REVIEW', contentHash },
      });
      await this.audit.create(
        'VisaPolicyRelease',
        id,
        'SUBMITTED_FOR_REVIEW',
        this.audit.releaseSnapshot(release),
        this.audit.releaseSnapshot(updated),
        dto.reason,
        actorId,
        id,
        undefined,
        tx,
      );
      return updated;
    });
  }

  async expertReview(actorId: string, id: string, dto: VisaPolicyReasonDto) {
    const release = await this.getRelease(id, 'UNDER_REVIEW');
    if (release.createdBy === actorId)
      throw new ForbiddenException('작성자는 행정사 검토자가 될 수 없습니다.');
    await this.assertReviewerCredential(actorId);
    return this.prisma.$transaction(async (tx) => {
      await tx.visaPathwayDefinition.updateMany({
        where: { policyReleaseId: id, status: 'DRAFT' },
        data: { status: 'APPROVED' },
      });
      const updated = await tx.visaPolicyRelease.update({
        where: { id },
        data: {
          status: 'APPROVED',
          reviewedBy: actorId,
          reviewedAt: new Date(),
        },
      });
      await this.audit.create(
        'VisaPolicyRelease',
        id,
        'APPROVED',
        this.audit.releaseSnapshot(release),
        this.audit.releaseSnapshot(updated),
        dto.reason,
        actorId,
        id,
        undefined,
        tx,
      );
      return updated;
    });
  }

  async schedule(actorId: string, id: string, dto: VisaPolicyReasonDto) {
    const release = await this.getRelease(id, 'APPROVED');
    if (actorId === release.createdBy || actorId === release.reviewedBy)
      throw new ForbiddenException(
        '작성자·행정사 검토자와 다른 배포 승인자가 필요합니다.',
      );
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.visaPolicyRelease.update({
        where: { id },
        data: {
          status: 'SCHEDULED',
          approvedBy: actorId,
          approvedAt: new Date(),
        },
      });
      await this.audit.create(
        'VisaPolicyRelease',
        id,
        'APPROVED',
        this.audit.releaseSnapshot(release),
        this.audit.releaseSnapshot(updated),
        dto.reason,
        actorId,
        id,
        undefined,
        tx,
      );
      return updated;
    });
  }

  async activate(actorId: string, id: string, dto: VisaPolicyReasonDto) {
    const release = await this.assertActivationGate(id);
    const activated = await this.prisma.$transaction(async (tx) => {
      await this.integrity.assertReleaseHash(id, release.contentHash, tx);
      await tx.visaPolicyRelease.updateMany({
        where: { domain: release.domain, status: 'ACTIVE' },
        data: { status: 'SUPERSEDED' },
      });
      await tx.visaRule.updateMany({
        where: { status: 'ACTIVE' },
        data: { status: 'ARCHIVED' },
      });
      await tx.visaPathwayDefinition.updateMany({
        where: { status: 'ACTIVE' },
        data: { status: 'ARCHIVED' },
      });
      await tx.visaRule.updateMany({
        where: { policyReleaseId: id, status: 'DRAFT' },
        data: { status: 'ACTIVE' },
      });
      await tx.visaPathwayDefinition.updateMany({
        where: { policyReleaseId: id, status: 'APPROVED' },
        data: { status: 'ACTIVE' },
      });
      await this.markOtherJourneysStale(tx, id);
      const updated = await tx.visaPolicyRelease.update({
        where: { id },
        data: { status: 'ACTIVE', activatedAt: new Date() },
      });
      await this.audit.create(
        'VisaPolicyRelease',
        id,
        'ACTIVATED',
        this.audit.releaseSnapshot(release),
        this.audit.releaseSnapshot(updated),
        dto.reason,
        actorId,
        id,
        undefined,
        tx,
      );
      return updated;
    });
    await this.ruleEngine.invalidateCache();
    return activated;
  }

  async rollback(actorId: string, dto: RollbackVisaPolicyDto) {
    const target = await this.prisma.visaPolicyRelease.findUnique({
      where: { id: dto.targetReleaseId },
    });
    if (
      !target ||
      target.status !== 'SUPERSEDED' ||
      !target.reviewedAt ||
      !target.approvedAt
    )
      throw new BadRequestException(
        '검토·승인된 이전 릴리스만 롤백할 수 있습니다.',
      );
    const result = await this.prisma.$transaction(async (tx) => {
      await this.integrity.assertReleaseHash(target.id, target.contentHash, tx);
      await tx.visaPolicyRelease.updateMany({
        where: { domain: target.domain, status: 'ACTIVE' },
        data: { status: 'SUPERSEDED' },
      });
      await tx.visaRule.updateMany({
        where: { status: 'ACTIVE' },
        data: { status: 'ARCHIVED' },
      });
      await tx.visaPathwayDefinition.updateMany({
        where: { status: 'ACTIVE' },
        data: { status: 'ARCHIVED' },
      });
      await tx.visaRule.updateMany({
        where: { policyReleaseId: target.id, status: 'ARCHIVED' },
        data: { status: 'ACTIVE' },
      });
      await tx.visaPathwayDefinition.updateMany({
        where: { policyReleaseId: target.id, status: 'ARCHIVED' },
        data: { status: 'ACTIVE' },
      });
      await this.markOtherJourneysStale(tx, target.id);
      const updated = await tx.visaPolicyRelease.update({
        where: { id: target.id },
        data: { status: 'ACTIVE', activatedAt: new Date() },
      });
      await this.audit.create(
        'VisaPolicyRelease',
        target.id,
        'ACTIVATED',
        this.audit.releaseSnapshot(target),
        this.audit.releaseSnapshot(updated),
        dto.reason,
        actorId,
        target.id,
        undefined,
        tx,
      );
      return updated;
    });
    await this.ruleEngine.invalidateCache();
    return result;
  }

  private async assertActivationGate(id: string) {
    const release = await this.prisma.visaPolicyRelease.findUnique({
      where: { id },
      include: { _count: { select: { rules: true, pathways: true } } },
    });
    if (
      !release ||
      release.status !== 'SCHEDULED' ||
      !release.reviewedAt ||
      !release.approvedAt
    )
      throw new BadRequestException(
        '예약·검토·승인 게이트를 통과하지 못했습니다.',
      );
    if (release.effectiveFrom > new Date())
      throw new BadRequestException(
        '정책 시행일 이전에는 활성화할 수 없습니다.',
      );
    if (release._count.rules === 0 || release._count.pathways === 0)
      throw new BadRequestException('규칙과 경로가 필요합니다.');
    return release;
  }

  private async assertReviewerCredential(expertId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const credential = await this.prisma.visaExpertCredential.findFirst({
      where: {
        expertId,
        status: 'VERIFIED',
        businessFilingVerifiedAt: { not: null },
        OR: [{ validUntil: null }, { validUntil: { gte: today } }],
      },
    });
    if (!credential)
      throw new ForbiddenException(
        '유효한 행정사 자격·업무신고 확인이 필요합니다.',
      );
  }

  private async getRelease(
    id: string,
    expectedStatus: 'DRAFT' | 'UNDER_REVIEW' | 'APPROVED',
  ) {
    const release = await this.prisma.visaPolicyRelease.findUnique({
      where: { id },
    });
    if (!release)
      throw new NotFoundException(
        '정책 릴리스를 찾을 수 없습니다. / Release not found.',
      );
    if (release.status !== expectedStatus)
      throw new BadRequestException(
        `Required release status: ${expectedStatus}`,
      );
    return release;
  }

  private markOtherJourneysStale(
    tx: Prisma.TransactionClient,
    activeReleaseId: string,
  ) {
    return tx.visaJourney.updateMany({
      where: {
        OR: [
          { policyReleaseId: null },
          { policyReleaseId: { not: activeReleaseId } },
        ],
      },
      data: { policyFreshness: 'STALE' },
    });
  }
}
