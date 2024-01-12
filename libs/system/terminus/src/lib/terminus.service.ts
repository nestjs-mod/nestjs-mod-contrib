import { Injectable } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';
import { TerminusHealthCheckFeatureConfiguration } from './terminus-feature.configuration';
import { TerminusHealthCheckConfiguration } from './terminus.configuration';
import { InjectFeatures } from './terminus.decorators';

@Injectable()
export class TerminusHealthCheckService {
  constructor(
    @InjectFeatures()
    private readonly terminusHealthCheckFeatureConfigurations: TerminusHealthCheckFeatureConfiguration[],
    private readonly terminusHealthCheckConfiguration: TerminusHealthCheckConfiguration,
    private readonly healthCheckService: HealthCheckService
  ) {}

  async check() {
    return this.healthCheckService.check(
      [
        ...(this.terminusHealthCheckConfiguration.standardHealthIndicator ?? []).map(({ check }) => check),
        ...this.terminusHealthCheckFeatureConfigurations.map(
          (terminusHealthCheckFeatureConfiguration) => () =>
            terminusHealthCheckFeatureConfiguration.isHealthy(terminusHealthCheckFeatureConfiguration.name)
        ),
      ].filter(Boolean)
    );
  }
}
