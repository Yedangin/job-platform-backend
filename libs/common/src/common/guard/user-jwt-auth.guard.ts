import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { isPublic } from '../decorator/public.decorator';
@Injectable()
export class UserJwtAuthGuard
  extends AuthGuard('user-jwt')
  implements CanActivate
{
  constructor(private readonly reflector: Reflector) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const _isPublic = isPublic(context, this.reflector);
    if (_isPublic) {
      return true;
    }
    return (await super.canActivate(context)) as boolean;
  }
}
