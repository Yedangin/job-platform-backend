import { JobPrismaModule } from '@in-job/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ReportModule } from './report/report.module';
import { CategoryModule } from './category/category.module';
import { JobPostModule } from './job-post/job-post.module';
import { ApplyModule } from './apply/apply.module';
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
      signOptions: {
        expiresIn: '15m',
      },
    }),
    JobPrismaModule,
    ReportModule,
    CategoryModule,
    JobPostModule,
    ApplyModule,
    InterviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
