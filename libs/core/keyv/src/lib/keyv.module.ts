import { NestModuleCategory, createNestModule, getFeatureDotEnvPropertyNameFormatter } from '@nestjs-mod/common';

import Keyv from 'keyv';
import { KeyvConfiguration } from './keyv.configuration';
import { KEYV_ENV_PREFIX, KEYV_MODULE_NAME } from './keyv.constants';
import { getKeyvEnvironmentsLoaderToken } from './keyv.decorators';
import { KeyvEnvironments } from './keyv.environments';
import { KeyvService } from './keyv.service';

export const { KeyvModule } = createNestModule({
  moduleName: KEYV_MODULE_NAME,
  moduleDescription:
    'Simple key-value storage with support for multiple backends, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/keyv)',
  moduleCategory: NestModuleCategory.core,
  environmentsModel: KeyvEnvironments,
  staticConfigurationModel: KeyvConfiguration,
  sharedProviders: [KeyvService],
  providers: (options) => [
    {
      // need for patch empty service
      provide: 'KeyvService_loader',
      useFactory: async (
        emptyKeyvService: KeyvService,
        keyvConfiguration: KeyvConfiguration,
        keyvEnvironments: KeyvEnvironments
      ) => {
        const keyvService = new Keyv({
          ...keyvConfiguration,
          ...(keyvConfiguration.storeFactoryByEnvironmentUrl && keyvEnvironments.url
            ? { store: keyvConfiguration.storeFactoryByEnvironmentUrl(keyvEnvironments.url) }
            : {}),
        });
        Object.setPrototypeOf(emptyKeyvService, keyvService);
        Object.assign(emptyKeyvService, keyvService);
      },
      inject: [
        KeyvService,
        KeyvConfiguration,
        KeyvEnvironments,
        // need for wait resolve env config
        getKeyvEnvironmentsLoaderToken(options.contextName),
      ],
    },
  ],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    if (asyncModuleOptions.staticConfiguration?.featureName) {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(
        `${KEYV_ENV_PREFIX}_${asyncModuleOptions.staticConfiguration?.featureName}`
      );
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: `${KEYV_ENV_PREFIX}_${asyncModuleOptions.staticConfiguration?.featureName}`,
        },
      });
    } else {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(KEYV_ENV_PREFIX);
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: KEYV_ENV_PREFIX,
        },
      });
    }
    return { asyncModuleOptions };
  },
});
