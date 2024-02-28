import { NestModuleCategory, ProjectUtils, createNestModule, isInfrastructureMode } from '@nestjs-mod/common';
import { constantCase, kebabCase } from 'case-anything';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DockerCompose } from '../../docker-compose.module';
import { DockerComposeServiceType, getDockerComposeServiceName } from '../../docker-compose.utils';
import { DOCKER_COMPOSE_NGINX_MODULE_NAME } from './docker-compose-nginx.constants';
import { DockerComposeNginxConfiguration } from './docker-compose-nginx.settings';

export const { DockerComposeNginx } = createNestModule({
  moduleName: DOCKER_COMPOSE_NGINX_MODULE_NAME,
  moduleDescription:
    'Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. (Generator for nginx in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
  globalEnvironmentsOptions: { skipValidation: true },
  globalConfigurationOptions: { skipValidation: true },
  staticConfigurationModel: DockerComposeNginxConfiguration,
  preWrapApplication: async ({ project, modules, current }) => {
    if (!modules[NestModuleCategory.infrastructure]) {
      modules[NestModuleCategory.infrastructure] = [];
    }
    const dockerComposeNginxModule = createNestModule({
      project,
      moduleName: DOCKER_COMPOSE_NGINX_MODULE_NAME,
      moduleDescription:
        'Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. (Generator for nginx in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
      moduleCategory: NestModuleCategory.infrastructure,
      globalEnvironmentsOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      globalConfigurationOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      staticConfigurationModel: DockerComposeNginxConfiguration,
      imports: ({ contextName, project, staticConfiguration }) => {
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
        const serviceName = getDockerComposeServiceName(project?.name, DockerComposeServiceType.Nginx);
        const kebabServiceName = kebabCase(serviceName);

        let configContent = staticConfiguration.configContent || '';

        const ports = Object.entries(staticConfiguration?.ports || {}).map(([, port]) => port);
        for (let i = 0; i <= ports.length; i++) {
          configContent = configContent.replace(new RegExp(`%port${i + 1}%`, 'ig'), String(ports[i]));
        }

        for (const serviceName of Object.keys(staticConfiguration.dependsOnServiceNames || {})) {
          configContent = configContent.replace(
            new RegExp(`%${serviceName}%`, 'ig'),
            getDockerComposeServiceName(project?.name, serviceName)
          );
        }

        const keys = Object.keys(process.env);

        for (const key of keys) {
          configContent = configContent.replace(new RegExp(`%${key}%`, 'ig'), process.env[key] || '');
        }

        if (staticConfiguration.configFolder) {
          if (!existsSync(staticConfiguration.configFolder)) {
            mkdirSync(staticConfiguration.configFolder, { recursive: true });
          }

          writeFileSync(join(staticConfiguration.configFolder, `${kebabServiceName}-nginx.conf`), configContent);
        }

        return [
          ProjectUtils.forFeature({
            featureModuleName: DOCKER_COMPOSE_NGINX_MODULE_NAME,
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
                  volumes: [
                    staticConfiguration.configFolder ? `${staticConfiguration.configFolder}:/etc/nginx/conf.d` : '',
                    staticConfiguration.logsFolder ? `${staticConfiguration.logsFolder}:/var/log/nginx/` : '',
                  ].filter(Boolean),
                  ports: Object.entries(staticConfiguration.ports || {}).map(([key, value]) => `${key}:${value}`),
                  networks: networkNames,
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
    }).DockerComposeNginx;

    modules[NestModuleCategory.infrastructure]!.push(dockerComposeNginxModule.forRootAsync(current.asyncModuleOptions));
  },
});
