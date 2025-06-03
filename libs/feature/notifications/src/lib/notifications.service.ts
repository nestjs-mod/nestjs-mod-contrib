import { Injectable, Logger } from '@nestjs/common';
import { NotificationsUserDto } from './generated/rest-dto/notifications-user.dto';
import { NOTIFICATIONS_FEATURE } from './notifications.constants';

import { WebhookService } from '@nestjs-mod/webhook';
import { InjectPrismaClient } from '@nestjs-mod/prisma';
import { randomUUID } from 'crypto';
import { getText } from 'nestjs-translates';
import { createTransport, Transporter } from 'nodemailer';
import { NotificationsStaticEnvironments } from './notifications.environments';
import { NotificationsEvent, PrismaClient } from './generated/prisma-client';
import { NotificationsWebhookEvent } from './types/notifications-webhooks';

export enum SendNotificationOptionsType {
  phone = 'phone',
  email = 'email',
}

export type SendNotificationOptionsUser = {
  externalUserId: string;
  name?: string;
  phone?: string;
  email?: string;
};

export type SendNotificationOptions = {
  sender?: SendNotificationOptionsUser;
  recipients: SendNotificationOptionsUser[];
  type: SendNotificationOptionsType;
  operationName: string;
  subject: string;
  html: string;
  text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: any;
  externalTenantId: string;
};

export type SendNotificationResponse = {
  recipientGroupId: string;
};

@Injectable()
export class NotificationsService {
  private logger = new Logger(NotificationsService.name);

  private mailTransporter?: Transporter;

  constructor(
    @InjectPrismaClient(NOTIFICATIONS_FEATURE)
    private readonly prismaClient: PrismaClient,
    private readonly notificationsStaticEnvironments: NotificationsStaticEnvironments,
    private readonly webhookService: WebhookService
  ) {
    this.mailTransporter = this.notificationsStaticEnvironments.mailTransport
      ? createTransport(this.notificationsStaticEnvironments.mailTransport, {
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
        })
      : undefined;
  }

  async sendNotification(
    options: SendNotificationOptions
  ): Promise<SendNotificationResponse | null> {
    const recipientGroupId = await this.createEvents(options);

    await this.sendAllNewEvents();

    if (!this.mailTransporter) {
      return null;
    }

    return {
      recipientGroupId,
    };
  }

  async sendAllNewEvents() {
    const events = await this.getAllNewEvents();

    for (const event of events) {
      if (event.type === SendNotificationOptionsType.email) {
        await this.sendEmailNotification(event);
      } else {
        await this.sendPhoneNotification(event);
      }
    }
  }

  private async getAllNewEvents() {
    return this.prismaClient.notificationsEvent.findMany({
      where: { used: false },
    });
  }

  private async createEvents(options: SendNotificationOptions) {
    const senderUser = options.sender
      ? await this.getOrCreateUser({
          externalTenantId: options.externalTenantId,
          externalUserId: options.sender?.externalUserId,
        })
      : null;

    const recipientUsers: NotificationsUserDto[] = [];
    const recipientGroupId = randomUUID();

    for (const recipient of options.recipients) {
      const recipientUser = await this.getOrCreateUser({
        externalTenantId: options.externalTenantId,
        externalUserId: recipient.externalUserId,
      });

      recipientUsers.push(recipientUser);

      const result = await this.prismaClient.notificationsEvent.create({
        data: {
          attempt: 0,
          externalTenantId: options.externalTenantId,
          html: options.html,
          operationName: options.operationName,
          recipientGroupId,
          subject: options.subject,
          type: options.type,
          used: false,
          recipientUserId: recipientUser.id,
          senderUserId: senderUser?.id,
          text: options.text,
          recipientData: recipient,
          senderData: options.sender,
        },
      });

      await this.webhookService.sendEvent({
        eventName: NotificationsWebhookEvent['notifications.update'],
        eventBody: result,
        eventHeaders: {
          externalTenantId: options.externalTenantId,
          externalUserId: options.sender?.externalUserId,
        },
      });
    }
    return recipientGroupId;
  }

  async sendEmailNotification(
    event: Omit<NotificationsEvent, 'type'>
  ): Promise<SendNotificationResponse> {
    const recipientData = event.recipientData as SendNotificationOptionsUser;
    const senderData = (event.senderData || {
      email: this.notificationsStaticEnvironments.mailDefaultSenderEmail,
      name: this.notificationsStaticEnvironments.mailDefaultSenderName,
    }) as SendNotificationOptionsUser;
    this.logger.debug({
      sendMail: {
        from: senderData.name
          ? { address: senderData.email, name: senderData.name }
          : senderData.email,
        to: recipientData.name
          ? { address: recipientData.email, name: recipientData.name }
          : recipientData.email,
        subject: event.subject,
        text: event.text || undefined,
        html: event.html,
      },
    });
    if (
      this.mailTransporter &&
      senderData.email &&
      senderData.name &&
      recipientData.email
    ) {
      try {
        await this.mailTransporter.sendMail({
          from: { address: senderData.email, name: senderData.name },
          to: recipientData.name
            ? { address: recipientData.email, name: recipientData.name }
            : recipientData.email,
          subject: event.subject,
          text: event.text || undefined,
          html: event.html,
        });
        const result = await this.prismaClient.notificationsEvent.update({
          where: { id: event.id },
          data: { used: true },
        });
        await this.webhookService.sendEvent({
          eventName: NotificationsWebhookEvent['notifications.sent'],
          eventBody: result,
          eventHeaders: {
            externalTenantId: event.externalTenantId,
            externalUserId: senderData.externalUserId,
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        this.logger.error(err, err.stack);
        const result = await this.prismaClient.notificationsEvent.update({
          where: { id: event.id },
          data: { error: { ...err }, used: true },
        });
        await this.webhookService.sendEvent({
          eventName: NotificationsWebhookEvent['notifications.error'],
          eventBody: result,
          eventHeaders: {
            externalTenantId: event.externalTenantId,
            externalUserId: senderData.externalUserId,
          },
        });
      }
    } else {
      await this.prismaClient.notificationsEvent.update({
        where: { id: event.id },
        data: {
          error: getText(
            'The letter was not sent because the transport parameters or the letter parameters were empty'
          ),
          used: true,
        },
      });
    }

    return {
      recipientGroupId: event.id,
    };
  }

  async sendPhoneNotification(
    event: Omit<NotificationsEvent, 'type'>
  ): Promise<SendNotificationResponse> {
    return {
      recipientGroupId: event.id,
    };
  }

  private async getOrCreateUser(options: {
    externalUserId: string;
    externalTenantId: string;
  }): Promise<NotificationsUserDto> {
    return await this.prismaClient.notificationsUser.upsert({
      create: {
        externalTenantId: options.externalTenantId,
        externalUserId: options.externalUserId,
      },
      update: {},
      where: {
        externalTenantId_externalUserId: {
          externalTenantId: options.externalTenantId,
          externalUserId: options.externalUserId,
        },
      },
    });
  }
}
