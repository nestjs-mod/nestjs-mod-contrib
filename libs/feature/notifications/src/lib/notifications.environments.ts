import {
  BooleanTransformer,
  EnvModel,
  EnvModelProperty,
} from '@nestjs-mod/common';

@EnvModel()
export class NotificationsStaticEnvironments {
  @EnvModelProperty({
    description: 'Use filters',
    transform: new BooleanTransformer(),
    default: true,
    hidden: true,
  })
  useFilters?: boolean;

  @EnvModelProperty({
    description:
      'Mail transport (example: smtps://username@domain.com:password@smtp.domain.com)',
  })
  mailTransport?: string;

  @EnvModelProperty({
    description: 'Default sender name (example: Username)',
  })
  mailDefaultSenderName?: string;

  @EnvModelProperty({
    description: 'Default sender email (example: username@domain.com)',
  })
  mailDefaultSenderEmail?: string;
}
