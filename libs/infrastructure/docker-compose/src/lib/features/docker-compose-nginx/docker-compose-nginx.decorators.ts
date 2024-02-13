import { getNestModuleDecorators } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from '../../docker-compose.constants';

const DOCKER_COMPOSE_NGINX_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}Nginx`;
const DOCKER_COMPOSE_NGINX_INTERNAL_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}NginxInternal`;

export const {
  InjectFeatures: InjectDockerComposeNginxFeatures,
  InjectAllFeatures: InjectAllDockerComposeNginxFeatures,
  InjectFeatureEnvironments: InjectDockerComposeNginxFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeNginxFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeNginxModuleSettings,
  InjectModuleSettings: InjectDockerComposeNginxModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_NGINX_MODULE_NAME,
});

export const {
  InjectFeatures: InjectDockerComposeNginxInternalFeatures,
  InjectAllFeatures: InjectAllDockerComposeNginxInternalFeatures,
  InjectFeatureEnvironments: InjectDockerComposeNginxInternalFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeNginxInternalFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeNginxInternaModuleSettings,
  InjectModuleSettings: InjectDockerComposeNginxInternaModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_NGINX_INTERNAL_MODULE_NAME,
});
