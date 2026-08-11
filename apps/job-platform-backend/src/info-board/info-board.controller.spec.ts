import { GUARDS_METADATA } from '@nestjs/common/constants';
import {
  ConflictException,
  createParamDecorator,
  SetMetadata,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

jest.mock('libs/common/src', () => ({
  AuthPrismaService: class AuthPrismaService {},
  SessionAuthGuard: class SessionAuthGuard {},
  RolesGuard: class RolesGuard {},
  Roles: (...roles: string[]) => SetMetadata('roles', roles),
  Public: () => SetMetadata('public', true),
  CurrentSession: createParamDecorator(() => undefined),
}));
jest.mock('../translation/translation.service', () => ({
  TranslationService: class TranslationService {},
}));

import { RolesGuard, SessionAuthGuard } from 'libs/common/src';
import { PUBLIC_KEY } from 'libs/common/src/common/decorator/public.decorator';
import { ROLES_KEY } from 'libs/common/src/common/decorator/role.decorator';
import { UpdateInfoBoardDto } from './dto/update-info-board.dto';
import { InfoBoardController } from './info-board.controller';

describe('InfoBoardController authorization metadata', () => {
  const protectedHandlers = [
    'findAdminAll',
    'findAdminOne',
    'findFeaturedAudit',
    'translateDraft',
    'findAdminFeatured',
    'reorderFeatured',
    'removeFeatured',
    'configureFeatured',
    'getAdminAttachmentContent',
    'uploadAttachment',
    'deleteAttachment',
    'create',
    'update',
    'restore',
    'remove',
  ] as const;

  const companyHandlers = [
    'findCompanyAll',
    'findCompanyOne',
    'getCompanyAttachmentContent',
  ] as const;

  const workerHandlers = [
    'findWorkerAll',
    'findWorkerOne',
    'getWorkerAttachmentContent',
  ] as const;

  it.each(protectedHandlers)(
    '%s requires session and admin roles',
    (handler) => {
      const method = InfoBoardController.prototype[handler];
      const guards = Reflect.getMetadata(GUARDS_METADATA, method) ?? [];
      const roles = Reflect.getMetadata(ROLES_KEY, method);

      expect(guards).toEqual(
        expect.arrayContaining([SessionAuthGuard, RolesGuard]),
      );
      expect(roles).toEqual(['ADMIN', 'SUPERADMIN']);
    },
  );

  it.each(companyHandlers)(
    '%s requires a corporate-capable role',
    (handler) => {
      const method = InfoBoardController.prototype[handler];
      const guards = Reflect.getMetadata(GUARDS_METADATA, method) ?? [];
      const roles = Reflect.getMetadata(ROLES_KEY, method);

      expect(guards).toEqual(
        expect.arrayContaining([SessionAuthGuard, RolesGuard]),
      );
      expect(roles).toEqual(['CORPORATE', 'ADMIN', 'SUPERADMIN']);
    },
  );

  it.each(workerHandlers)('%s requires a worker-capable role', (handler) => {
    const method = InfoBoardController.prototype[handler];
    const guards = Reflect.getMetadata(GUARDS_METADATA, method) ?? [];
    const roles = Reflect.getMetadata(ROLES_KEY, method);

    expect(guards).toEqual(
      expect.arrayContaining([SessionAuthGuard, RolesGuard]),
    );
    expect(roles).toEqual(['INDIVIDUAL', 'MEMBER', 'ADMIN', 'SUPERADMIN']);
  });

  it.each([
    'findAll',
    'findOne',
    'findFeatured',
    'getAttachmentContent',
  ] as const)('%s is explicitly public', (handler) => {
    const method = InfoBoardController.prototype[handler];
    expect(Reflect.getMetadata(PUBLIC_KEY, method)).toBe(true);
  });

  it('requires and transforms expectedVersion for update requests', async () => {
    const missing = await validate(
      plainToInstance(UpdateInfoBoardDto, { isPinned: true }),
    );
    const valid = plainToInstance(UpdateInfoBoardDto, {
      expectedVersion: '3',
      isPinned: true,
    });
    const validErrors = await validate(valid);

    expect(missing).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'expectedVersion' }),
      ]),
    );
    expect(valid.expectedVersion).toBe(3);
    expect(validErrors).toEqual([]);
  });

  it('passes the expectedVersion contract through and preserves a CAS 409', async () => {
    const conflict = new ConflictException('stale');
    const service = {
      update: jest.fn().mockRejectedValue(conflict),
    };
    const controller = new InfoBoardController(service as any);
    const dto = { expectedVersion: 4, isPinned: true } as UpdateInfoBoardDto;

    await expect(
      controller.update(1, dto, { userId: 'admin-1' } as any),
    ).rejects.toBe(conflict);
    expect(service.update).toHaveBeenCalledWith(1, dto, 'admin-1');
  });
});
