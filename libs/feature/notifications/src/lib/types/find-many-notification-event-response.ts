import { FindManyResponseMeta } from '@nestjs-mod/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationsEvent } from '../generated/rest-dto/notifications-event.entity';

export class FindManyNotificationResponse {
  @ApiProperty({ type: () => [NotificationsEvent] })
  notifications!: NotificationsEvent[];

  @ApiProperty({ type: () => FindManyResponseMeta })
  meta!: FindManyResponseMeta;
}
