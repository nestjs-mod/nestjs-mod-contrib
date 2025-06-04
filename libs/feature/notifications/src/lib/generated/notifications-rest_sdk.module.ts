import axios, { AxiosInstance } from 'axios';
import { Observable, finalize } from 'rxjs';

import WebSocket from 'ws';
import {
  Configuration,
  NotificationsApi,
} from './rest-sdk';

export class NotificationsRestSdkService {
  private notificationsApi?: NotificationsApi;
  private notificationsApiAxios?: AxiosInstance;

  private wsHeaders: Record<string, string> = {};

  constructor(
    private options?: {
      serverUrl?: string;
      headers?: Record<string, string>;
    }
  ) {
    this.createApiClients();
    this.updateHeaders(options?.headers || {});
  }

  getNotificationsApi() {
    if (!this.notificationsApi) {
      throw new Error('notificationsApi not set');
    }
    return this.notificationsApi;
  }

  updateHeaders(headers: Record<string, string>) {
    Object.assign(this.wsHeaders, headers);

    if (this.notificationsApiAxios) {
      Object.assign(this.notificationsApiAxios.defaults.headers.common, headers);
    }
  }

  webSocket<T>({
    path,
    eventName,
    options,
  }: {
    path: string;
    eventName: string;
    options?: WebSocket.ClientOptions;
  }) {
    const wss = new WebSocket(
      this.options?.serverUrl?.replace('/api', '').replace('http', 'ws') + path,
      {
        ...(options || {}),
        headers: this.wsHeaders || {},
      }
    );
    return new Observable<{ data: T; event: string }>((observer) => {
      wss.on('open', () => {
        wss.on('message', (data) => {
          observer.next(JSON.parse(data.toString()));
        });
        wss.on('error', (err) => {
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

  private createApiClients() {
    this.notificationsApiAxios = axios.create();
    this.notificationsApi = new NotificationsApi(
      new Configuration({
        basePath: this.options?.serverUrl,
      }),
      undefined,
      this.notificationsApiAxios
    );
  }
}
