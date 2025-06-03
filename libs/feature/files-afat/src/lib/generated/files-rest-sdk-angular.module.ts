import { NgModule, Injectable } from '@angular/core';
import {
  FilesRestClientApiModule,
  FilesRestClientConfiguration,
  FilesRestService,
} from './rest-sdk';
import { HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilesRestSdkAngularService {
  constructor(
    private readonly filesRestClientConfiguration: FilesRestClientConfiguration,
    private readonly filesRestService: FilesRestService
  ) {
    filesRestService.configuration.withCredentials = true;
  }

  getFilesApi() {
    if (!this.filesRestService) {
      throw new Error('filesApi not set');
    }
    return this.filesRestService;
  }

  updateHeaders(headers: Record<string, string>) {
    this.filesRestService.defaultHeaders = new HttpHeaders(headers);
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
      (this.filesRestClientConfiguration.basePath || '')
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
export class FilesRestSdkAngularModule {
  public static forRoot(configuration: Partial<FilesRestClientConfiguration>) {
    const filesRestClientConfiguration = new FilesRestClientConfiguration(
      configuration
    );
    const filesRestClientApiModule = FilesRestClientApiModule.forRoot(
      () => filesRestClientConfiguration
    );
    return {
      ngModule: FilesRestSdkAngularModule,
      providers: [
        {
          provide: FilesRestClientConfiguration,
          useValue: filesRestClientConfiguration,
        },
      ],
      imports: [filesRestClientApiModule],
      exports: [filesRestClientApiModule, FilesRestClientConfiguration],
    };
  }
}
