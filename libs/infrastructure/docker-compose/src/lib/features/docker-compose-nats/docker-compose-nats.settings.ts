import { ConfigModel, ConfigModelProperty, EnvModel, EnvModelProperty, NumberTransformer } from '@nestjs-mod/common';

@ConfigModel()
export class DockerComposeNatsConfiguration {
  @ConfigModelProperty({
    description: 'Docker image name.',
    default: 'bitnami/nats:2.10.5',
  })
  image?: string;

  @ConfigModelProperty({
    description: 'Feature name for generate prefix to environments keys',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Network, if not set networkNames have project name and driver=bridge.',
  })
  networks?: { name: string; driver: string }[];

  @ConfigModelProperty({
    description: 'External client port for sharing container.',
    default: 4222,
    transform: new NumberTransformer()
  })
  externalClientPort?: number;

  @ConfigModelProperty({
    description: 'External http port for sharing container.',
    default: 8222,
    transform: new NumberTransformer()
  })
  externalHttpPort?: number;

  @ConfigModelProperty({
    description: 'Extra arguments.',
    default: '-js',
  })
  extraArgs?: string;
}

@EnvModel()
export class DockerComposeNatsEnvironments {
  @EnvModelProperty({
    description: 'Enable Authentication.',
    hidden: true,
  })
  natsEnableAuth?: string;

  @EnvModelProperty({
    description: 'Username credential for client connections.',
    hidden: true,
  })
  natsUsername?: string;

  @EnvModelProperty({
    description: 'Password credential for client connections.',
    hidden: true,
  })
  natsPassword?: string;
}
