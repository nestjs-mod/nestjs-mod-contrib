import { Prisma } from '../prisma-client';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationsUser } from './notifications-user.entity';

export class NotificationsEvent {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  type!: string;
  @ApiProperty({
    type: 'string',
  })
  operationName!: string;
  @ApiProperty({
    type: 'string',
  })
  subject!: string;
  @ApiProperty({
    type: 'string',
  })
  html!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  text!: string | null;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  attempt!: number;
  @ApiProperty({
    type: 'boolean',
  })
  used!: boolean;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  error!: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  senderUserId!: string | null;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  senderData!: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'string',
  })
  recipientGroupId!: string;
  @ApiProperty({
    type: 'string',
  })
  recipientUserId!: string;
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  recipientData!: Prisma.JsonValue | null;
  @ApiProperty({
    type: 'string',
  })
  externalTenantId!: string;
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
    type: () => NotificationsUser,
    required: false,
  })
  NotificationsUser_NotificationsEvent_recipientUserIdToNotificationsUser?: NotificationsUser;
  @ApiProperty({
    type: () => NotificationsUser,
    required: false,
    nullable: true,
  })
  NotificationsUser_NotificationsEvent_senderUserIdToNotificationsUser?: NotificationsUser | null;
}
