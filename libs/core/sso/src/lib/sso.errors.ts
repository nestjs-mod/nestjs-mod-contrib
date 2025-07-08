import { getText } from '@nestjs-mod/misc';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SsoErrorEnum {
  COMMON = 'SSO-000',
  FORBIDDEN = 'SSO-001',
  UNAUTHORIZED = 'SSO-002',
}

export const SSO_ERROR_ENUM_TITLES: Record<SsoErrorEnum, string> = {
  [SsoErrorEnum.COMMON]: getText('Sso error'),
  [SsoErrorEnum.FORBIDDEN]: getText('Forbidden'),
  [SsoErrorEnum.UNAUTHORIZED]: getText('Unauthorized'),
};

export class SsoError<T = unknown> extends Error {
  @ApiProperty({
    type: String,
    description: Object.entries(SSO_ERROR_ENUM_TITLES)
      .map(([key, value]) => `${value} (${key})`)
      .join(', '),
    example: SSO_ERROR_ENUM_TITLES[SsoErrorEnum.COMMON],
  })
  override message: string;

  @ApiProperty({
    enum: SsoErrorEnum,
    enumName: 'SsoErrorEnum',
    example: SsoErrorEnum.COMMON,
  })
  code = SsoErrorEnum.COMMON;

  @ApiPropertyOptional({ type: Object })
  metadata?: T;

  constructor(message?: string | SsoErrorEnum, code?: SsoErrorEnum | T, metadata?: T) {
    const codeAsMetadata = Boolean(code && !Object.values(SsoErrorEnum).includes(String(code) as SsoErrorEnum));
    const messageAsCode = Boolean(message && Object.values(SsoErrorEnum).includes(message as SsoErrorEnum));
    const preparedCode = messageAsCode ? (message as SsoErrorEnum) : code;
    const preparedMessage =
      messageAsCode && preparedCode ? SSO_ERROR_ENUM_TITLES[preparedCode as SsoErrorEnum] : message;

    metadata = codeAsMetadata ? (code as T) : metadata;
    code = preparedCode || SsoErrorEnum.COMMON;
    message = preparedMessage || SSO_ERROR_ENUM_TITLES[code as SsoErrorEnum];

    super(message);

    this.code = code as SsoErrorEnum;
    this.message = message;
    this.metadata = metadata;
  }
}
