import {
  createParamDecorator,
  NotFoundException,
  SetMetadata,
} from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';

jest.mock('libs/common/src', () => ({
  SessionAuthGuard: class SessionAuthGuard {},
  RolesGuard: class RolesGuard {},
  Roles: (...roles: string[]) => SetMetadata('roles', roles),
  grpcToHttpStatus: jest.fn(),
}));
jest.mock('libs/common/src/common/decorator/current-session.decorator', () => ({
  CurrentSession: createParamDecorator(() => undefined),
}));
jest.mock(
  'generated/prisma-user',
  () => ({
    VerificationStatus: {
      PENDING: 'PENDING',
      APPROVED: 'APPROVED',
      REJECTED: 'REJECTED',
    },
  }),
  { virtual: true },
);
jest.mock(
  'types/auth/member-verification',
  () => ({ MEMBER_VERFICATION_PACKAGE_NAME: 'member_verfication' }),
  { virtual: true },
);

import { RolesGuard, SessionAuthGuard } from 'libs/common/src';
import { ROLES_KEY } from 'libs/common/src/common/decorator/role.decorator';
import { LegacyMemberVerificationDisabledGuard } from './legacy-member-verification-disabled.guard';
import { MemberVerificationController } from './member-verification.controller';

describe('legacy member-verification security boundary', () => {
  it('fails closed without invoking legacy application logic', () => {
    const guard = new LegacyMemberVerificationDisabledGuard();

    expect(() => guard.canActivate()).toThrow(NotFoundException);
  });

  it('protects every controller route with the disabled and admin guards', () => {
    const guardsMetadata: unknown = Reflect.getMetadata(
      GUARDS_METADATA,
      MemberVerificationController,
    );
    const rolesMetadata: unknown = Reflect.getMetadata(
      ROLES_KEY,
      MemberVerificationController,
    );
    const guards: unknown[] = Array.isArray(guardsMetadata)
      ? (guardsMetadata as unknown[])
      : [];
    const roles: unknown[] = Array.isArray(rolesMetadata)
      ? (rolesMetadata as unknown[])
      : [];

    expect(guards).toEqual(
      expect.arrayContaining([
        LegacyMemberVerificationDisabledGuard,
        SessionAuthGuard,
        RolesGuard,
      ]),
    );
    expect(guards[0]).toBe(LegacyMemberVerificationDisabledGuard);
    expect(roles).toEqual(['ADMIN', 'SUPERADMIN']);
  });

  it('is excluded from generated API documentation', () => {
    const metadata: unknown = Reflect.getMetadata(
      'swagger/apiExcludeController',
      MemberVerificationController,
    );

    expect(metadata).toEqual([true]);
  });
});
