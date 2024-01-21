import { createNestModule, NestModuleCategory, ProjectUtils } from '@nestjs-mod/common';
import { DockerComposeBootstrapService } from './docker-compose-bootstrap.service';
import { DockerComposeFileService } from './docker-compose-file.service';
import { DockerComposeConfiguration } from './docker-compose.configuration';
import { DOCKER_COMPOSE_MODULE_NAME } from './docker-compose.constants';
import { DockerComposeFeatureConfiguration } from './docker-compose.feature-configuration';
import { ManualDockerComposeFeatures } from './manual-docker-compose.service';

export const { DockerCompose } = createNestModule({
  moduleName: DOCKER_COMPOSE_MODULE_NAME,
  moduleCategory: NestModuleCategory.infrastructure,
  moduleDescription:
    'Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience. (Generator docker-compose.yml for https://docs.docker.com/compose)',
  configurationModel: DockerComposeConfiguration,
  featureConfigurationModel: DockerComposeFeatureConfiguration,
  imports: [ProjectUtils.forFeature({ featureModuleName: DOCKER_COMPOSE_MODULE_NAME })],
  providers: [DockerComposeFileService, DockerComposeBootstrapService],
  sharedProviders: [ManualDockerComposeFeatures],
});
