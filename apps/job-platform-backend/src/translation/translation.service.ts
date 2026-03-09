import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobPrismaService } from 'libs/common/src/common/prisma/jobs/job-prisma.service';

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);
  private readonly endpoint: string;
  private readonly subscriptionKey: string;
  private readonly region: string;

  constructor(
    private readonly jobPrisma: JobPrismaService,
    private readonly configService: ConfigService,
  ) {
    this.endpoint = this.configService.get<string>(
      'AZURE_TRANSLATOR_ENDPOINT',
      '',
    );
    this.subscriptionKey = this.configService.get<string>(
      'AZURE_TRANSLATOR_KEY',
      '',
    );
    this.region = this.configService.get<string>('AZURE_TRANSLATOR_REGION', '');

    if (!this.subscriptionKey || !this.endpoint) {
      this.logger.warn(
        'AZURE_TRANSLATOR_KEY or AZURE_TRANSLATOR_ENDPOINT not set — translation will fail',
      );
    }
  }

  /**
   * Azure Translator API를 통한 텍스트 번역
   * Translate text via Azure Translator API
   */
  async translateText(
    text: string,
    targetLang: string,
    sourceLang?: string,
  ): Promise<string> {
    const params = new URLSearchParams({
      'api-version': '3.0',
      to: targetLang,
    });
    if (sourceLang) {
      params.set('from', sourceLang);
    }

    const url = `${this.endpoint}/translate?${params.toString()}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': this.subscriptionKey,
          'Ocp-Apim-Subscription-Region': this.region,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ Text: text }]),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        this.logger.error(
          `Azure Translator failed: ${response.status} — ${errorBody}`,
        );
        throw new InternalServerErrorException(
          `번역 API 호출 실패 / Translation API failed: ${response.status}`,
        );
      }

      const data = await response.json();
      return data[0]?.translations[0]?.text ?? '';
    } catch (error) {
      if (error instanceof InternalServerErrorException) throw error;
      if ((error as NodeJS.ErrnoException).name === 'AbortError') {
        throw new InternalServerErrorException(
          '번역 API 타임아웃 / Translation API timeout (30s)',
        );
      }
      this.logger.error(`Translation error: ${(error as Error).message}`);
      throw new InternalServerErrorException(
        `번역 API 호출 실패 / Translation API failed: ${(error as Error).message}`,
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * 채용공고 번역 조회 (DB 캐시 → miss 시 번역 후 저장)
   * Get job translation (DB cache → on miss, translate & save)
   */
  async getJobTranslation(
    jobId: bigint,
    languageCode: string,
  ): Promise<{ translatedTitle: string; translatedDesc: string }> {
    // 1) DB 캐시 확인 / Check DB cache
    const cached = await this.jobPrisma.jobTranslation.findUnique({
      where: { jobId_languageCode: { jobId, languageCode } },
    });
    if (cached) {
      return {
        translatedTitle: cached.translatedTitle,
        translatedDesc: cached.translatedDesc,
      };
    }

    // 2) 원본 공고 조회 / Fetch original job posting
    const job = await this.jobPrisma.jobPosting.findUnique({
      where: { jobId },
      select: { title: true, description: true },
    });
    if (!job) {
      throw new NotFoundException(
        `채용공고를 찾을 수 없습니다 / Job posting not found: ${jobId}`,
      );
    }

    // 3) 제목 + 설명 병렬 번역 / Translate title + description in parallel
    const [translatedTitle, translatedDesc] = await Promise.all([
      this.translateText(job.title, languageCode),
      this.translateText(job.description, languageCode),
    ]);

    // 4) DB 저장 (upsert로 race condition 방지)
    //    Save to DB (upsert to handle race conditions)
    await this.jobPrisma.jobTranslation.upsert({
      where: { jobId_languageCode: { jobId, languageCode } },
      create: { jobId, languageCode, translatedTitle, translatedDesc },
      update: { translatedTitle, translatedDesc },
    });

    return { translatedTitle, translatedDesc };
  }
}
