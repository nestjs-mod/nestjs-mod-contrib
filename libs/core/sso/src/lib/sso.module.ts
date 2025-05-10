import {
  NestModuleCategory,
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter,
} from '@nestjs-mod/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { SsoConfiguration } from './sso.configuration';
import { SSO_FEATURE, SSO_MODULE } from './sso.constants';
import { SsoStaticEnvironments } from './sso.environments';
import { SsoExceptionsFilter } from './sso.filter';
import { SsoGuard } from './sso.guard';
import { SsoService } from './sso.service';

export const { SsoModule } = createNestModule({
  moduleName: SSO_MODULE,
  moduleCategory: NestModuleCategory.core,
  moduleDescription: 'NestJS SDK for Single Sign-On on NestJS and Angular with webhooks and social authorization (Wrapper for https://www.npmjs.com/package/@nestjs-mod/sso-rest-sdk)',
  configurationModel: SsoConfiguration,
  staticEnvironmentsModel: SsoStaticEnvironments,
  sharedProviders: [SsoService],
  providers: [
    { provide: APP_GUARD, useClass: SsoGuard },
    { provide: APP_FILTER, useClass: SsoExceptionsFilter },
  ],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    const FomatterClass =
      getFeatureDotEnvPropertyNameFormatter(SSO_FEATURE);
    Object.assign(asyncModuleOptions, {
      environmentsOptions: {
        propertyNameFormatters: [new FomatterClass()],
        name: SSO_FEATURE,
      },
    });

    return { asyncModuleOptions };
  },
});
