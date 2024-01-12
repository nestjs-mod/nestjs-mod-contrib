import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class TerminusHealthCheckFeatureConfiguration {
  @ConfigModelProperty({
    description: `Name of health check`,
  })
  @IsNotEmpty()
  name!: string;

  @ConfigModelProperty({
    description: `Logic for health check`,
  })
  @IsNotEmpty()
  isHealthy!: (key: string) => Promise<HealthIndicatorResult>;
}
