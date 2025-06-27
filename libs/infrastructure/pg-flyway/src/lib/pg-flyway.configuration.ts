import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class PgFlywayConfiguration {
  @ConfigModelProperty({
    description: 'PgFlyway feature name for generate prefix to environments keys',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Folder with migrations',
  })
  @IsNotEmpty()
  migrationsFolder!: string;

  @ConfigModelProperty({
    description: 'Table with history of migrations',
  })
  pgFlywayHistoryTable?: string;

  @ConfigModelProperty({
    description: 'Application or library project.json-file (nx)',
  })
  nxProjectJsonFile?: string;
}
