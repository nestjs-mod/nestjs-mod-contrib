import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { ExecutionContext, Type } from '@nestjs/common';

@ConfigModel()
export class NotificationsConfiguration {
  @ConfigModelProperty({
    description: 'External function for validate',
  })
  checkAccessValidator?: (ctx?: ExecutionContext) => Promise<void>;
}

@ConfigModel()
export class NotificationsStaticConfiguration {
  @ConfigModelProperty({
    description: 'External guards for controllers',
  })
  guards?: Type[];

  @ConfigModelProperty({
    description: 'Function for additional mutation of controllers',
  })
  mutateController?: (ctrl: Type) => Type;
}
