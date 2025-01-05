import { Test } from '@nestjs/testing';

import { KeyvModule } from '@nestjs-mod/keyv';
import { userFeatureName } from './app.constants';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        KeyvModule.forRoot({
          staticConfiguration: {
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
