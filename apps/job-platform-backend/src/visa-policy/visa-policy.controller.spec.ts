import { GUARDS_METADATA } from '@nestjs/common/constants';
import { SetMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

jest.mock('libs/common/src', () => ({
  CurrentSession: () => () => undefined,
  Public: () => SetMetadata('public', true),
  Roles: (...roles: string[]) => SetMetadata('roles', roles),
  RolesGuard: class RolesGuard {},
  SessionAuthGuard: class SessionAuthGuard {},
}));

import { RolesGuard, SessionAuthGuard } from 'libs/common/src';
import { PUBLIC_KEY } from 'libs/common/src/common/decorator/public.decorator';
import { ROLES_KEY } from 'libs/common/src/common/decorator/role.decorator';
import {
  PolicyChangeQueryDto,
  ReviewPolicyChangeDto,
} from './dto/visa-policy.dto';
import { VisaPolicyController } from './visa-policy.controller';

describe('VisaPolicyController RBAC and DTO validation', () => {
  it('protects all policy management endpoints for ADMIN and SUPERADMIN', () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, VisaPolicyController);
    const roles = Reflect.getMetadata(ROLES_KEY, VisaPolicyController);

    expect(guards).toEqual(
      expect.arrayContaining([SessionAuthGuard, RolesGuard]),
    );
    expect(roles).toEqual(['ADMIN', 'SUPERADMIN']);
  });

  it('exposes only the approved evidence projection publicly', () => {
    const method = VisaPolicyController.prototype.getApprovedEvidence;
    expect(Reflect.getMetadata(PUBLIC_KEY, method)).toBe(true);
    expect(Reflect.getMetadata(ROLES_KEY, method)).toEqual([]);
  });

  it('rejects an invalid review action', async () => {
    const dto = plainToInstance(ReviewPolicyChangeDto, {
      reviewStatus: 'RULE_DRAFTED',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
  });

  it('validates status, source, page, limit and affected visa filters', async () => {
    const dto = plainToInstance(PolicyChangeQueryDto, {
      sourceSite: 'random_blog',
      reviewStatus: 'AUTO_APPROVED',
      affectedVisaTypes: '../../etc/passwd',
      page: 0,
      limit: 1000,
    });
    const errors = await validate(dto);
    expect(errors.map((error) => error.property).sort()).toEqual([
      'affectedVisaTypes',
      'limit',
      'page',
      'reviewStatus',
      'sourceSite',
    ]);
  });
});
