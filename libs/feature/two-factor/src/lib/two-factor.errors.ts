import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidationError as CvTwoFactorError } from 'class-validator';
import { getText } from 'nestjs-translates';

export enum TwoFactorErrorEnum {
  COMMON = 'TWO_FACTOR-000',
  TwoFactorCodeNotSet = 'TWO-FACTOR-001',
  TwoFactorCodeWrongCode = 'TWO-FACTOR-002',
  TwoFactorCodeIsOutdated = 'TWO-FACTOR-003',
  TwoFactorCodePleaseWait30Seconds = 'TWO-FACTOR-004',
  TwoFactorCodeIsUsed = 'TWO-FACTOR-005',
}

export const TWO_FACTOR_ERROR_ENUM_TITLES: Record<TwoFactorErrorEnum, string> =
  {
    [TwoFactorErrorEnum.COMMON]: getText('Two factor error'),
    [TwoFactorErrorEnum.TwoFactorCodeNotSet]: getText(
      'Two factor code not set'
    ),
    [TwoFactorErrorEnum.TwoFactorCodeWrongCode]: getText(
      'Wrong two factor code'
    ),
    [TwoFactorErrorEnum.TwoFactorCodeIsOutdated]: getText(
      'Two factor code is outdated'
    ),
    [TwoFactorErrorEnum.TwoFactorCodePleaseWait30Seconds]: getText(
      'Please wait 30 seconds'
    ),
    [TwoFactorErrorEnum.TwoFactorCodeIsUsed]: getText(
      'Two-factor code has already been used'
    ),
  };

export class TwoFactorErrorMetadataConstraint {
  @ApiProperty({
    type: String,
  })
  name!: string;

  @ApiProperty({
    type: String,
  })
  description!: string;

  constructor(options?: TwoFactorErrorMetadataConstraint) {
    Object.assign(this, options);
  }
}

export class TwoFactorErrorMetadata {
  @ApiProperty({
    type: String,
  })
  property!: string;

  @ApiProperty({
    type: () => TwoFactorErrorMetadataConstraint,
    isArray: true,
  })
  constraints!: TwoFactorErrorMetadataConstraint[];

  @ApiPropertyOptional({
    type: () => TwoFactorErrorMetadata,
    isArray: true,
  })
  children?: TwoFactorErrorMetadata[];

  constructor(options?: TwoFactorErrorMetadata) {
    Object.assign(this, options);
  }

  static fromClassValidatorTwoFactorErrors(
    errors?: CvTwoFactorError[]
  ): TwoFactorErrorMetadata[] | undefined {
    return errors?.map(
      (error) =>
        new TwoFactorErrorMetadata({
          property: error.property,
          constraints: Object.entries(error.constraints || {}).map(
            ([key, value]) =>
              new TwoFactorErrorMetadataConstraint({
                name: key,
                description: value,
              })
          ),
          ...(error.children?.length
            ? {
                children: this.fromClassValidatorTwoFactorErrors(
                  error.children
                ),
              }
            : {}),
        })
    );
  }
}

export class TwoFactorError extends Error {
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

  @ApiPropertyOptional({ type: TwoFactorErrorMetadata, isArray: true })
  metadata?: TwoFactorErrorMetadata[];

  constructor(
    message?: string | TwoFactorErrorEnum,
    code?: TwoFactorErrorEnum,
    metadata?: CvTwoFactorError[]
  ) {
    const messageAsCode = Boolean(
      message &&
        Object.values(TwoFactorErrorEnum).includes(
          message as TwoFactorErrorEnum
        )
    );
    const preparedCode = messageAsCode ? (message as TwoFactorErrorEnum) : code;
    const preparedMessage =
      messageAsCode && preparedCode
        ? TWO_FACTOR_ERROR_ENUM_TITLES[preparedCode]
        : message;

    code = preparedCode || TwoFactorErrorEnum.COMMON;
    message = preparedMessage || TWO_FACTOR_ERROR_ENUM_TITLES[code];

    super(message);

    this.code = code;
    this.message = message;
    this.metadata =
      TwoFactorErrorMetadata.fromClassValidatorTwoFactorErrors(metadata);
  }
}
