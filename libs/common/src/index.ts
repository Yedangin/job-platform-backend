export * from './common.module';
export * from './common.service';

// Decorators
export * from './common/decorator/current-user.decorator';
export * from './common/decorator/public.decorator';
export * from './common/decorator/role.decorator';
export * from './common/decorator/session.decorator';

// DTO
export * from './common/dto/basic-query.dto';
export * from './common/dto/token-response.dto';

// Exceptions
export * from './common/exception/general-exception';
export * from './common/exception/success-response';

// Guards
export * from './common/guard/apple.guard';
export * from './common/guard/facebook.guard';
export * from './common/guard/google-oauth.guard';
export * from './common/guard/kakao.guard';
export * from './common/guard/throttler-behind-proxy.guard';
export * from './common/guard/user-jwt-auth.guard';
export * from './common/guard/session-auth.guard';
export * from './common/guard/roles.guard';
export * from './common/guard/staff-access.guard';
export * from './common/guard/warehouse-access.guard';

// Helpers
export * from './common/helper/pagination.service';
export * from './common/helper/grpc-to-http.helper';
export * from './common/helper/htto-to-grpc.helper';

// Interceptors
export * from './common/interceptor/success-transform-interceptor';

// Interfaces
export * from './common/interfaces/pagination-result.interface';
export * from './common/interfaces/session.interface';

// Redis
export * from './common/redis/redis.service';
export * from './common/redis/redis.module';

// Prisma
export * from './common/prisma/auth/auth-prisma.module';
export * from './common/prisma/auth/auth-prisma.service';
export * from './common/prisma/jobs/job-prisma.module';
export * from './common/prisma/jobs/job-prisma.service';
export * from './common/prisma/log/log-prisma.module';
export * from './common/prisma/log/log-prisma.service';
export * from './common/prisma/notification/notification-prisma.module';
export * from './common/prisma/notification/notification-prisma.service';
export * from './common/prisma/payment/payment-prisma.module';
export * from './common/prisma/payment/payment-prisma.service';

// Role-based filters
// export * from './common/roles-filter/role-based-filter.service';

// Strategies
// export * from './common/strategies/facebook.strategy';
// export * from './common/strategies/apple.strategy';
export * from './common/strategies/google.strategy';
export * from './common/strategies/jwt.strategy';
// export * from './common/strategies/kakao.strategy';
// export * from './common/strategies/local.strategy';
export * from './common/strategies/user.strategy';

// Services
export * from './common/services/token.service';
export * from './common/services/file.service';
// export * from './common/services/auth-strategy.service';

// Pipes
export * from './common/pipes/file-validator.pipe';
export * from './common/pipes/profile-picture-validator.pipe';

// Types
// export * from './common/types/general-response';
// export * from './common/types/jwt-payload';
