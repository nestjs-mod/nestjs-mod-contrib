import { isInfrastructureMode } from '@nestjs-mod/common';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsServiceBootstrap implements OnApplicationBootstrap {
  private readonly logger = new Logger(NotificationsServiceBootstrap.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  async onApplicationBootstrap() {
    this.logger.debug('onApplicationBootstrap');

    if (isInfrastructureMode()) {
      return;
    }

    await this.notificationsService.sendAllNewEvents();
  }
}
