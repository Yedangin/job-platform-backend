import { RpcException } from '@nestjs/microservices';
// Modified GrpcAuthGuard for the services
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
// import { Observable } from 'rxjs';
// import * as cookie from 'cookie';
// import { RedisService } from '../redis/redis.service';
import { isPublic } from '../decorator/public.decorator';
import { Reflector } from '@nestjs/core';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  private logger = new Logger('GrpcAuthGuard');

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const _isPublic = isPublic(context, this.reflector);
    if (_isPublic) {
      return true;
    }

    const rpcContext = context.switchToRpc();
    const metadata = rpcContext.getContext() as Metadata;

    console.log('gRPC Metadata in Auth Guard:', metadata);

    // Extract user data from metadata
    const sessionID = metadata.get('session-id')?.[0];
    const userDataString = metadata.get('user-data')?.[0];
    const userId = metadata.get('user-id')?.[0];
    const userRole = metadata.get('user-role')?.[0];

    if (!sessionID) {
      throw new RpcException({
        code: 16, // UNAUTHENTICATED
        message: 'Authentication required',
      });
    }

    // Attach user data to the request context for use in controllers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = rpcContext.getData() as any;
    data.user = {
      userId: userId as string,
      role: userRole as string,
      ...(userDataString ? JSON.parse(userDataString as string) : {}),
    };

    return true;
  }
}
