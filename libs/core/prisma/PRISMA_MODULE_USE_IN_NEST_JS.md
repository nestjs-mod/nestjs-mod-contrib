For add support prisma in NestJS please read https://docs.nestjs.com/recipes/prisma#set-up-prisma

Use with forRoot options.

```typescript
import { InjectPrismaClient, PrismaModule } from '@nestjs-mod/prisma';
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { Injectable, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(
    @InjectPrismaClient()
    private readonly prismaService: PrismaClient
  ) {}

  async createUser({ externalUserId }: { externalUserId: string }) {
    return await this.prismaService.prismaUser.create({ data: { externalUserId } });
  }

  async getUsers() {
    return await this.prismaService.prismaUser.findMany();
  }
}

@Module({
  imports: [
    PrismaModule.forRoot({
      staticConfiguration: {
        prismaModule: import(`@prisma/prisma-user-client`),
        addMigrationScripts: true,
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
  await service.createUser({ externalUserId });
  console.log(await service.getUsers()); // output: [{ externalUserId: '568a823e-65ea-46ba-aa57-0194ee67e0f9' }]
}

bootstrap();
```

An example of access to module services with forFeature.

```typescript
import { InjectPrismaClient, PrismaModule } from '@nestjs-mod/prisma';
import { NestFactory } from '@nestjs/core';
import { randomUUID } from 'crypto';

import { Injectable, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FeatureService {
  constructor(
    @InjectPrismaClient()
    private readonly prismaService: PrismaClient
  ) {}

  async createUser({ externalUserId }: { externalUserId: string }) {
    return await this.prismaService.prismaUser.create({ data: { externalUserId } });
  }

  async getUsers() {
    return await this.prismaService.prismaUser.findMany();
  }
}
@Module({
  imports: [
    PrismaModule.forFeature({
      featureModuleName: 'FeatureModule',
    }),
  ],
  providers: [FeatureService],
})
export class FeatureModule {}

@Module({
  imports: [
    PrismaModule.forRoot({
      staticConfiguration: {
        prismaModule: import(`@prisma/prisma-user-client`),
        addMigrationScripts: true,
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
  await service.createUser({ externalUserId });
  console.log(await service.getUsers()); // output: [{ externalUserId: '568a823e-65ea-46ba-aa57-0194ee67e0f9' }]
}

bootstrap();
```
