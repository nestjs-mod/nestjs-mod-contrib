import { ConfigType } from '@authorizerdev/authorizer-js';
import {
  NestModuleCategory,
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { Reflector } from '@nestjs/core';
import { AuthorizerConfiguration, AuthorizerStaticConfiguration } from './authorizer.configuration';
import { AUTHORIZER_ENV_PREFIX, AUTHORIZER_MODULE_NAME } from './authorizer.constants';
import { AuthorizerEnvironments } from './authorizer.environments';
import { AuthorizerService } from './authorizer.service';

export const { AuthorizerModule } = createNestModule({
  moduleName: AUTHORIZER_MODULE_NAME,
  moduleCategory: NestModuleCategory.core,
  moduleDescription: 'Universal javaScript SDK for Authorizer API',
  configurationModel: AuthorizerConfiguration,
  staticConfigurationModel: AuthorizerStaticConfiguration,
  environmentsModel: AuthorizerEnvironments,
  controllers: [],
  sharedProviders: [{ provide: AuthorizerService, useValue: {} }],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    if (asyncModuleOptions.staticConfiguration?.featureName) {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(
        `${AUTHORIZER_ENV_PREFIX}_${asyncModuleOptions.staticConfiguration?.featureName}`
      );
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: `${AUTHORIZER_ENV_PREFIX}_${asyncModuleOptions.staticConfiguration?.featureName}`,
        },
      });
    } else {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(AUTHORIZER_ENV_PREFIX);
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: AUTHORIZER_ENV_PREFIX,
        },
      });
    }
    return { asyncModuleOptions };
  },
  providers: (options) =>
    isInfrastructureMode()
      ? []
      : [
          {
            // need for patch empty service
            provide: `${AUTHORIZER_MODULE_NAME}_loader`,
            useFactory: async (
              emptyAuthorizerService: AuthorizerService,
              authorizerEnvironments: AuthorizerEnvironments,
              authorizerConfiguration: AuthorizerConfiguration,
              reflector: Reflector
            ) => {
              const authorizerService = new AuthorizerService(
                {
                  authorizerURL: authorizerEnvironments.authorizerURL,
                  redirectURL: authorizerEnvironments.redirectURL,
                  clientID: authorizerEnvironments.clientId || '',
                  extraHeaders: {
                    ...authorizerConfiguration.extraHeaders,
                    ...(authorizerEnvironments.adminSecret
                      ? {
                          'x-authorizer-admin-secret': authorizerEnvironments.adminSecret,
                        }
                      : {}),
                  },
                } as ConfigType,
                reflector,
                authorizerConfiguration,
                authorizerEnvironments
              );

              Object.setPrototypeOf(emptyAuthorizerService, authorizerService);
              Object.assign(emptyAuthorizerService, authorizerService);
            },
            inject: [AuthorizerService, AuthorizerEnvironments, Reflector, AuthorizerConfiguration],
          },
        ],
});
