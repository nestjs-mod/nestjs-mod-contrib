import axios, { AxiosInstance } from 'axios';
import { Observable, finalize } from 'rxjs';

import WebSocket from 'ws';
import { Configuration, FilesApi } from './rest-sdk';

export class FilesRestSdkService {
  private filesApi?: FilesApi;
  private filesApiAxios?: AxiosInstance;

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

  getFilesApi() {
    if (!this.filesApi) {
      throw new Error('filesApi not set');
    }
    return this.filesApi;
  }

  updateHeaders(headers: Record<string, string>) {
    Object.assign(this.wsHeaders, headers);

    if (this.filesApiAxios) {
      Object.assign(this.filesApiAxios.defaults.headers.common, headers);
    }
  }

  webSocket<T>({ path, eventName, options }: { path: string; eventName: string; options?: WebSocket.ClientOptions }) {
    const wss = new WebSocket(this.options?.serverUrl?.replace('/api', '').replace('http', 'ws') + path, {
      ...(options || {}),
      headers: this.wsHeaders || {},
    });
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
    this.filesApiAxios = axios.create();
    this.filesApi = new FilesApi(
      new Configuration({
        basePath: this.options?.serverUrl,
      }),
      undefined,
      this.filesApiAxios
    );
  }
}
