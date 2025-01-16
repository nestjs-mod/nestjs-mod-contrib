import { NxProjectJsonService, PackageJsonService, WrapApplicationOptionsService } from '@nestjs-mod/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { snakeCase, constantCase, upperCamelCase } from 'case-anything';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { PgFlywayConfiguration } from '../pg-flyway.configuration';
import { PG_FLYWAY_SCRIPTS_CATEGORY_NAME } from './pg-flyway-infrastructure.constants';

@Injectable()
export class PgFlywayInfrastructureUpdaterService implements OnModuleInit {
  constructor(
    private readonly packageJsonService: PackageJsonService,
    private readonly nxProjectJsonService: NxProjectJsonService,
    private readonly pgFlywayConfiguration: PgFlywayConfiguration,
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService
  ) {}

  onModuleInit() {
    this.update();
  }

  update() {
    this.updatePackageJsonFile();
    this.updateProjectJsonFile();
    this.createFirstMigrations();
  }

  private updatePackageJsonFile() {
    const projectJson = this.nxProjectJsonService.read(this.pgFlywayConfiguration.nxProjectJsonFile);
    if (projectJson) {
      const projectName = projectJson.name;
      const packageJson = this.packageJsonService.read();
      if (packageJson) {
        this.packageJsonService.addScripts(
          PG_FLYWAY_SCRIPTS_CATEGORY_NAME,
          {
            [`pg-flyway:create:${projectName}`]: {
              commands: [`./node_modules/.bin/nx run ${projectName}:pg-flyway-create-migration`],
              comments: [
                `Command to create new empty migration for ${projectName}, for set name pass name to --args, example: npm run pg-flyway:create:appname --args=Init`,
              ],
            },
            [`pg-flyway:migrate:${projectName}`]: {
              commands: [`./node_modules/.bin/nx run ${projectName}:pg-flyway-migrate`],
              comments: [`Applying migrations for ${projectName}`],
            },
            'pg-flyway:migrate': {
              commands: ['./node_modules/.bin/nx run-many -t=pg-flyway-migrate'],
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
    const projectJson = this.nxProjectJsonService.read(this.pgFlywayConfiguration.nxProjectJsonFile);
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    const nxProjectJsonFilePath =
      this.pgFlywayConfiguration.nxProjectJsonFile || this.nxProjectJsonService.getNxProjectJsonFilePath();
    if (projectJson && packageJsonFilePath && nxProjectJsonFilePath) {
      const pgFlywayMigrationsPath = this.pgFlywayConfiguration.migrationsFolder.replace(
        dirname(packageJsonFilePath),
        ''
      );

      const { databaseName } = this.getDbConnectionEnvKeys();
      // new migration
      this.nxProjectJsonService.addRunCommands(
        [
          `export PG_FLYWAY_DATABASE_URL=\${${databaseName}} && export PG_FLYWAY_HISTORY_TABLE=__migrations_${snakeCase(
            projectJson.name || ''
          )} && export PG_FLYWAY_LOCATIONS=.${pgFlywayMigrationsPath} && ./node_modules/.bin/pg-flyway create --name=\${npm_config_args:-NewMigration}`,
        ],
        'pg-flyway-create-migration',
        undefined,
        this.pgFlywayConfiguration.nxProjectJsonFile
      );
      // migrate
      this.nxProjectJsonService.addRunCommands(
        [
          `export PG_FLYWAY_DATABASE_URL=\${${databaseName}} && export PG_FLYWAY_HISTORY_TABLE=__migrations_${snakeCase(
            projectJson.name || ''
          )} && export PG_FLYWAY_LOCATIONS=.${pgFlywayMigrationsPath} && ./node_modules/.bin/pg-flyway migrate`,
        ],
        'pg-flyway-migrate',
        undefined,
        this.pgFlywayConfiguration.nxProjectJsonFile
      );
      // info
      this.nxProjectJsonService.addRunCommands(
        [
          `export PG_FLYWAY_DATABASE_URL=\${${databaseName}} && export PG_FLYWAY_HISTORY_TABLE=__migrations_${snakeCase(
            projectJson.name || ''
          )} && export PG_FLYWAY_LOCATIONS=.${pgFlywayMigrationsPath} && ./node_modules/.bin/pg-flyway info`,
        ],
        'pg-flyway-info',
        undefined,
        this.pgFlywayConfiguration.nxProjectJsonFile
      );
      // baseline
      this.nxProjectJsonService.addRunCommands(
        [
          `export PG_FLYWAY_DATABASE_URL=\${${databaseName}} && export PG_FLYWAY_HISTORY_TABLE=__migrations_${snakeCase(
            projectJson.name || ''
          )} && export PG_FLYWAY_LOCATIONS=.${pgFlywayMigrationsPath} && ./node_modules/.bin/pg-flyway baseline`,
        ],
        'pg-flyway-baseline',
        undefined,
        this.pgFlywayConfiguration.nxProjectJsonFile
      );
      // validate
      this.nxProjectJsonService.addRunCommands(
        [
          `export PG_FLYWAY_DATABASE_URL=\${${databaseName}} && export PG_FLYWAY_HISTORY_TABLE=__migrations_${snakeCase(
            projectJson.name || ''
          )} && export PG_FLYWAY_LOCATIONS=.${pgFlywayMigrationsPath} && ./node_modules/.bin/pg-flyway validate`,
        ],
        'pg-flyway-validate',
        undefined,
        this.pgFlywayConfiguration.nxProjectJsonFile
      );
      // repair
      this.nxProjectJsonService.addRunCommands(
        [
          `export PG_FLYWAY_DATABASE_URL=\${${databaseName}} && export PG_FLYWAY_HISTORY_TABLE=__migrations_${snakeCase(
            projectJson.name || ''
          )} && export PG_FLYWAY_LOCATIONS=.${pgFlywayMigrationsPath} && ./node_modules/.bin/pg-flyway repair`,
        ],
        'pg-flyway-repair',
        undefined,
        this.pgFlywayConfiguration.nxProjectJsonFile
      );
    }
  }

  private createFirstMigrations() {
    const pgFlywayFeatureName = this.pgFlywayConfiguration.featureName
      ? upperCamelCase(this.pgFlywayConfiguration.featureName)
      : '';
    const constantCasePgFlywayFeatureName = this.pgFlywayConfiguration.featureName
      ? constantCase(this.pgFlywayConfiguration.featureName)
      : '';
    const migrationFileName = `V202401212130__Create${pgFlywayFeatureName}User.sql`;
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    const firstMigrationFilePath = join(this.pgFlywayConfiguration.migrationsFolder, migrationFileName);
    if (packageJsonFilePath) {
      try {
        const firstMigration = `-- CreateTable
          CREATE TABLE "${pgFlywayFeatureName}User" (
              "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
              "externalUserId" UUID NOT NULL,
              "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
              "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          
              CONSTRAINT "PK_${constantCasePgFlywayFeatureName}_USER" PRIMARY KEY ("id")
          );
          
          -- CreateIndex
          CREATE UNIQUE INDEX "UQ_${constantCasePgFlywayFeatureName}_USER" ON "${pgFlywayFeatureName}User"("externalUserId");
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
      } catch (err) {
        //
      }
    }
  }

  private getDbConnectionEnvKeys() {
    const concatedDatabaseName = [
      this.wrapApplicationOptionsService.project?.name,
      this.pgFlywayConfiguration.featureName,
      'DATABASE_URL',
    ]
      .filter(Boolean)
      .join('_');

    const databaseName = this.pgFlywayConfiguration.featureName
      ? `${constantCase(concatedDatabaseName)}`
      : `DATABASE_URL`;
    return { databaseName };
  }
}
