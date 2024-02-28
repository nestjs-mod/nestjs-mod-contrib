import {
  ApplicationPackageJsonService,
  DotEnvService,
  GitignoreService,
  InjectableFeatureConfigurationType,
  PackageJsonService,
  merge,
} from '@nestjs-mod/common';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { snakeCase } from 'case-anything';
import { basename, dirname } from 'path';
import { DockerComposeFileService } from './docker-compose-file.service';
import { DockerComposeConfiguration } from './docker-compose.configuration';
import {
  DOCKER_COMPOSE_INFRA_CATEGORY_NAME,
  DOCKER_COMPOSE_PROD_INFRA_CATEGORY_NAME,
} from './docker-compose.constants';
import { InjectAllDockerComposeFeatures } from './docker-compose.decorators';
import { DockerComposeFeatureConfiguration } from './docker-compose.feature-configuration';
import { ManualDockerComposeFeatures } from './manual-docker-compose.service';

@Injectable()
export class DockerComposeBootstrapService implements OnApplicationBootstrap {
  constructor(
    @InjectAllDockerComposeFeatures()
    private readonly dockerComposeFeatureConfigurations: Record<
      string,
      InjectableFeatureConfigurationType<DockerComposeFeatureConfiguration>[]
    >,
    private readonly dockerComposeConfiguration: DockerComposeConfiguration,
    private readonly manualDockerComposeFeatures: ManualDockerComposeFeatures,
    private readonly dockerComposeFileService: DockerComposeFileService,
    private readonly packageJsonService: PackageJsonService,
    private readonly applicationPackageJsonService: ApplicationPackageJsonService,
    private readonly gitignoreService: GitignoreService,
    private readonly dotEnvService: DotEnvService
  ) {}

  onApplicationBootstrap() {
    this.createDockerComposeFile();
    this.updatePackageJson();
    const { dockerComposeProdEnvFilePath } = this.getFilesPathes();
    this.gitignoreService.addGitIgnoreEntry([
      basename(this.dockerComposeConfiguration.dockerComposeFile),
      basename(dockerComposeProdEnvFilePath),
      'access.log',
      'error.log',
    ]);
  }

  private createDockerComposeFile() {
    const featureServices = Object.entries(this.dockerComposeFeatureConfigurations)
      .map(([, services]) => services)
      .reduce(
        (all, cur) => ({ ...all, ...cur.reduce((curAll, curCur) => merge(curAll, curCur.featureConfiguration), {}) }),
        {}
      );
    const manualServices = this.manualDockerComposeFeatures
      .getManualDockerComposeFeatureConfigurations()
      .reduce((all, cur) => merge(all, cur), {});
    const bothServices = merge(
      { version: this.dockerComposeConfiguration.dockerComposeFileVersion },
      merge(featureServices, manualServices)
    );

    const { dockerComposeExampleFilePath, dockerComposeProdFilePath, dockerComposeProdEnvFilePath } =
      this.getFilesPathes();

    const bothServicesWithEnvs = { ...bothServices };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lines: Record<string, any> = this.dotEnvService.readFile(dockerComposeProdEnvFilePath, false) || {};

    for (const serviceName of Object.keys(bothServicesWithEnvs.services)) {
      let writeTitle = true;
      for (const envKey of Object.keys(bothServicesWithEnvs.services[serviceName].environment || {})) {
        let value =
          bothServicesWithEnvs?.services?.[serviceName]?.environment?.[envKey] || snakeCase(`value_for_${envKey}`);
        value = typeof value === 'string' || typeof value === 'number' || !value ? value : String(value);

        const keys = Object.keys(process.env);

        if (value) {
          for (const key of keys) {
            value = String(value).replace(new RegExp(`%${key}%`, 'ig'), process.env[key] || '');
          }
        }

        bothServicesWithEnvs.services[serviceName].environment[envKey] = value;
        if (writeTitle) {
          delete lines[`# ${serviceName} (generated)`];
          lines[`# ${serviceName} (generated)`] = '';
          writeTitle = false;
        }
        lines[envKey] = value;
      }
    }

    this.dockerComposeFileService.write(bothServicesWithEnvs);

    // example

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existsServices: any = this.dockerComposeFileService.readFile(dockerComposeExampleFilePath) ?? {};

    const sampleBothServices = { ...bothServices };

    for (const key of Object.keys(sampleBothServices.services)) {
      for (const envKey of Object.keys(sampleBothServices.services[key].environment || {})) {
        if (!sampleBothServices.services![key].environment) {
          sampleBothServices.services![key].environment = {};
        }
        sampleBothServices.services[key].environment[envKey] =
          existsServices?.services?.[key]?.environment?.[envKey] || snakeCase(`value_for_${envKey}`);
      }
    }
    this.dockerComposeFileService.writeFile(
      dockerComposeExampleFilePath,
      sampleBothServices,
      '# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.'
    );

    // prod

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existsProdServices = this.dockerComposeFileService.readFile(dockerComposeExampleFilePath) ?? {};

    const sampleBothProdServices = { ...existsProdServices };

    for (const key of Object.keys(sampleBothProdServices.services || {})) {
      for (const envKey of Object.keys(sampleBothProdServices.services?.[key].environment || {})) {
        if (!sampleBothProdServices.services![key].environment) {
          sampleBothProdServices.services![key].environment = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sampleBothProdServices.services as any)[key].environment[envKey] = `\${${envKey}}`;
      }
    }
    this.dockerComposeFileService.writeFile(
      dockerComposeProdFilePath,
      sampleBothProdServices,
      '# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.'
    );

    this.dotEnvService.writeFile(dockerComposeProdEnvFilePath, lines);
  }

  private getFilesPathes() {
    const dockerComposeExampleFilePath = this.dockerComposeFileService
      .getDockerComposeFilePath()
      .replace('.yml', '-example.yml')
      .replace('/-example.yml', '/example.yml');
    const dockerComposeProdFilePath =
      this.dockerComposeConfiguration.prodDockerComposeFile ||
      this.dockerComposeFileService
        .getDockerComposeFilePath()

        .replace('.yml', '-prod.yml')
        .replace('/-prod.yml', '/prod.yml');
    const dockerComposeProdEnvFilePath =
      this.dockerComposeConfiguration.prodDockerComposeEnvFile ||
      this.dockerComposeFileService
        .getDockerComposeFilePath()
        .replace('.yml', '-prod.env')
        .replace('/-prod.env', '/prod.env');
    return { dockerComposeExampleFilePath, dockerComposeProdFilePath, dockerComposeProdEnvFilePath };
  }

  private updatePackageJson() {
    const packageJson = this.packageJsonService.read();
    const applicationPackageJson = this.applicationPackageJsonService.read();
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    if (packageJson && packageJsonFilePath) {
      const dockerComposeFilePath = this.dockerComposeConfiguration.dockerComposeFile.replace(
        dirname(packageJsonFilePath),
        ''
      );
      let { dockerComposeProdFilePath, dockerComposeProdEnvFilePath } = this.getFilesPathes();

      dockerComposeProdFilePath = dockerComposeProdFilePath.replace(dirname(packageJsonFilePath), '');
      dockerComposeProdEnvFilePath = dockerComposeProdEnvFilePath.replace(dirname(packageJsonFilePath), '');

      if (packageJson.scripts) {
        if (dirname(packageJsonFilePath.replace(dirname(packageJsonFilePath), '')) === dirname(dockerComposeFilePath)) {
          this.packageJsonService.addScripts(
            DOCKER_COMPOSE_INFRA_CATEGORY_NAME,
            {
              [`docker-compose:start`]: {
                commands: [
                  `export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f .${dockerComposeFilePath} --compatibility up -d`,
                ],
                comments: ['Running the main docker-compose infrastructure'],
              },
              [`docker-compose:stop`]: {
                commands: [`export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f .${dockerComposeFilePath} down`],
                comments: ['Stopping the main docker-compose infrastructure'],
              },
            },
            packageJson
          );
          this.packageJsonService.addScripts(
            DOCKER_COMPOSE_PROD_INFRA_CATEGORY_NAME,
            {
              [`docker-compose:start-prod`]: {
                commands: [
                  `export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f .${dockerComposeProdFilePath} --env-file .${dockerComposeProdEnvFilePath} --compatibility up -d`,
                ],
                comments: ['Running the main docker-compose prod infrastructure'],
              },
              [`docker-compose:stop-prod`]: {
                commands: [
                  `export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f .${dockerComposeProdFilePath} --env-file .${dockerComposeProdEnvFilePath} down`,
                ],
                comments: ['Stopping the main docker-compose prod infrastructure'],
              },
            },
            packageJson
          );
        } else {
          this.packageJsonService.addScripts(
            DOCKER_COMPOSE_INFRA_CATEGORY_NAME,
            {
              [`docker-compose:start:${applicationPackageJson?.name}`]: {
                commands: [
                  `export COMPOSE_INTERACTIVE_NO_CLI=1`,
                  `docker compose -f .${dockerComposeFilePath} --compatibility up -d`,
                ],
                comments: [`Running the docker-compose infrastructure for ${applicationPackageJson?.name}`],
              },
              [`docker-compose:stop:${applicationPackageJson?.name}`]: {
                commands: [`export COMPOSE_INTERACTIVE_NO_CLI=1`, `docker compose -f .${dockerComposeFilePath} down`],
                comments: [`Stopping the docker-compose infrastructure for ${applicationPackageJson?.name}`],
              },
            },
            packageJson
          );
          this.packageJsonService.addScripts(
            DOCKER_COMPOSE_PROD_INFRA_CATEGORY_NAME,
            {
              [`docker-compose:start-prod:${applicationPackageJson?.name}`]: {
                commands: [
                  `export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f .${dockerComposeProdFilePath} --env-file .${dockerComposeProdEnvFilePath} --compatibility up -d`,
                ],
                comments: [`Running the main docker-compose prod infrastructure for ${applicationPackageJson?.name}`],
              },
              [`docker-compose:stop-prod:${applicationPackageJson?.name}`]: {
                commands: [
                  `export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f .${dockerComposeProdFilePath} --env-file .${dockerComposeProdEnvFilePath} down`,
                ],
                comments: [`Stopping the main docker-compose prod infrastructure for ${applicationPackageJson?.name}`],
              },
            },
            packageJson
          );
        }
      }
      this.packageJsonService.write(packageJson);
    }
  }
}
