import { FindManyArgs } from '@nestjs-mod/swagger';

import { PrismaToolsService } from '@nestjs-mod/prisma-tools';
import { ValidationError } from '@nestjs-mod/validation';
import {
  CurrentWebhookUser,
  WebhookService,
  WebhookUser,
} from '@nestjs-mod/webhook';
import { InjectPrismaClient } from '@nestjs-mod/prisma';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  refs,
} from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { NotificationsEventDto } from './generated/rest-dto/notifications-event.dto';
import { UpdateNotificationsEventDto } from './generated/rest-dto/update-notifications-event.dto';
import { NOTIFICATIONS_FEATURE } from './notifications.constants';
import { CurrentNotificationsExternalTenantId } from './notifications.decorators';
import { NotificationsError } from './notifications.errors';
import { FindManyNotificationResponse } from './types/find-many-notification-event-response';
import { NotificationsWebhookEvent } from './types/notifications-webhooks';
import { Prisma, PrismaClient } from './generated/prisma-client';

@ApiBadRequestResponse({
  schema: { allOf: refs(NotificationsError, ValidationError) },
})
@ApiTags('Notifications')
@Controller('/notifications')
export class NotificationsController {
  constructor(
    @InjectPrismaClient(NOTIFICATIONS_FEATURE)
    private readonly prismaClient: PrismaClient,
    private readonly prismaToolsService: PrismaToolsService,
    private readonly webhookService: WebhookService
  ) {}

  @Get()
  @ApiOkResponse({ type: FindManyNotificationResponse })
  async findMany(
    @CurrentNotificationsExternalTenantId() externalTenantId: string,
    @Query() args: FindManyArgs
  ) {
    const { take, skip, curPage, perPage } =
      this.prismaToolsService.getFirstSkipFromCurPerPage({
        curPage: args.curPage,
        perPage: args.perPage,
      });
    const searchText = args.searchText;

    const orderBy = (args.sort || 'createdAt:desc')
      .split(',')
      .map((s) => s.split(':'))
      .reduce(
        (all, [key, value]) => ({
          ...all,
          ...(key in Prisma.NotificationsEventScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {}
      );
    const result = await this.prismaClient.$transaction(async (prisma) => {
      return {
        notifications: await prisma.notificationsEvent.findMany({
          where: {
            ...(searchText
              ? {
                  OR: [
                    ...(isUUID(searchText)
                      ? [
                          { id: { equals: searchText } },
                          { externalTenantId: { equals: searchText } },
                        ]
                      : []),
                    { html: { contains: searchText, mode: 'insensitive' } },
                    {
                      text: { contains: searchText, mode: 'insensitive' },
                    },
                    {
                      error: { string_contains: searchText },
                    },
                    {
                      recipientData: {
                        string_contains: searchText,
                        path: ['email'],
                      },
                    },
                    {
                      senderData: {
                        string_contains: searchText,
                        path: ['email'],
                      },
                    },
                    {
                      recipientData: {
                        string_contains: searchText,
                        path: ['phone'],
                      },
                    },
                    {
                      senderData: {
                        string_contains: searchText,
                        path: ['phone'],
                      },
                    },
                  ],
                }
              : {}),
            externalTenantId,
          },
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.notificationsEvent.count({
          where: {
            ...(searchText
              ? {
                  OR: [
                    ...(isUUID(searchText)
                      ? [
                          { id: { equals: searchText } },
                          { externalTenantId: { equals: searchText } },
                        ]
                      : []),
                    { html: { contains: searchText, mode: 'insensitive' } },
                    {
                      text: { contains: searchText, mode: 'insensitive' },
                    },
                    {
                      error: { string_contains: searchText },
                    },
                    {
                      recipientData: {
                        string_contains: searchText,
                        path: ['email'],
                      },
                    },
                    {
                      senderData: {
                        string_contains: searchText,
                        path: ['email'],
                      },
                    },
                    {
                      recipientData: {
                        string_contains: searchText,
                        path: ['phone'],
                      },
                    },
                    {
                      senderData: {
                        string_contains: searchText,
                        path: ['phone'],
                      },
                    },
                  ],
                }
              : {}),
            externalTenantId,
          },
        }),
      };
    });
    return {
      notifications: result.notifications,
      meta: {
        totalResults: result.totalResults,
        curPage,
        perPage,
      },
    };
  }

  @Put(':id')
  @ApiOkResponse({ type: NotificationsEventDto })
  async updateOne(
    @CurrentWebhookUser() webhookUser: WebhookUser,
    @CurrentNotificationsExternalTenantId() externalTenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateNotificationsEventDto
  ) {
    const result = await this.prismaClient.notificationsEvent.update({
      data: { ...args, updatedAt: new Date() },
      where: {
        id,
        externalTenantId,
      },
    });
    await this.webhookService.sendEvent({
      eventName: NotificationsWebhookEvent['notifications.update'],
      eventBody: result,
      eventHeaders: {
        externalTenantId: webhookUser.externalTenantId,
        externalUserId: webhookUser.externalUserId,
      },
    });
    return result;
  }

  @Get(':id')
  @ApiOkResponse({ type: NotificationsEventDto })
  async findOne(
    @CurrentNotificationsExternalTenantId() externalTenantId: string,
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return await this.prismaClient.notificationsEvent.findFirstOrThrow({
      where: {
        id,
        externalTenantId,
      },
    });
  }
}
