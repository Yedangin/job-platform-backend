import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Guard for staff members (Admin, Seller, Support, Warehouse Staff)
 * Excludes customers
 */
@Injectable()
export class StaffAccessGuard implements CanActivate {
  private readonly allowedRoles = [
    'ADMIN',
    'SELLER',
    'SUPPORT',
    'WAREHOUSE_STAFF',
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Staff access required');
    }

    return true;
  }
}
