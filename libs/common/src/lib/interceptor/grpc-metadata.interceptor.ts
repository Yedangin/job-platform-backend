import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

/**
 * Interceptor to attach session data to gRPC metadata
 * Use this in the gateway to pass authentication data to microservices
 */
@Injectable()
export class GrpcMetadataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    const sessionId = request.sessionID;

    // console.log('Session data:', session);
    // console.log('Session ID:', sessionId);

    if (session) {
      const metadata = new Metadata();
      metadata.add('session-id', sessionId);
      metadata.add('user-id', session.userId);
      metadata.add('user-role', session.role);
      metadata.add('user-data', JSON.stringify(session));

      // Store metadata for controller/services to retrieve
      request.metadata = metadata;
    }

    // console.log('Request metadata:', request.metadata);

    return next.handle();
  }
}
