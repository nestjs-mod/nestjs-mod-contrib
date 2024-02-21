import { ConfigModel, ConfigModelProperty, EnvModel, EnvModelProperty, NumberTransformer } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class DockerComposePostgresConfiguration {
  @ConfigModelProperty({
    description: 'Docker image name',
    default: 'bitnami/postgresql:15.5.0',
  })
  image?: string;

  @ConfigModelProperty({
    description: 'Network, if not set networkNames have project name and driver=bridge.',
  })
  networks?: { name: string; driver: string }[];

  @ConfigModelProperty({
    description: 'External port for sharing container.',
    default: 5432,
    transform: new NumberTransformer()
  })
  externalPort?: number;
}

@EnvModel()
export class DockerComposePostgresEnvironments {
  @EnvModelProperty({
    description:
      'Connection string for PostgreSQL with root credentials (example: postgres://postgres:postgres_password@localhost:5432/postgres?schema=public, username must be "postgres")',
  })
  @IsNotEmpty()
  rootDatabaseUrl!: string;
}

@EnvModel()
export class DockerComposePostgresFeatureEnvironments {
  @EnvModelProperty({
    description:
      'Connection string for PostgreSQL with module credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public)',
  })
  @IsNotEmpty()
  databaseUrl!: string;
}
