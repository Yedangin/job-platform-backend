import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';

jest.mock('libs/common/src', () => ({
  SessionAuthGuard: class SessionAuthGuard {},
  RolesGuard: class RolesGuard {},
  Roles: (...roles: string[]) => SetMetadata('roles', roles),
  Public: () => SetMetadata('public', true),
  CurrentSession: createParamDecorator(() => undefined),
}));

import { RolesGuard, SessionAuthGuard } from 'libs/common/src';
import { ROLES_KEY } from 'libs/common/src/common/decorator/role.decorator';
import { JobPostingController } from './job-posting.controller';

describe('JobPostingController review and route metadata', () => {
  it.each(['approveJobPosting', 'rejectJobPosting'] as const)(
    '%s is admin-only',
    (handler) => {
      const method = JobPostingController.prototype[handler];
      expect(Reflect.getMetadata(GUARDS_METADATA, JobPostingController)).toEqual(
        expect.arrayContaining([SessionAuthGuard, RolesGuard]),
      );
      expect(Reflect.getMetadata(ROLES_KEY, method)).toEqual(['ADMIN', 'SUPERADMIN']);
    },
  );

  it('keeps fixed my routes ahead of the dynamic my/:id route', () => {
    const methodOrder = Object.getOwnPropertyNames(JobPostingController.prototype);
    expect(methodOrder.indexOf('getMyScraps')).toBeLessThan(
      methodOrder.indexOf('getMyJobPosting'),
    );
  });

  it('does not retain a corporate activation handler', () => {
    const legacyHandler = `${'activate'}JobPosting`;
    expect((JobPostingController.prototype as any)[legacyHandler]).toBeUndefined();
  });
});
