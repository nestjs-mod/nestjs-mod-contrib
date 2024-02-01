import { createNestModule, NestModuleCategory, ProjectUtils } from '@nestjs-mod/common';
import { FlywayConfiguration } from './flyway.configuration';
import { FLYWAY_MODULE_NAME } from './flyway.constants';
import { FlywayEnvironments } from './flyway.environments';
import { getFlywayDotEnvPropertyNameFormatter } from './formatters/dot-env-property-name.formatter';
import { FlywayConfigFileService } from './infrastructure/flyway-config-file.service';
import { FlywayInfrastructureUpdaterService } from './infrastructure/flyway-infrastructure-updater.service';

export const { FlywayModule } = createNestModule({
  moduleName: FLYWAY_MODULE_NAME,
  moduleCategory: NestModuleCategory.infrastructure,
  moduleDescription:
    'Flyway - utility for working with database migrations (official site: https://flywaydb.org, preview version only for Postgres)',
  staticConfigurationModel: FlywayConfiguration,
  environmentsModel: FlywayEnvironments,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapForRootAsync: ((asyncModuleOptions: any) => {
    Object.assign(asyncModuleOptions, {
      environmentsOptions: {
        propertyNameFormatters: [
          getFlywayDotEnvPropertyNameFormatter(asyncModuleOptions.staticConfiguration?.flywayFeatureName),
        ],
        name: asyncModuleOptions.staticConfiguration?.flywayFeatureName,
      },
    });
    return { asyncModuleOptions };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wrapForRootAsync: ((asyncModuleOptions: any) => {
          Object.assign(asyncModuleOptions, {
            environmentsOptions: {
              propertyNameFormatters: [
                getFlywayDotEnvPropertyNameFormatter(asyncModuleOptions.staticConfiguration?.flywayFeatureName),
              ],
              name: asyncModuleOptions.staticConfiguration?.flywayFeatureName,
            },
          });
          return { asyncModuleOptions };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
        imports: [
          ProjectUtils.forFeature({
            featureModuleName: FLYWAY_MODULE_NAME,
            contextName: current.asyncModuleOptions.contextName,
          }),
        ],
        providers: [FlywayConfigFileService, FlywayInfrastructureUpdaterService],
      }).FlywayModule.forRootAsync(current.asyncModuleOptions)
    );
  },
});
