import { ConfigModel, ConfigModelProperty, NumberTransformer } from '@nestjs-mod/common';
import { Logger } from '@nestjs/common';

@ConfigModel()
export class PrismaConfiguration {
  @ConfigModelProperty({
    description: 'Default logger',
  })
  defaultLogger?: Logger | null;

  @ConfigModelProperty({
    description: 'NodeJS module with Prisma modules',
    hideValueFromOutputs: true,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaModule?: any;

  @ConfigModelProperty({
    description: 'Logging types (all_queries or long_queries)',
    default: 'long_queries',
  })
  logging?: 'all_queries' | 'long_queries';

  @ConfigModelProperty({
    description: 'Max query execution time for detect long queries',
    default: 5000,
    transform: new NumberTransformer(),
  })
  maxQueryExecutionTime?: number;

  @ConfigModelProperty({
    description: 'Ping database interval (0 - disable)',
    default: 0,
    transform: new NumberTransformer(),
  })
  pingDatabaseIntervalMs?: number;

  // infrastructure

  @ConfigModelProperty({
    description: 'Prisma feature name for generate prefix to environments keys (infrastructure)',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Schema file for prisma (infrastructure)',
  })
  schemaFile?: string;

  @ConfigModelProperty({
    description:
      'The option specifies whether it is necessary to create scripts to work with database migrations, for those who use third-party applications to create and apply migrations in the database (infrastructure, example: https://flywaydb.org, https://www.npmjs.com/package/db-migrate)',
    default: true,
  })
  addMigrationScripts?: boolean;

  @ConfigModelProperty({
    description: 'Unsafe string custom content for add to end of prisma schema file (infrastructure)',
  })
  customSchemaContent?: string;

  @ConfigModelProperty({
    description: 'Binary targets (infrastructure)',
  })
  binaryTargets?: string[];

  @ConfigModelProperty({
    description: 'Binary engine type (binary and library)',
  })
  engineType?: 'binary' | 'library';

  @ConfigModelProperty({
    description: 'Directory where Prisma Client is generated, e.g. ../src/generated/prisma',
  })
  output?: string;

  @ConfigModelProperty({
    description: 'Preview features (infrastructure)',
  })
  previewFeatures?: string[];

  @ConfigModelProperty({
    description: 'Application or library project.json-file (nx)',
  })
  nxProjectJsonFile?: string;

  @ConfigModelProperty({
    description:
      'PrismaClient factory function (example use for https://www.prisma.io/docs/orm/overview/databases/postgresql#using-the-node-postgres-driver)',
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaClientFactory?: <T extends { url: string }>(options: T) => Promise<any> | any;
}
