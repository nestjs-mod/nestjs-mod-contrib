import { EnvModel, EnvModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@EnvModel()
export class PgFlywayEnvironments {
  @EnvModelProperty({
    description:
      'Connection string for database with credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public)',
  })
  @IsNotEmpty()
  databaseUrl!: string;
}
