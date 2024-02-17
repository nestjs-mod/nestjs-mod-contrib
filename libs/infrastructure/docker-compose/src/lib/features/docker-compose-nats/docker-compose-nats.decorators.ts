import { getNestModuleDecorators } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from '../../docker-compose.constants';

const DOCKER_COMPOSE_NATS_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}Nats`;
const DOCKER_COMPOSE_NATS_INTERNAL_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}NatsInternal`;

export const {
  InjectFeatures: InjectDockerComposeNatsFeatures,
  InjectAllFeatures: InjectAllDockerComposeNatsFeatures,
  InjectFeatureEnvironments: InjectDockerComposeNatsFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeNatsFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeNatsModuleSettings,
  InjectModuleSettings: InjectDockerComposeNatsModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_NATS_MODULE_NAME,
});

export const {
  InjectFeatures: InjectDockerComposeNatsInternalFeatures,
  InjectAllFeatures: InjectAllDockerComposeNatsInternalFeatures,
  InjectFeatureEnvironments: InjectDockerComposeNatsInternalFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeNatsInternalFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeNatsInternaModuleSettings,
  InjectModuleSettings: InjectDockerComposeNatsInternaModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_NATS_INTERNAL_MODULE_NAME,
});
