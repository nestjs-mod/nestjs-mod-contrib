Use with forRoot options.

```typescript
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { CacheManagerModule, CacheManagerService } from '@nestjs-mod/cache-manager';
import { isInfrastructureMode } from '@nestjs-mod/common';
import { Injectable, Module } from '@nestjs/common';

const userFeatureName = 'prisma-user';

@Injectable()
export class AppService {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  async setCache({ externalUserId }: { externalUserId: string }) {
    return await this.cacheManagerService.set('cache', externalUserId, 0);
  }

  async getCache() {
    return await this.cacheManagerService.get('cache');
  }
}

process.env.PRISMA_USER_REDIS_URL = 'redis://:redis_password@localhost:6379';

@Module({
  imports: [
    CacheManagerModule.forRoot({
      staticConfiguration: {
        type: isInfrastructureMode() ? 'memory' : 'redis',
        cacheFeatureName: userFeatureName,
      },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const service = app.get<AppService>(AppService);
  const externalUserId = randomUUID();
  await service.setCache({ externalUserId });
  console.log(await service.getCache()); // output: '568a823e-65ea-46ba-aa57-0194ee67e0f9'
}

bootstrap();
```

An example of access to module services with forFeature.

```typescript
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { CacheManagerModule, CacheManagerService } from '@nestjs-mod/cache-manager';
import { isInfrastructureMode } from '@nestjs-mod/common';
import { Injectable, Module } from '@nestjs/common';

const userFeatureName = 'prisma-user';

@Injectable()
export class FeatureService {
  constructor(private readonly cacheManagerService: CacheManagerService) {}

  async setCache({ externalUserId }: { externalUserId: string }) {
    return await this.cacheManagerService.set('cache', externalUserId, 0);
  }

  async getCache() {
    return await this.cacheManagerService.get('cache');
  }
}
@Module({
  imports: [
    CacheManagerModule.forFeature({
      featureModuleName: 'FeatureModule',
    }),
  ],
  providers: [FeatureService],
})
export class FeatureModule {}

process.env.PRISMA_USER_REDIS_URL = 'redis://:redis_password@localhost:6379';

@Module({
  imports: [
    CacheManagerModule.forRoot({
      staticConfiguration: {
        type: isInfrastructureMode() ? 'memory' : 'redis',
        cacheFeatureName: userFeatureName,
      },
    }),
    FeatureModule,
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const service = app.get<FeatureService>(FeatureService);
  const externalUserId = randomUUID();
  await service.setCache({ externalUserId });
  console.log(await service.getCache()); // output: '568a823e-65ea-46ba-aa57-0194ee67e0f9'
}

bootstrap();
```
