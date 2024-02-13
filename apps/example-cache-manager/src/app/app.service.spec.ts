import { Test } from '@nestjs/testing';

import { CacheManagerModule } from '@nestjs-mod/cache-manager';
import { userFeatureName } from './app.constants';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        CacheManagerModule.forRoot({
          staticConfiguration: {
            type: 'memory',
            featureName: userFeatureName,
          },
        }),
      ],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
