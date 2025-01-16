import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { PrismaModule, PRISMA_SCHEMA_FILE, FakePrismaClient } from '@nestjs-mod/prisma';
import { join } from 'path';
import { flywayPrismaFeatureName } from './app.constants';

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
              'apps/example-prisma-pg-flyway/src/prisma/',
              `${flywayPrismaFeatureName}-${PRISMA_SCHEMA_FILE}`
            ),
            featureName: flywayPrismaFeatureName,
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
