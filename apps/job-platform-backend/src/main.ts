import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // 웹훅 서명 검증용 / For webhook signature verification
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // 프론트엔드 URL 명시
    allowedHeaders: ['Authorization', 'Content-Type', 'Cookie'],
    exposedHeaders: ['Authorization'],
    credentials: true, // 쿠키 전송 허용
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
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
    .addTag('Law Amendment Management', '법령 변경 관리 / Law amendment management')
    .addTag('Policy Monitoring', '정책 모니터링 / Policy change monitoring')
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
