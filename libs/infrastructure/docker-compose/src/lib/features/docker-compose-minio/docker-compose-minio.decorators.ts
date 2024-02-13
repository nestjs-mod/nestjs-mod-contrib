import { getNestModuleDecorators } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from '../../docker-compose.constants';

const DOCKER_COMPOSE_MINIO_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}Minio`;
const DOCKER_COMPOSE_MINIO_INTERNAL_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}MinioInternal`;

export const {
  InjectFeatures: InjectDockerComposeMinioFeatures,
  InjectAllFeatures: InjectAllDockerComposeMinioFeatures,
  InjectFeatureEnvironments: InjectDockerComposeMinioFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeMinioFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeMinioModuleSettings,
  InjectModuleSettings: InjectDockerComposeMinioModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_MINIO_MODULE_NAME,
});

export const {
  InjectFeatures: InjectDockerComposeMinioInternalFeatures,
  InjectAllFeatures: InjectAllDockerComposeMinioInternalFeatures,
  InjectFeatureEnvironments: InjectDockerComposeMinioInternalFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeMinioInternalFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeMinioInternaModuleSettings,
  InjectModuleSettings: InjectDockerComposeMinioInternaModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_MINIO_INTERNAL_MODULE_NAME,
});
