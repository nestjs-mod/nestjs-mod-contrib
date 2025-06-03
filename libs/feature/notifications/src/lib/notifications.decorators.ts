import { getRequestFromExecutionContext } from '@nestjs-mod/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NotificationsRequest } from './types/notifications-request';
import {
  NotificationsError,
  NotificationsErrorEnum,
} from './notifications.errors';

export const SkipNotificationsGuard = Reflector.createDecorator<true>();
export const CheckNotificationsUserIsAdmin = Reflector.createDecorator<true>();

export const CurrentNotificationsRequest = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = getRequestFromExecutionContext(ctx) as NotificationsRequest;
    return req;
  }
);

export const CurrentNotificationsExternalTenantId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = getRequestFromExecutionContext(ctx) as NotificationsRequest;
    if (!req.externalTenantId) {
      throw new NotificationsError(
        NotificationsErrorEnum.EXTERNAL_TENANT_ID_NOT_SET
      );
    }
    return req.externalTenantId;
  }
);
