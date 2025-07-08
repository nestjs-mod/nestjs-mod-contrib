import { getText } from '@nestjs-mod/misc';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum SupabaseErrorEnum {
  COMMON = 'SUPABASE-000',
  FORBIDDEN = 'SUPABASE-001',
  UNAUTHORIZED = 'SUPABASE-002',
}

export const SUPABASE_ERROR_ENUM_TITLES: Record<SupabaseErrorEnum, string> = {
  [SupabaseErrorEnum.COMMON]: getText('Supabase error'),
  [SupabaseErrorEnum.FORBIDDEN]: getText('Forbidden'),
  [SupabaseErrorEnum.UNAUTHORIZED]: getText('Unauthorized'),
};

export class SupabaseError<T = unknown> extends Error {
  @ApiProperty({
    type: String,
    description: Object.entries(SUPABASE_ERROR_ENUM_TITLES)
      .map(([key, value]) => `${value} (${key})`)
      .join(', '),
    example: SUPABASE_ERROR_ENUM_TITLES[SupabaseErrorEnum.COMMON],
  })
  override message: string;

  @ApiProperty({
    enum: SupabaseErrorEnum,
    enumName: 'SupabaseErrorEnum',
    example: SupabaseErrorEnum.COMMON,
  })
  code = SupabaseErrorEnum.COMMON;

  @ApiPropertyOptional({ type: Object })
  metadata?: T;

  constructor(message?: string | SupabaseErrorEnum, code?: SupabaseErrorEnum | T, metadata?: T) {
    const codeAsMetadata = Boolean(
      code && !Object.values(SupabaseErrorEnum).includes(String(code) as SupabaseErrorEnum),
    );
    const messageAsCode = Boolean(message && Object.values(SupabaseErrorEnum).includes(message as SupabaseErrorEnum));
    const preparedCode = messageAsCode ? (message as SupabaseErrorEnum) : code;
    const preparedMessage =
      messageAsCode && preparedCode ? SUPABASE_ERROR_ENUM_TITLES[preparedCode as SupabaseErrorEnum] : message;

    metadata = codeAsMetadata ? (code as T) : metadata;
    code = preparedCode || SupabaseErrorEnum.COMMON;
    message = preparedMessage || SUPABASE_ERROR_ENUM_TITLES[code as SupabaseErrorEnum];

    super(message);

    this.code = code as SupabaseErrorEnum;
    this.message = message;
    this.metadata = metadata;
  }
}
