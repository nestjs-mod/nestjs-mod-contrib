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
import { DockerComposeRedisError } from './docker-compose-redis-errors';
import { DOCKER_COMPOSE_REDIS_MODULE_NAME } from './docker-compose-redis.constants';
import { DockerComposeRedisConfiguration, DockerComposeRedisEnvironments } from './docker-compose-redis.settings';
import { redisUrlParse } from './docker-compose-redis.utils';

export const { DockerComposeRedis } = createNestModule({
  moduleName: DOCKER_COMPOSE_REDIS_MODULE_NAME,
  moduleDescription:
    'The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
  globalEnvironmentsOptions: { skipValidation: true },
  globalConfigurationOptions: { skipValidation: true },
  staticConfigurationModel: DockerComposeRedisConfiguration,
  staticEnvironmentsModel: DockerComposeRedisEnvironments,
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
    const dockerComposeRedisModule = createNestModule({
      project,
      moduleName: DOCKER_COMPOSE_REDIS_MODULE_NAME,
      moduleDescription:
        'The open-source, in-memory data store used by millions of developers as a cache, vector database, document database, streaming engine, and message broker. (Generator for redis in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
      moduleCategory: NestModuleCategory.infrastructure,
      globalEnvironmentsOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      globalConfigurationOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      staticConfigurationModel: DockerComposeRedisConfiguration,
      staticEnvironmentsModel: DockerComposeRedisEnvironments,
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
        const serviceName = getDockerComposeServiceName(project?.name, DockerComposeServiceType.Redis);
        let redisSettings:
          | {
              host: string;
              port: number;
              database: string;
              password: string | null;
            }
          | undefined = undefined;

        if (!staticEnvironments?.redisUrl && !isInfrastructureMode()) {
          throw new DockerComposeRedisError('redisUrl not set');
        }

        if (staticEnvironments?.redisUrl) {
          redisSettings = redisUrlParse(staticEnvironments.redisUrl);
        }

        return [
          ProjectUtils.forFeature({
            featureModuleName: DOCKER_COMPOSE_REDIS_MODULE_NAME,
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
                  volumes: [`${serviceName}-volume:/bitnami/redis/data`],
                  ports: [`${staticConfiguration?.externalPort}:6379`],
                  networks: networkNames,
                  environment: {
                    ...(redisSettings?.database
                      ? {
                          REDIS_DATABASE: redisSettings?.database,
                        }
                      : {}),
                    ...(redisSettings?.password ? { REDIS_PASSWORD: redisSettings?.password } : {}),
                    ...(staticConfiguration?.disableCommands
                      ? { REDIS_DISABLE_COMMANDS: staticConfiguration?.disableCommands }
                      : {}),
                    ...(staticConfiguration?.ioThreads ? { REDIS_IO_THREADS: staticConfiguration?.ioThreads } : {}),
                    ...(staticConfiguration?.ioThreadsDoReads
                      ? { REDIS_IO_THREADS_DO_READS: staticConfiguration?.ioThreadsDoReads }
                      : {}),
                  },
                  keysOfEnvironmentsWithStaticValue: (
                    [
                      'disableCommands',
                      'featureName',
                      'image',
                      'ioThreads',
                      'ioThreadsDoReads',
                      'networks',
                    ] as (keyof DockerComposeRedisConfiguration)[]
                  ).map((v) => constantCase(v)),
                  healthcheck: {
                    test: redisSettings?.password
                      ? ['CMD-SHELL', 'redis-cli --no-auth-warning -a $$REDIS_PASSWORD ping | grep PONG']
                      : ['CMD-SHELL', 'redis-cli ping | grep PONG'],
                    interval: '5s',
                    timeout: '5s',
                    retries: 5,
                  },
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
    }).DockerComposeRedis;

    modules[NestModuleCategory.infrastructure]!.push(dockerComposeRedisModule.forRootAsync(current.asyncModuleOptions));
  },
});
