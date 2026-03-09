// Sentry must be imported before all other modules
import './instrument';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

// BigInt JSON serialization safety net
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true, // 웹훅 서명 검증용 / For webhook signature verification
  });

  // nginx 리버스 프록시 신뢰 설정 / Trust nginx reverse proxy
  // X-Forwarded-Proto: https 헤더를 신뢰하여 리다이렉트 URL이 https://로 생성되도록 합니다.
  // Trusts X-Forwarded-Proto so redirect URLs (e.g. Swagger /api-docs → /api-docs/) use https://.
  app.set('trust proxy', 1);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());

  const clientUrl = (process.env.CLIENT_URL || 'http://localhost:3000').replace(
    /\/$/,
    '',
  );
  const allowedOrigins = [
    clientUrl,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || true);
      } else {
        callback(null, false);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Authorization, Content-Type, Accept, Cookie',
    exposedHeaders: 'Authorization',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('JobChaja API Documentation')
    .setDescription('잡차자 백엔드 API 문서 / JobChaja backend API docs')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .addTag('Auth', '인증 / Authentication')
    .addTag('Jobs', '공고 관리 / Job posting management')
    .addTag('Visa Matching', '비자 매칭 / Visa matching engine')
    .addTag('Resumes', '이력서 / Resume management')
    .addTag('Visa Verification', '비자 인증 / Visa verification')
    .addTag('Admin', '어드민 / Admin management')
    .addTag(
      'Law Amendment Management',
      '법령 변경 관리 / Law amendment management',
    )
    .addTag('Policy Monitoring', '정책 모니터링 / Policy change monitoring')
    .addTag('Applications', '지원 관리 / Application & Interview management')
    .addTag('Job Payments', '공고 결제 / Job posting payment & premium upgrade')
    .addTag('Payments', '결제 / Payment system')
    .addTag('Logs', '시스템 로그 / System logs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.API_GATEWAY_PORT ?? 8000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
