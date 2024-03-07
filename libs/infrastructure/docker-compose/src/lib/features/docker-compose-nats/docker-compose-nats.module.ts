import {
  NestModuleCategory,
  ProjectUtils,
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { constantCase, kebabCase } from 'case-anything';
import { DockerCompose } from '../../docker-compose.module';
import { DockerComposeServiceType, getDockerComposeServiceName } from '../../docker-compose.utils';
import { DOCKER_COMPOSE_NATS_MODULE_NAME } from './docker-compose-nats.constants';
import { DockerComposeNatsConfiguration, DockerComposeNatsEnvironments } from './docker-compose-nats.settings';

export const { DockerComposeNats } = createNestModule({
  moduleName: DOCKER_COMPOSE_NATS_MODULE_NAME,
  moduleDescription:
    'NATS is an open source, lightweight and high-performance messaging system. It is ideal for distributed systems and supports modern cloud architectures and pub-sub, request-reply and queuing models. (Generator for nats in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
  globalEnvironmentsOptions: { skipValidation: true },
  globalConfigurationOptions: { skipValidation: true },
  staticConfigurationModel: DockerComposeNatsConfiguration,
  staticEnvironmentsModel: DockerComposeNatsEnvironments,
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    if (asyncModuleOptions.staticConfiguration?.featureName) {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(asyncModuleOptions.staticConfiguration.featureName);
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: asyncModuleOptions.staticConfiguration?.featureName,
        },
      });
    }
    return { asyncModuleOptions };
  },
  preWrapApplication: async ({ project, modules, current }) => {
    if (!modules[NestModuleCategory.infrastructure]) {
      modules[NestModuleCategory.infrastructure] = [];
    }
    const dockerComposeNatsModule = createNestModule({
      project,
      moduleName: DOCKER_COMPOSE_NATS_MODULE_NAME,
      moduleDescription:
        'NATS is an open source, lightweight and high-performance messaging system. It is ideal for distributed systems and supports modern cloud architectures and pub-sub, request-reply and queuing models. (Generator for nats in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
      moduleCategory: NestModuleCategory.infrastructure,
      globalEnvironmentsOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      globalConfigurationOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      staticConfigurationModel: DockerComposeNatsConfiguration,
      staticEnvironmentsModel: DockerComposeNatsEnvironments,
      wrapForRootAsync: (asyncModuleOptions) => {
        if (!asyncModuleOptions) {
          asyncModuleOptions = {};
        }
        if (asyncModuleOptions.staticConfiguration?.featureName) {
          const FomatterClass = getFeatureDotEnvPropertyNameFormatter(
            asyncModuleOptions.staticConfiguration.featureName
          );
          Object.assign(asyncModuleOptions, {
            environmentsOptions: {
              propertyNameFormatters: [new FomatterClass()],
              name: asyncModuleOptions.staticConfiguration?.featureName,
            },
          });
        }
        return { asyncModuleOptions };
      },
      imports: ({ contextName, project, staticConfiguration, staticEnvironments }) => {
        const networks =
          (project?.name
            ? staticConfiguration?.networks?.map((n) => ({
                ...n,
                name: kebabCase([project?.name, n.name, 'network'].filter(Boolean).join('-')),
              })) ?? [{ name: kebabCase(`${project?.name}-network`), driver: 'bridge' }]
            : staticConfiguration?.networks) ?? [];

        if (networks?.length === 0) {
          networks.push({ name: 'default-network', driver: 'bridge' });
        }
        const networkNames = networks?.map((n) => n.name);
        const serviceName = getDockerComposeServiceName(project?.name, DockerComposeServiceType.Nats);

        return [
          ProjectUtils.forFeature({
            featureModuleName: DOCKER_COMPOSE_NATS_MODULE_NAME,
            contextName,
          }),
          DockerCompose.forFeature({
            contextName,
            featureModuleName: constantCase(serviceName),
            featureConfiguration: {
              services: {
                [serviceName]: {
                  image: staticConfiguration?.image,
                  container_name: serviceName,
                  volumes: [`${serviceName}-volume:/bitnami/nats/data`],
                  ports: [
                    `${staticConfiguration?.externalHttpPort}:8222`,
                    `${staticConfiguration?.externalClientPort}:4222`,
                  ],
                  networks: networkNames,
                  environment: {
                    ...(staticEnvironments?.natsEnableAuth
                      ? { NATS_ENABLE_AUTH: staticEnvironments?.natsEnableAuth }
                      : {}),
                    ...(staticEnvironments?.natsUsername ? { NATS_USERNAME: staticEnvironments?.natsUsername } : {}),
                    ...(staticEnvironments?.natsPassword ? { NATS_PASSWORD: staticEnvironments?.natsPassword } : {}),
                    ...(staticConfiguration.extraArgs ? { NATS_EXTRA_ARGS: staticConfiguration.extraArgs } : {}),
                  },
                  keysOfEnvironmentsWithStaticValue: [
                    'featureName',
                    'image',
                    'extraArgs',
                    'networks',
                  ] as (keyof DockerComposeNatsConfiguration)[],
                  tty: true,
                  restart: 'always',
                },
              },
              networks: networks.reduce((all, cur) => ({ ...all, [cur.name]: { driver: cur.driver } }), {}),
              volumes: {
                [`${serviceName}-volume`]: { name: `${serviceName}-volume` },
              },
            },
          }),
        ];
      },
    }).DockerComposeNats;

    modules[NestModuleCategory.infrastructure]!.push(dockerComposeNatsModule.forRootAsync(current.asyncModuleOptions));
  },
});
