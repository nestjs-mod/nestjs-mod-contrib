import { NxProjectJsonService, PackageJsonService, WrapApplicationOptionsService } from '@nestjs-mod/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { constantCase, upperCamelCase } from 'case-anything';
import { ConnectionString } from 'connection-string';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { FlywayError } from '../flyway-errors';
import { FlywayConfiguration } from '../flyway.configuration';
import { FlywayConfigFileService } from './flyway-config-file.service';
import { FLYWAY_SCRIPTS_CATEGORY_NAME } from './flyway-infrastructure.constants';

@Injectable()
export class FlywayInfrastructureUpdaterService implements OnModuleInit {
  constructor(
    private readonly packageJsonService: PackageJsonService,
    private readonly nxProjectJsonService: NxProjectJsonService,
    private readonly flywayConfiguration: FlywayConfiguration,
    private readonly flywayConfigFileService: FlywayConfigFileService,
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService
  ) {}

  onModuleInit() {
    this.update();
  }

  update() {
    this.updatePackageJsonFile();
    this.updateProjectJsonFile();
    this.updateFlywayConfigFile();
    this.createFirstMigrations();
  }

  private updatePackageJsonFile() {
    const projectJson = this.nxProjectJsonService.read(this.flywayConfiguration.nxProjectJsonFile);
    if (projectJson) {
      const projectName = projectJson.name;
      const packageJson = this.packageJsonService.read();
      if (packageJson) {
        this.packageJsonService.addScripts(
          FLYWAY_SCRIPTS_CATEGORY_NAME,
          {
            [`flyway:create:${projectName}`]: {
              commands: [`./node_modules/.bin/nx run ${projectName}:flyway-create-migration`],
              comments: [`Command to create new empty migration for ${projectName}`],
            },
            [`flyway:migrate:${projectName}`]: {
              commands: [`./node_modules/.bin/nx run ${projectName}:flyway-migrate`],
              comments: [`Applying migrations for ${projectName}`],
            },
            'flyway:migrate': {
              commands: ['./node_modules/.bin/nx run-many -t=flyway-migrate'],
              comments: ['Applying migrations of all applications and modules'],
            },
          },
          packageJson
        );

        this.packageJsonService.write(packageJson);
      }
    }
  }

  private updateProjectJsonFile() {
    if (!this.flywayConfiguration.configFile) {
      throw new FlywayError('flywayConfigFile not set');
    }
    const projectJson = this.nxProjectJsonService.read(this.flywayConfiguration.nxProjectJsonFile);
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    const nxProjectJsonFilePath =
      this.flywayConfiguration.nxProjectJsonFile || this.nxProjectJsonService.getNxProjectJsonFilePath();
    if (projectJson && packageJsonFilePath && nxProjectJsonFilePath) {
      const flywayConfigFilePath = this.flywayConfiguration.configFile.replace(dirname(packageJsonFilePath), '');
      const flywayMigrationsPath = this.flywayConfiguration.migrationsFolder.replace(dirname(packageJsonFilePath), '');

      const { databaseName } = this.getDbConnectionEnvKeys();
      // new migration
      this.nxProjectJsonService.addRunCommands(
        [`echo 'select 1;' > .${flywayMigrationsPath}/V\`date +%Y%m%d%H%M\`__NewMigration.sql`],
        'flyway-create-migration',
        undefined,
        this.flywayConfiguration.nxProjectJsonFile
      );
      // migrate
      this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} migrate`,
        ],
        'flyway-migrate',
        undefined,
        this.flywayConfiguration.nxProjectJsonFile
      );
      // info
      this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} info`,
        ],
        'flyway-info',
        undefined,
        this.flywayConfiguration.nxProjectJsonFile
      );
      // baseline
      this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} baseline`,
        ],
        'flyway-baseline',
        undefined,
        this.flywayConfiguration.nxProjectJsonFile
      );
      // validate
      this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} validate`,
        ],
        'flyway-validate',
        undefined,
        this.flywayConfiguration.nxProjectJsonFile
      );
      // repair
      this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} repair`,
        ],
        'flyway-repair',
        undefined,
        this.flywayConfiguration.nxProjectJsonFile
      );
    }
  }

  private updateFlywayConfigFile() {
    let flywayConfig = this.flywayConfigFileService.read();
    if (!flywayConfig) {
      flywayConfig = `
const { ConnectionString } = require('connection-string');
const cs = new ConnectionString(process.env.DATABASE_URL);
const {
  user: USERNAME,
  password: PASSWORD,
  HOST = cs.host,
  DATABASE = cs.path && cs.path[0],
  SCHEMA = cs.params && cs.params.schema,
  SCHEMAS = cs.params && cs.params.schemas,
} = cs;

module.exports = {
  flywayArgs: {
    url: \`jdbc:postgresql://\${HOST}/\${DATABASE}\`,
    schemas: SCHEMAS || SCHEMA,
    defaultSchema: SCHEMA,
    locations: \`filesystem:\${process.env.DATABASE_MIGRATIONS_LOCATIONS || 'migrations'}\`,
    user: USERNAME,
    password: PASSWORD,
    table: '__migrations',
    sqlMigrationSuffixes: '.sql',
    baselineOnMigrate: true
  },
  // Use to configure environment variables used by flyway
  env: {
    JAVA_ARGS: '-Djava.util.logging.config.file=./conf/logging.properties',
  },
  version: '10.1.0', // optional, empty or missing will download the latest
  mavinPlugins: [
    {
      // optional, use to add any plugins (ie. logging)
      groupId: 'org.slf4j',
      artifactId: 'slf4j-api',
      version: '1.7.36',
      // This can be a specifc url to download that may be different then the auto generated url.
      downloadUrl:
        'https://repo1.maven.org/maven2/org/slf4j/slf4j-api/1.7.36/slf4j-api-1.7.36.jar',
    },
    {
      groupId: 'org.slf4j',
      artifactId: 'slf4j-jdk14',
      version: '1.7.36',
    },
  ],
  downloads: {
    storageDirectory: \`\${__dirname}/tmp\`, // optional, the specific directory to store the flyway downloaded files. The directory must be writable by the node app process' user.
    expirationTimeInMs: -1, // optional, -1 will never check for updates, defaults to 1 day.
  },
};
`;
      this.flywayConfigFileService.write(flywayConfig);
    }
  }

  private createFirstMigrations() {
    const flywayFeatureName = this.flywayConfiguration.featureName
      ? upperCamelCase(this.flywayConfiguration.featureName)
      : '';
    const constantCaseFlywayFeatureName = this.flywayConfiguration.featureName
      ? constantCase(this.flywayConfiguration.featureName)
      : '';
    const migrationFileName = `V202401212130__Create${flywayFeatureName}User.sql`;
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    const firstMigrationFilePath = join(this.flywayConfiguration.migrationsFolder, migrationFileName);
    if (packageJsonFilePath) {
      try {
        if (!this.flywayConfiguration.migrationsFolder && !existsSync(this.flywayConfiguration.migrationsFolder)) {
          mkdirSync(this.flywayConfiguration.migrationsFolder, { recursive: true });

          const firstMigration = `-- CreateTable
          CREATE TABLE "${flywayFeatureName}User" (
              "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
              "externalUserId" UUID NOT NULL,
              "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          
              CONSTRAINT "PK_${constantCaseFlywayFeatureName}_USER" PRIMARY KEY ("id")
          );
          
          -- CreateIndex
          CREATE UNIQUE INDEX "UQ_${constantCaseFlywayFeatureName}_USER" ON "${flywayFeatureName}User"("externalUserId");
          `;
          if (!firstMigrationFilePath) {
            return;
          }
          const fileDir = dirname(firstMigrationFilePath);
          if (fileDir) {
            if (!existsSync(fileDir)) {
              mkdirSync(fileDir, { recursive: true });
            }
            writeFileSync(firstMigrationFilePath, firstMigration);
          }
        }
      } catch (err) {
        //
      }
    }
  }

  private getDbConnectionEnvKeys() {
    const concatedDatabaseName = [
      this.wrapApplicationOptionsService.project?.name,
      this.flywayConfiguration.featureName,
      'DATABASE_URL',
    ]
      .filter(Boolean)
      .join('_');

    const databaseName = this.flywayConfiguration.featureName
      ? `${constantCase(concatedDatabaseName)}`
      : `DATABASE_URL`;
    return { databaseName };
  }

  parseDatabaseUrl(databaseUrl: string): {
    USERNAME?: string;
    PASSWORD?: string;
    HOST?: string;
    DATABASE?: string;
    SCHEMA?: string;
    SCHEMAS?: string;
    PROTOCOL?: string;
    PORT?: number;
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
