import {
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter,
  NestModuleCategory,
  ProjectUtils,
} from '@nestjs-mod/common';
import { PrismaInfrastructureUpdaterService } from './infrastructure/prisma-infrastructure-updater.service';
import { PrismaSchemaFileService } from './infrastructure/prisma-schema-file.service';
import { PrismaClientFactoryService } from './prisma-client-factory.service';
import { PrismaConfiguration } from './prisma.configuration';
import { PRISMA_MODULE_NAME } from './prisma.constants';
import { getPrismaFeatureToken } from './prisma.decorators';
import { PrismaEnvironments } from './prisma.environments';

export const { PrismaModule } = createNestModule({
  moduleName: PRISMA_MODULE_NAME,
  moduleCategory: NestModuleCategory.core,
  moduleDescription: 'Next-generation Node.js and TypeScript ORM for NestJS-mod (preview version only for Postgres)',
  staticConfigurationModel: PrismaConfiguration,
  environmentsModel: PrismaEnvironments,
  sharedProviders: [
    PrismaClientFactoryService,
    {
      provide: getPrismaFeatureToken(),
      useFactory: (prismaClientFactoryService: PrismaClientFactoryService) => {
        return prismaClientFactoryService.createPrismaClient();
      },
      inject: [PrismaClientFactoryService],
    },
  ],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (asyncModuleOptions && asyncModuleOptions.staticConfiguration?.prismaFeatureName) {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(
        asyncModuleOptions.staticConfiguration.prismaFeatureName
      );
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: asyncModuleOptions.staticConfiguration?.prismaFeatureName,
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
          if (asyncModuleOptions && asyncModuleOptions.staticConfiguration?.prismaFeatureName) {
            const FomatterClass = getFeatureDotEnvPropertyNameFormatter(
              asyncModuleOptions.staticConfiguration.prismaFeatureName
            );
            Object.assign(asyncModuleOptions, {
              environmentsOptions: {
                propertyNameFormatters: [new FomatterClass()],
                name: asyncModuleOptions.staticConfiguration?.prismaFeatureName,
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
