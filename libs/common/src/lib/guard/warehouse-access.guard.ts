import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Guard for warehouse operations (Admin, Warehouse Staff)
 */
@Injectable()
export class WarehouseAccessGuard implements CanActivate {
  private readonly allowedRoles = ['ADMIN', 'WAREHOUSE_STAFF'];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Warehouse access required');
    }

    return true;
  }
}
