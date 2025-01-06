/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanTransformer, ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { Logger } from '@nestjs/common';
import { CompressionAdapter, Deserialize, DeserializedData, KeyvOptions, KeyvStoreAdapter, Serialize } from 'keyv';

@ConfigModel()
export class KeyvConfiguration implements KeyvOptions {
  @ConfigModelProperty({
    description: 'Default logger',
  })
  defaultLogger?: Logger | null;

  @ConfigModelProperty({
    description: 'Feature name for generate prefix to environments keys',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Emit errors.',
    transform: new BooleanTransformer(),
    default: true,
  })
  emitErrors?: boolean;

  @ConfigModelProperty({
    description: 'Namespace for the current instance.',
  })
  namespace?: string;

  @ConfigModelProperty({
    description: 'A custom serialization function.',
    default: (params: DeserializedData<unknown>) => JSON.stringify(params.value),
  })
  serialize?: Serialize;

  @ConfigModelProperty({
    description: 'A custom deserialization function.',
    default: (params: string) => {
      return { value: typeof params === 'string' ? JSON.parse(params) : params };
    },
  })
  deserialize?: Deserialize;

  @ConfigModelProperty({
    description: 'The storage adapter instance to be used by Keyv.',
  })
  store?: KeyvStoreAdapter | Map<any, any> | any;

  @ConfigModelProperty({
    description: 'Function for create storage adapter instance to be used by Keyv by environment url.',
  })
  storeFactoryByEnvironmentUrl?: (url: string) => KeyvStoreAdapter | Map<any, any> | any | any[];

  @ConfigModelProperty({
    description: 'Default TTL. Can be overridden by specifying a TTL on `.set()`.',
  })
  ttl?: number;

  @ConfigModelProperty({
    description: 'Enable compression option.',
    default: undefined,
  })
  compression?: CompressionAdapter | any;

  @ConfigModelProperty({
    description: 'Enable or disable statistics (default is false)',
    transform: new BooleanTransformer(),
    default: false,
  })
  stats?: boolean;

  @ConfigModelProperty({
    description: 'Enable or disable key prefixing (default is true)',
    transform: new BooleanTransformer(),
    default: true,
  })
  useKeyPrefix?: boolean;
}
