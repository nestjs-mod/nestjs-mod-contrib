Example of use feature configurations and use standardHealthIndicators.

```typescript
import { TerminusHealthCheck, TerminusHealthCheckFeatureConfiguration } from '@nestjs-mod/terminus';
import { NestFactory } from '@nestjs/core';

import { Module } from '@nestjs/common';
import { HealthIndicatorStatus, MemoryHealthIndicator } from '@nestjs/terminus';

export class FeatureTerminusHealthCheckFeatureConfiguration implements TerminusHealthCheckFeatureConfiguration {
  name = 'Feature';
  async isHealthy() {
    return {
      feature: {
        status: 'up' as HealthIndicatorStatus,
      },
    };
  }
}

@Module({
  imports: [
    TerminusHealthCheck.forFeature({
      featureModuleName: 'feature',
      featureConfiguration: new FeatureTerminusHealthCheckFeatureConfiguration(),
    }),
  ],
})
export class FeatureModule {}

@Module({
  imports: [
    TerminusHealthCheck.forRootAsync({
      configurationFactory: (memoryHealthIndicator: MemoryHealthIndicator) => ({
        standardHealthIndicators: [
          { name: 'memory_heap', check: () => memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024) },
        ],
      }),
      inject: [MemoryHealthIndicator],
    }),
    FeatureModule,
  ],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```
