import { CacheManagerService } from '@nestjs-mod/cache-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async setCache({ externalUserId }: { externalUserId: string }) {
    return await this.cacheManagerService.set('cache', externalUserId, 0);
  }

  async getCache() {
    return await this.cacheManagerService.get('cache');
  }
}
