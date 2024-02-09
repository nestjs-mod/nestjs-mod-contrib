import { AsyncLocalStorage } from 'async_hooks';

export const NestjsPinoAsyncLocalStorage = new AsyncLocalStorage<{ requestId: string }>();
