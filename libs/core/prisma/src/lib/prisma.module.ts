import {
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter,
  NestModuleCategory,
  ProjectUtils,
} from '@nestjs-mod/common';
import { PrismaInfrastructureUpdaterService } from './infrastructure/prisma-infrastructure-updater.service';
import { PrismaSchemaFileService } from './infrastructure/prisma-schema-file.service';
import { PrismaClientFactoryService } from './prisma_client-factory.service';
import { PrismaConfiguration } from './prisma.configuration';
import { PRISMA_MODULE_NAME } from './prisma.constants';
import { PrismaEnvironments } from './prisma.environments';
import { PRISMA_CLIENT } from './prisma.decorators';

export const { PrismaModule } = createNestModule({
  moduleName: PRISMA_MODULE_NAME,
  moduleCategory: NestModuleCategory.core,
  moduleDescription: 'Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version only for Postgres)',
  staticConfigurationModel: PrismaConfiguration,
  environmentsModel: PrismaEnvironments,
  sharedProviders: () => [
    PrismaClientFactoryService,
    {
      provide: PRISMA_CLIENT,
      useFactory: (prismaClientFactoryService: PrismaClientFactoryService) => {
        return prismaClientFactoryService.createPrismaClient();
      },
      inject: [PrismaClientFactoryService],
    },
  ],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    if (asyncModuleOptions.staticConfiguration?.featureName) {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(asyncModuleOptions.staticConfiguration.featureName);
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: asyncModuleOptions.staticConfiguration?.featureName,
        },
      });
    }
    return { asyncModuleOptions };
  },
  preWrapApplication: async ({ project, modules, current }) => {
    if (!modules[NestModuleCategory.infrastructure]) {
      modules[NestModuleCategory.infrastructure] = [];
    }
    modules[NestModuleCategory.infrastructure]!.push(
      createNestModule({
        project,
        moduleName: PRISMA_MODULE_NAME,
        moduleDescription:
          'Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version only for Postgres)',
        staticConfigurationModel: PrismaConfiguration,
        environmentsModel: PrismaEnvironments,
        wrapForRootAsync: (asyncModuleOptions) => {
          if (!asyncModuleOptions) {
            asyncModuleOptions = {};
          }
          if (asyncModuleOptions.staticConfiguration?.featureName) {
            const FomatterClass = getFeatureDotEnvPropertyNameFormatter(
              asyncModuleOptions.staticConfiguration.featureName
            );
            Object.assign(asyncModuleOptions, {
              environmentsOptions: {
                propertyNameFormatters: [new FomatterClass()],
                name: asyncModuleOptions.staticConfiguration?.featureName,
              },
            });
          }
          return { asyncModuleOptions };
        },
        imports: [
          ProjectUtils.forFeature({
            featureModuleName: PRISMA_MODULE_NAME,
            contextName: current.asyncModuleOptions.contextName,
          }),
        ],
        providers: [PrismaSchemaFileService, PrismaInfrastructureUpdaterService],
      }).PrismaModule.forRootAsync(current.asyncModuleOptions)
    );
  },
});
