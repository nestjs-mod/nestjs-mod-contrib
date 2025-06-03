import { Injectable } from '@angular/core';
import { RequestMeta } from '@nestjs-mod/misc';
import { map } from 'rxjs';
import { CreateWebhookDtoInterface, UpdateWebhookDtoInterface, WebhookLogInterface } from '../generated/rest-sdk';
import { WebhookRestSdkAngularService } from '../generated/webhook-rest-sdk-angular.module';
import { WebhookLogMapperService } from './webhook-log-mapper.service';
import { WebhookMapperService } from './webhook-mapper.service';
@Injectable({ providedIn: 'root' })
export class WebhookService {
  constructor(
    private readonly ssoRestSdkAngularService: WebhookRestSdkAngularService,
    private readonly webhookMapperService: WebhookMapperService,
    private readonly webhookLogMapperService: WebhookLogMapperService
  ) {}

  findOne(id: string) {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookControllerFindOne(id)
      .pipe(map((w) => this.webhookMapperService.toModel(w)));
  }

  findMany({
    filters,
    meta,
  }: {
    filters: Record<string, string>;
    meta?: RequestMeta;
  }) {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookControllerFindMany(
        meta?.curPage,
        meta?.perPage,
        filters['search'],
        meta?.sort
          ? Object.entries(meta?.sort)
              .map(([key, value]) => `${key}:${value}`)
              .join(',')
          : undefined
      )
      .pipe(
        map(({ meta, webhooks }) => ({
          meta,
          webhooks: webhooks.map((w) => this.webhookMapperService.toModel(w)),
        }))
      );
  }

  updateOne(id: string, data: UpdateWebhookDtoInterface) {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookControllerUpdateOne(id, data)
      .pipe(map((w) => this.webhookMapperService.toModel(w)));
  }

  deleteOne(id: string) {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookControllerDeleteOne(id);
  }

  createOne(data: CreateWebhookDtoInterface) {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookControllerCreateOne(data)
      .pipe(map((w) => this.webhookMapperService.toModel(w)));
  }

  testRequest(data: CreateWebhookDtoInterface) {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookControllerTestRequest(data)
      .pipe(
        map((result) =>
          this.webhookLogMapperService.toModel(result as WebhookLogInterface)
        )
      );
  }
}
