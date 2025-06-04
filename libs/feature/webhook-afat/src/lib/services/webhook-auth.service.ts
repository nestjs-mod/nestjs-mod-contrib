import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { WebhookErrorInterface, WebhookUserInterface } from '../generated/rest-sdk';
import { WebhookRestSdkAngularService } from '../generated/webhook-rest_sdk-angular.module';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class WebhookAuthService {
  private webhookUser$ = new BehaviorSubject<WebhookUserInterface | null>(null);

  constructor(private readonly ssoRestSdkAngularService: WebhookRestSdkAngularService) {}

  getWebhookUser() {
    return this.webhookUser$.value;
  }

  loadWebhookUser() {
    return this.ssoRestSdkAngularService
      .getWebhookApi()
      .webhookControllerProfile()
      .pipe(
        tap((profile) => this.webhookUser$.next(profile)),
        catchError((err: { error?: WebhookErrorInterface }) => {
          if (err.error?.code === 'WEBHOOK-002') {
            return of(null);
          }
          return throwError(() => err);
        })
      );
  }

  webhookUserUpdates() {
    return this.webhookUser$.asObservable();
  }
}
