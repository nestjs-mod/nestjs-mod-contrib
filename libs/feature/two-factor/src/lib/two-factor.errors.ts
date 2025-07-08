import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidationError as CvTwoFactorError } from 'class-validator';
import { getText } from 'nestjs-translates';

export enum TwoFactorErrorEnum {
  COMMON = 'TWO_FACTOR-000',
  TwoFactorCodeNotSet = 'TWO-FACTOR-001',
  TwoFactorCodeWrongCode = 'TWO-FACTOR-002',
  TwoFactorCodeIsOutdated = 'TWO-FACTOR-003',
  TwoFactorCodePleaseWaitXXSeconds = 'TWO-FACTOR-004',
  TwoFactorCodeIsUsed = 'TWO-FACTOR-005',
}

export const TWO_FACTOR_ERROR_ENUM_TITLES: Record<TwoFactorErrorEnum, string> = {
  [TwoFactorErrorEnum.COMMON]: getText('Two factor error'),
  [TwoFactorErrorEnum.TwoFactorCodeNotSet]: getText('Two factor code not set'),
  [TwoFactorErrorEnum.TwoFactorCodeWrongCode]: getText('Wrong two factor code'),
  [TwoFactorErrorEnum.TwoFactorCodeIsOutdated]: getText('Two factor code is outdated'),
  [TwoFactorErrorEnum.TwoFactorCodePleaseWaitXXSeconds]: getText('Please wait {{{timeout}}} seconds'),
  [TwoFactorErrorEnum.TwoFactorCodeIsUsed]: getText('Two-factor code has already been used'),
};

export class TwoFactorError<T = unknown> extends Error {
  @ApiProperty({
    type: String,
    description: Object.entries(TWO_FACTOR_ERROR_ENUM_TITLES)
      .map(([key, value]) => `${value} (${key})`)
      .join(', '),
    example: TWO_FACTOR_ERROR_ENUM_TITLES[TwoFactorErrorEnum.COMMON],
  })
  override message: string;

  @ApiProperty({
    enum: TwoFactorErrorEnum,
    enumName: 'TwoFactorErrorEnum',
    example: TwoFactorErrorEnum.COMMON,
  })
  code = TwoFactorErrorEnum.COMMON;

  @ApiPropertyOptional({ type: Object })
  metadata?: T;

  constructor(message?: string | TwoFactorErrorEnum, code?: TwoFactorErrorEnum, metadata?: T) {
      const codeAsMetadata = Boolean(
        code && !Object.values(TwoFactorErrorEnum).includes(String(code) as TwoFactorErrorEnum),
      );
    const messageAsCode = Boolean(message && Object.values(TwoFactorErrorEnum).includes(message as TwoFactorErrorEnum));
    const preparedCode = messageAsCode ? (message as TwoFactorErrorEnum) : code;
    const preparedMessage = messageAsCode && preparedCode ? TWO_FACTOR_ERROR_ENUM_TITLES[preparedCode] : message;

    metadata = codeAsMetadata ? (code as T) : metadata;
    code = preparedCode || TwoFactorErrorEnum.COMMON;
    message = preparedMessage || TWO_FACTOR_ERROR_ENUM_TITLES[code];

    super(message);

    this.code = code;
    this.message = message;
    this.metadata = metadata;
  }
}
