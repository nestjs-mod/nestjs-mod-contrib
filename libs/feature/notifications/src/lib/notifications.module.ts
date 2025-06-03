import { PrismaToolsModule } from '@nestjs-mod/prisma-tools';
import { WebhookModule } from '@nestjs-mod/webhook';
import { createNestModule, getFeatureDotEnvPropertyNameFormatter, NestModuleCategory } from '@nestjs-mod/common';
import { PrismaModule } from '@nestjs-mod/prisma';
import { Provider, UseGuards } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { NotificationsServiceBootstrap } from './notifications-bootstrap.service';
import { NotificationsConfiguration, NotificationsStaticConfiguration } from './notifications.configuration';
import { NOTIFICATIONS_FEATURE, NOTIFICATIONS_MODULE } from './notifications.constants';
import { NotificationsController } from './notifications.controller';
import { NotificationsStaticEnvironments } from './notifications.environments';
import { NotificationsExceptionsFilter } from './notifications.filter';
import { NotificationsGuard } from './notifications.guard';
import { NotificationsService } from './notifications.service';
import { NOTIFICATIONS_WEBHOOK_EVENTS } from './types/notifications-webhooks';
import { PrismaPg } from '@prisma/adapter-pg';
import { NotificationsPrismaSdk } from './notifications.prisma-sdk';

export const { NotificationsModule } = createNestModule({
  moduleName: NOTIFICATIONS_MODULE,
  moduleDescription:
    'Notifications module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction',
  moduleCategory: NestModuleCategory.feature,
  staticEnvironmentsModel: NotificationsStaticEnvironments,
  staticConfigurationModel: NotificationsStaticConfiguration,
  configurationModel: NotificationsConfiguration,
  imports: [
    PrismaModule.forFeature({
      contextName: NOTIFICATIONS_FEATURE,
      featureModuleName: NOTIFICATIONS_FEATURE,
    }),
    PrismaToolsModule.forFeature({
      featureModuleName: NOTIFICATIONS_FEATURE,
    }),
    PrismaModule.forRoot({
      contextName: NOTIFICATIONS_FEATURE,
      staticConfiguration: {
        featureName: NOTIFICATIONS_FEATURE,

        provider: 'prisma-client',
        prismaClientFactory: async (options) => {
          const { url, ...otherOoptions } = options;
          const adapter = new PrismaPg({ connectionString: url });
          return new NotificationsPrismaSdk.PrismaClient({
            adapter,
            ...otherOoptions,
          });
        },
      },
    }),
    WebhookModule.forFeature({
      featureModuleName: NOTIFICATIONS_FEATURE,
      featureConfiguration: { events: NOTIFICATIONS_WEBHOOK_EVENTS },
    }),
  ],
  sharedImports: [
    PrismaModule.forFeature({
      contextName: NOTIFICATIONS_FEATURE,
      featureModuleName: NOTIFICATIONS_FEATURE,
    }),
    PrismaToolsModule.forFeature({
      featureModuleName: NOTIFICATIONS_FEATURE,
    }),
    WebhookModule.forFeature({
      featureModuleName: NOTIFICATIONS_FEATURE,
    }),
  ],
  sharedProviders: [NotificationsService],
  providers: ({ staticEnvironments }) => {
    const providers: Provider[] = [NotificationsServiceBootstrap];
    if (staticEnvironments.useFilters) {
      providers.push({
        provide: APP_FILTER,
        useClass: NotificationsExceptionsFilter,
      });
    }
    return providers;
  },
  controllers: (asyncModuleOptions) =>
    [NotificationsController].map((ctrl) => {
      UseGuards(...(asyncModuleOptions.staticConfiguration?.guards || []), NotificationsGuard)(ctrl);

      if (asyncModuleOptions.staticConfiguration.mutateController) {
        asyncModuleOptions.staticConfiguration.mutateController(ctrl);
      }

      return ctrl;
    }),
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    const FomatterClass = getFeatureDotEnvPropertyNameFormatter(NOTIFICATIONS_FEATURE);
    Object.assign(asyncModuleOptions, {
      environmentsOptions: {
        propertyNameFormatters: [new FomatterClass()],
        name: NOTIFICATIONS_FEATURE,
      },
    });

    return { asyncModuleOptions };
  },
});
