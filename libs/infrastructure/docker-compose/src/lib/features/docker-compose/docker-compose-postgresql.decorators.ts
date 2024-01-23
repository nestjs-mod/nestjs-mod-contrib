import { getNestModuleDecorators } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from '../../docker-compose.constants';

const DOCKER_COMPOSE_POSTGRES_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}PostgreSQL`;
const DOCKER_COMPOSE_POSTGRES_INTERNAL_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}PostgreSQLInternal`;

export const {
  InjectFeatures: InjectDockerComposePostgresFeatures,
  InjectAllFeatures: InjectAllDockerComposePostgresFeatures,
  InjectFeatureEnvironments: InjectDockerComposePostgresFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposePostgresFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposePostgresModuleSettings,
  InjectModuleSettings: InjectDockerComposePostgresModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_POSTGRES_MODULE_NAME,
});

export const {
  InjectFeatures: InjectDockerComposePostgresInternalFeatures,
  InjectAllFeatures: InjectAllDockerComposePostgresInternalFeatures,
  InjectFeatureEnvironments: InjectDockerComposePostgresInternalFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposePostgresInternalFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposePostgresInternaModuleSettings,
  InjectModuleSettings: InjectDockerComposePostgresInternaModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_POSTGRES_INTERNAL_MODULE_NAME,
});
