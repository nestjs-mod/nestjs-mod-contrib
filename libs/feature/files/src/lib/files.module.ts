import { createNestModule, getFeatureDotEnvPropertyNameFormatter, NestModuleCategory } from '@nestjs-mod/common';
import { FilesController } from './controllers/files.controller';
import { FilesConfiguration } from './files.configuration';
import { FILES_FEATURE, FILES_MODULE } from './files.constants';
import { FilesStaticEnvironments } from './files.environments';
import { WebhookModule } from '@nestjs-mod/webhook';
import { FILES_WEBHOOK_EVENTS } from './types/files-webhooks';


export const { FilesModule } = createNestModule({
  moduleName: FILES_MODULE,
  moduleDescription:
    'Files module with an error filter, controller and rest-sdk for work with module from other nodejs appliaction',
  moduleCategory: NestModuleCategory.feature,
  configurationModel: FilesConfiguration,
  staticEnvironmentsModel: FilesStaticEnvironments,
  imports: [
    WebhookModule.forFeature({
      featureModuleName: FILES_FEATURE,
      featureConfiguration: { events: FILES_WEBHOOK_EVENTS },
    }),
  ],
  controllers: [FilesController],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    const FomatterClass = getFeatureDotEnvPropertyNameFormatter(FILES_FEATURE);
    Object.assign(asyncModuleOptions, {
      environmentsOptions: {
        propertyNameFormatters: [new FomatterClass()],
        name: FILES_FEATURE,
      },
    });

    return { asyncModuleOptions };
  },
});
