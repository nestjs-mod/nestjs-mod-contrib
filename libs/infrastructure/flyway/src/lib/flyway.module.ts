import {
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter,
  NestModuleCategory,
  ProjectUtils,
} from '@nestjs-mod/common';
import { FlywayConfiguration } from './flyway.configuration';
import { FLYWAY_MODULE_NAME } from './flyway.constants';
import { FlywayEnvironments } from './flyway.environments';
import { FlywayConfigFileService } from './infrastructure/flyway-config-file.service';
import { FlywayInfrastructureUpdaterService } from './infrastructure/flyway-infrastructure-updater.service';

export const { Flyway } = createNestModule({
  moduleName: FLYWAY_MODULE_NAME,
  moduleCategory: NestModuleCategory.infrastructure,
  moduleDescription:
    'Flyway - utility for working with database migrations (official site: https://flywaydb.org, preview version only for Postgres)',
  staticConfigurationModel: FlywayConfiguration,
  environmentsModel: FlywayEnvironments,
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
        moduleName: FLYWAY_MODULE_NAME,
        moduleDescription:
          'Flyway - utility for working with database migrations (official site: https://flywaydb.org, preview version only for Postgres)',
        staticConfigurationModel: FlywayConfiguration,
        environmentsModel: FlywayEnvironments,
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
            featureModuleName: FLYWAY_MODULE_NAME,
            contextName: current.asyncModuleOptions.contextName,
          }),
        ],
        providers: [FlywayConfigFileService, FlywayInfrastructureUpdaterService],
      }).Flyway.forRootAsync(current.asyncModuleOptions)
    );
  },
});
