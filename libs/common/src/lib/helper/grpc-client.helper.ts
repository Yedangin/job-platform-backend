import { GrpcMetadataStorage } from '../storage/grpc-metadata.storage';

/**
 * Wraps a gRPC service client to automatically inject metadata from async storage
 */
export function wrapGrpcClient<T extends object>(
  client: T,
  metadataStorage: GrpcMetadataStorage
): T {
  return new Proxy(client, {
    get(target: T, prop: string) {
      const original = (target as Record<string, unknown>)[prop];

      // Only wrap functions
      if (typeof original !== 'function') {
        return original;
      }

      return function (...args: unknown[]) {
        const metadata = metadataStorage.get();

        // If metadata exists, add it as the last argument
        if (metadata) {
          args.push(metadata);
        }

        return (original as (...args: unknown[]) => unknown).apply(
          target,
          args
        );
      };
    },
  });
}
