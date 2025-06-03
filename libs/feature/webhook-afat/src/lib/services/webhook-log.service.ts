import { Injectable } from '@angular/core';
import { RequestMeta } from '@nestjs-mod/misc';
import { map } from 'rxjs';
import { WebhookRestSdkAngularService } from '../generated/webhook-rest-sdk-angular.module';
import { WebhookLogMapperService } from './webhook-log-mapper.service';

@Injectable({ providedIn: 'root' })
export class WebhookLogService {
  constructor(
    private readonly ssoRestSdkAngularService: WebhookRestSdkAngularService,
    private readonly webhookLogMapperService: WebhookLogMapperService
  ) {}

  findOne(id: string) {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookLogsControllerFindOne(id)
      .pipe(map((w) => this.webhookLogMapperService.toModel(w)));
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
      .webhookLogsControllerFindManyLogs(
        filters['webhookId'],
        meta?.curPage,
        meta?.perPage,
        filters['search'],
        meta?.sort
          ? Object.entries(meta?.sort)
              .map(([key, value]) => `${key}:${value}`)
              .join(',')
          : undefined
      );
  }

  deleteOne(id: string) {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookLogsControllerDeleteOne(id);
  }
}
