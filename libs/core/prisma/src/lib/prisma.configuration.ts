import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { Logger } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class PrismaConfiguration {
  @ConfigModelProperty({
    description: 'Default logger',
  })
  defaultLogger?: Logger | null;

  @ConfigModelProperty({
    description: 'NodeJS module with Prisma modules',
  })
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaModule: any;

  @ConfigModelProperty({
    description: 'Logging types (all_queries or long_queries)',
    default: 'long_queries',
  })
  logging?: 'all_queries' | 'long_queries';

  @ConfigModelProperty({
    description: 'Max query execution time for detect long queries',
    default: 5000,
  })
  maxQueryExecutionTime?: number;

  @ConfigModelProperty({
    description: 'Ping database interval (0 - disable)',
    default: 0,
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
}
