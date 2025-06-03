import { NgModule, Injectable } from '@angular/core';
import {
  WebhookRestClientApiModule,
  WebhookRestClientConfiguration,
  WebhookRestService,
} from './rest-sdk';
import { HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebhookRestSdkAngularService {
  constructor(
    private readonly webhookRestClientConfiguration: WebhookRestClientConfiguration,
    private readonly webhookRestService: WebhookRestService
  ) {
    webhookRestService.configuration.withCredentials = true;
  }

  getWebhookApi() {
    if (!this.webhookRestService) {
      throw new Error('webhookApi not set');
    }
    return this.webhookRestService;
  }

  updateHeaders(headers: Record<string, string>) {
    this.webhookRestService.defaultHeaders = new HttpHeaders(headers);
  }

  webSocket<T>({
    path,
    eventName,
    options,
  }: {
    path: string;
    eventName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
  }) {
    const wss = new WebSocket(
      (this.webhookRestClientConfiguration.basePath || '')
        .replace('/api', '')
        .replace('http', 'ws') + path,
      options
    );
    return new Observable<{ data: T; event: string }>((observer) => {
      wss.addEventListener('open', () => {
        wss.addEventListener('message', ({ data }) => {
          observer.next(JSON.parse(data.toString()));
        });
        wss.addEventListener('error', (err) => {
          observer.error(err);
          if (wss?.readyState == WebSocket.OPEN) {
            wss.close();
          }
        });
        wss.send(
          JSON.stringify({
            event: eventName,
            data: true,
          })
        );
      });
    }).pipe(
      finalize(() => {
        if (wss?.readyState == WebSocket.OPEN) {
          wss.close();
        }
      })
    );
  }
}

@NgModule({})
export class WebhookRestSdkAngularModule {
  public static forRoot(configuration: Partial<WebhookRestClientConfiguration>) {
    const webhookRestClientConfiguration = new WebhookRestClientConfiguration(
      configuration
    );
    const webhookRestClientApiModule = WebhookRestClientApiModule.forRoot(
      () => webhookRestClientConfiguration
    );
    return {
      ngModule: WebhookRestSdkAngularModule,
      providers: [
        {
          provide: WebhookRestClientConfiguration,
          useValue: webhookRestClientConfiguration,
        },
      ],
      imports: [webhookRestClientApiModule],
      exports: [webhookRestClientApiModule, WebhookRestClientConfiguration],
    };
  }
}
