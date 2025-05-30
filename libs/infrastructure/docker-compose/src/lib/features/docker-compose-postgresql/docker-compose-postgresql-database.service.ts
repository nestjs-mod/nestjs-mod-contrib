import {
  EnvModelInfoValidationsPropertyNameFormatters,
  InjectableFeatureConfigurationType,
  NxProjectJsonService,
  PackageJsonService,
  TModuleSettings,
  WrapApplicationOptionsService,
} from '@nestjs-mod/common';
import { Injectable, OnModuleInit, Optional } from '@nestjs/common';
import { ConnectionString } from 'connection-string';
import { DockerComposeServiceType, getDockerComposeServiceName } from '../../docker-compose.utils';
import { ManualDockerComposeFeatures } from '../../manual-docker-compose.service';
import {
  InjectDockerComposePostgresFeatures,
  InjectDockerComposePostgresModuleSettings,
} from './docker-compose-postgresql.decorators';
import { DockerComposePostgresService } from './docker-compose-postgresql.service';
import {
  DockerComposePostgresConfiguration,
  DockerComposePostgresFeatureConfiguration,
} from './docker-compose-postgresql.settings';

@Injectable()
export class DockerComposePostgresDatabaseService implements OnModuleInit {
  constructor(
    private readonly dockerComposePostgresService: DockerComposePostgresService,
    private readonly manualDockerComposeFeatures: ManualDockerComposeFeatures,
    private readonly dockerComposePostgresConfiguration: DockerComposePostgresConfiguration,
    @InjectDockerComposePostgresFeatures()
    private readonly dockerComposePostgresFeatureConfigurations: InjectableFeatureConfigurationType<DockerComposePostgresFeatureConfiguration>[],
    @InjectDockerComposePostgresModuleSettings()
    private readonly moduleSettings: TModuleSettings,
    @Optional()
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService,
    @Optional()
    private readonly nxProjectJsonService: NxProjectJsonService,
    @Optional()
    private readonly packageJsonService: PackageJsonService
  ) {}

  onModuleInit() {
    if (!this.wrapApplicationOptionsService) {
      return;
    }
    this.addManualDockerComposeFeatureConfiguration();
    this.updateNxProjectFile();
    this.updatePackageJsonFile();
  }

  private updateNxProjectFile() {
    const { featureDatabaseUrlEnvKeys, rootDatabaseUrlEnvKey } = this.getEnvKeys();

    for (let index = 0; index < featureDatabaseUrlEnvKeys.length; index++) {
      const featureDatabaseUrlEnvKey = featureDatabaseUrlEnvKeys[index];
      this.nxProjectJsonService.addRunCommands(
        featureDatabaseUrlEnvKey.databaseUrlEnvKeys
          .map(
            (databaseUrlEnvKey) =>
              `./node_modules/.bin/pg-create-db --force-change-username=true --force-change-password=true --root-database-url=\${${rootDatabaseUrlEnvKey}} --app-database-url=\${${databaseUrlEnvKey}}`
          )
          .flat(),
        'db-create',
        undefined,
        featureDatabaseUrlEnvKey.configuration?.nxProjectJsonFile
      );
    }

    this.nxProjectJsonService.addRunCommands(
      featureDatabaseUrlEnvKeys
        .filter((k) => !k.configuration)
        .map((featureDatabaseUrlEnvKey) =>
          featureDatabaseUrlEnvKey.databaseUrlEnvKeys.map(
            (databaseUrlEnvKey) =>
              `./node_modules/.bin/pg-create-db --force-change-username=true --force-change-password=true --root-database-url=\${${rootDatabaseUrlEnvKey}} --app-database-url=\${${databaseUrlEnvKey}}`
          )
        )
        .flat(),
      'db-create',
      undefined,
      this.dockerComposePostgresConfiguration.nxProjectJsonFile
    );
  }

  private addManualDockerComposeFeatureConfiguration() {
    const serviceName = getDockerComposeServiceName(
      this.wrapApplicationOptionsService.project?.name,
      DockerComposeServiceType.PostgreSQL
    );
    const root = this.parseDatabaseUrl(
      this.dockerComposePostgresService.getDockerComposePostgresEnvironments().rootDatabaseUrl
    );
    this.manualDockerComposeFeatures.addManualDockerComposeFeatureConfiguration({
      services: {
        [serviceName]: {
          environment: {
            POSTGRESQL_USERNAME: root.USERNAME || '',
            POSTGRESQL_PASSWORD: root.PASSWORD || '',
            POSTGRESQL_DATABASE: root.DATABASE || '',
          },
        },
      },
    });
  }

  private updatePackageJsonFile() {
    const packageJson = this.packageJsonService.read();
    if (packageJson) {
      this.packageJsonService.addScripts(
        'db',
        {
          'db:create': {
            commands: ['./node_modules/.bin/nx run-many -t=db-create'],
            comments: [`Creation all databases of applications and modules`],
          },
        },
        packageJson
      );
      if (!packageJson.devDependencies) {
        packageJson.devDependencies = {};
      }
      if (!packageJson.devDependencies['pg-create-db'] && !packageJson.dependencies?.['pg-create-db']) {
        packageJson.devDependencies['pg-create-db'] = '^1.1.5';
      }
      this.packageJsonService.write(packageJson);
    }
  }

  private getEnvKeys() {
    const rootDatabaseUrlEnvKey = this.moduleSettings.staticEnvironments?.validations[
      'rootDatabaseUrl'
    ]?.propertyNameFormatters
      .filter((f: EnvModelInfoValidationsPropertyNameFormatters) => f.name === 'dotenv')
      .map((f: EnvModelInfoValidationsPropertyNameFormatters) => f.value)
      .flat()[0];
    const featureDatabaseUrlEnvKeys = Object.entries(this.moduleSettings.featureModuleEnvironments ?? {}).map(
      ([featureModuleName, moduleSettingsList]) => {
        return {
          featureModuleName,
          configuration:
            this.dockerComposePostgresFeatureConfigurations.find((c) => c.featureModuleName === featureModuleName)
              ?.featureConfiguration || undefined,
          databaseUrlEnvKeys: moduleSettingsList
            .map((moduleSettings) =>
              moduleSettings?.validations['databaseUrl']?.propertyNameFormatters
                .filter((f: EnvModelInfoValidationsPropertyNameFormatters) => f.name === 'dotenv')
                .map((f: EnvModelInfoValidationsPropertyNameFormatters) => f.value)
                .flat()
            )
            .flat(),
        };
      }
    );
    return { featureDatabaseUrlEnvKeys, rootDatabaseUrlEnvKey };
  }

  parseDatabaseUrl(databaseUrl: string): {
    USERNAME?: string;
    PASSWORD?: string;
    HOST?: string;
    DATABASE?: string;
    SCHEMA?: string;
    SCHEMAS?: string;
    PORT?: number;
    PROTOCOL?: string;
  } {
    if (!databaseUrl) {
      return {};
    }
    try {
      const cs = new ConnectionString(databaseUrl);
      const USERNAME = cs.user;
      const PASSWORD = cs.password;
      const PORT = cs.port;
      const HOST = cs.hosts && cs.hosts[0].toString();
      const DATABASE = cs.path && cs.path[0];
      const SCHEMA = cs.params && cs.params['schema'];
      const SCHEMAS = cs.params && cs.params['schemas'];
      return { USERNAME, PASSWORD, HOST, DATABASE, SCHEMA, SCHEMAS, PORT, PROTOCOL: cs.protocol };
    } catch (error) {
      return {};
    }
  }
}
