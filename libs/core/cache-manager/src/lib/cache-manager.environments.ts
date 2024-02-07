import { EnvModel, EnvModelProperty } from '@nestjs-mod/common';

@EnvModel()
export class CacheManagerEnvironments {
  @EnvModelProperty({
    description:
      'Connection string for Redis, if it empty memoryStore use for store data (example: redis://:redis_password@localhost:6379)',
  })
  redisUrl!: string;
}
