import { InjectableFeatureConfigurationType } from '@nestjs-mod/common';
import { InjectPrismaClient } from '@nestjs-mod/prisma';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosHeaders } from 'axios';
import { firstValueFrom, Subject, timeout, TimeoutError } from 'rxjs';
import { PrismaClient, WebhookStatus } from '../generated/prisma-client';
import { WebhookEvent } from '../types/webhook-event';
import {
  WebhookConfiguration,
  WebhookFeatureConfiguration,
} from '../webhook.configuration';
import { WEBHOOK_FEATURE } from '../webhook.constants';
import { InjectWebhookFeatures } from '../webhook.decorators';
import { WebhookError, WebhookErrorEnum } from '../webhook.errors';

@Injectable()
export class WebhookService<
  TEventName extends string = string,
  TEventBody = object,
  TEventHeaders = object
> {
  private readonly logger = new Logger(WebhookService.name);

  eventsStream$ = new Subject<{
    eventName: TEventName;
    eventBody: TEventBody;
    eventHeaders: TEventHeaders;
  }>();

  constructor(
    @InjectPrismaClient(WEBHOOK_FEATURE)
    private readonly prismaClient: PrismaClient,
    @InjectWebhookFeatures()
    private readonly webhookFeatureConfigurations: InjectableFeatureConfigurationType<WebhookFeatureConfiguration>[],
    private readonly webhookConfiguration: WebhookConfiguration,
    private readonly httpService: HttpService
  ) {}

  async sendEvent({
    eventName,
    eventBody,
    eventHeaders,
  }: {
    eventName: TEventName;
    eventBody: TEventBody;
    eventHeaders: TEventHeaders;
  }) {
    if (this.webhookConfiguration.syncMode) {
      await this.sendSyncEvent({
        eventName,
        eventBody,
        eventHeaders,
      });
    } else {
      await this.sendAsyncEvent({
        eventName,
        eventBody,
        eventHeaders,
      });
    }
  }

  async sendAsyncEvent({
    eventName,
    eventBody,
    eventHeaders,
  }: {
    eventName: TEventName;
    eventBody: TEventBody;
    eventHeaders: TEventHeaders;
  }) {
    const event = this.getAllEvents().find((e) => e.eventName === eventName);
    if (!event) {
      throw new WebhookError(WebhookErrorEnum.EVENT_NOT_FOUND);
    }
    this.eventsStream$.next({ eventName, eventBody, eventHeaders });
  }

  getAllEvents() {
    return [
      ...(this.webhookConfiguration.events || []),
      ...this.webhookFeatureConfigurations
        .map(({ featureConfiguration }) => featureConfiguration.events)
        .flat(),
    ] as WebhookEvent[];
  }

  async sendSyncEvent({
    eventName,
    eventBody,
    eventHeaders,
  }: {
    eventName: TEventName;
    eventBody: TEventBody;
    eventHeaders: TEventHeaders;
  }) {
    this.logger.debug({ eventName, eventBody, eventHeaders });
    const [{ now }] = await this.getCurrentDatabaseDate();
    const webhooks = await this.prismaClient.webhook.findMany({
      where: { eventName: { contains: eventName }, enabled: true },
    });

    for (const webhook of webhooks) {
      if (!webhook.workUntilDate || (now && now <= webhook.workUntilDate)) {
        const headers = {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...((webhook.headers as any) || {}),
          ...(eventHeaders || {}),
        };
        const webhookLog = await this.prismaClient.webhookLog.create({
          select: { id: true },
          data: {
            externalTenantId: webhook.externalTenantId,
            request: {
              url: webhook.endpoint,
              body: eventBody,
              headers,
            } as object,
            responseStatus: '',
            webhookStatus: 'Pending',
            response: {},
            webhookId: webhook.id,
          },
        });

        await this.prismaClient.webhookLog.update({
          where: { id: webhookLog.id },
          data: {
            webhookStatus: 'Process',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        try {
          const { response, responseStatus, webhookStatus } =
            await this.httpRequest({
              endpoint: webhook.endpoint,
              eventBody,
              headers,
              requestTimeout: webhook.requestTimeout || 5000,
            });

          await this.prismaClient.webhookLog.update({
            where: { id: webhookLog.id },
            data: {
              responseStatus,
              response,
              webhookStatus,
              updatedAt: new Date(),
            },
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          this.logger.debug({
            where: { id: webhookLog.id },
            data: {
              webhookStatus: err instanceof TimeoutError ? 'Timeout' : 'Error',
              updatedAt: new Date(),
            },
          });
          this.logger.error(err, (err as Error).stack);
        }
      }
    }
  }

  private async getCurrentDatabaseDate() {
    try {
      return [{ now: new Date() }];
      // todo: https://github.com/prisma/prisma/issues/27257, https://github.com/prisma/prisma/issues/27263
      // return await this.prismaClient.$queryRaw<[{ now: Date }]>`SELECT NOW();`;
    } catch (error: any) {
      console.log({ ...error });
      throw error;
    }
  }

  async httpRequest({
    endpoint,
    eventBody,
    headers,
    requestTimeout,
  }: {
    endpoint: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventBody: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers: any;
    requestTimeout: number;
  }) {
    let webhookStatus: WebhookStatus = WebhookStatus.Process;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any, responseStatus: string;
    try {
      const request = await firstValueFrom(
        this.httpService
          .post(endpoint, eventBody, {
            ...(Object.keys(headers || {})
              ? { headers: new AxiosHeaders({ ...headers }) }
              : {}),
          })
          .pipe(timeout(requestTimeout))
      );

      try {
        response = request.data;
        responseStatus = `${request.status} ${request.statusText}`;
        webhookStatus = WebhookStatus.Success;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.logger.error(err, (err as Error).stack);
        response = String(err.message);
        responseStatus = 'unhandled';
        webhookStatus = WebhookStatus.Error;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err, (err as Error).stack);
      try {
        response = err.response?.data || String(err.message);
        responseStatus = err.response?.statusText;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err2: any) {
        this.logger.error(err2, (err2 as Error).stack);
        response = String(err2.message);
        responseStatus = 'unhandled';
      }
      webhookStatus =
        err instanceof TimeoutError
          ? WebhookStatus.Timeout
          : WebhookStatus.Error;
    }
    return {
      response,
      responseStatus,
      webhookStatus,
      request: {
        url: endpoint,
        body: eventBody,
        headers,
      },
    };
  }
}
