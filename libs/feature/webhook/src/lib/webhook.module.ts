import { PrismaToolsModule } from '@nestjs-mod/prisma-tools';
import { createNestModule, getFeatureDotEnvPropertyNameFormatter, NestModuleCategory } from '@nestjs-mod/common';
import { PrismaModule } from '@nestjs-mod/prisma';
import { HttpModule } from '@nestjs/axios';
import { UseGuards } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';
import { WebhookServiceBootstrap } from './services/webhook-bootstrap.service';
import { WebhookToolsService } from './services/webhook-tools.service';
import { WebhookUsersService } from './services/webhook-users.service';
import { WebhookService } from './services/webhook.service';
import { WebhookConfiguration, WebhookFeatureConfiguration, WebhookStaticConfiguration } from './webhook.configuration';
import { WEBHOOK_FEATURE, WEBHOOK_MODULE } from './webhook.constants';
import { WebhookStaticEnvironments } from './webhook.environments';
import { WebhookExceptionsFilter } from './webhook.filter';
import { WebhookGuard } from './webhook.guard';

import { KeyvModule } from '@nestjs-mod/keyv';
import { APP_FILTER } from '@nestjs/core';
import { TranslatesModule } from 'nestjs-translates';
import { WebhookLogsController } from './controllers/webhook-logs.controller';
import { WebhookCacheService } from './services/webhook-cache.service';
import { WebhookPrismaSdk } from './webhook.prisma-sdk';
import { PrismaPg } from '@prisma/adapter-pg';


export const { WebhookModule } = createNestModule({
  moduleName: WEBHOOK_MODULE,
  moduleDescription:
    'Webhook module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction',
  moduleCategory: NestModuleCategory.feature,
  staticEnvironmentsModel: WebhookStaticEnvironments,
  featureConfigurationModel: WebhookFeatureConfiguration,
  configurationModel: WebhookConfiguration,
  staticConfigurationModel: WebhookStaticConfiguration,
  imports: [
    HttpModule,
    PrismaModule.forFeature({
      contextName: WEBHOOK_FEATURE,
      featureModuleName: WEBHOOK_FEATURE,
    }),
    PrismaToolsModule.forFeature({
      featureModuleName: WEBHOOK_FEATURE,
    }),
    KeyvModule.forFeature({
      featureModuleName: WEBHOOK_FEATURE,
    }),
    TranslatesModule,
    PrismaModule.forRoot({
      contextName: WEBHOOK_FEATURE,
      staticConfiguration: {
        featureName: WEBHOOK_FEATURE,
        provider: 'prisma-client',
        prismaClientFactory: async (options) => {
          const { url, ...otherOoptions } = options;
          const adapter = new PrismaPg({ connectionString: url });
          return new WebhookPrismaSdk.PrismaClient({
            adapter,
            ...otherOoptions,
          });
        },
      },
    }),
  ],
  sharedImports: [
    HttpModule,
    PrismaModule.forFeature({
      contextName: WEBHOOK_FEATURE,
      featureModuleName: WEBHOOK_FEATURE,
    }),
  ],
  providers: (asyncModuleOptions) => [
    WebhookToolsService,
    WebhookServiceBootstrap,
    WebhookCacheService,
    ...(asyncModuleOptions.staticEnvironments.useFilters
      ? [{ provide: APP_FILTER, useClass: WebhookExceptionsFilter }]
      : []),
  ],
  controllers: (asyncModuleOptions) =>
    [WebhookLogsController, WebhookController].map((ctrl) => {
      if (asyncModuleOptions.staticEnvironments?.useGuards) {
        UseGuards(...(asyncModuleOptions.staticConfiguration?.guards || []), WebhookGuard)(ctrl);
      }

      if (asyncModuleOptions.staticConfiguration.mutateController) {
        asyncModuleOptions.staticConfiguration.mutateController(ctrl);
      }

      return ctrl;
    }),
  sharedProviders: [WebhookService, WebhookUsersService],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    const FomatterClass = getFeatureDotEnvPropertyNameFormatter(WEBHOOK_FEATURE);
    Object.assign(asyncModuleOptions, {
      environmentsOptions: {
        propertyNameFormatters: [new FomatterClass()],
        name: WEBHOOK_FEATURE,
      },
    });

    return { asyncModuleOptions };
  },
});
