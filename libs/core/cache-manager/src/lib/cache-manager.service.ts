import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheManagerError } from './cache-manager.errors';

@Injectable()
export class CacheManagerService implements Pick<Cache, 'set' | 'del' | 'get' | 'reset'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async set(key: string, value: unknown, ttl?: number | undefined): Promise<void> {
    throw new CacheManagerError('Not implemented!');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get<T>(key: string): Promise<T | undefined> {
    throw new CacheManagerError('Not implemented!');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async del(key: string): Promise<void> {
    throw new CacheManagerError('Not implemented!');
  }
  async reset(): Promise<void> {
    throw new CacheManagerError('Not implemented!');
  }
}
