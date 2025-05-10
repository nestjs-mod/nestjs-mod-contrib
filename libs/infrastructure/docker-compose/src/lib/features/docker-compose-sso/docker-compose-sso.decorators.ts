import { getNestModuleDecorators } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from '../../docker-compose.constants';

const DOCKER_COMPOSE_SSO_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}Sso`;
const DOCKER_COMPOSE_SSO_INTERNAL_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}SsoInternal`;

export const {
  InjectFeatures: InjectDockerComposeSsoFeatures,
  InjectAllFeatures: InjectAllDockerComposeSsoFeatures,
  InjectFeatureEnvironments: InjectDockerComposeSsoFeatureEnvironments,
  InjectAllFeatureEnvironments:
    InjectAllDockerComposeSsoFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeSsoModuleSettings,
  InjectModuleSettings: InjectDockerComposeSsoModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_SSO_MODULE_NAME,
});

export const {
  InjectFeatures: InjectDockerComposeSsoInternalFeatures,
  InjectAllFeatures: InjectAllDockerComposeSsoInternalFeatures,
  InjectFeatureEnvironments:
    InjectDockerComposeSsoInternalFeatureEnvironments,
  InjectAllFeatureEnvironments:
    InjectAllDockerComposeSsoInternalFeatureEnvironments,
  InjectAllModuleSettings:
    InjectAllDockerComposeSsoInternaModuleSettings,
  InjectModuleSettings: InjectDockerComposeSsoInternaModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_SSO_INTERNAL_MODULE_NAME,
});
