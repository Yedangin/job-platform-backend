// src/utils/cache-version.manager.ts

import { Cache } from 'cache-manager'; // Correct type for NestJS Cache
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

export class CacheVersionManager {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly versionKey: string,
    private readonly initialVersion: string,
  ) {}

  public async getCacheVersion(): Promise<string> {
    const version = await this.cacheManager.get<string>(this.versionKey);

    if (!version) {
      await this.cacheManager.set(this.versionKey, this.initialVersion, 0);
      return this.initialVersion;
    }

    return version;
  }

  public async invalidateCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set(this.versionKey, newVersion, 0);
      console.log(
        `Cache for key "${this.versionKey}" invalidated. New version: ${newVersion}`,
      );
    } catch (error) {
      console.error(
        `Error invalidating cache for key "${this.versionKey}":`,
        error,
      );
    }
  }
}
