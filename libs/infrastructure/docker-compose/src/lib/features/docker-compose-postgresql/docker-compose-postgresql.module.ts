import { NestModuleCategory, ProjectUtils, createNestModule, isInfrastructureMode } from '@nestjs-mod/common';
import { constantCase, kebabCase } from 'case-anything';
import { Subject, concatMap, firstValueFrom } from 'rxjs';
import { DockerCompose } from '../../docker-compose.module';
import { DockerComposeServiceType, getDockerComposeServiceName } from '../../docker-compose.utils';
import { DockerComposePostgresDatabaseService } from './docker-compose-postgresql-database.service';
import { DOCKER_COMPOSE_POSTGRES_MODULE_NAME } from './docker-compose-postgresql.constants';
import { DockerComposePostgresService } from './docker-compose-postgresql.service';
import {
  DockerComposePostgresConfiguration,
  DockerComposePostgresEnvironments,
  DockerComposePostgresFeatureConfiguration,
  DockerComposePostgresFeatureEnvironments,
} from './docker-compose-postgresql.settings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalDockerComposePostgresModule: any;

const globalDockerComposePostgresService = {} as DockerComposePostgresService;
// todo: try refactor all in this file later
const globalDockerComposePostgresModuleInitStream = new Subject();

export const { DockerComposePostgreSQL } = createNestModule({
  moduleName: DOCKER_COMPOSE_POSTGRES_MODULE_NAME,
  moduleDescription:
    'PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)',
  globalEnvironmentsOptions: { skipValidation: true },
  globalConfigurationOptions: { skipValidation: true },
  staticConfigurationModel: DockerComposePostgresConfiguration,
  staticEnvironmentsModel: DockerComposePostgresEnvironments,
  featureEnvironmentsModel: DockerComposePostgresFeatureEnvironments,
  featureConfigurationModel: DockerComposePostgresFeatureConfiguration,
  sharedImports: [DockerCompose.forFeature({ featureModuleName: DOCKER_COMPOSE_POSTGRES_MODULE_NAME })],
  sharedProviders: [DockerComposePostgresService, DockerComposePostgresDatabaseService],
  wrapForFeatureAsync: (asyncModuleOptions) => {
    return {
      module: firstValueFrom(
        globalDockerComposePostgresModuleInitStream.pipe(
          concatMap(async () => globalDockerComposePostgresModule.forFeatureAsync(asyncModuleOptions))
        )
      ),
    };
  },
  preWrapApplication: async ({ project, modules, current }) => {
    if (!modules[NestModuleCategory.infrastructure]) {
      modules[NestModuleCategory.infrastructure] = [];
    }
    const networks =
      (project?.name
        ? current.staticConfiguration?.networks?.map((n) => ({
            ...n,
            name: kebabCase([project?.name, n.name, 'network'].filter(Boolean).join('-')),
          })) ?? [{ name: kebabCase(`${project?.name}-network`), driver: 'bridge' }]
        : current.staticConfiguration?.networks) ?? [];

    if (networks?.length === 0) {
      networks.push({ name: 'default-network', driver: 'bridge' });
    }
    const networkNames = networks?.map((n) => n.name);
    const serviceName = getDockerComposeServiceName(project?.name, DockerComposeServiceType.PostgreSQL);

    globalDockerComposePostgresModule = createNestModule({
      project,
      moduleName: DOCKER_COMPOSE_POSTGRES_MODULE_NAME,
      moduleDescription:
        'PostgreSQL (Postgres) is an open source object-relational database known for reliability and data integrity. ACID-compliant, it supports foreign keys, joins, views, triggers and stored procedures. (Generator for databases in docker-compose.yml for https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure/docker-compose)',
      moduleCategory: NestModuleCategory.infrastructure,
      staticConfigurationModel: DockerComposePostgresConfiguration,
      staticEnvironmentsModel: DockerComposePostgresEnvironments,
      featureEnvironmentsModel: DockerComposePostgresFeatureEnvironments,
      featureConfigurationModel: DockerComposePostgresFeatureConfiguration,
      globalEnvironmentsOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      globalConfigurationOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      providers: [
        DockerComposePostgresService,
        DockerComposePostgresDatabaseService,
        {
          provide: `DockerComposePostgresService_map_to_main`,
          useFactory: (dockerComposePostgresService) => {
            Object.setPrototypeOf(globalDockerComposePostgresService, dockerComposePostgresService);
            Object.assign(globalDockerComposePostgresService, dockerComposePostgresService);
          },
          inject: [DockerComposePostgresService],
        },
      ],
      imports: [
        ProjectUtils.forFeature({
          featureModuleName: DOCKER_COMPOSE_POSTGRES_MODULE_NAME,
          contextName: current.asyncModuleOptions.contextName,
        }),
        DockerCompose.forFeature({
          contextName: current.asyncModuleOptions.contextName,
          featureModuleName: constantCase(serviceName),
          featureConfiguration: {
            services: {
              [serviceName]: {
                image: current.staticConfiguration?.image,
                container_name: serviceName,
                volumes: [`${serviceName}-volume:/bitnami/postgresql`],
                ports: [`${current.staticConfiguration?.externalPort}:5432`],
                networks: networkNames,
                healthcheck: {
                  test: ['CMD-SHELL', 'pg_isready -U postgres'],
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
      ],
    }).DockerComposePostgreSQL;

    globalDockerComposePostgresModuleInitStream.next(true);

    modules[NestModuleCategory.infrastructure]!.push(
      globalDockerComposePostgresModule.forRootAsync(current.asyncModuleOptions)
    );
  },
});
