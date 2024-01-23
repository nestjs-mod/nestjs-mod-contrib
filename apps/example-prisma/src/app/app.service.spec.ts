import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { PrismaModule, PRISMA_SCHEMA_FILE, FakePrismaClient } from '@nestjs-mod/prisma';
import { join } from 'path';
import { prismaUserFeatureName } from './app.constants';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        PrismaModule.forRoot({
          environments: { databaseUrl: 'fake' },
          staticConfiguration: {
            prismaSchemaFile: join(
              __dirname,
              '..',
              '..',
              '..',
              'apps/example-prisma/src/prisma/',
              `${prismaUserFeatureName}-${PRISMA_SCHEMA_FILE}`
            ),
            prismaFeatureName: prismaUserFeatureName,
            prismaModule: { PrismaClient: FakePrismaClient, on: () => null },
          },
        }),
        PrismaModule.forFeature({
          featureModuleName: 'AppModule',
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
