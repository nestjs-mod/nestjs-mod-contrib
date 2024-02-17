import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  bootstrapNestApplication,
  createNestModule,
} from '@nestjs-mod/common';
import { RedisNestMicroservice } from '@nestjs-mod/microservices';
import { Logger } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TestingModule } from '@nestjs/testing';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { setTimeout } from 'timers/promises';
import { AppModule } from './app.module';
import { MathClientService } from './math-client.service';
import { MathController } from './math.controller';

describe('Math over REDIS', () => {
  let server: TestingModule;
  let client: TestingModule;

  let container: StartedTestContainer;

  let mathController: MathController;

  beforeAll(async () => {
    container = await new GenericContainer('bitnami/redis:7.2')
      .withExposedPorts(6379)
      .withEnvironment({
        REDIS_DATABASE: '0',
        REDIS_PASSWORD: 'redis_password',
        REDIS_DISABLE_COMMANDS: 'FLUSHDB,FLUSHALL',
        REDIS_IO_THREADS: '2',
        REDIS_IO_THREADS_DO_READS: 'yes',
      })
      .start();

    server = await bootstrapNestApplication({
      logger: new Logger('Server'),
      project: {
        name: 'TestMicroserviceServer',
        description: 'Test microservice server',
      },
      modules: {
        system: [
          RedisNestMicroservice.forRoot({
            staticEnvironments: {
              host: container.getHost(),
              port: container.getMappedPort(6379),
              password: 'redis_password',
            },
          }),
          DefaultNestApplicationListener.forRoot(),
        ],
        feature: [AppModule.forRoot()],
      },
    });

    mathController = server.get<MathController>(MathController);

    client = await bootstrapNestApplication({
      logger: new Logger('Client'),
      project: {
        name: 'TestMicroserviceClient',
        description: 'Test microservice client',
      },
      modules: {
        system: [
          DefaultNestApplicationInitializer.forRoot(),
          DefaultNestApplicationListener.forRoot({ staticConfiguration: { mode: 'init' } }),
        ],
        feature: [
          createNestModule({
            moduleName: 'MicroserviceClientModule',
            imports: [
              ClientsModule.register([
                {
                  name: 'MATH_SERVICE',
                  transport: Transport.REDIS,
                  options: {
                    host: container.getHost(),
                    port: container.getMappedPort(6379),
                    password: 'redis_password',
                  },
                },
              ]),
            ],
            providers: [MathClientService],
          }).MicroserviceClientModule.forRoot(),
        ],
      },
    });
  });

  afterAll(async () => {
    await client.close();
    await server.close();

    await container.stop();
  });

  describe('sum', () => {
    it('should return "6"', async () => {
      const mathClientService = client.get<MathClientService>(MathClientService);
      const result = await lastValueFrom(mathClientService.sum([1, 2, 3]));
      expect(result).toEqual(6);

      expect(mathClientService.sumResult).toEqual([6]);
      expect(mathController.sumResult).toEqual([[1, 2, 3]]);
    });
  });

  describe('getDate', () => {
    it('should return "time.us.east"', async () => {
      const mathClientService = client.get<MathClientService>(MathClientService);
      expect(await firstValueFrom(mathClientService.getDate([1, 2, 3]))).toHaveLength(new Date().toISOString().length);
      console.log(mathClientService.getDateResult);
      console.log(mathController.getDateResult);
      expect(mathClientService.getDateResult[0]).toHaveLength(new Date().toISOString().length);
      expect(mathController.getDateResult).toEqual([[1, 2, 3]]);
    });
  });

  describe('asyncSum', () => {
    it('should return "6"', async () => {
      const mathClientService = client.get<MathClientService>(MathClientService);
      const result = await lastValueFrom(mathClientService.asyncSum([1, 2, 3]));
      expect(result).toEqual(6);

      expect(mathClientService.asyncSumResult).toEqual([6]);
      expect(mathController.asyncSumResult).toEqual([[1, 2, 3]]);
    });
  });

  describe('observableSum', () => {
    it('should return "54"', async () => {
      const mathClientService = client.get<MathClientService>(MathClientService);
      const result = await lastValueFrom(mathClientService.observableSum([1, 2, 3]));
      expect(result).toEqual(54);

      expect(mathClientService.observableSumResult).toEqual([6, 22, 54]);
      expect(mathController.observableSumResult).toEqual([[1, 2, 3]]);
    });
  });

  describe('handleUserCreated', () => {
    it('should return "undefined"', async () => {
      const mathClientService = client.get<MathClientService>(MathClientService);
      const result = await lastValueFrom(mathClientService.handleUserCreated({ userId: 1 }));
      expect(result).toEqual(undefined);
      await setTimeout(1000);

      expect(mathClientService.handleUserCreatedResult).toEqual([undefined]);
      expect(mathController.handleUserCreatedResult).toEqual([{ userId: 1 }]);
    });
  });
});
