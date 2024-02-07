import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { Logger } from '@nestjs/common';
import { Config, Milliseconds } from 'cache-manager';

@ConfigModel()
export class CacheManagerConfiguration implements Config {
  @ConfigModelProperty({
    description: 'Type of storage for store data (memory or redis)',
    default: 'memory',
  })
  type?: 'memory' | 'redis';

  @ConfigModelProperty({
    description: 'Default logger',
  })
  defaultLogger?: Logger | null;

  @ConfigModelProperty({
    description: 'Feature name for generate prefix to environments keys',
  })
  cacheFeatureName?: string;

  @ConfigModelProperty({
    description: 'TTL',
  })
  ttl?: Milliseconds;

  @ConfigModelProperty({
    description: 'Refresh threshold',
  })
  refreshThreshold?: Milliseconds;

  @ConfigModelProperty({
    description: 'Is cacheable',
  })
  isCacheable?: (val: unknown) => boolean;
}
