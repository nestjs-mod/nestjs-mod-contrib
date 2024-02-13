import { Test } from '@nestjs/testing';

import { FakePrismaClient, PRISMA_SCHEMA_FILE, PrismaModule } from '@nestjs-mod/prisma';
import { join } from 'path';
import { userFeatureName } from './app.constants';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        PrismaModule.forRoot({
          environments: { databaseUrl: 'fake' },
          staticConfiguration: {
            schemaFile: join(
              __dirname,
              '..',
              '..',
              '..',
              'apps/example-prisma/src/prisma/',
              `${userFeatureName}-${PRISMA_SCHEMA_FILE}`
            ),
            featureName: userFeatureName,
            prismaModule: { PrismaClient: FakePrismaClient },
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
