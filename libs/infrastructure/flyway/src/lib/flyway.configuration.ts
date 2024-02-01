import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class FlywayConfiguration {
  @ConfigModelProperty({
    description: 'Flyway feature name for generate prefix to environments keys',
  })
  flywayFeatureName?: string;

  @ConfigModelProperty({
    description: 'Folder with migrations',
  })
  @IsNotEmpty()
  flywayMigrationsFolder!: string;

  @ConfigModelProperty({
    description: 'Javascript config file for flyway (.flyway.js)',
  })
  @IsNotEmpty()
  flywayConfigFile!: string;
}
