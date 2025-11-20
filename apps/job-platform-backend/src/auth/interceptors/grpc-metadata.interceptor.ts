import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Metadata } from '@grpc/grpc-js';

/**
 * Interceptor to handle gRPC metadata for cookies
 * This forwards HTTP cookies to gRPC metadata and vice versa
 */
@Injectable()
export class GrpcMetadataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Create gRPC metadata
    const metadata = new Metadata();

    // Forward cookies from HTTP request to gRPC metadata
    if (request.headers.cookie) {
      metadata.set('cookie', request.headers.cookie);
    }

    // Store metadata in request for later use
    request.grpcMetadata = metadata;

    return next.handle().pipe(
      tap(() => {
        // Handle response metadata (cookies from gRPC)
        // This would need to be implemented at the gRPC client level
      }),
    );
  }
}
