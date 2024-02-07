import { getNestModuleDecorators } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from '../../docker-compose.constants';

const DOCKER_COMPOSE_REDIS_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}Redis`;
const DOCKER_COMPOSE_REDIS_INTERNAL_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}RedisInternal`;

export const {
  InjectFeatures: InjectDockerComposeRedisFeatures,
  InjectAllFeatures: InjectAllDockerComposeRedisFeatures,
  InjectFeatureEnvironments: InjectDockerComposeRedisFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeRedisFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeRedisModuleSettings,
  InjectModuleSettings: InjectDockerComposeRedisModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_REDIS_MODULE_NAME,
});

export const {
  InjectFeatures: InjectDockerComposeRedisInternalFeatures,
  InjectAllFeatures: InjectAllDockerComposeRedisInternalFeatures,
  InjectFeatureEnvironments: InjectDockerComposeRedisInternalFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeRedisInternalFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeRedisInternaModuleSettings,
  InjectModuleSettings: InjectDockerComposeRedisInternaModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_REDIS_INTERNAL_MODULE_NAME,
});
