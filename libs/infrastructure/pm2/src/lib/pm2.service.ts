import {
  ApplicationPackageJsonService,
  DotEnvService,
  PackageJsonService,
  WrapApplicationOptionsService,
} from '@nestjs-mod/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { dirname } from 'path';
import { StartOptions } from 'pm2';
import { Pm2EcosystemConfigFileService } from './pm2-ecosystem-config-file.service';
import { Pm2Configuration } from './pm2.configuration';
import { DOTENV_VERSION, PM2_VERSION } from './pm2.constants';
import { Pm2Errors } from './pm2.errors';

const pm2ProdInfraCategoryName = 'pm2 prod infra';

@Injectable()
export class Pm2Service implements OnModuleInit {
  constructor(
    private readonly pm2Configuration: Pm2Configuration,
    private readonly dotEnvService: DotEnvService,
    private readonly pm2EcosystemConfigFileService: Pm2EcosystemConfigFileService,
    private readonly applicationPackageJsonService: ApplicationPackageJsonService,
    private readonly packageJsonService: PackageJsonService,
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService
  ) {}

  async onModuleInit() {
    await this.updatePm2EcosystemConfigFile();
    await this.updateEnvFile();
    await this.updatePackageJson();
    await this.updateApplicationPackageJson();
  }

  private async updatePackageJson() {
    const packageJson = await this.packageJsonService.read();
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    if (packageJson && packageJsonFilePath) {
      if (packageJson.scripts) {
        packageJson.scripts[pm2ProdInfraCategoryName] = {
          ...packageJson.scripts[pm2ProdInfraCategoryName],
          'pm2:start': `set -a && . .${(this.dotEnvService.getEnvFilePath() ?? '.env').replace(
            dirname(packageJsonFilePath),
            ''
          )} && set +a && ./node_modules/.bin/pm2 start .${this.pm2Configuration.ecosystemConfigFile.replace(
            dirname(packageJsonFilePath),
            ''
          )}`,
          'pm2:stop': `./node_modules/.bin/pm2 delete all`,
        };
      }
      if (!packageJson.dependencies) {
        packageJson.dependencies = {};
      }
      if (!packageJson.dependencies['pm2']) {
        packageJson.dependencies['pm2'] = `>=${PM2_VERSION}`;
      }
      if (!packageJson.dependencies['dotenv']) {
        packageJson.dependencies['dotenv'] = `>=${DOTENV_VERSION}`;
      }
      this.packageJsonService.write(packageJson);
    }
  }

  private async updateApplicationPackageJson() {
    const packageJson = await this.applicationPackageJsonService.read();
    if (packageJson) {
      if (!packageJson.dependencies) {
        packageJson.dependencies = {};
      }
      if (!packageJson.dependencies['pm2']) {
        packageJson.dependencies['pm2'] = `>=${PM2_VERSION}`;
      }
      if (!packageJson.dependencies['dotenv']) {
        packageJson.dependencies['dotenv'] = `>=${DOTENV_VERSION}`;
      }
      this.applicationPackageJsonService.write(packageJson);
    }
  }

  private async updatePm2EcosystemConfigFile() {
    const currentConfig = await this.pm2EcosystemConfigFileService.read();
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    if (!packageJsonFilePath) {
      throw new Pm2Errors('packageJsonFilePath not set');
    }
    const appName =
      this.wrapApplicationOptionsService?.project?.name ?? (await this.applicationPackageJsonService.read())?.name;
    const currentApp = {
      ...Object.entries(this.pm2Configuration)
        .filter(([key]) => key !== 'ecosystemConfigFile' && key !== 'applicationScriptFile')
        .reduce((all, [key, value]) => ({ ...all, [key]: value }), {}),
      name: appName,
      script: `node .${__filename.replace(dirname(packageJsonFilePath), '')}`,
    };
    currentConfig.apps = currentConfig.apps.map((app) => {
      if (app.name === appName) {
        return currentApp;
      }
      return app;
    }) as StartOptions[];
    if (!currentConfig.apps.some((app) => app.name === appName)) {
      currentConfig.apps.push(currentApp);
    }

    await this.pm2EcosystemConfigFileService.write(currentConfig);
  }

  private async updateEnvFile() {
    const keys = this.dotEnvService.keys();
    const existsEnvJson = await this.dotEnvService.read();
    if (existsEnvJson) {
      const newEnvJson = keys.reduce(
        (all, key) => ({ ...all, [String(key)]: existsEnvJson[key!] ? existsEnvJson[key!] : '' }),
        existsEnvJson
      );

      await this.dotEnvService.write(newEnvJson);
    }
  }
}
