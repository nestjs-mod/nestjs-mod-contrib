import { StatusResponse } from '@nestjs-mod/swagger';

import { InjectPrismaClient } from '@nestjs-mod/prisma';
import { PrismaToolsService } from '@nestjs-mod/prisma-tools';
import { ValidationError } from '@nestjs-mod/validation';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, refs } from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { CurrentLocale, TranslatesService, TranslatesStorage } from 'nestjs-translates';
import { Prisma, PrismaClient, WebhookRole } from '../generated/prisma-client';
import { CreateWebhookDto } from '../generated/rest-dto/create-webhook.dto';
import { UpdateWebhookDto } from '../generated/rest-dto/update-webhook.dto';
import { WebhookUser } from '../generated/rest-dto/webhook-user.entity';
import { Webhook } from '../generated/rest-dto/webhook.entity';
import { WebhookService } from '../services/webhook.service';
import { FindManyWebhookArgs } from '../types/find-many-webhook-args';
import { FindManyWebhookResponse } from '../types/find-many-webhook-response';
import { WebhookEvent } from '../types/webhook-event';
import { WebhookTestRequestResponse } from '../types/webhook-test-request-response';
import { WEBHOOK_FEATURE } from '../webhook.constants';
import { CheckWebhookRole, CurrentWebhookExternalTenantId, CurrentWebhookUser } from '../webhook.decorators';
import { WebhookError } from '../webhook.errors';

@ApiBadRequestResponse({
  schema: { allOf: refs(WebhookError, ValidationError) },
})
@ApiTags('Webhook')
@CheckWebhookRole([WebhookRole.User, WebhookRole.Admin])
@Controller('/webhook')
export class WebhookController {
  constructor(
    @InjectPrismaClient(WEBHOOK_FEATURE)
    private readonly prismaClient: PrismaClient,
    private readonly prismaToolsService: PrismaToolsService,
    private readonly webhookService: WebhookService,
    private readonly translatesService: TranslatesService,
    private readonly translatesStorage: TranslatesStorage,
  ) {}

  @Get('profile')
  @ApiOkResponse({ type: WebhookUser })
  async profile(@CurrentWebhookUser() webhookUser: WebhookUser) {
    return webhookUser;
  }

  @Get('events')
  @ApiOkResponse({ type: WebhookEvent, isArray: true })
  async events() {
    return this.webhookService.getAllEvents().map((e) => ({
      ...e,
      descriptionLocale: {
        ...Object.fromEntries(
          this.translatesStorage.locales.map((locale) => [
            locale,
            e.descriptionLocale?.[locale] || this.translatesService.translate(e.description, locale),
          ]),
        ),
        en: e.description,
      },
    }));
  }

  @Get()
  @ApiOkResponse({ type: FindManyWebhookResponse })
  async findMany(
    @CurrentWebhookExternalTenantId() externalTenantId: string,
    @CurrentWebhookUser() webhookUser: WebhookUser,
    @Query() args: FindManyWebhookArgs,
  ) {
    const { take, skip, curPage, perPage } = this.prismaToolsService.getFirstSkipFromCurPerPage({
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
          ...(key in Prisma.WebhookScalarFieldEnum
            ? {
                [key]: value === 'desc' ? 'desc' : 'asc',
              }
            : {}),
        }),
        {},
      );
    const result = await this.prismaClient.$transaction(async (prisma) => {
      return {
        webhooks: await prisma.webhook.findMany({
          where: {
            ...(searchText
              ? {
                  OR: [
                    ...(isUUID(searchText)
                      ? [{ id: { equals: searchText } }, { externalTenantId: { equals: searchText } }]
                      : []),
                    { endpoint: { contains: searchText, mode: 'insensitive' } },
                    {
                      eventName: { contains: searchText, mode: 'insensitive' },
                    },
                  ],
                }
              : {}),
            ...(webhookUser.userRole === WebhookRole.Admin
              ? { externalTenantId: args.tenantId }
              : {
                  externalTenantId:
                    webhookUser?.userRole === WebhookRole.User ? webhookUser.externalTenantId : args.tenantId,
                }),
          },
          take,
          skip,
          orderBy,
        }),
        totalResults: await prisma.webhook.count({
          where: {
            ...(searchText
              ? {
                  OR: [
                    ...(isUUID(searchText)
                      ? [{ id: { equals: searchText } }, { externalTenantId: { equals: searchText } }]
                      : []),
                    { endpoint: { contains: searchText, mode: 'insensitive' } },
                    {
                      eventName: { contains: searchText, mode: 'insensitive' },
                    },
                  ],
                }
              : {}),
            ...(webhookUser.userRole === WebhookRole.Admin
              ? { externalTenantId: args.tenantId }
              : {
                  externalTenantId:
                    webhookUser?.userRole === WebhookRole.User ? webhookUser.externalTenantId : args.tenantId,
                }),
          },
        }),
      };
    });
    return {
      webhooks: result.webhooks,
      meta: {
        totalResults: result.totalResults,
        curPage,
        perPage,
      },
    };
  }

  @Post('test-request')
  @ApiCreatedResponse({ type: WebhookTestRequestResponse })
  async testRequest(@CurrentWebhookExternalTenantId() externalTenantId: string, @Body() args: CreateWebhookDto) {
    const event = this.webhookService.getAllEvents().find((e) => e.eventName === args.eventName);
    const { response, responseStatus, webhookStatus, request } = await this.webhookService.httpRequest({
      endpoint: args.endpoint,
      eventBody: event?.example || {},
      headers: args.headers,
      requestTimeout: args.requestTimeout || 0,
    });

    return {
      externalTenantId,
      request,
      response,
      responseStatus,
      webhookStatus,
    } as WebhookTestRequestResponse;
  }

  @Post()
  @ApiCreatedResponse({ type: Webhook })
  async createOne(
    @CurrentWebhookExternalTenantId() externalTenantId: string,
    @CurrentWebhookUser() webhookUser: WebhookUser,
    @Body() args: CreateWebhookDto,
  ) {
    return await this.prismaClient.webhook.create({
      data: {
        ...args,
        WebhookUser_Webhook_createdByToWebhookUser: {
          connect: { id: webhookUser.id },
        },
        WebhookUser_Webhook_updatedByToWebhookUser: {
          connect: { id: webhookUser.id },
        },
        ...(webhookUser.userRole === WebhookRole.Admin
          ? { externalTenantId }
          : {
              externalTenantId: webhookUser.externalTenantId,
            }),
      },
    });
  }

  @Put(':id')
  @ApiOkResponse({ type: Webhook })
  async updateOne(
    @CurrentWebhookExternalTenantId() externalTenantId: string,
    @CurrentWebhookUser() webhookUser: WebhookUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() args: UpdateWebhookDto,
  ) {
    return await this.prismaClient.webhook.update({
      data: { ...args, updatedAt: new Date() },
      where: {
        id,
        ...(webhookUser.userRole === WebhookRole.Admin
          ? {}
          : {
              externalTenantId:
                webhookUser?.userRole === WebhookRole.User ? webhookUser.externalTenantId : externalTenantId,
            }),
      },
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: StatusResponse })
  async deleteOne(
    @CurrentWebhookExternalTenantId() externalTenantId: string,
    @CurrentWebhookUser() webhookUser: WebhookUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    // todo: change to InjectTranslateFunction, after write all posts
    @CurrentLocale() locale: string,
  ) {
    await this.prismaClient.webhook.delete({
      where: {
        id,
        ...(webhookUser.userRole === WebhookRole.Admin
          ? {}
          : {
              externalTenantId:
                webhookUser?.userRole === WebhookRole.User ? webhookUser.externalTenantId : externalTenantId,
            }),
      },
    });
    return { message: this.translatesService.translate('ok', locale) };
  }

  @Get(':id')
  @ApiOkResponse({ type: Webhook })
  async findOne(
    @CurrentWebhookExternalTenantId() externalTenantId: string,
    @CurrentWebhookUser() webhookUser: WebhookUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.prismaClient.webhook.findFirstOrThrow({
      where: {
        id,
        ...(webhookUser.userRole === WebhookRole.Admin
          ? {}
          : {
              externalTenantId:
                webhookUser?.userRole === WebhookRole.User ? webhookUser.externalTenantId : externalTenantId,
            }),
      },
    });
  }
}
