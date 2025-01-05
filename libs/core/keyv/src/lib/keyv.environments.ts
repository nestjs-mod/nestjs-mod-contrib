import { EnvModel, EnvModelProperty } from '@nestjs-mod/common';

@EnvModel()
export class KeyvEnvironments {
  @EnvModelProperty({
    description: 'Connection string for store data (example: redis://:redis_password@localhost:6379)',
  })
  url!: string;
}
