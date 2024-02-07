import { ApplicationPackageJsonService, PackageJsonService, WrapApplicationOptionsService } from '@nestjs-mod/common';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { dirname } from 'path';
import { StartOptions } from 'pm2';
import { Pm2EcosystemConfigFileService } from './pm2-ecosystem-config-file.service';
import { Pm2Configuration } from './pm2.configuration';
import { PM2_PROD_INFRA_CATEGORY_NAME } from './pm2.constants';

@Injectable()
export class Pm2Service implements OnApplicationBootstrap {
  constructor(
    private readonly pm2Configuration: Pm2Configuration,
    private readonly pm2EcosystemConfigFileService: Pm2EcosystemConfigFileService,
    private readonly applicationPackageJsonService: ApplicationPackageJsonService,
    private readonly packageJsonService: PackageJsonService,
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService
  ) {}

  onApplicationBootstrap() {
    this.updatePm2EcosystemConfigFile();
    this.updatePackageJson();
  }

  private updatePackageJson() {
    const packageJson = this.packageJsonService.read();
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    if (packageJson && packageJsonFilePath) {
      const ecosystemConfigFilePath = this.pm2Configuration.ecosystemConfigFile.replace(
        dirname(packageJsonFilePath),
        ''
      );
      if (packageJson.scripts) {
        this.packageJsonService.addScripts(
          PM2_PROD_INFRA_CATEGORY_NAME,
          {
            'pm2:start': {
              commands: [`./node_modules/.bin/pm2 start .${ecosystemConfigFilePath}`],
              comments: ['Launch all applications in PM2 mode'],
            },
            'pm2:stop': {
              commands: [`./node_modules/.bin/pm2 delete all`],
              comments: ['Stop all applications in PM2 mode'],
            },
          },
          packageJson
        );
      }
      this.packageJsonService.write(packageJson);
    }
  }

  private updatePm2EcosystemConfigFile() {
    const currentConfig = this.pm2EcosystemConfigFileService.read();
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    if (!packageJsonFilePath) {
      return;
    }
    const appName =
      this.wrapApplicationOptionsService?.project?.name ?? this.applicationPackageJsonService.read()?.name;
    const currentApp = {
      ...Object.entries(this.pm2Configuration)
        .filter(([key]) => key !== 'ecosystemConfigFile' && key !== 'applicationScriptFile')
        .reduce((all, [key, value]) => ({ ...all, [key]: value }), {}),
      name: appName,
      script: `node ./${this.pm2Configuration.applicationScriptFile.replace(dirname(packageJsonFilePath), '')}`,
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

    this.pm2EcosystemConfigFileService.write(currentConfig);
  }
}
