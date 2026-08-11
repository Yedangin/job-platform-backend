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
  private readonly translationCache = new Map<string, string>();
  private remoteTranslationAvailable = true;

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
    this.region = this.configService.get<string>(
      'AZURE_TRANSLATOR_REGION',
      'koreacentral',
    );

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
    const [translated] = await this.translateTexts(
      [text],
      targetLang,
      sourceLang,
    );
    return translated ?? text;
  }

  isConfigured(): boolean {
    return Boolean(
      this.subscriptionKey &&
        this.endpoint &&
        this.remoteTranslationAvailable,
    );
  }

  /**
   * 여러 UI 문구를 한 번에 번역하고 고정 결과 문구는 프로세스 메모리에 캐시합니다.
   * Translate UI strings in one request and cache stable result copy in memory.
   */
  async translateTexts(
    texts: string[],
    targetLang: string,
    sourceLang?: string,
  ): Promise<string[]> {
    if (!texts.length || targetLang === sourceLang) return texts;
    if (!this.isConfigured()) return texts;

    const uniqueTexts = [...new Set(texts.filter(Boolean))];
    const missingTexts = uniqueTexts.filter(
      (text) =>
        !this.translationCache.has(
          `${sourceLang ?? 'auto'}:${targetLang}:${text}`,
        ),
    );

    if (missingTexts.length > 0) {
      await this.requestTranslations(missingTexts, targetLang, sourceLang);
    }

    return texts.map(
      (text) =>
        this.translationCache.get(
          `${sourceLang ?? 'auto'}:${targetLang}:${text}`,
        ) ?? text,
    );
  }

  private async requestTranslations(
    texts: string[],
    targetLang: string,
    sourceLang?: string,
  ): Promise<void> {
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
        body: JSON.stringify(texts.map((text) => ({ Text: text }))),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        if (response.status === 401 || response.status === 403) {
          this.remoteTranslationAvailable = false;
          this.logger.warn(
            'Azure Translator authentication failed; remote translation is disabled until the service restarts',
          );
        }
        this.logger.error(
          `Azure Translator failed: ${response.status} — ${errorBody}`,
        );
        throw new InternalServerErrorException(
          `번역 API 호출 실패 / Translation API failed: ${response.status}`,
        );
      }

      const data = await response.json();
      texts.forEach((text, index) => {
        const translated = data[index]?.translations?.[0]?.text;
        if (translated) {
          this.translationCache.set(
            `${sourceLang ?? 'auto'}:${targetLang}:${text}`,
            translated,
          );
        }
      });
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
   * 채용공고 번역 조회 (원본 공고 제목+설명 → 번역)
   * Get job translation (fetch original title+desc → translate)
   * TODO: JobTranslation 모델 추가 후 DB 캐싱 구현
   */
  async getJobTranslation(
    jobId: bigint,
    languageCode: string,
  ): Promise<{ translatedTitle: string; translatedDesc: string }> {
    // 원본 공고 조회 / Fetch original job posting
    const job = await this.jobPrisma.jobPosting.findUnique({
      where: { jobId },
      select: { title: true, description: true },
    });
    if (!job) {
      throw new NotFoundException(
        `채용공고를 찾을 수 없습니다 / Job posting not found: ${jobId}`,
      );
    }

    // 제목 + 설명 병렬 번역 / Translate title + description in parallel
    const [translatedTitle, translatedDesc] = await Promise.all([
      this.translateText(job.title, languageCode),
      this.translateText(job.description, languageCode),
    ]);

    return { translatedTitle, translatedDesc };
  }
}
