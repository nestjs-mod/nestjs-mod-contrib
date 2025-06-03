import { getRequestFromExecutionContext } from '@nestjs-mod/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NotificationsConfiguration } from './notifications.configuration';
import {
  CheckNotificationsUserIsAdmin,
  SkipNotificationsGuard,
} from './notifications.decorators';
import {
  NotificationsError,
  NotificationsErrorEnum,
} from './notifications.errors';
import { NotificationsRequest } from './types/notifications-request';

@Injectable()
export class NotificationsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly notificationsConfiguration: NotificationsConfiguration
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { checkNotificationsUserIsAdmin, skipNotificationsGuard } =
      this.getHandlersReflectMetadata(context);

    if (skipNotificationsGuard) {
      return true;
    }

    const req = this.getRequestFromExecutionContext(context);

    // check access by custom logic
    if (this.notificationsConfiguration.checkAccessValidator) {
      await this.notificationsConfiguration.checkAccessValidator(context);
    }

    if (checkNotificationsUserIsAdmin && !req.notificationIsAdmin) {
      throw new NotificationsError(NotificationsErrorEnum.FORBIDDEN);
    }

    return true;
  }

  private getRequestFromExecutionContext(context: ExecutionContext) {
    const req = getRequestFromExecutionContext(context) as NotificationsRequest;
    req.headers = req.headers || {};
    return req;
  }

  private getHandlersReflectMetadata(context: ExecutionContext) {
    const checkNotificationsUserIsAdmin =
      (typeof context.getHandler === 'function' &&
        this.reflector.get(
          CheckNotificationsUserIsAdmin,
          context.getHandler()
        ) === true) ||
      (typeof context.getClass === 'function' &&
        this.reflector.get(
          CheckNotificationsUserIsAdmin,
          context.getClass()
        ) === true) ||
      undefined;

    const skipNotificationsGuard =
      (typeof context.getHandler === 'function' &&
        this.reflector.get(SkipNotificationsGuard, context.getHandler())) ||
      (typeof context.getClass === 'function' &&
        this.reflector.get(SkipNotificationsGuard, context.getClass())) ||
      undefined;

    return { checkNotificationsUserIsAdmin, skipNotificationsGuard };
  }
}
