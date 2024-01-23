/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaError } from './prisma-errors';
import { PrismaConfiguration } from './prisma.configuration';
import { PrismaEnvironments } from './prisma.environments';

@Injectable()
export class PrismaClientFactoryService implements OnModuleInit {
  private logger = new Logger('PrismaClient');

  prismaClients: any[] = [];

  constructor(
    private readonly prismaConfiguration: PrismaConfiguration,
    private readonly prismaEnvironments: PrismaEnvironments
  ) {}

  async createPrismaClient() {
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
    return this.prismaConfiguration.defaultLogger ?? this.logger;
  }

  async onModuleInit() {
    for (let index = 0; index < this.prismaClients.length; index++) {
      const prismaClient = this.prismaClients[index];
      {
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
          setInterval(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prismaClient.$queryRaw`SELECT 1`.catch((err: any) => this.getLogger().error(err, err.stack));
          }, 5 * 60000);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          if (!String(err).includes('fake')) {
            this.getLogger().error(err, err.stack);
          }
          await prismaClient.$disconnect();
        }
      }
    }
  }
}
