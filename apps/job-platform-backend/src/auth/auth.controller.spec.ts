import { Test, TestingModule } from '@nestjs/testing';
import {
  AuthPrismaService,
  GoogleStrategy,
  RedisService,
  RolesGuard,
  SessionAuthGuard,
} from 'libs/common/src';

describe('AuthController', () => {
  let redisService: RedisService;
  let googleStrategy: GoogleStrategy;
  let authPrismaService: AuthPrismaService;
  let sessionAuthGuard: SessionAuthGuard;
  let rolesGuard: RolesGuard;

  const mockUser = {
    id: 'test-user-id',
    email: 'test@example',
    password: 'password',
  };

  beforeEach(() => {
    redisService = new RedisService();
    authPrismaService = new AuthPrismaService();
    googleStrategy = new GoogleStrategy(authPrismaService);
    sessionAuthGuard = new SessionAuthGuard(redisService, authPrismaService);
    rolesGuard = new RolesGuard();
  });
});
