import { ConfigModel, ConfigModelProperty, EnvModel, EnvModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class DockerComposePostgresConfiguration {
  @ConfigModelProperty({
    description: 'Network, if not set networkNames have project name and driver=bridge.',
  })
  networks?: { name: string; driver: string }[];

  @ConfigModelProperty({
    description: 'External port for sharing container.',
    default: 5432,
  })
  externalPort?: number;

  @ConfigModelProperty({
    description: 'Docker image name',
    default: 'bitnami/postgresql:15.5.0',
  })
  image?: string;
}

@EnvModel()
export class DockerComposePostgresEnvironments {
  @EnvModelProperty({
    description: 'Connection string for PostgreSQL with root credentials',
  })
  @IsNotEmpty()
  rootDatabaseUrl!: string;
}

@EnvModel()
export class DockerComposePostgresDatabaseEnvironments {
  @EnvModelProperty({
    description: 'Connection string for PostgreSQL with module credentials',
  })
  @IsNotEmpty()
  databaseUrl!: string;
}
