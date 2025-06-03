import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ReplaySubject } from 'rxjs';
import { TwoFactorEventContext } from './two-factor-types';

type TwoFactorSsoEventCallback = (
  event: Partial<TwoFactorEventContext>
) => Promise<void>;

@Injectable()
export class TwoFactorEventsService {
  private logger = new Logger(TwoFactorEventsService.name);
  private twoFactorEventStream$ = new ReplaySubject<
    Partial<TwoFactorEventContext>
  >();
  private twoFactorEventCallbacks: TwoFactorSsoEventCallback[] = [];

  private id = randomUUID();

  async send(event: Partial<TwoFactorEventContext>) {
    if (event.serviceId !== this.id) {
      event.serviceId = this.id;
      this.logger.debug(`send: ${JSON.stringify(event)}`);
      this.twoFactorEventStream$.next(event);
      for (const twoFactorEventCallback of this.twoFactorEventCallbacks) {
        await twoFactorEventCallback(event);
      }
    }
  }

  listen(twoFactorEventCallback?: TwoFactorSsoEventCallback) {
    if (twoFactorEventCallback) {
      this.logger.debug(`append new callback...`);
      this.twoFactorEventCallbacks.push(twoFactorEventCallback);
      return null;
    } else {
      this.logger.debug(`listen...`);
      return this.twoFactorEventStream$;
    }
  }
}
