import { NxProjectJsonService, PackageJsonService, WrapApplicationOptionsService } from '@nestjs-mod/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { constantCase, upperCamelCase } from 'case-anything';
import { ConnectionString } from 'connection-string';
import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
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

  async onModuleInit() {
    await this.update();
  }

  async update() {
    await this.updatePackageJsonFile();
    await this.updateProjectJsonFile();
    await this.updateFlywayConfigFile();
    await this.createFirstMigrations();
  }

  private async updatePackageJsonFile() {
    const projectJson = await this.nxProjectJsonService.read();
    if (projectJson) {
      const projectName = projectJson.name;
      const packageJson = await this.packageJsonService.read();
      if (packageJson) {
        this.packageJsonService.addScripts(
          FLYWAY_SCRIPTS_CATEGORY_NAME,
          {
            [`flyway:create:${projectName}`]: {
              commands: [`npm run nx -- run ${projectName}:flyway-create-migration`],
              comments: [`Command to create new empty migration for ${projectName}`],
            },
            [`flyway:migrate:${projectName}`]: {
              commands: [`npm run nx -- run ${projectName}:flyway-migrate`],
              comments: [`Applying migrations for ${projectName}`],
            },
          },
          packageJson
        );

        await this.packageJsonService.write(packageJson);
      }
    }
  }

  private async updateProjectJsonFile() {
    if (!this.flywayConfiguration.flywayConfigFile) {
      throw new FlywayError('flywayConfigFile not set');
    }
    const projectJson = await this.nxProjectJsonService.read();
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    const nxProjectJsonFilePath = this.nxProjectJsonService.getNxProjectJsonFilePath();
    if (projectJson && packageJsonFilePath && nxProjectJsonFilePath) {
      const flywayConfigFilePath = this.flywayConfiguration.flywayConfigFile.replace(dirname(packageJsonFilePath), '');
      const flywayMigrationsPath = this.flywayConfiguration.flywayMigrationsFolder.replace(
        dirname(packageJsonFilePath),
        ''
      );

      const { databaseName } = this.getDbConnectionEnvKeys();
      // new migration
      await this.nxProjectJsonService.addRunCommands(
        [`echo 'select 1;' > .${flywayMigrationsPath}/V\`date +%Y%m%d%H%M\`__NewMigration.sql`],
        'flyway-create-migration'
      );
      // migrate
      await this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} migrate`,
        ],
        'flyway-migrate'
      );
      // info
      await this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} info`,
        ],
        'flyway-info'
      );
      // baseline
      await this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} baseline`,
        ],
        'flyway-baseline'
      );
      // validate
      await this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} validate`,
        ],
        'flyway-validate'
      );
      // repair
      await this.nxProjectJsonService.addRunCommands(
        [
          `export DATABASE_URL=\${${databaseName}} && export DATABASE_MIGRATIONS_LOCATIONS=.${flywayMigrationsPath} && ./node_modules/.bin/flyway -c .${flywayConfigFilePath} repair`,
        ],
        'flyway-repair'
      );
    }
  }

  private async updateFlywayConfigFile() {
    if (!this.flywayConfiguration.flywayFeatureName) {
      throw new FlywayError('flywayFeatureName not set');
    }
    let flywayConfig = await this.flywayConfigFileService.read();
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
      await this.flywayConfigFileService.write(flywayConfig);
    }
  }

  private async createFirstMigrations() {
    if (!this.flywayConfiguration.flywayFeatureName) {
      throw new FlywayError('flywayFeatureName not set');
    }
    const flywayFeatureName = upperCamelCase(this.flywayConfiguration.flywayFeatureName);
    const constantCaseFlywayFeatureName = constantCase(this.flywayConfiguration.flywayFeatureName);
    const migrationFileName = `V202401212130__Create${flywayFeatureName}User.sql`;
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    const firstMigrationFilePath = join(this.flywayConfiguration.flywayMigrationsFolder, migrationFileName);
    if (packageJsonFilePath) {
      let firstMigration: string = '';
      try {
        if (!existsSync(this.flywayConfiguration.flywayMigrationsFolder)) {
          await mkdir(this.flywayConfiguration.flywayMigrationsFolder, { recursive: true });
        }
        firstMigration = (await readFile(firstMigrationFilePath)).toString();
      } catch (err) {
        //
      }
      if (!firstMigration) {
        firstMigration = `-- CreateTable
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
        if (!existsSync(fileDir)) {
          await mkdir(fileDir, { recursive: true });
        }
        await writeFile(firstMigrationFilePath, firstMigration);
      }
    }
  }

  private getDbConnectionEnvKeys() {
    if (!this.flywayConfiguration.flywayFeatureName) {
      throw new FlywayError('flywayFeatureName not set');
    }
    const concatedDatabaseName = [
      this.wrapApplicationOptionsService.project?.name,
      this.flywayConfiguration.flywayFeatureName,
      'DATABASE_URL',
    ].join('_');

    const databaseName = this.flywayConfiguration.flywayFeatureName
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
