import { createNestModule, isProductionMode, NestModuleCategory } from '@nestjs-mod/common';
import { DynamicModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusHealthCheckFeatureConfiguration } from './terminus-feature.configuration';
import { TerminusHealthCheckConfiguration, TerminusHealthCheckStaticConfiguration } from './terminus.configuration';
import { TERMINUS_MODULE_NAME } from './terminus.constants';
import { getTerminusHealthCheckController } from './terminus.controller';
import { TerminusHealthCheckService } from './terminus.service';

export const { TerminusHealthCheckModule } = createNestModule({
  moduleName: TERMINUS_MODULE_NAME,
  moduleDescription:
    'Terminus integration provides readiness/liveness health checks for NestJS-mod (Wrapper for https://www.npmjs.com/package/@nestjs/terminus)',
  moduleCategory: NestModuleCategory.system,
  configurationModel: TerminusHealthCheckConfiguration,
  staticConfigurationModel: TerminusHealthCheckStaticConfiguration,
  featureConfigurationModel: TerminusHealthCheckFeatureConfiguration,
  imports: ({ staticConfiguration }: { staticConfiguration: DynamicModule }) => [
    TerminusModule.forRoot({ errorLogStyle: isProductionMode() ? 'json' : 'pretty', ...staticConfiguration }),
  ],
  sharedImports: [TerminusModule],
  sharedProviders: [TerminusHealthCheckService],
  controllers: ({ staticConfiguration }) => [getTerminusHealthCheckController(staticConfiguration.endpoint!)],
});
