import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class FlywayConfiguration {
  @ConfigModelProperty({
    description: 'Flyway feature name for generate prefix to environments keys',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Folder with migrations',
  })
  @IsNotEmpty()
  migrationsFolder!: string;

  @ConfigModelProperty({
    description: 'Javascript config file for flyway (.flyway.js)',
  })
  @IsNotEmpty()
  configFile!: string;

  @ConfigModelProperty({
    description: 'Application or library project.json-file (nx)',
  })
  nxProjectJsonFile?: string;
}
