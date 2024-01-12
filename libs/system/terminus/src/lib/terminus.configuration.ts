import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { LoggerService, Type } from '@nestjs/common';
import { HealthIndicatorFunction, TerminusModuleOptions } from '@nestjs/terminus';
import { ErrorLogStyle } from '@nestjs/terminus/dist/terminus-options.interface';

@ConfigModel()
export class TerminusHealthCheckStaticConfiguration implements TerminusModuleOptions {
  @ConfigModelProperty({
    description: `Rest endpoint for health check`,
    default: 'health',
  })
  endpoint?: string;

  @ConfigModelProperty({
    description: `The style of the error logger @default 'json'`,
  })
  errorLogStyle?: ErrorLogStyle;

  @ConfigModelProperty({
    description: `The logger to use. Either default logger or your own.`,
  })
  logger?: Type<LoggerService> | boolean;

  @ConfigModelProperty({
    description: `The timeout to wait in ms before the application shuts down @default 0`,
  })
  gracefulShutdownTimeoutMs?: number;
}

@ConfigModel()
export class TerminusHealthCheckConfiguration {
  @ConfigModelProperty({
    description: `Standard health indicators @see https://docs.nestjs.com/recipes/terminus#setting-up-a-healthcheck`,
  })
  standardHealthIndicator?: { name: string; check: HealthIndicatorFunction }[];
}
