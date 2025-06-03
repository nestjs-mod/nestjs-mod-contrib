import { ApiProperty } from '@nestjs/swagger';
import { NotificationsEvent } from './notifications-event.entity';

export class NotificationsUser {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  externalTenantId!: string;
  @ApiProperty({
    type: 'string',
  })
  externalUserId!: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt!: Date;
  @ApiProperty({
    type: () => NotificationsEvent,
    isArray: true,
    required: false,
  })
  NotificationsEvent_NotificationsEvent_recipientUserIdToNotificationsUser?: NotificationsEvent[];
  @ApiProperty({
    type: () => NotificationsEvent,
    isArray: true,
    required: false,
  })
  NotificationsEvent_NotificationsEvent_senderUserIdToNotificationsUser?: NotificationsEvent[];
}
