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
import { DockerComposeAuthorizerConfiguration } from './docker-compose-authorizer.configuration';
import { DOCKER_COMPOSE_AUTHORIZER_MODULE_NAME } from './docker-compose-authorizer.constants';
import { DockerComposeAuthorizerEnvironments } from './docker-compose-authorizer.environments';

export const { DockerComposeAuthorizer } = createNestModule({
  moduleName: DOCKER_COMPOSE_AUTHORIZER_MODULE_NAME,
  moduleDescription:
    'Authorizer is an open-source authentication and authorization solution for your applications. Bring your database and have complete control over the user information. You can self-host authorizer instances and connect to supported databases. (Generator for https://authorizer.dev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
  globalEnvironmentsOptions: { skipValidation: true },
  globalConfigurationOptions: { skipValidation: true },
  staticConfigurationModel: DockerComposeAuthorizerConfiguration,
  staticEnvironmentsModel: DockerComposeAuthorizerEnvironments,
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
    const dockerComposeAuthorizerModule = createNestModule({
      project,
      moduleName: DOCKER_COMPOSE_AUTHORIZER_MODULE_NAME,
      moduleDescription:
        'Authorizer is an open-source authentication and authorization solution for your applications. Bring your database and have complete control over the user information. You can self-host authorizer instances and connect to supported databases. (Generator for https://authorizer.dev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
      moduleCategory: NestModuleCategory.infrastructure,
      globalEnvironmentsOptions: {
        name: project?.name,
        skipValidation: isInfrastructureMode(),
      },
      globalConfigurationOptions: {
        name: project?.name,
        skipValidation: isInfrastructureMode(),
      },
      staticConfigurationModel: DockerComposeAuthorizerConfiguration,
      staticEnvironmentsModel: DockerComposeAuthorizerEnvironments,
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
              })) ?? [
                {
                  name: kebabCase(`${project?.name}-network`),
                  driver: 'bridge',
                },
              ]
            : staticConfiguration?.networks) ?? [];

        if (networks?.length === 0) {
          networks.push({ name: 'default-network', driver: 'bridge' });
        }
        const networkNames = networks?.map((n) => n.name);
        const serviceName = getDockerComposeServiceName(project?.name, DockerComposeServiceType.Authorizer);

        return [
          ProjectUtils.forFeature({
            featureModuleName: DOCKER_COMPOSE_AUTHORIZER_MODULE_NAME,
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
                  ports: [`${staticConfiguration?.externalClientPort}:${staticEnvironments?.port}`],
                  networks: networkNames,
                  environment: {
                    ...Object.entries({ ...staticEnvironments, ...staticConfiguration }).reduce(
                      (all, [key, value]) => ({
                        ...all,
                        [constantCase(key)]: value,
                      }),
                      {}
                    ),
                  },
                  keysOfEnvironmentsWithStaticValue: (
                    [
                      'featureName',
                      'image',
                      'networks',
                      'dependsOnServiceNames',
                      'env',
                    ] as (keyof DockerComposeAuthorizerConfiguration)[]
                  ).map((v) => constantCase(v)),
                  tty: true,
                  restart: 'always',
                  depends_on: Object.entries(staticConfiguration.dependsOnServiceNames || {})
                    .map(([serviceName, condition]) => {
                      const keys = Object.keys(process.env);

                      if (serviceName) {
                        for (const key of keys) {
                          serviceName = String(serviceName).replace(
                            new RegExp(`%${key}%`, 'ig'),
                            process.env[key] || ''
                          );
                        }
                      }
                      // todo: fix type
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      return [serviceName, condition] as any;
                    })
                    .map(([serviceName, condition]) => ({
                      [getDockerComposeServiceName(project?.name, serviceName)]: { condition },
                    }))
                    .reduce((all, cur) => ({ ...all, ...cur }), {}),
                },
              },
              networks: networks.reduce((all, cur) => ({ ...all, [cur.name]: { driver: cur.driver } }), {}),
            },
          }),
        ];
      },
    }).DockerComposeAuthorizer;

    modules[NestModuleCategory.infrastructure]!.push(
      dockerComposeAuthorizerModule.forRootAsync(current.asyncModuleOptions)
    );
  },
});
