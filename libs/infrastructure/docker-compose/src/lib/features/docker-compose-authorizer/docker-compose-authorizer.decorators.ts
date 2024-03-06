import { getNestModuleDecorators } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from '../../docker-compose.constants';

const DOCKER_COMPOSE_AUTHORIZER_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}Authorizer`;
const DOCKER_COMPOSE_AUTHORIZER_INTERNAL_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}AuthorizerInternal`;

export const {
  InjectFeatures: InjectDockerComposeAuthorizerFeatures,
  InjectAllFeatures: InjectAllDockerComposeAuthorizerFeatures,
  InjectFeatureEnvironments: InjectDockerComposeAuthorizerFeatureEnvironments,
  InjectAllFeatureEnvironments:
    InjectAllDockerComposeAuthorizerFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeAuthorizerModuleSettings,
  InjectModuleSettings: InjectDockerComposeAuthorizerModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_AUTHORIZER_MODULE_NAME,
});

export const {
  InjectFeatures: InjectDockerComposeAuthorizerInternalFeatures,
  InjectAllFeatures: InjectAllDockerComposeAuthorizerInternalFeatures,
  InjectFeatureEnvironments:
    InjectDockerComposeAuthorizerInternalFeatureEnvironments,
  InjectAllFeatureEnvironments:
    InjectAllDockerComposeAuthorizerInternalFeatureEnvironments,
  InjectAllModuleSettings:
    InjectAllDockerComposeAuthorizerInternaModuleSettings,
  InjectModuleSettings: InjectDockerComposeAuthorizerInternaModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_AUTHORIZER_INTERNAL_MODULE_NAME,
});
