import { Module } from '@nestjs/common';
import { VisaPolicyController } from './visa-policy.controller';
import { VisaPolicyService } from './visa-policy.service';
import { ScrapingService } from './scraping/scraping.service';
import { LawGoKrScraper } from './scraping/scrapers/law-go-kr.scraper';
import { ImmigrationGoKrScraper } from './scraping/scrapers/immigration-go-kr.scraper';
import { EpsGoKrScraper } from './scraping/scrapers/eps-go-kr.scraper';
import { MoelGoKrScraper } from './scraping/scrapers/moel-go-kr.scraper';
import { HikoreaGoKrScraper } from './scraping/scrapers/hikorea-go-kr.scraper';
import { AuthPrismaService, RedisService } from 'libs/common/src';

@Module({
  controllers: [VisaPolicyController],
  providers: [
    VisaPolicyService,
    ScrapingService,
    LawGoKrScraper,
    ImmigrationGoKrScraper,
    EpsGoKrScraper,
    MoelGoKrScraper,
    HikoreaGoKrScraper,
    AuthPrismaService,
    RedisService,
  ],
  exports: [VisaPolicyService, ScrapingService],
})
export class VisaPolicyModule {}
