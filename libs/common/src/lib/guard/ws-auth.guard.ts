// ws-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    // Assuming you attached the user object during the connection handshake
    const user = client.data.user;

    if (!user) {
      throw new WsException('User not authenticated for this message.');
    }
    return true;
  }
}
