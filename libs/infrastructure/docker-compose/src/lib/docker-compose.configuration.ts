import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';
import { DockerComposeFeatureConfiguration } from './docker-compose.feature-configuration';

@ConfigModel()
export class DockerComposeConfiguration {
  @ConfigModelProperty({
    description:
      'Main file for docker-compose, the Compose specification establishes a standard for the definition of multi-container platform-agnostic applications.',
  })
  @IsNotEmpty()
  dockerComposeFile!: string;

  @ConfigModelProperty({
    description:
      'Main file for prod docker-compose, the Compose specification establishes a standard for the definition of multi-container platform-agnostic applications.',
  })
  prodDockerComposeFile?: string;

  @ConfigModelProperty({
    description:
      'Example file for docker-compose, the Compose specification establishes a standard for the definition of multi-container platform-agnostic applications.',
  })
  exampleDockerComposeFile?: string;

  @ConfigModelProperty({
    description: 'Dotenv file for prod docker-compose file.',
  })
  prodDockerComposeEnvFile?: string;

  @ConfigModelProperty({
    description: 'Docker-compose file version. @see https://docs.docker.com/compose/compose-file/compose-versioning',
    default: '3',
  })
  @IsNotEmpty()
  dockerComposeFileVersion!: string;

  @ConfigModelProperty({
    description: 'Before save file for example docker-compose.',
  })
  beforeSaveExampleDockerComposeFile?: ({
    data,
    header,
  }: {
    data: DockerComposeFeatureConfiguration;
    header?: string;
  }) => Promise<{
    data: DockerComposeFeatureConfiguration;
    header?: string;
  }>;

  @ConfigModelProperty({
    description: 'Before save main file for docker-compose.',
  })
  beforeSaveDockerComposeFile?: ({
    data,
    header,
  }: {
    data: DockerComposeFeatureConfiguration;
    header?: string;
  }) => Promise<{
    data: DockerComposeFeatureConfiguration;
    header?: string;
  }>;

  @ConfigModelProperty({
    description: 'Before save main file for prod docker-compose.',
  })
  beforeSaveProdDockerComposeFile?: ({
    data,
    header,
  }: {
    data: DockerComposeFeatureConfiguration;
    header?: string;
  }) => Promise<{
    data: DockerComposeFeatureConfiguration;
    header?: string;
  }>;

  @ConfigModelProperty({
    description: 'Method before save dotenv file for docker-compose file.',
  })
  beforeSaveDockerComposeEnvFile?: (
    data: Record<string, string | undefined>
  ) => Promise<Record<string, string | undefined>>;

  @ConfigModelProperty({
    description: 'Method before save dotenv file for prod docker-compose file.',
  })
  beforeSaveProdDockerComposeEnvFile?: (
    data: Record<string, string | undefined>
  ) => Promise<Record<string, string | undefined>>;
}
