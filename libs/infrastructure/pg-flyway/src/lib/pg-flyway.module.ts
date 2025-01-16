import {
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter,
  NestModuleCategory,
  ProjectUtils,
} from '@nestjs-mod/common';
import { PgFlywayInfrastructureUpdaterService } from './infrastructure/pg-flyway-infrastructure-updater.service';
import { PgFlywayConfiguration } from './pg-flyway.configuration';
import { PG_FLYWAY_MODULE_NAME } from './pg-flyway.constants';
import { PgFlywayEnvironments } from './pg-flyway.environments';

export const { PgFlyway } = createNestModule({
  moduleName: PG_FLYWAY_MODULE_NAME,
  moduleCategory: NestModuleCategory.infrastructure,
  moduleDescription:
    'PgFlyway - utility for working with database migrations (site: https://www.npmjs.com/package/pg-flyway, preview version only for Postgres)',
  staticConfigurationModel: PgFlywayConfiguration,
  environmentsModel: PgFlywayEnvironments,
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
        moduleName: PG_FLYWAY_MODULE_NAME,
        moduleDescription:
          'PgFlyway - utility for working with database migrations (site: https://www.npmjs.com/package/pg-flyway, preview version only for Postgres)',
        staticConfigurationModel: PgFlywayConfiguration,
        environmentsModel: PgFlywayEnvironments,
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
            featureModuleName: PG_FLYWAY_MODULE_NAME,
            contextName: current.asyncModuleOptions.contextName,
          }),
        ],
        providers: [PgFlywayInfrastructureUpdaterService],
      }).PgFlyway.forRootAsync(current.asyncModuleOptions)
    );
  },
});
