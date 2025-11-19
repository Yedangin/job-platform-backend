import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Guard for Admin and Seller roles only
 */
@Injectable()
export class AdminSellerGuard implements CanActivate {
  private readonly allowedRoles = ['ADMIN', 'SELLER'];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Admin or Seller access required');
    }

    return true;
  }
}
