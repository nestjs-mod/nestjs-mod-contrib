import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

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
    description: 'Dotenv file for for prod docker-compose file.',
  })
  prodDockerComposeEnvFile?: string;

  @ConfigModelProperty({
    description: 'Docker-compose file version. @see https://docs.docker.com/compose/compose-file/compose-versioning',
    default: '3',
  })
  @IsNotEmpty()
  dockerComposeFileVersion!: string;
}
