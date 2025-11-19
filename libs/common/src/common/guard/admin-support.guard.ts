import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Guard for Admin and Support roles only
 */
@Injectable()
export class AdminSupportGuard implements CanActivate {
  private readonly allowedRoles = ['ADMIN', 'SUPPORT'];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Admin or Support access required');
    }

    return true;
  }
}
