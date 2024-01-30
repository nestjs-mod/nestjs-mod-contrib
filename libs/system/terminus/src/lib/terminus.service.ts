import { InjectableFeatureConfigurationType } from '@nestjs-mod/common';
import { Injectable } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';
import { TerminusHealthCheckFeatureConfiguration } from './terminus-feature.configuration';
import { TerminusHealthCheckConfiguration } from './terminus.configuration';
import { InjectTerminusHealthCheckFeatures } from './terminus.decorators';

@Injectable()
export class TerminusHealthCheckService {
  constructor(
    @InjectTerminusHealthCheckFeatures()
    private readonly terminusHealthCheckFeatureConfigurations: InjectableFeatureConfigurationType<TerminusHealthCheckFeatureConfiguration>[],
    private readonly terminusHealthCheckConfiguration: TerminusHealthCheckConfiguration,
    private readonly healthCheckService: HealthCheckService
  ) {}

  async check() {
    return this.healthCheckService.check(
      [
        ...(this.terminusHealthCheckConfiguration.standardHealthIndicators ?? []).map(({ check }) => check),
        ...this.terminusHealthCheckFeatureConfigurations.map(
          (terminusHealthCheckFeatureConfiguration) => () =>
            terminusHealthCheckFeatureConfiguration.featureConfiguration.isHealthy(
              terminusHealthCheckFeatureConfiguration.featureConfiguration.name
            )
        ),
      ].filter(Boolean)
    );
  }
}
