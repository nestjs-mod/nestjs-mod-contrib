import { WebhookEvent } from '@nestjs-mod/webhook';
import { getText } from 'nestjs-translates';
import { NotificationsEventDto } from '../generated/rest-dto/notifications-event.dto';

export enum NotificationsWebhookEvent {
  'notifications.create' = 'notifications.create',
  'notifications.update' = 'notifications.update',
  'notifications.sent' = 'notifications.sent',
  'notifications.error' = 'notifications.error',
}

export const NOTIFICATIONS_WEBHOOK_EVENTS: WebhookEvent[] = [
  {
    eventName: NotificationsWebhookEvent['notifications.create'],
    description: getText('Event that fires after a notification is created'),
    example: {
      id: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      html: '<a>Hello {{{firstname}}}</a>',
      externalTenantId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      operationName: 'forget-password',
      recipientData: {
        externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
        email: 'user@example.com',
        name: 'User Name',
        phone: '+999999999',
      },
      subject: 'Some subject of email',
      type: 'phone',
      context: { firstname: 'Firstname' },
      senderData: {
        externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
        email: 'user@example.com',
        name: 'User Name',
        phone: '+888888888',
      },
      text: 'Hello {{{firstname}}}',
      recipientGroupId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Omit<NotificationsEventDto, 'attempt' | 'used' | 'error'>,
  },
  {
    eventName: NotificationsWebhookEvent['notifications.update'],
    description: getText('Event that fires after a notification is updated'),
    example: {
      id: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      html: '<a>Hello {{{firstname}}}</a>',
      externalTenantId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      operationName: 'forget-password',
      recipientData: {
        externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
        email: 'user@example.com',
        name: 'User Name',
        phone: '+999999999',
      },
      subject: 'Some subject of email',
      type: 'phone',
      context: { firstname: 'Firstname' },
      senderData: {
        externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
        email: 'user@example.com',
        name: 'User Name',
        phone: '+888888888',
      },
      text: 'Hello {{{firstname}}}',
      recipientGroupId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Omit<NotificationsEventDto, 'attempt' | 'used' | 'error'>,
  },
  {
    eventName: NotificationsWebhookEvent['notifications.sent'],
    description: getText('Event that fires after a notification is sent'),
    example: {
      id: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      html: '<a>Hello {{{firstname}}}</a>',
      externalTenantId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      operationName: 'forget-password',
      recipientData: {
        externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
        email: 'user@example.com',
        name: 'User Name',
        phone: '+999999999',
      },
      subject: 'Some subject of email',
      type: 'phone',
      context: { firstname: 'Firstname' },
      senderData: {
        externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
        email: 'user@example.com',
        name: 'User Name',
        phone: '+888888888',
      },
      text: 'Hello {{{firstname}}}',
      recipientGroupId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Omit<NotificationsEventDto, 'attempt' | 'used' | 'error'>,
  },
  {
    eventName: NotificationsWebhookEvent['notifications.error'],
    description: getText(
      'Event that occurs when there is an error sending a notification'
    ),
    example: {
      id: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      html: '<a>Hello {{{firstname}}}</a>',
      externalTenantId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      operationName: 'forget-password',
      recipientData: {
        externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
        email: 'user@example.com',
        name: 'User Name',
        phone: '+999999999',
      },
      subject: 'Some subject of email',
      type: 'phone',
      context: { firstname: 'Firstname' },
      senderData: {
        externalUserId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
        email: 'user@example.com',
        name: 'User Name',
        phone: '+888888888',
      },
      text: 'Hello {{{firstname}}}',
      recipientGroupId: '77af2745-d972-4e1f-994a-fae8ad71d7ab',
      attempt: 2,
      error: 'Error object',
      used: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as NotificationsEventDto,
  },
];
