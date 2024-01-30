An example of using forRoot with parameters, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-pino-logger.

Passing requestId from the frontend is supported.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
import { NestjsPinoLogger } from '@nestjs-mod/pino';

bootstrapNestApplication({
  modules: {
    system: [
      DefaultNestApplicationInitializer.forRoot(),
      NestjsPinoLogger.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticEnvironments: { port: 3000 },
      }),
    ],
  },
});
```
