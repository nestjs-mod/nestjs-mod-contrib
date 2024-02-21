import { ConfigModel, ConfigModelProperty, EnvModel, EnvModelProperty, NumberTransformer } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class DockerComposeRedisConfiguration {
  @ConfigModelProperty({
    description: 'Docker image name',
    default: 'bitnami/redis:7.2',
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
    description: 'External port for sharing container.',
    default: 6379,
    transform: new NumberTransformer()
  })
  externalPort?: number;

  @ConfigModelProperty({
    description: 'Redis disable commands.',
    default: 'FLUSHDB,FLUSHALL',
  })
  disableCommands?: string;

  @ConfigModelProperty({
    description: 'Redis IO threads.',
    default: 2,
    transform: new NumberTransformer()
  })
  ioThreads?: number;

  @ConfigModelProperty({
    description: 'Redis IO threads.',
    default: 'yes',
  })
  ioThreadsDoReads?: string;
}

@EnvModel()
export class DockerComposeRedisEnvironments {
  @EnvModelProperty({
    description: 'Connection string for Redis (example: redis://:redis_password@localhost:6379)',
  })
  @IsNotEmpty()
  redisUrl!: string;
}
