import { GitignoreService, PackageJsonService, merge } from '@nestjs-mod/common';
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
    private readonly dockerComposeFeatureConfigurations: Record<string, DockerComposeFeatureConfiguration[]>,
    private readonly dockerComposeConfiguration: DockerComposeConfiguration,
    private readonly manualDockerComposeFeatures: ManualDockerComposeFeatures,
    private readonly dockerComposeFileService: DockerComposeFileService,
    private readonly packageJsonService: PackageJsonService,
    private readonly gitignoreService: GitignoreService
  ) {}

  async onApplicationBootstrap() {
    await this.createDockerComposeFile();
    await this.updatePackageJson();
    await this.gitignoreService.addGitIgnoreEntry([basename(this.dockerComposeConfiguration.dockerComposeFile)]);
  }

  private async createDockerComposeFile() {
    const featureServices = Object.entries(this.dockerComposeFeatureConfigurations)
      .map(([, services]) => services)
      .reduce((all, cur) => ({ ...all, ...cur.reduce((curAll, curCur) => merge(curAll, curCur), {}) }), {});
    const manualServices = this.manualDockerComposeFeatures
      .getManualDockerComposeFeatureConfigurations()
      .reduce((all, cur) => merge(all, cur), {});
    const bothServices = merge(
      { version: this.dockerComposeConfiguration.dockerComposeFileVersion },
      merge(featureServices, manualServices)
    );
    await this.dockerComposeFileService.write(bothServices);

    // example

    const dockerComposeExampleFilePath = this.dockerComposeFileService
      .getDockerComposeFilePath()
      .replace('.yml', '-example.yml')
      .replace('/-example.yml', '/example.yml');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existsServices: any = (await this.dockerComposeFileService.readFile(dockerComposeExampleFilePath)) ?? {};

    const sampleBothServices = { ...bothServices };

    for (const key of Object.keys(sampleBothServices.services)) {
      for (const envKey of Object.keys(sampleBothServices.services[key].environment)) {
        sampleBothServices.services[key].environment[envKey] =
          existsServices?.services?.[key]?.environment?.[envKey] ?? snakeCase(`value_for_${key}`);
      }
    }
    await this.dockerComposeFileService.writeFile(
      dockerComposeExampleFilePath,
      sampleBothServices,
      '# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.'
    );
  }

  private async updatePackageJson() {
    const packageJson = await this.packageJsonService.read();
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    if (packageJson && packageJsonFilePath) {
      const dockerComposeFilePath = this.dockerComposeConfiguration.dockerComposeFile.replace(
        dirname(packageJsonFilePath),
        ''
      );
      if (packageJson.scripts) {
        packageJson.scripts[DOCKER_COMPOSE_INFRA_CATEGORY_NAME] = {
          ...packageJson.scripts[DOCKER_COMPOSE_INFRA_CATEGORY_NAME],
          'docker-compose:start': `export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f .${dockerComposeFilePath} --compatibility up -d`,
          'docker-compose:stop': `export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f .${dockerComposeFilePath} down`,
        };
      }
      this.packageJsonService.write(packageJson);
    }
  }
}
