/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { setInterval } from 'timers';
import { PrismaError } from './prisma-errors';
import { PrismaConfiguration } from './prisma.configuration';
import { PrismaEnvironments } from './prisma.environments';

@Injectable()
export class PrismaClientFactoryService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger('PrismaClient');
  private dbPingers: NodeJS.Timer[] = [];

  prismaClients: any[] = [];

  constructor(
    private readonly prismaConfiguration: PrismaConfiguration,
    private readonly prismaEnvironments: PrismaEnvironments
  ) {}

  async createPrismaClient() {
    if (this.prismaConfiguration?.prismaClientFactory) {
      const prismaClientAsPromise = this.prismaConfiguration?.prismaClientFactory({
        url: this.prismaEnvironments.databaseUrl,
        log: [
          {
            emit: 'event',
            level: 'query',
          },
          {
            emit: 'event',
            level: 'error',
          },
        ],
      });
      if (prismaClientAsPromise && prismaClientAsPromise.then) {
        const prismaClient = await prismaClientAsPromise;
        this.prismaClients.push(prismaClient);
        return prismaClient;
      }
      this.prismaClients.push(prismaClientAsPromise);
      return prismaClientAsPromise;
    }

    if (!this.prismaConfiguration?.prismaModule) {
      throw new PrismaError(`prismaModule not set`);
    }
    const prismaModule = await this.prismaConfiguration?.prismaModule;
    if (!prismaModule.PrismaClient) {
      throw new PrismaError(`PrismaClient not found`);
    }
    const prismaClient = new prismaModule.PrismaClient({
      datasources: {
        db: {
          url: this.prismaEnvironments.databaseUrl,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });
    this.prismaClients.push(prismaClient);
    return prismaClient;
  }

  private getLogger() {
    // todo: add info about feature name and context name
    return this.prismaConfiguration.defaultLogger ?? this.logger;
  }

  async onModuleInit() {
    for (const prismaClient of this.prismaClients) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prismaClient.$on('query', (e: any) => {
          if (this.prismaConfiguration.logging === 'all_queries') {
            if (e.query !== 'SELECT 1') {
              this.getLogger().log(`query: ${e.query}, params: ${e.params}, duration: ${e.duration}`);
            }
          }
          if (this.prismaConfiguration.logging === 'long_queries') {
            if (e.duration >= this.prismaConfiguration.maxQueryExecutionTime!) {
              this.getLogger().warn(`query is slow: ${e.query}, params: ${e.params}, execution time: ${e.duration}`);
            }
          }
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prismaClient.$on('error', (e: any) => {
          if (this.prismaConfiguration.logging === 'all_queries') {
            if (e.query !== 'SELECT 1') {
              this.getLogger().log(`query: ${e.query}, params: ${e.params}, duration: ${e.duration}`);
            }
          }
          if (this.prismaConfiguration.logging === 'long_queries') {
            if (e.duration >= this.prismaConfiguration.maxQueryExecutionTime!) {
              this.getLogger().warn(`query is slow: ${e.query}, params: ${e.params}, execution time: ${e.duration}`);
            }
          }
        });
        await prismaClient.$connect();

        this.getLogger().log('Connected to database!');
        const logger = this.getLogger();

        if ((this.prismaConfiguration?.pingDatabaseIntervalMs ?? 0) > 0) {
          this.dbPingers.push(
            setInterval(function () {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              prismaClient.$queryRaw`SELECT 1`.catch((err: any) => logger.error(err, err.stack));
            }, this.prismaConfiguration.pingDatabaseIntervalMs)
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (!String(err).includes('fake')) {
          this.getLogger().error(err, err.stack);
        }
      }
    }
  }

  async onModuleDestroy() {
    for (const dbPinger of this.dbPingers) {
      clearInterval(dbPinger);
    }
  }
}
