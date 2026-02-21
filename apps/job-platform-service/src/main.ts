import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const grpcPort = process.env.JOB_SERVICE_PORT || 8003;
  const httpPort = process.env.JOB_PLATFORM_SERVICE_PORT || 8080;

  const protoDir = join(process.cwd(), '/proto');

  const app = await NestFactory.create(AppModule);

  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Job Service API')
    .setDescription('Job REST + gRPC Hybrid')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['job'],
      protoPath: [
        join(protoDir, 'job-platform/job.proto'),
        // join(protoDir, 'job/category.proto'),
        // join(protoDir, 'job/apply.proto'),
      ],
      url: `0.0.0.0:${grpcPort}`,
      loader: {
        includeDirs: [protoDir],
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        arrays: true,
        objects: true,
      },
    },
  });

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       package: [
  //         REPORTS_PACKAGE_NAME,
  //         CATEGORY_PACKAGE_NAME,
  //         APPLIES_PACKAGE_NAME,
  //         COMMON_BASIC_QUERY_PACKAGE_NAME,
  //         COMMON_BASIC_RESPONSE_PACKAGE_NAME,
  //         COMMON_BASIC_USAGE_PACKAGE_NAME,
  //       ],
  //       protoPath: [
  //         join(protoDir, 'job/report.proto'),
  //         join(protoDir, 'job/category.proto'),
  //         join(protoDir, 'job/apply.proto'),
  //         join(protoDir, 'common/basic-query.proto'),
  //         join(protoDir, 'common/basic.proto'),
  //         join(protoDir, 'common/response.proto'),
  //       ],
  //       url: `0.0.0.0:${port}`,
  //       loader: {
  //         includeDirs: [protoDir],
  //         keepCase: true,
  //         longs: String,
  //         enums: String,
  //         defaults: true,
  //         arrays: true,
  //         objects: true,
  //       },
  //     },
  //   },
  // );

  await app.startAllMicroservices();
  await app.listen(httpPort);

  Logger.log(`🚀 gRPC running on ${grpcPort}`);
  Logger.log(`📘 Swagger running on http://localhost:${httpPort}/docs`);
}
void bootstrap();
