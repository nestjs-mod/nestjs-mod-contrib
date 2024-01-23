import { NxProjectJsonService, PackageJsonService, WrapApplicationOptionsService } from '@nestjs-mod/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { constantCase, kebabCase } from 'case-anything';
import { ConnectionString } from 'connection-string';
import { PrismaConfiguration } from '../prisma.configuration';
import { PrismaEnvironments } from '../prisma.environments';
import { PRISMA_SCRIPTS_CATEGORY_NAME } from './prisma-infrastructure.constants';
import { PrismaSchemaFileService } from './prisma-schema-file.service';
import { prismaJsVersion } from './prisma-versions';

@Injectable()
export class PrismaInfrastructureUpdaterService implements OnModuleInit {
  constructor(
    private readonly packageJsonService: PackageJsonService,
    private readonly nxProjectJsonService: NxProjectJsonService,
    private readonly prismaConfiguration: PrismaConfiguration,
    private readonly prismaEnvironments: PrismaEnvironments,
    private readonly prismaSchemaFileService: PrismaSchemaFileService,
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService
  ) {}

  async onModuleInit() {
    await this.update();
  }

  async update() {
    await this.updatePackageJsonFile();
    await this.updateProjectJsonFile();
    await this.updatePrismaSchemaFile();
  }

  private async updatePackageJsonFile() {
    const data = (await this.packageJsonService.read()) ?? {};
    if (!data.scripts) {
      data.scripts = {};
    }
    if (!data.scripts[PRISMA_SCRIPTS_CATEGORY_NAME]) {
      data.scripts[PRISMA_SCRIPTS_CATEGORY_NAME] = {};
    }
    if (this.prismaConfiguration.addMigrationScripts) {
      data.scripts[PRISMA_SCRIPTS_CATEGORY_NAME] = {
        'prisma:migrate-dev-new': 'npm run nx -- prisma-migrate-dev --name=new',
        'prisma:migrate-dev': 'npm run nx -- prisma-migrate-dev',
        'prisma:migrate-deploy': 'npm run nx:many -- -t=prisma-migrate-deploy',
        ...data.scripts[PRISMA_SCRIPTS_CATEGORY_NAME],
      };
    }
    data.scripts[PRISMA_SCRIPTS_CATEGORY_NAME] = {
      'prisma:pull': 'npm run nx:many -- -t=prisma-pull',
      'prisma:generate': 'npm run nx:many -- -t=prisma-generate',
      ...data.scripts[PRISMA_SCRIPTS_CATEGORY_NAME],
    };

    if (!data.dependencies) {
      data.dependencies = {};
    }
    if (!data.dependencies['@prisma/client']) {
      data.dependencies['@prisma/client'] = prismaJsVersion;
    }

    if (!data.devDependencies) {
      data.devDependencies = {};
    }
    if (!data.dependencies['@prisma/client']) {
      data.dependencies['prisma'] = prismaJsVersion;
    }

    await this.packageJsonService.write(data);
  }

  private async updateProjectJsonFile() {
    // generate
    await this.nxProjectJsonService.addRunCommands([
      './node_modules/.bin/prisma generate --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma',
    ]);
    await this.nxProjectJsonService.addRunCommands(
      ['./node_modules/.bin/prisma generate --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma'],
      'prisma-generate'
    );

    // pull
    await this.nxProjectJsonService.addRunCommands(
      ['./node_modules/.bin/prisma db pull --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma'],
      'prisma-pull'
    );

    if (this.prismaConfiguration.addMigrationScripts) {
      // migrate-dev
      await this.nxProjectJsonService.addRunCommands(
        ['./node_modules/.bin/prisma migrate dev --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma'],
        'prisma-migrate-dev'
      );

      // migrate-deploy
      await this.nxProjectJsonService.addRunCommands(
        [
          './node_modules/.bin/prisma migrate deploy --schema=./apps/example-prisma/src/prisma/prisma-user-schema.prisma',
        ],
        'prisma-migrate-deploy'
      );
    }
  }

  private async updatePrismaSchemaFile() {
    let prismaSchema = await this.prismaSchemaFileService.read();
    if (!prismaSchema) {
      prismaSchema = `generator client {
  provider = "prisma-client-js"
  engineType = "binary"
  output   = "../../../../node_modules/@prisma/client"
}

datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}

model PrismaUser {
  /// @TypeGraphQL.omit(input: ["create", "orderBy"])
  id             String   @id(map: "PK_PRISMA_USER") @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  externalUserId String   @unique(map: "UQ_PRISMA_USER") @db.Uuid
  /// @TypeGraphQL.omit(input: ["create", "update"])
  createdAt      DateTime @default(now()) @db.Timestamp(6)
  /// @TypeGraphQL.omit(input: ["create", "update"])
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

    const clientNodeJSModuleName = this.prismaConfiguration.prismaFeatureName
      ? `@prisma/${kebabCase(this.prismaConfiguration.prismaFeatureName)}-client`
      : `@prisma/client`;

    const newGenerator = `generator client {
  provider = "prisma-client-js"
  engineType = "binary"
  output   = "../../../../node_modules/${clientNodeJSModuleName}"
}`;

    const concatedDatabaseName = [
      this.wrapApplicationOptionsService.project?.name,
      this.prismaConfiguration.prismaFeatureName,
      'DATABASE_URL',
    ].join('_');
    const databaseName = this.prismaConfiguration.prismaFeatureName
      ? `${constantCase(concatedDatabaseName)}`
      : `DATABASE_URL`;
    const shadowDatabaseName = this.prismaConfiguration.prismaFeatureName
      ? `${constantCase(concatedDatabaseName)}_SHADOW_DATABASE_URL`
      : `SHADOW_DATABASE_URL`;

    const connectionString = this.parseDatabaseUrl(this.prismaEnvironments.databaseUrl);

    const newDatasource = `datasource db {
  provider          = "${connectionString.PROTOCOL}"
  url               = env("${databaseName}")${
      this.prismaConfiguration.addMigrationScripts
        ? `
  shadowDatabaseUrl = env("${shadowDatabaseName}")`
        : ''
    }
}`;

    await this.prismaSchemaFileService.write(
      [newGenerator, newDatasource, afterRemoveDatasource].join('\n').split('\n\n\n').join('\n')
    );
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
