import {
  DotEnvService,
  NxProjectJsonService,
  PackageJsonService,
  WrapApplicationOptionsService,
} from '@nestjs-mod/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { constantCase, kebabCase, upperCamelCase } from 'case-anything';
import { ConnectionString } from 'connection-string';
import { dirname } from 'path';
import { PrismaError } from '../prisma-errors';
import { PrismaConfiguration } from '../prisma.configuration';
import { PrismaEnvironments } from '../prisma.environments';
import { PRISMA_SCRIPTS_CATEGORY_NAME } from './prisma-infrastructure.constants';
import { PrismaSchemaFileService } from './prisma-schema-file.service';

@Injectable()
export class PrismaInfrastructureUpdaterService implements OnModuleInit {
  constructor(
    private readonly packageJsonService: PackageJsonService,
    private readonly nxProjectJsonService: NxProjectJsonService,
    private readonly prismaConfiguration: PrismaConfiguration,
    private readonly prismaEnvironments: PrismaEnvironments,
    private readonly prismaSchemaFileService: PrismaSchemaFileService,
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService,
    private readonly dotEnvService: DotEnvService
  ) {}

  async onModuleInit() {
    await this.update();
  }

  async update() {
    this.updatePackageJsonFile();
    this.updateProjectJsonFile();
    this.updatePrismaSchemaFile();
    await this.updateDotEnvFile();
  }

  private updatePackageJsonFile() {
    const projectJson = this.nxProjectJsonService.read(this.prismaConfiguration.nxProjectJsonFile);
    if (projectJson) {
      const projectName = projectJson.name;
      const packageJson = this.packageJsonService.read();
      if (packageJson) {
        this.packageJsonService.addScripts(
          PRISMA_SCRIPTS_CATEGORY_NAME,
          {
            [`prisma:pull:${projectName}`]: {
              commands: [`./node_modules/.bin/nx run ${projectName}:prisma-pull`],
              comments: [`Generating a prisma schema based on a database for ${projectName}`],
            },
            'prisma:pull': {
              commands: ['./node_modules/.bin/nx run-many -t=prisma-pull'],
              comments: ['Generating a prisma schema based on a database'],
            },
            'prisma:generate': {
              commands: ['./node_modules/.bin/nx run-many -t=prisma-generate'],
              comments: ['Generation of client prisma schema of all applications and modules'],
            },
          },
          packageJson
        );
        if (this.prismaConfiguration.addMigrationScripts) {
          this.packageJsonService.addScripts(
            PRISMA_SCRIPTS_CATEGORY_NAME,
            {
              [`prisma:migrate-dev-new:${projectName}`]: {
                commands: [`./node_modules/.bin/nx run ${projectName}:prisma-migrate-dev --create-only --name=new`],
                comments: [`Command to create new empty migration for ${projectName}`],
              },
              [`prisma:migrate-dev:${projectName}`]: {
                commands: [`./node_modules/.bin/nx run ${projectName}:prisma-migrate-dev --create-only`],
                comments: [
                  `Alias for create new migration for ${projectName} (example: \`npm run prisma:migrate-dev:${projectName} --name=new)\``,
                ],
              },
              [`prisma:migrate-deploy:${projectName}`]: {
                commands: [`./node_modules/.bin/nx run ${projectName}:prisma-migrate-deploy`],
                comments: [`Applying migrations for ${projectName}`],
              },
              'prisma:migrate-deploy': {
                commands: ['./node_modules/.bin/nx run-many -t=prisma-migrate-deploy'],
                comments: ['Applying migrations of all applications and modules'],
              },
            },
            packageJson
          );
        }

        this.packageJsonService.write(packageJson);
      }
    }
  }

  private updateProjectJsonFile() {
    if (!this.prismaConfiguration.schemaFile) {
      throw new PrismaError('prismaSchemaFile not set');
    }
    const projectJson = this.nxProjectJsonService.read(this.prismaConfiguration.nxProjectJsonFile);
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    if (projectJson && packageJsonFilePath) {
      const prismaSchemaFilePath = this.prismaConfiguration.schemaFile.replace(dirname(packageJsonFilePath), '');
      // generate
      this.nxProjectJsonService.addRunCommands(
        [`./node_modules/.bin/prisma generate --schema=.${prismaSchemaFilePath}`],
        undefined,
        prismaSchemaFilePath,
        this.prismaConfiguration.nxProjectJsonFile
      );
      this.nxProjectJsonService.addRunCommands(
        [`./node_modules/.bin/prisma generate --schema=.${prismaSchemaFilePath}`],
        'prisma-generate',
        prismaSchemaFilePath,
        this.prismaConfiguration.nxProjectJsonFile
      );

      // pull
      this.nxProjectJsonService.addRunCommands(
        [
          `./node_modules/.bin/prisma db pull --schema=.${prismaSchemaFilePath}`,
          ...(this.prismaConfiguration.previewFeatures?.includes('typedSql')
            ? [`./node_modules/.bin/prisma generate --schema=.${prismaSchemaFilePath} --sql`]
            : []),
        ],
        'prisma-pull',
        prismaSchemaFilePath,
        this.prismaConfiguration.nxProjectJsonFile
      );

      if (this.prismaConfiguration.addMigrationScripts) {
        // add

        const commands = (projectJson.targets?.['db-create']?.options?.['commands'] || []) as string[];
        for (const command of commands) {
          // "./node_modules/.bin/rucken postgres --force-change-username=true --force-change-password=true --root-database-url=${PRISMA_ROOT_DATABASE_URL} --app-database-url=${PRISMA_PRISMA_USER_DATABASE_URL}"
          const rootDatabaseName = command.split('--root-database-url=${')[1].split('}')[0];
          const appDatabaseName = command.split('--app-database-url=${')[1].split('}')[0];

          if (!appDatabaseName.includes('SHADOW_DATABASE_URL')) {
            // update db-create command
            const SHADOW_DATABASE_URL = appDatabaseName.replace('_DATABASE_URL', '_SHADOW_DATABASE_URL');
            this.nxProjectJsonService.addRunCommands(
              [
                `./node_modules/.bin/rucken postgres --force-change-username=true --force-change-password=true --root-database-url=\${${rootDatabaseName}} --app-database-url=\${${SHADOW_DATABASE_URL}}`,
              ],
              'db-create',
              undefined,
              this.prismaConfiguration.nxProjectJsonFile
            );
          }
        }
        // migrate-dev
        this.nxProjectJsonService.addRunCommands(
          [`./node_modules/.bin/prisma migrate dev --schema=.${prismaSchemaFilePath}`],
          'prisma-migrate-dev',
          prismaSchemaFilePath,
          this.prismaConfiguration.nxProjectJsonFile
        );

        // migrate-deploy
        this.nxProjectJsonService.addRunCommands(
          [`./node_modules/.bin/prisma migrate deploy --schema=.${prismaSchemaFilePath}`],
          'prisma-migrate-deploy',
          prismaSchemaFilePath,
          this.prismaConfiguration.nxProjectJsonFile
        );
      }
    }
  }

  private async updateDotEnvFile() {
    if (this.prismaConfiguration.addMigrationScripts) {
      const { databaseName, shadowDatabaseName } = this.getDbConnectionEnvKeys();
      // update env file
      const envs = this.dotEnvService.read(false, true);
      if (envs?.[databaseName] && !envs[shadowDatabaseName]) {
        const parsed = this.parseDatabaseUrl(envs[databaseName] || '');
        delete envs['# shadow database, need for create migrations from diff of old and new schema content'];
        envs['# shadow database, need for create migrations from diff of old and new schema content'] = '';
        envs[shadowDatabaseName] = envs[databaseName]?.replace(`/${parsed.DATABASE}?`, `/shadow_${parsed.DATABASE}?`);
        await this.dotEnvService.write(envs, true);
      }
    }
  }

  private updatePrismaSchemaFile() {
    let prismaSchema = this.prismaSchemaFileService.read();

    if (!prismaSchema) {
      const { databaseName, shadowDatabaseName } = this.getDbConnectionEnvKeys();
      const prismaFeatureName = this.prismaConfiguration.featureName
        ? upperCamelCase(this.prismaConfiguration.featureName)
        : '';
      const constantCasePrismaFeatureName = this.prismaConfiguration.featureName
        ? constantCase(this.prismaConfiguration.featureName)
        : '';

      prismaSchema = `generator client {
  provider = "prisma-client-js"
  ${this.prismaConfiguration.engineType ? `engineType = "${this.prismaConfiguration.engineType}"` : ''}
  output   = "${this.getPathToRootFromPrismaSchemaFile()}/node_modules/@prisma/client"
  ${
    (this.prismaConfiguration.binaryTargets || []).length > 0
      ? `binaryTargets = ${JSON.stringify(this.prismaConfiguration.binaryTargets)}`
      : ''
  }
  ${
    (this.prismaConfiguration.previewFeatures || []).length > 0
      ? `previewFeatures = ${JSON.stringify(this.prismaConfiguration.previewFeatures)}`
      : ''
  }
}

datasource db {
  provider          = "postgresql"
  url               = env("${databaseName}")
  shadowDatabaseUrl = env("${shadowDatabaseName}")
}

model ${prismaFeatureName}User {
  id             String   @id(map: "PK_${constantCasePrismaFeatureName}_USER") @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  externalUserId String   @unique(map: "UQ_${constantCasePrismaFeatureName}_USER") @db.Uuid
  createdAt      DateTime @default(now()) @db.Timestamp(6)
  updatedAt      DateTime @default(now()) @db.Timestamp(6)
}
`;
    }
    if (this.prismaConfiguration.customSchemaContent) {
      const clean = (s: string) => s.split(' ').join('').split('\n').join('');
      if (
        this.prismaConfiguration.customSchemaContent &&
        !clean(prismaSchema).includes(clean(this.prismaConfiguration.customSchemaContent))
      ) {
        prismaSchema = `${prismaSchema}\n${this.prismaConfiguration.customSchemaContent}`;
      }
    }

    const generatorArr = prismaSchema.split('generator client {');
    const afterRemoveGenerator = (generatorArr[0] || '') + (generatorArr[1].split('}').slice(1).join('}') || '');

    const datasourceArr = afterRemoveGenerator.split('datasource db {');

    const afterRemoveDatasource = (datasourceArr[0] || '') + (datasourceArr[1].split('}').slice(1).join('}') || '');

    const clientNodeJSModuleName = this.prismaConfiguration.featureName
      ? `@prisma/${kebabCase(this.prismaConfiguration.featureName)}-client`
      : `@prisma/client`;

    const newGenerator = `generator client {
  provider = "prisma-client-js"
  ${this.prismaConfiguration.engineType ? `engineType = "${this.prismaConfiguration.engineType}"` : ''}
  output   = "${this.getPathToRootFromPrismaSchemaFile()}/node_modules/${clientNodeJSModuleName}"
  ${
    (this.prismaConfiguration.binaryTargets || []).length > 0
      ? `binaryTargets = ${JSON.stringify(this.prismaConfiguration.binaryTargets)}`
      : ''
  }
  ${
    (this.prismaConfiguration.previewFeatures || []).length > 0
      ? `previewFeatures = ${JSON.stringify(this.prismaConfiguration.previewFeatures)}`
      : ''
  }
}`;

    const { databaseName, shadowDatabaseName } = this.getDbConnectionEnvKeys();

    const connectionString = this.parseDatabaseUrl(this.prismaEnvironments.databaseUrl);

    const newDatasource = `datasource db {
  provider          = "${connectionString.PROTOCOL || 'postgresql'}"
  url               = env("${databaseName}")${
      this.prismaConfiguration.addMigrationScripts
        ? `
  shadowDatabaseUrl = env("${shadowDatabaseName}")`
        : ''
    }
}`;

    this.prismaSchemaFileService.write(
      [newGenerator, newDatasource, afterRemoveDatasource].join('\n').split('\n\n\n').join('\n')
    );
  }

  private getPathToRootFromPrismaSchemaFile(): string {
    const packageJsonFilePath = this.packageJsonService.getPackageJsonFilePath();
    const prismaSchemaFilePath = this.prismaSchemaFileService.getPrismaSchemaFilePath();
    return prismaSchemaFilePath
      .replace(dirname(packageJsonFilePath || ''), '')
      .split('/')
      .slice(2)
      .map(() => '..')
      .join('/');
  }

  private getDbConnectionEnvKeys() {
    const concatedDatabaseName = [
      this.wrapApplicationOptionsService.project?.name,
      this.prismaConfiguration.featureName,
      'DATABASE_URL',
    ]
      .filter(Boolean)
      .join('_');
    const concatedShadowDatabaseName = [
      this.wrapApplicationOptionsService.project?.name,
      this.prismaConfiguration.featureName,
      'SHADOW_DATABASE_URL',
    ]
      .filter(Boolean)
      .join('_');

    const databaseName = this.prismaConfiguration.featureName
      ? `${constantCase(concatedDatabaseName)}`
      : `DATABASE_URL`;
    const shadowDatabaseName = this.prismaConfiguration.featureName
      ? `${constantCase(concatedShadowDatabaseName)}`
      : `SHADOW_DATABASE_URL`;
    return { databaseName, shadowDatabaseName };
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
