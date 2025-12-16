import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Metadata } from '@grpc/grpc-js';

/**
 * Storage for gRPC metadata using AsyncLocalStorage
 * This allows us to access metadata anywhere in the request context
 */
@Injectable()
export class GrpcMetadataStorage {
  private readonly storage = new AsyncLocalStorage<Metadata>();

  set(metadata: Metadata): void {
    this.storage.enterWith(metadata);
  }

  get(): Metadata | undefined {
    return this.storage.getStore();
  }

  clear(): void {
    this.storage.disable();
  }

  run<T>(metadata: Metadata, callback: () => T): T {
    return this.storage.run(metadata, callback);
  }
}
