import {
  BooleanTransformer,
  EnvModel,
  EnvModelProperty,
} from '@nestjs-mod/common';

@EnvModel()
export class TwoFactorStaticEnvironments {
  @EnvModelProperty({
    description: 'Use filters',
    transform: new BooleanTransformer(),
    default: true,
    hidden: true,
  })
  useFilters?: boolean;
}
