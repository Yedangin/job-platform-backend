import { Injectable } from '@nestjs/common';
import { AuthPrismaService, RedisService, SessionData } from 'libs/common/src';

@Injectable()
export class ProfileService {
  constructor(
    private readonly authPrisma: AuthPrismaService,
    private readonly redisService: RedisService,
  ) {}

  private async getUserIdFromSession(
    sessionId: string,
  ): Promise<string | null> {
    const sessionDataStr = await this.redisService.get(`session:${sessionId}`);
    if (!sessionDataStr) return null;
    const sessionData = JSON.parse(sessionDataStr) as SessionData;
    return sessionData.userId;
  }

  async getMyDashboardStats(sessionId: string) {
    const userId = await this.getUserIdFromSession(sessionId);
    if (!userId)
      return { applied: 0, interviews: 0, scraps: 0, resumeViews: 0 };

    const user = await this.authPrisma.user.findUnique({
      where: { id: userId },
      include: { individual: true },
    });

    // Resume views from talent access logs
    let resumeViews = 0;
    try {
      if (user?.individual) {
        resumeViews = await this.authPrisma.talentAccessLog.count({
          where: { individualId: user.individual.individualId },
        });
      }
    } catch (error) {
      console.error('[ProfileService] Resume views 조회 실패:', error);
    }

    // Job DB는 현재 미연결 - 추후 연동 시 구현
    return {
      applied: 0,
      interviews: 0,
      scraps: 0,
      resumeViews,
    };
  }

  async getMyApplications(sessionId: string) {
    const userId = await this.getUserIdFromSession(sessionId);
    if (!userId) return [];

    // Job DB는 현재 미연결 - 추후 연동 시 구현
    return [];
  }

  async getMyInterviews(sessionId: string) {
    const userId = await this.getUserIdFromSession(sessionId);
    if (!userId) return [];

    // Job DB는 현재 미연결 - 추후 연동 시 구현
    return [];
  }
}
