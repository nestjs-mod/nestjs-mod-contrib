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
import { DockerComposeNginx } from '../docker-compose-nginx/docker-compose-nginx.module';
import { DOCKER_COMPOSE_MINIO_MODULE_NAME } from './docker-compose-minio.constants';
import { DockerComposeMinioConfiguration, DockerComposeMinioEnvironments } from './docker-compose-minio.settings';

export const { DockerComposeMinio } = createNestModule({
  moduleName: DOCKER_COMPOSE_MINIO_MODULE_NAME,
  moduleDescription:
    'MinIO is a high-performance, S3 compatible object storage. (Generator for minio in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
  globalEnvironmentsOptions: { skipValidation: true },
  globalConfigurationOptions: { skipValidation: true },
  staticConfigurationModel: DockerComposeMinioConfiguration,
  staticEnvironmentsModel: DockerComposeMinioEnvironments,
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

    const staticConfiguration = current.staticConfiguration;

    if (staticConfiguration?.nginxBucketsLocations && staticConfiguration.nginxPort) {
      const dockerComposeNginx = DockerComposeNginx.forRoot({
        staticConfiguration: {
          ports: { [staticConfiguration.nginxPort]: staticConfiguration.nginxPort },
          dependsOnServiceNames: { [DockerComposeServiceType.Minio]: 'service_started' },
          configFolder: staticConfiguration.nginxConfigFolder ? staticConfiguration.nginxConfigFolder : undefined,
          logsFolder: staticConfiguration.nginxLogsFolder ? staticConfiguration.nginxLogsFolder : undefined,
          configContent: `
      map $sent_http_content_type $expires {
        "text/html" epoch;
        "text/html; charset=utf-8" epoch;
        default off;
    }
    
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    
    server {
        listen ${staticConfiguration.nginxPort};
        server_name localhost;
    
        gzip on;
        gzip_proxied any;
        gzip_types text/plain application/xml text/css application/javascript application/json;
        gzip_min_length 1000;
        gzip_vary on;
        gzip_disable "MSIE [1-6]\\.(?!.*SV1)";
    
        client_max_body_size 50m;
        proxy_connect_timeout 3600s;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
        send_timeout 3600s;
    
        proxy_max_temp_file_size 0;
    
  ${staticConfiguration.nginxBucketsLocations
    .map(
      (nginxBucketsLocation) => `      location /${nginxBucketsLocation} {
            proxy_set_header Host localhost:9000;
            proxy_set_header Origin $http_origin;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            rewrite ^/${nginxBucketsLocation}/(.*)$ /$1 break;
            proxy_pass http://%${DockerComposeServiceType.Minio}%:9000;
            proxy_http_version 1.1;
            proxy_set_header Accept-Language $http_accept_language;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }`
    )
    .join('\n')} 
        ${staticConfiguration.nginxConfigContent ? staticConfiguration.nginxConfigContent : ''}   
    }
      `,
        },
      });

      modules[NestModuleCategory.infrastructure]!.push(dockerComposeNginx);
    }

    const dockerComposeMinioModule = createNestModule({
      project,
      moduleName: DOCKER_COMPOSE_MINIO_MODULE_NAME,
      moduleDescription:
        'MinIO is a high-performance, S3 compatible object storage. (Generator for minio in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
      moduleCategory: NestModuleCategory.infrastructure,
      globalEnvironmentsOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      globalConfigurationOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      staticConfigurationModel: DockerComposeMinioConfiguration,
      staticEnvironmentsModel: DockerComposeMinioEnvironments,
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
        const serviceName = getDockerComposeServiceName(project?.name, DockerComposeServiceType.Minio);

        return [
          ProjectUtils.forFeature({
            featureModuleName: DOCKER_COMPOSE_MINIO_MODULE_NAME,
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
                  volumes: [`${serviceName}-volume:/bitnami/minio/data`],
                  ports: [
                    `${staticConfiguration?.externalPort}:9000`,
                    `${staticConfiguration?.externalConsolePort}:9001`,
                  ],
                  networks: networkNames,
                  environment: {
                    ...(staticEnvironments?.minioRootUser
                      ? {
                          MINIO_ROOT_USER: staticEnvironments?.minioRootUser,
                        }
                      : {}),
                    ...(staticEnvironments?.minioRootPassword
                      ? {
                          MINIO_ROOT_PASSWORD: staticEnvironments?.minioRootPassword,
                        }
                      : {}),
                  },
                  healthcheck: {
                    test: ['CMD-SHELL', 'mc', 'ready', 'local'],
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
    }).DockerComposeMinio;
    modules[NestModuleCategory.infrastructure]!.push(dockerComposeMinioModule.forRootAsync(current.asyncModuleOptions));
  },
});
