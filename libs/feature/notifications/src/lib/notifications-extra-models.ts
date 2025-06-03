import { NotificationsError } from './notifications.errors';

import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from './generated/prisma-client';

export const NotificationsEntities = class {};

Object.keys(Prisma)
  .filter(
    (key) => key.endsWith('ScalarFieldEnum') && !key.startsWith('Migrations')
  )
  .map((enumName: string) => {
    const keyOfEntity = enumName.split('ScalarFieldEnum')[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (NotificationsEntities as any)['prototype'][keyOfEntity] = '';
    ApiProperty({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enum: (Prisma as any)[enumName],
      enumName: enumName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })((NotificationsEntities as any)['prototype'], keyOfEntity);
  });

export const NOTIFICATIONS_EXTRA_MODELS = [
  NotificationsError,
  NotificationsEntities,
];
