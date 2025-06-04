import { Injectable } from '@angular/core';
import { WebhookRestSdkAngularService } from '../generated/webhook-rest_sdk-angular.module';

@Injectable({ providedIn: 'root' })
export class WebhookEventsService {
  constructor(private readonly ssoRestSdkAngularService: WebhookRestSdkAngularService) {}

  findMany() {
    return this.ssoRestSdkAngularService.getWebhookApi().webhookControllerEvents();
  }
}
