import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from './generated/prisma-client';
import { TwoFactorError } from './two-factor.errors';

export const TwoFactorEntities = class {};

Object.keys(Prisma)
  .filter((key) => key.endsWith('ScalarFieldEnum') && !key.startsWith('Migrations'))
  .map((enumName: string) => {
    const keyOfEntity = enumName.split('ScalarFieldEnum')[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (TwoFactorEntities as any)['prototype'][keyOfEntity] = '';
    ApiProperty({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enum: (Prisma as any)[enumName],
      enumName: enumName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })((TwoFactorEntities as any)['prototype'], keyOfEntity);
  });

export const TWO_FACTOR_EXTRA_MODELS = [TwoFactorError, TwoFactorEntities];
