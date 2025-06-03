import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { WebhookEvent } from './types/webhook-event';
import { Type } from '@nestjs/common';

@ConfigModel()
export class WebhookConfiguration {
  @ConfigModelProperty({
    description: 'List of available events',
  })
  events?: WebhookEvent[];

  @ConfigModelProperty({
    description:
      'When we run an application in a serverless environment, our background tasks do not have time to complete, to disable background tasks and process requests on demand, we need to switch this property to true',
    default: false,
  })
  syncMode?: boolean;
}

@ConfigModel()
export class WebhookStaticConfiguration {
  @ConfigModelProperty({
    description: 'External guards for controllers',
  })
  guards?: Type[];

  @ConfigModelProperty({
    description: 'Function for additional mutation of controllers',
  })
  mutateController?: (ctrl: Type) => Type;
}

@ConfigModel()
export class WebhookFeatureConfiguration {
  @ConfigModelProperty({
    description: 'List of available events',
  })
  events?: WebhookEvent[];
}
