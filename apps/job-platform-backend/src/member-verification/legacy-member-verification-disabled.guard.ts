import { CanActivate, Injectable, NotFoundException } from '@nestjs/common';

/**
 * The legacy endpoint targets Prisma fields that no longer exist. Keep it
 * fail-closed until it is replaced by the provider-verified identity flow.
 */
@Injectable()
export class LegacyMemberVerificationDisabledGuard implements CanActivate {
  canActivate(): never {
    throw new NotFoundException();
  }
}
