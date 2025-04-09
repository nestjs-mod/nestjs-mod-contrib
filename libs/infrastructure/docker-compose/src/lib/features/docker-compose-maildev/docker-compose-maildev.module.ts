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
import { DOCKER_COMPOSE_MAILDEV_MODULE_NAME } from './docker-compose-maildev.constants';
import { DockerComposeMaildevConfiguration, DockerComposeMaildevEnvironments } from './docker-compose-maildev.settings';

export const { DockerComposeMaildev } = createNestModule({
  moduleName: DOCKER_COMPOSE_MAILDEV_MODULE_NAME,
  moduleDescription:
    'MailDev is a simple way to test your projects generated email during development, with an easy to use web interface that runs on your machine. (Generator for maildev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
  globalEnvironmentsOptions: { skipValidation: true },
  globalConfigurationOptions: { skipValidation: true },
  staticConfigurationModel: DockerComposeMaildevConfiguration,
  staticEnvironmentsModel: DockerComposeMaildevEnvironments,
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
    const dockerComposeMaildevModule = createNestModule({
      project,
      moduleName: DOCKER_COMPOSE_MAILDEV_MODULE_NAME,
      moduleDescription:
        'MailDev is a simple way to test your projects generated email during development, with an easy to use web interface that runs on your machine. (Generator for maildev in docker-compose.yml for https://www.npmjs.com/package/@nestjs-mod/docker-compose)',
      moduleCategory: NestModuleCategory.infrastructure,
      globalEnvironmentsOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      globalConfigurationOptions: { name: project?.name, skipValidation: isInfrastructureMode() },
      staticConfigurationModel: DockerComposeMaildevConfiguration,
      staticEnvironmentsModel: DockerComposeMaildevEnvironments,
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
        const serviceName = getDockerComposeServiceName(project?.name, DockerComposeServiceType.Maildev);

        return [
          ProjectUtils.forFeature({
            featureModuleName: DOCKER_COMPOSE_MAILDEV_MODULE_NAME,
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
                  ports: [
                    `${staticConfiguration?.smtpPort}:${staticConfiguration?.smtpPort}`,
                    `${staticConfiguration?.webPort}:${staticConfiguration?.webPort}`,
                  ],
                  networks: networkNames,
                  environment: {
                    ...(staticConfiguration.smtpPort ? { MAILDEV_SMTP_PORT: staticConfiguration.smtpPort } : {}),
                    ...(staticConfiguration.webPort ? { MAILDEV_WEB_PORT: staticConfiguration.webPort } : {}),
                    ...(staticEnvironments.maildevMailDirectory
                      ? { MAILDEV_MAIL_DIRECTORY: staticEnvironments.maildevMailDirectory }
                      : {}),
                    ...(staticEnvironments.maildevHttps ? { MAILDEV_HTTPS: staticEnvironments.maildevHttps } : {}),
                    ...(staticEnvironments.maildevHttpsKey
                      ? { MAILDEV_HTTPS_KEY: staticEnvironments.maildevHttpsKey }
                      : {}),
                    ...(staticEnvironments.maildevHttpsCert
                      ? { MAILDEV_HTTPS_CERT: staticEnvironments.maildevHttpsCert }
                      : {}),
                    ...(staticEnvironments.maildevIp ? { MAILDEV_IP: staticEnvironments.maildevIp } : {}),
                    ...(staticEnvironments.maildevOutgoingHost
                      ? { MAILDEV_OUTGOING_HOST: staticEnvironments.maildevOutgoingHost }
                      : {}),
                    ...(staticEnvironments.maildevOutgoingPort
                      ? { MAILDEV_OUTGOING_PORT: staticEnvironments.maildevOutgoingPort }
                      : {}),
                    ...(staticEnvironments.maildevOutgoingPass
                      ? { MAILDEV_OUTGOING_PASS: staticEnvironments.maildevOutgoingPass }
                      : {}),
                    ...(staticEnvironments.maildevOutgoingSecure
                      ? { MAILDEV_OUTGOING_SECURE: staticEnvironments.maildevOutgoingSecure }
                      : {}),
                    ...(staticEnvironments.maildevAutoRelay
                      ? { MAILDEV_AUTO_RELAY: staticEnvironments.maildevAutoRelay }
                      : {}),
                    ...(staticEnvironments.maildevAutoRelayRules
                      ? { MAILDEV_AUTO_RELAY_RULES: staticEnvironments.maildevAutoRelayRules }
                      : {}),
                    ...(staticEnvironments.maildevIncomingUser
                      ? { MAILDEV_INCOMING_USER: staticEnvironments.maildevIncomingUser }
                      : {}),
                    ...(staticEnvironments.maildevIncomingPass
                      ? { MAILDEV_INCOMING_PASS: staticEnvironments.maildevIncomingPass }
                      : {}),
                    ...(staticEnvironments.maildevIncomingSecure
                      ? { MAILDEV_INCOMING_SECURE: staticEnvironments.maildevIncomingSecure }
                      : {}),
                    ...(staticEnvironments.maildevIncomingCert
                      ? { MAILDEV_INCOMING_CERT: staticEnvironments.maildevIncomingCert }
                      : {}),
                    ...(staticEnvironments.maildevIncomingKey
                      ? { MAILDEV_INCOMING_KEY: staticEnvironments.maildevIncomingKey }
                      : {}),
                    ...(staticEnvironments.maildevWebIp ? { MAILDEV_WEB_IP: staticEnvironments.maildevWebIp } : {}),
                    ...(staticEnvironments.maildevWebUser
                      ? { MAILDEV_WEB_USER: staticEnvironments.maildevWebUser }
                      : {}),
                    ...(staticEnvironments.maildevWebPass
                      ? { MAILDEV_WEB_PASS: staticEnvironments.maildevWebPass }
                      : {}),
                    ...(staticEnvironments.maildevBasePathname
                      ? { MAILDEV_BASE_PATHNAME: staticEnvironments.maildevBasePathname }
                      : {}),
                    ...(staticEnvironments.maildevDisableWeb
                      ? { MAILDEV_DISABLE_WEB: staticEnvironments.maildevDisableWeb }
                      : {}),
                    ...(staticEnvironments.maildevHideExtensions
                      ? { MAILDEV_HIDE_EXTENSIONS: staticEnvironments.maildevHideExtensions }
                      : {}),
                  },
                  keysOfEnvironmentsWithStaticValue: [
                    'featureName',
                    'image',
                    'networks',
                    'smtpPort',
                    'webPort',
                  ] as (keyof DockerComposeMaildevConfiguration)[],
                  healthcheck: {
                    test: 'wget -O - http://localhost:${MAILDEV_WEB_PORT}${MAILDEV_BASE_PATHNAME}/healthz || exit 1',
                    interval: '10s',
                    timeout: '5s',
                    retries: 5,
                  },
                  tty: true,
                  restart: 'always',
                },
              },
              networks: networks.reduce((all, cur) => ({ ...all, [cur.name]: { driver: cur.driver } }), {}),
            },
          }),
        ];
      },
    }).DockerComposeMaildev;

    modules[NestModuleCategory.infrastructure]!.push(
      dockerComposeMaildevModule.forRootAsync(current.asyncModuleOptions)
    );
  },
});
