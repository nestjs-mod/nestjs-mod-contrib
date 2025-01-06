import { KeyvService } from '@nestjs-mod/keyv';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly keyvService: KeyvService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async setCache({ externalUserId }: { externalUserId: string }) {
    return await this.keyvService.set('cache', externalUserId, 0);
  }

  async getCache() {
    return await this.keyvService.get('cache');
  }
}
