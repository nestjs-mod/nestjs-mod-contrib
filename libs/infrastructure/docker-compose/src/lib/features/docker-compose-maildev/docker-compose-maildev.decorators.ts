import { getNestModuleDecorators, getNestModuleInternalUtils } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_MODULE_NAME } from '../../docker-compose.constants';

const DOCKER_COMPOSE_MAILDEV_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}Maildev`;
const DOCKER_COMPOSE_MAILDEV_INTERNAL_MODULE_NAME = `${DOCKER_COMPOSE_MODULE_NAME}MaildevInternal`;

export const {
  InjectFeatures: InjectDockerComposeMaildevFeatures,
  InjectAllFeatures: InjectAllDockerComposeMaildevFeatures,
  InjectFeatureEnvironments: InjectDockerComposeMaildevFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeMaildevFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeMaildevModuleSettings,
  InjectModuleSettings: InjectDockerComposeMaildevModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_MAILDEV_MODULE_NAME,
});

export const { getServiceToken: getDockerComposeMaildevServiceToken } = getNestModuleInternalUtils({
  moduleName: DOCKER_COMPOSE_MAILDEV_MODULE_NAME,
});

export const {
  InjectFeatures: InjectDockerComposeMaildevInternalFeatures,
  InjectAllFeatures: InjectAllDockerComposeMaildevInternalFeatures,
  InjectFeatureEnvironments: InjectDockerComposeMaildevInternalFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllDockerComposeMaildevInternalFeatureEnvironments,
  InjectAllModuleSettings: InjectAllDockerComposeMaildevInternaModuleSettings,
  InjectModuleSettings: InjectDockerComposeMaildevInternaModuleSettings,
} = getNestModuleDecorators({
  moduleName: DOCKER_COMPOSE_MAILDEV_INTERNAL_MODULE_NAME,
});

export const { getServiceToken: getDockerComposeMaildevInternalServiceToken } = getNestModuleInternalUtils({
  moduleName: DOCKER_COMPOSE_MAILDEV_INTERNAL_MODULE_NAME,
});
