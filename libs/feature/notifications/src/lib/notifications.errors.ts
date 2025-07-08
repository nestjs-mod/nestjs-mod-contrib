import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidationError as CvNotificationsError } from 'class-validator';
import { getText } from 'nestjs-translates';

export enum NotificationsErrorEnum {
  COMMON = 'NOTIFICATIONS-000',
  EXTERNAL_TENANT_ID_NOT_SET = 'NOTIFICATIONS-001',
  EXTERNAL_USER_ID_NOT_SET = 'NOTIFICATIONS-002',
  FORBIDDEN = 'NOTIFICATIONS-003',
}

export const NOTIFICATIONS_ERROR_ENUM_TITLES: Record<NotificationsErrorEnum, string> = {
  [NotificationsErrorEnum.COMMON]: getText('Notifications error'),
  [NotificationsErrorEnum.EXTERNAL_TENANT_ID_NOT_SET]: getText('Tenant ID not set'),
  [NotificationsErrorEnum.EXTERNAL_USER_ID_NOT_SET]: getText('User ID not set'),
  [NotificationsErrorEnum.FORBIDDEN]: getText('Forbidden'),
};

export class NotificationsError<T = unknown> extends Error {
  @ApiProperty({
    type: String,
    description: Object.entries(NOTIFICATIONS_ERROR_ENUM_TITLES)
      .map(([key, value]) => `${value} (${key})`)
      .join(', '),
    example: NOTIFICATIONS_ERROR_ENUM_TITLES[NotificationsErrorEnum.COMMON],
  })
  override message: string;

  @ApiProperty({
    enum: NotificationsErrorEnum,
    enumName: 'NotificationsErrorEnum',
    example: NotificationsErrorEnum.COMMON,
  })
  code = NotificationsErrorEnum.COMMON;

  @ApiPropertyOptional({ type: Object })
  metadata?: T;

  constructor(message?: string | NotificationsErrorEnum, code?: NotificationsErrorEnum, metadata?: T) {
      const codeAsMetadata = Boolean(
        code && !Object.values(NotificationsErrorEnum).includes(String(code) as NotificationsErrorEnum),
      );
    const messageAsCode = Boolean(
      message && Object.values(NotificationsErrorEnum).includes(message as NotificationsErrorEnum),
    );
    const preparedCode = messageAsCode ? (message as NotificationsErrorEnum) : code;
    const preparedMessage = messageAsCode && preparedCode ? NOTIFICATIONS_ERROR_ENUM_TITLES[preparedCode] : message;

    metadata = codeAsMetadata ? (code as T) : metadata;
    code = preparedCode || NotificationsErrorEnum.COMMON;
    message = preparedMessage || NOTIFICATIONS_ERROR_ENUM_TITLES[code];

    super(message);

    this.code = code;
    this.message = message;
    this.metadata = metadata;
  }
}
