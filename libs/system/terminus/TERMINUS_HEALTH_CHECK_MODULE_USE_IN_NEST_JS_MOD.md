An example of using forRoot with parameters and use feature configurations with use standardHealthIndicators, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-terminus.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  bootstrapNestApplication,
  createNestModule,
} from '@nestjs-mod/common';
import { TerminusHealthCheckModule, TerminusHealthCheckFeatureConfiguration } from '@nestjs-mod/terminus';
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

export const { FeatureModule } = createNestModule({
  moduleName: 'FeatureModule',
  imports: [
    TerminusHealthCheck.forFeature({
      featureModuleName: 'feature',
      featureConfiguration: new FeatureTerminusHealthCheckFeatureConfiguration(),
    }),
  ],
});

bootstrapNestApplication({
  modules: {
    system: [
      DefaultNestApplicationInitializer.forRoot(),
      TerminusHealthCheckModule.forRootAsync({
        configurationFactory: (memoryHealthIndicator: MemoryHealthIndicator) => ({
          standardHealthIndicators: [
            { name: 'memory_heap', check: () => memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024) },
          ],
        }),
        inject: [MemoryHealthIndicator],
      }),
      DefaultNestApplicationListener.forRoot({ staticEnvironments: { port: 3000 } }),
    ],
    feature: [FeatureModule.forRoot()],
  },
});
```
