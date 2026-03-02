/**
 * 알림 트리거 서비스 / Notification trigger service
 * 다른 모듈에서 알림을 발송할 때 사용하는 통합 인터페이스
 * Unified interface for sending notifications from other modules
 *
 * 사용 예시 / Usage:
 *   this.notifTrigger.fire('N-01', userId, { companyName: 'ABC Corp' });
 */
import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  NOTIFICATION_PACKAGE_NAME,
  NotificationServiceClient,
  NOTIFICATION_SERVICE_NAME,
} from 'types/notification/notification';
import { AuthPrismaService } from 'libs/common/src';

/** 알림 이벤트 메타데이터 / Notification event metadata */
interface EventMeta {
  notificationType: string;
  templateCode: string;
  subjectKo: string;
  subjectEn: string;
  defaultChannel: string; // BOTH | PLATFORM | EMAIL
  deepLinkTemplate: string; // e.g. '/company/verification'
  requiresMarketingConsent?: boolean;
}

/** 알림 발송 옵션 / Notification fire options */
interface FireOptions {
  email?: string;
  priority?: number;
  relatedJobPostId?: string;
  relatedInterviewId?: string;
}

/**
 * 전체 이벤트 카탈로그 / Complete event catalog
 * Spec 09 §2 기반 / Based on Spec 09 §2
 */
const EVENT_CATALOG: Record<string, EventMeta> = {
  // 기업인증 / Corporate verification
  'N-01': {
    notificationType: 'CORP_VERIFY_SUBMITTED',
    templateCode: 'CORP_VERIFY_SUBMITTED',
    subjectKo: '기업인증 접수 확인',
    subjectEn: 'Corporate Verification Submitted',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/verification',
  },
  'N-02': {
    notificationType: 'CORP_VERIFY_APPROVED',
    templateCode: 'CORP_VERIFY_APPROVED',
    subjectKo: '기업인증 승인',
    subjectEn: 'Corporate Verification Approved',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/verification',
  },
  'N-03': {
    notificationType: 'CORP_VERIFY_REJECTED',
    templateCode: 'CORP_VERIFY_REJECTED',
    subjectKo: '기업인증 반려',
    subjectEn: 'Corporate Verification Rejected',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/verification',
  },
  'N-04': {
    notificationType: 'CORP_VERIFY_NEW_ADMIN',
    templateCode: 'CORP_VERIFY_NEW_ADMIN',
    subjectKo: '새 기업인증 접수',
    subjectEn: 'New Corporate Verification',
    defaultChannel: 'PLATFORM',
    deepLinkTemplate: '/admin',
  },
  'N-05': {
    notificationType: 'CORP_VERIFY_SLA_ADMIN',
    templateCode: 'CORP_VERIFY_SLA_ADMIN',
    subjectKo: '미처리 기업인증 경과',
    subjectEn: 'Overdue Corporate Verification',
    defaultChannel: 'PLATFORM',
    deepLinkTemplate: '/admin',
  },

  // 개인 온보딩 / Individual onboarding
  'N-06': {
    notificationType: 'VISA_VERIFY_APPROVED',
    templateCode: 'VISA_VERIFY_APPROVED',
    subjectKo: '비자 인증 완료',
    subjectEn: 'Visa Verification Approved',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/visa-verification',
  },
  'N-07': {
    notificationType: 'VISA_VERIFY_REJECTED',
    templateCode: 'VISA_VERIFY_REJECTED',
    subjectKo: '비자 인증 반려',
    subjectEn: 'Visa Verification Rejected',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/visa-verification',
  },
  'N-08': {
    notificationType: 'PROFILE_REMINDER',
    templateCode: 'PROFILE_REMINDER',
    subjectKo: '프로필을 완성해주세요',
    subjectEn: 'Complete Your Profile',
    defaultChannel: 'EMAIL',
    deepLinkTemplate: '/worker/profile',
  },
  'N-09': {
    notificationType: 'PROFILE_COMPLETE',
    templateCode: 'PROFILE_COMPLETE',
    subjectKo: '프로필 완성!',
    subjectEn: 'Profile Complete!',
    defaultChannel: 'PLATFORM',
    deepLinkTemplate: '/worker/profile',
  },
  'N-10': {
    notificationType: 'VISA_VERIFY_REMINDER',
    templateCode: 'VISA_VERIFY_REMINDER',
    subjectKo: '비자 인증을 완료해주세요',
    subjectEn: 'Complete Visa Verification',
    defaultChannel: 'EMAIL',
    deepLinkTemplate: '/worker/visa-verification',
  },
  'N-11': {
    notificationType: 'VISA_EXPIRY_WARNING',
    templateCode: 'VISA_EXPIRY_WARNING',
    subjectKo: '비자 만료 경고',
    subjectEn: 'Visa Expiry Warning',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/visa',
  },

  // 비자 플래너 / Visa planner
  'N-12': {
    notificationType: 'COUPON_ACTIVATED',
    templateCode: 'COUPON_ACTIVATED',
    subjectKo: '재진단 쿠폰 활성화',
    subjectEn: 'Rediagnosis Coupon Activated',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/diagnosis/history',
  },
  'N-13': {
    notificationType: 'COUPON_EXPIRY_WARNING',
    templateCode: 'COUPON_EXPIRY',
    subjectKo: '재진단 쿠폰 만료 임박',
    subjectEn: 'Rediagnosis Coupon Expiring',
    defaultChannel: 'EMAIL',
    deepLinkTemplate: '/diagnosis/history',
  },
  'N-14': {
    notificationType: 'PLANNER_PAYMENT_CONFIRM',
    templateCode: 'PLANNER_PAYMENT',
    subjectKo: '비자 플래너 결제 완료',
    subjectEn: 'Visa Planner Payment Confirmed',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/diagnosis/history',
  },

  // 인재풀 / Talent pool
  'N-15': {
    notificationType: 'RESUME_VIEWED',
    templateCode: 'RESUME_VIEWED',
    subjectKo: '이력서가 열람되었습니다',
    subjectEn: 'Your Resume Was Viewed',
    defaultChannel: 'PLATFORM',
    deepLinkTemplate: '/worker/resume',
  },
  'N-16': {
    notificationType: 'SCOUT_CONSENT',
    templateCode: 'SCOUT_CONSENT',
    subjectKo: '인재풀 등록 완료',
    subjectEn: 'Talent Pool Registration',
    defaultChannel: 'PLATFORM',
    deepLinkTemplate: '/worker/resume',
  },

  // 공고 / Job posting
  'N-17': {
    notificationType: 'JOB_ACTIVATED',
    templateCode: 'JOB_ACTIVATED',
    subjectKo: '공고 게시 완료',
    subjectEn: 'Job Posted',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/jobs',
  },
  'N-18': {
    notificationType: 'JOB_EXPIRY_WARNING',
    templateCode: 'JOB_EXPIRY_WARNING',
    subjectKo: '공고 만료 임박',
    subjectEn: 'Job Expiring Soon',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/jobs',
  },
  'N-19': {
    notificationType: 'JOB_SUSPENDED',
    templateCode: 'JOB_SUSPENDED',
    subjectKo: '공고 정지 통보',
    subjectEn: 'Job Suspended',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/jobs',
  },
  'N-20': {
    notificationType: 'JOB_UNSUSPENDED',
    templateCode: 'JOB_UNSUSPENDED',
    subjectKo: '공고 정지 해제',
    subjectEn: 'Job Unsuspended',
    defaultChannel: 'PLATFORM',
    deepLinkTemplate: '/company/jobs',
  },

  // 채용 프로세스 / Hiring process
  'N-21': {
    notificationType: 'NEW_APPLICANT',
    templateCode: 'NEW_APPLICANT',
    subjectKo: '새 지원자 접수',
    subjectEn: 'New Applicant',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/jobs',
  },
  'N-22': {
    notificationType: 'DOCUMENT_PASSED',
    templateCode: 'DOC_PASSED',
    subjectKo: '서류 합격',
    subjectEn: 'Document Screening Passed',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/applications',
  },
  'N-23': {
    notificationType: 'INTERVIEW_CONFIRMED',
    templateCode: 'INTERVIEW_CONFIRMED',
    subjectKo: '면접 일정 확정',
    subjectEn: 'Interview Confirmed',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/applications',
  },
  'N-24': {
    notificationType: 'INTERVIEW_REMINDER',
    templateCode: 'INTERVIEW_REMINDER',
    subjectKo: '내일 면접 리마인더',
    subjectEn: 'Interview Reminder',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/applications',
  },
  'N-25': {
    notificationType: 'FINAL_ACCEPTED',
    templateCode: 'FINAL_ACCEPTED',
    subjectKo: '최종 합격!',
    subjectEn: 'You Are Hired!',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/applications',
  },
  'N-26': {
    notificationType: 'HIRING_REJECTED',
    templateCode: 'REJECTED',
    subjectKo: '채용 결과 안내',
    subjectEn: 'Application Result',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/applications',
  },
  'N-27': {
    notificationType: 'APPLICATION_CANCELLED',
    templateCode: 'APPLICATION_CANCELLED',
    subjectKo: '지원 취소',
    subjectEn: 'Application Cancelled',
    defaultChannel: 'PLATFORM',
    deepLinkTemplate: '/company/jobs',
  },
  'N-31': {
    notificationType: 'APPLICATION_EXPIRED',
    templateCode: 'APPLICATION_EXPIRED',
    subjectKo: '지원 자동 만료',
    subjectEn: 'Application Auto-Expired',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/applications',
  },

  // 공통 / General
  'N-28': {
    notificationType: 'SUPPORT_REPLIED',
    templateCode: 'SUPPORT_REPLIED',
    subjectKo: '문의 답변 등록',
    subjectEn: 'Support Reply',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/support/contact',
  },
  'N-29': {
    notificationType: 'PREMIUM_EXPIRY_WARNING',
    templateCode: 'PREMIUM_EXPIRY',
    subjectKo: '프리미엄 만료 임박',
    subjectEn: 'Premium Expiring',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/jobs',
  },
  'N-30': {
    notificationType: 'PREMIUM_REMOVED',
    templateCode: 'PREMIUM_REMOVED',
    subjectKo: '프리미엄 해제',
    subjectEn: 'Premium Removed',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/company/jobs',
  },

  // 쿠폰 / Coupons
  'N-32': {
    notificationType: 'GENERAL_COUPON_ISSUED',
    templateCode: 'COUPON_ISSUED',
    subjectKo: '쿠폰 발급 알림',
    subjectEn: 'Coupon Issued',
    defaultChannel: 'BOTH',
    deepLinkTemplate: '/worker/coupons',
    requiresMarketingConsent: true,
  },
  'N-33': {
    notificationType: 'GENERAL_COUPON_EXPIRY',
    templateCode: 'COUPON_EXPIRY',
    subjectKo: '쿠폰 만료 임박',
    subjectEn: 'Coupon Expiring',
    defaultChannel: 'EMAIL',
    deepLinkTemplate: '/worker/coupons',
    requiresMarketingConsent: true,
  },
};

@Injectable()
export class NotificationTriggerService implements OnModuleInit {
  private readonly logger = new Logger(NotificationTriggerService.name);
  private notificationService: NotificationServiceClient;

  constructor(
    @Inject(NOTIFICATION_PACKAGE_NAME) private client: ClientGrpc,
    private readonly prisma: AuthPrismaService,
  ) {}

  onModuleInit() {
    this.notificationService =
      this.client.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
  }

  /**
   * 알림 이벤트 발송 / Fire a notification event
   * @param eventCode 이벤트 코드 (N-01 ~ N-33) / Event code
   * @param userId 수신자 ID / Recipient user ID
   * @param variables 템플릿 변수 / Template variables for content interpolation
   * @param options 추가 옵션 / Additional options
   */
  async fire(
    eventCode: string,
    userId: string,
    variables: Record<string, string | number> = {},
    options: FireOptions = {},
  ): Promise<{ success: boolean; message: string }> {
    const meta = EVENT_CATALOG[eventCode];
    if (!meta) {
      this.logger.warn(
        `알 수 없는 이벤트 코드: ${eventCode} / Unknown event code`,
      );
      return { success: false, message: `Unknown event code: ${eventCode}` };
    }

    try {
      // 사용자 설정 확인 / Check user preferences
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          email: true,
          notifEmail: true,
          marketingConsent: true,
        },
      });

      // 마케팅 동의 필요 이벤트 확인 / Check marketing consent requirement
      if (meta.requiresMarketingConsent && !user?.marketingConsent) {
        // 마케팅 미동의 → PLATFORM만 발송 / No marketing consent → platform only
        this.logger.log(
          `마케팅 미동의 → 플랫폼만 발송: userId=${userId}, event=${eventCode} / Marketing not consented → platform only`,
        );
      }

      // 채널 결정 / Determine channel
      let channel = meta.defaultChannel;
      if (meta.requiresMarketingConsent && !user?.marketingConsent) {
        channel = 'PLATFORM';
      }
      if (channel === 'BOTH' || channel === 'EMAIL') {
        // 이메일 수신 거부 시 PLATFORM으로 대체 / Fallback to platform if email disabled
        if (!user?.notifEmail && channel === 'EMAIL') {
          channel = 'PLATFORM';
        }
      }

      // 이메일 주소 결정 / Determine email
      const email = options.email || user?.email || undefined;

      // 콘텐츠 생성 (변수 치환) / Generate content (variable interpolation)
      const subject = this.interpolate(meta.subjectKo, variables);
      const content = this.buildContentFromVariables(eventCode, variables);

      // 딥링크 생성 / Generate deep link
      const deepLink = this.interpolate(meta.deepLinkTemplate, variables);

      // 메타데이터 구성 / Build metadata
      const metadataObj = {
        eventCode,
        templateCode: meta.templateCode,
        deepLink,
        channelsSent: [channel],
        ...variables,
      };

      // gRPC 발송 / Send via gRPC
      const result = await firstValueFrom(
        this.notificationService.sendNotification({
          userId,
          email:
            channel === 'BOTH' || channel === 'EMAIL' || channel === 'ALL'
              ? email
              : undefined,
          subject,
          content,
          notificationType: meta.notificationType as any,
          channel: channel as any,
          metadata: JSON.stringify(metadataObj),
          priority: options.priority,
          relatedJobPostId: options.relatedJobPostId,
          relatedInterviewId: options.relatedInterviewId,
        }),
      );

      if (result.success) {
        this.logger.log(
          `알림 발송 성공: ${eventCode} → userId=${userId} / Notification sent`,
        );
      }

      return { success: result.success, message: result.message || '' };
    } catch (error) {
      this.logger.error(
        `알림 발송 실패: ${eventCode} → userId=${userId} / Notification failed: ${error}`,
      );
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Notification send failed',
      };
    }
  }

  /**
   * 다수 사용자에게 동일 알림 발송 / Fire to multiple users
   */
  async fireToMany(
    eventCode: string,
    userIds: string[],
    variables: Record<string, string | number> = {},
    options: FireOptions = {},
  ): Promise<{ sent: number; failed: number }> {
    let sent = 0;
    let failed = 0;

    for (const userId of userIds) {
      const result = await this.fire(eventCode, userId, variables, options);
      if (result.success) sent++;
      else failed++;
    }

    return { sent, failed };
  }

  /**
   * 이벤트 카탈로그 조회 / Get event catalog (for admin)
   */
  getEventCatalog(): Record<string, EventMeta> {
    return { ...EVENT_CATALOG };
  }

  // ──── 헬퍼 / Helpers ────

  /** 변수 치환 / Interpolate variables */
  private interpolate(
    template: string,
    vars: Record<string, string | number>,
  ): string {
    return template.replace(/\{(\w+)\}/g, (_, key) => {
      return vars[key] !== undefined ? String(vars[key]) : `{${key}}`;
    });
  }

  /** 이벤트별 내용 생성 / Build content per event */
  private buildContentFromVariables(
    eventCode: string,
    vars: Record<string, string | number>,
  ): string {
    const meta = EVENT_CATALOG[eventCode];
    if (!meta) return '';

    // 공통 패턴: 변수 기반 한국어 내용 생성 / Common: generate Korean content from variables
    switch (eventCode) {
      case 'N-01':
        return `기업인증 서류가 접수되었습니다. 영업일 1~2일 내 심사됩니다.`;
      case 'N-02':
        return `기업인증이 승인되었습니다. 공고 등록을 시작하세요.`;
      case 'N-03':
        return `기업인증이 반려되었습니다. 사유: ${vars.reason || '확인 필요'}. 수정 후 재제출 가능합니다.`;
      case 'N-04':
        return `새 기업인증 신청이 접수되었습니다.`;
      case 'N-05':
        return `미처리 인증 ${vars.count || 0}건이 3일 경과했습니다.`;
      case 'N-06':
        return `비자 인증이 완료되었습니다. 비자 기반 맞춤 공고를 확인하세요.`;
      case 'N-07':
        return `비자 인증이 반려되었습니다. 사유: ${vars.reason || '확인 필요'}. 재제출 가능합니다.`;
      case 'N-08':
        return `프로필을 완성하면 맞춤 공고를 추천받을 수 있습니다. (현재 ${vars.completionRate || 0}%)`;
      case 'N-09':
        return `프로필이 완성되었습니다! 인재풀에 등록하면 기업에서 스카우트 제안을 받을 수 있습니다.`;
      case 'N-10':
        return `비자 인증을 완료하면 지원 가능한 공고를 필터링할 수 있습니다.`;
      case 'N-11':
        return `비자 만료일이 ${vars.daysLeft || '?'}일 남았습니다. 체류자격 연장을 준비하세요.`;
      case 'N-12':
        return `무료 재진단 쿠폰이 활성화되었습니다. 지금 재진단을 시작하세요.`;
      case 'N-13':
        return `재진단 쿠폰이 ${vars.daysLeft || 30}일 후 만료됩니다.`;
      case 'N-14':
        return `비자 플래너 프리미엄 결제가 완료되었습니다. ($10 USD)`;
      case 'N-15':
        return `기업 '${vars.companyName || ''}'이(가) 회원님의 프로필을 열람했습니다.`;
      case 'N-16':
        return `인재풀에 등록되었습니다. 기업에서 프로필을 열람할 수 있습니다.`;
      case 'N-17':
        return `'${vars.title || ''}' 공고가 게시되었습니다. 만료일: ${vars.expiresAt || ''}`;
      case 'N-18':
        return `'${vars.title || ''}' 공고가 ${vars.daysLeft || 3}일 후 만료됩니다. 연장하시겠습니까?`;
      case 'N-19':
        return `'${vars.title || ''}' 공고가 관리자에 의해 정지되었습니다. 사유: ${vars.reason || ''}`;
      case 'N-20':
        return `'${vars.title || ''}' 공고가 정지 해제되었습니다.`;
      case 'N-21':
        return `'${vars.title || ''}' 공고에 새 지원자가 있습니다.`;
      case 'N-22':
        return `축하합니다! '${vars.title || ''}' 서류 심사에 합격하셨습니다.`;
      case 'N-23':
        return `면접 일정이 확정되었습니다. ${vars.date || ''} ${vars.time || ''}`;
      case 'N-24':
        return `내일 ${vars.time || ''} 면접이 있습니다. (${vars.companyName || ''})`;
      case 'N-25':
        return `축하합니다! '${vars.title || ''}' 최종 합격! 비자 준비 가이드를 확인하세요.`;
      case 'N-26':
        return `아쉽게도 '${vars.title || ''}' 채용이 진행되지 않았습니다.`;
      case 'N-27':
        return `'${vars.applicantName || ''}'님이 '${vars.title || ''}' 지원을 취소했습니다.`;
      case 'N-28':
        return `문의하신 내용에 답변이 등록되었습니다.`;
      case 'N-29':
        return `'${vars.title || ''}' 공고의 프리미엄이 ${vars.daysLeft || 3}일 후 만료됩니다.`;
      case 'N-30':
        return `'${vars.title || ''}' 공고의 프리미엄이 해제되었습니다. 사유: ${vars.reason || ''}`;
      case 'N-31':
        return `'${vars.title || ''}' 공고 지원이 만료 처리되었습니다. 다른 공고를 확인해보세요.`;
      case 'N-32':
        return `'${vars.couponName || ''}' 쿠폰이 발급되었습니다! ${vars.validUntil || ''}까지 사용 가능`;
      case 'N-33':
        return `'${vars.couponName || ''}' 쿠폰이 ${vars.daysLeft || 3}일 후 만료됩니다.`;
      default:
        return meta.subjectKo;
    }
  }
}
