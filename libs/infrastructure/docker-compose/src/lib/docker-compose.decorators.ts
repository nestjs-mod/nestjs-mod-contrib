import { getNestModuleDecorators } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from './docker-compose.constants';

export const {
  InjectFeatures: InjectDockerComposeFeatures,
  InjectAllFeatures: InjectAllDockerComposeFeatures,
  InjectFeatureEnvironments: InjectDockerComposeFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeModuleSettings,
  InjectModuleSettings: InjectDockerComposeModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_MODULE_NAME,
});
