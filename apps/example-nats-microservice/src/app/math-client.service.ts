/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs';
import * as nats from 'nats';

@Injectable()
export class MathClientService {
  private logger = new Logger(MathClientService.name);

  sumResult: any[] = [];
  getDateResult: any[] = [];
  asyncSumResult: any[] = [];
  observableSumResult: any[] = [];
  handleUserCreatedResult: any[] = [];

  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  sum(payload: number[]) {
    return this.client.send<number>({ cmd: 'sum' }, payload).pipe(
      tap((result) => {
        this.sumResult.push(result);
        this.logger.log({ sum: result });
      })
    );
  }

  getDate(payload: number[]) {
    // somewhere in your code
    const headers = nats.headers();
    headers.set('x-request-id', 'my-request-id');

    const record = new NatsRecordBuilder(payload).setHeaders(headers).build();
    return this.client.send<number>('time.us.east', record).pipe(
      tap((result) => {
        this.getDateResult.push(result);
        this.logger.log({ getDate: result });
      })
    );
  }

  asyncSum(payload: number[]) {
    return this.client.send<number>({ cmd: 'asyncSum' }, payload).pipe(
      tap((result) => {
        this.asyncSumResult.push(result);
        this.logger.log({ asyncSum: result });
      })
    );
  }

  observableSum(payload: number[]): Observable<number> {
    return this.client.send<number>({ cmd: 'observableSum' }, payload).pipe(
      tap((result) => {
        this.observableSumResult.push(result);
        this.logger.log({ observableSum: result });
      })
    );
  }

  handleUserCreated(data: Record<string, unknown>) {
    return this.client.emit<number>('user_created', data).pipe(
      tap((result) => {
        this.handleUserCreatedResult.push(result);
        this.logger.log({ handleUserCreated: result });
      })
    );
  }
}
