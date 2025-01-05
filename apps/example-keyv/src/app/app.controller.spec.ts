import { Test, TestingModule } from '@nestjs/testing';

import { KeyvModule } from '@nestjs-mod/keyv';
import { Logger } from '@nestjs/common';
import { userFeatureName } from './app.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        KeyvModule.forRoot({
          staticConfiguration: {
            featureName: userFeatureName,
          },
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    app.useLogger(new Logger());
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
