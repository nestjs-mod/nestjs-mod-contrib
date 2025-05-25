import { ConfigModel, ConfigModelProperty, NumberTransformer } from '@nestjs-mod/common';

@ConfigModel()
export class DockerComposeSsoConfiguration {
  @ConfigModelProperty({
    description: 'Docker image name',
    default: 'ghcr.io/nestjs-mod/nestjs-mod-sso-server:1.10.0',
  })
  image?: string;

  @ConfigModelProperty({
    description: 'Feature name for generate prefix to environments keys',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Network, if not set networkNames have project name and driver=bridge',
  })
  networks?: { name: string; driver: string }[];

  @ConfigModelProperty({
    description: 'External port for sharing container',
    transform: new NumberTransformer(),
    default: 8080,
  })
  externalClientPort?: number;

  @ConfigModelProperty({
    description: 'Depends on services',
  })
  dependsOnServiceNames?: Record<string, 'service_started' | 'service_healthy' | 'service_completed_successfully'>;
}
