import {
  ApplicationPackageJsonService,
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
import { DOCKER_COMPOSE_INFRA_CATEGORY_NAME } from './docker-compose.constants';
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
    private readonly gitignoreService: GitignoreService
  ) {}

  onApplicationBootstrap() {
    this.createDockerComposeFile();
    this.updatePackageJson();
    this.gitignoreService.addGitIgnoreEntry([basename(this.dockerComposeConfiguration.dockerComposeFile)]);
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

    const bothServicesWithEnvs = { ...bothServices };
    for (const key of Object.keys(bothServicesWithEnvs.services)) {
      for (const envKey of Object.keys(bothServicesWithEnvs.services[key].environment)) {
        bothServicesWithEnvs.services[key].environment[envKey] =
          bothServicesWithEnvs?.services?.[key]?.environment?.[envKey] || snakeCase(`value_for_${envKey}`);
      }
    }
    this.dockerComposeFileService.write(bothServicesWithEnvs);

    // example

    const dockerComposeExampleFilePath = this.dockerComposeFileService
      .getDockerComposeFilePath()
      .replace('.yml', '-example.yml')
      .replace('/-example.yml', '/example.yml');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existsServices: any = this.dockerComposeFileService.readFile(dockerComposeExampleFilePath) ?? {};

    const sampleBothServices = { ...bothServices };

    for (const key of Object.keys(sampleBothServices.services)) {
      for (const envKey of Object.keys(sampleBothServices.services[key].environment)) {
        sampleBothServices.services[key].environment[envKey] =
          existsServices?.services?.[key]?.environment?.[envKey] || snakeCase(`value_for_${envKey}`);
      }
    }
    this.dockerComposeFileService.writeFile(
      dockerComposeExampleFilePath,
      sampleBothServices,
      '# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.'
    );
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
        } else {
          this.packageJsonService.addScripts(
            DOCKER_COMPOSE_INFRA_CATEGORY_NAME,
            {
              [`docker-compose:start:${applicationPackageJson?.name}`]: {
                commands: [
                  `export COMPOSE_INTERACTIVE_NO_CLI=1`,
                  `docker-compose -f .${dockerComposeFilePath} --compatibility up -d`,
                ],
                comments: [`Running the docker-compose infrastructure for ${applicationPackageJson?.name}`],
              },
              [`docker-compose:stop:${applicationPackageJson?.name}`]: {
                commands: [`export COMPOSE_INTERACTIVE_NO_CLI=1`, `docker-compose -f .${dockerComposeFilePath} down`],
                comments: [`Stopping the docker-compose infrastructure for ${applicationPackageJson?.name}`],
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
