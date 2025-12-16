import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Metadata } from '@grpc/grpc-js';
import { GrpcMetadataStorage } from '../storage/grpc-metadata.storage';

/**
 * Interceptor to attach session data to gRPC metadata for outgoing calls
 * This runs on the gateway side before making gRPC calls
 */
@Injectable()
export class GrpcClientInterceptor implements NestInterceptor {
  constructor(private readonly metadataStorage: GrpcMetadataStorage) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    const sessionId = request.cookies?.sessionId;

    if (session && sessionId) {
      // Create metadata
      const metadata = new Metadata();
      metadata.set('session-id', sessionId);
      metadata.set('user-id', session.userId || '');
      metadata.set('user-role', session.role || '');
      metadata.set('user-data', JSON.stringify(session));

      // Store in async local storage
      this.metadataStorage.set(metadata);
    }

    return next.handle().pipe(
      tap(() => {
        // Clean up after request
        this.metadataStorage.clear();
      })
    );
  }
}
