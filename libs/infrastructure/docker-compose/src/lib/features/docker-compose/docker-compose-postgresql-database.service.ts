import {
  EnvModelInfoValidationsPropertyNameFormatters,
  NxProjectJsonService,
  PackageJsonService,
  TModuleSettings,
  WrapApplicationOptionsService,
} from '@nestjs-mod/common';
import { Injectable, OnModuleInit, Optional } from '@nestjs/common';
import { ConnectionString } from 'connection-string';
import { DockerComposeServiceType, getDockerComposeServiceName } from '../../docker-compose.utils';
import { ManualDockerComposeFeatures } from '../../manual-docker-compose.service';
import { InjectDockerComposePostgresModuleSettings } from './docker-compose-postgresql.decorators';
import { DockerComposePostgresService } from './docker-compose-postgresql.service';

@Injectable()
export class DockerComposePostgresDatabaseService implements OnModuleInit {
  constructor(
    private readonly dockerComposePostgresService: DockerComposePostgresService,
    private readonly manualDockerComposeFeatures: ManualDockerComposeFeatures,
    @InjectDockerComposePostgresModuleSettings()
    private readonly moduleSettings: TModuleSettings,
    @Optional()
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService,
    @Optional()
    private readonly nxProjectJsonService: NxProjectJsonService,
    @Optional()
    private readonly packageJsonService: PackageJsonService
  ) {}

  async onModuleInit() {
    if (!this.wrapApplicationOptionsService) {
      return;
    }
    this.addManualDockerComposeFeatureConfiguration();
    await this.updateNxProjectFile();
    await this.updatePackageJsonFile();
  }

  private async updateNxProjectFile() {
    const { featureDatabaseUrlEnvKeys, rootDatabaseUrlEnvKey } = this.getEnvKeys();

    await this.nxProjectJsonService.addRunCommands(
      featureDatabaseUrlEnvKeys
        .map((featureDatabaseUrlEnvKey) =>
          featureDatabaseUrlEnvKey.databaseUrlEnvKeys.map(
            (databaseUrlEnvKey) =>
              `./node_modules/.bin/rucken postgres --force-change-username=true --force-change-password=true --root-database-url=\${${rootDatabaseUrlEnvKey}} --app-database-url=\${${databaseUrlEnvKey}}`
          )
        )
        .flat(),
      'db-create'
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

  private async updatePackageJsonFile() {
    const packageJson = (await this.packageJsonService.read()) ?? {};
    if (!packageJson?.scripts) {
      packageJson.scripts = {};
    }
    if (!packageJson?.scripts?.['db']) {
      packageJson.scripts['db'] = {};
    }
    if (!packageJson.scripts['db']['db:create']) {
      packageJson.scripts['db']['db:create'] = 'npm run nx:many -- -t=db-create';
    }
    this.packageJsonService.write(packageJson);
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
