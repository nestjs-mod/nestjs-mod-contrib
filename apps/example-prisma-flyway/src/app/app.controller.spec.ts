import { Test, TestingModule } from '@nestjs/testing';

import { FakePrismaClient, PRISMA_SCHEMA_FILE, PrismaModule } from '@nestjs-mod/prisma';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { flywayPrismaFeatureName } from './app.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        PrismaModule.forRoot({
          environments: { databaseUrl: 'fake' },
          staticConfiguration: {
            prismaSchemaFile: join(
              __dirname,
              '..',
              '..',
              '..',
              'apps/example-prisma-flyway/src/prisma/',
              `${flywayPrismaFeatureName}-${PRISMA_SCHEMA_FILE}`
            ),
            prismaFeatureName: flywayPrismaFeatureName,
            prismaModule: { PrismaClient: FakePrismaClient },
          },
        }),
        PrismaModule.forFeature({
          featureModuleName: 'AppModule',
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
