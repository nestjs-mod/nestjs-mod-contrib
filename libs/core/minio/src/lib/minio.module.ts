import {
  NestModuleCategory,
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { NestMinioModule, NestMinioService } from 'nestjs-minio';
import { MinioFilesBootstrapService } from './minio-files-bootstrap.service';
import { MinioFilesService } from './minio-files.service';
import { MinioConfiguration } from './minio.configuration';
import { MINIO_MODULE_NAME } from './minio.constants';
import { MinioEnvironments } from './minio.environments';
import { MinioService } from './minio.service';

export const { MinioModule } = createNestModule({
  moduleName: MINIO_MODULE_NAME,
  moduleCategory: NestModuleCategory.core,
  staticConfigurationModel: MinioConfiguration,
  staticEnvironmentsModel: MinioEnvironments,
  sharedProviders: [{ provide: MinioService, useValue: {} }, MinioFilesService],
  imports: ({ staticConfiguration, staticEnvironments }) =>
    isInfrastructureMode()
      ? []
      : [
          NestMinioModule.registerAsync({
            useFactory: () => {
              return {
                accessKey: staticEnvironments.minioAccessKey,
                secretKey: staticEnvironments.minioSecretKey,
                endPoint: staticEnvironments.minioServerHost,
                port: +staticEnvironments.minioServerPort!,
                useSSL: staticEnvironments.minioUseSSL === 'true',
                credentialsProvider: staticConfiguration.credentialsProvider,
                partSize: staticConfiguration.partSize,
                pathStyle: staticConfiguration.pathStyle,
                region: staticConfiguration.region,
                s3AccelerateEndpoint: staticConfiguration.s3AccelerateEndpoint,
                sessionToken: staticConfiguration.sessionToken,
                transport: staticConfiguration.transport,
                transportAgent: staticConfiguration.transportAgent,
              };
            },
          }),
        ],
  providers: isInfrastructureMode()
    ? []
    : [
        {
          // need for patch empty service
          provide: 'MinioService_loader',
          useFactory: async (emptyMinioService: MinioService, nestMinioService: NestMinioService) => {
            const obj = nestMinioService.getMinio();
            Object.setPrototypeOf(emptyMinioService, obj);
            Object.assign(emptyMinioService, obj);
          },
          inject: [MinioService, NestMinioService],
        },
        MinioFilesBootstrapService,
      ],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (asyncModuleOptions && asyncModuleOptions.staticConfiguration?.minioFeatureName) {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(
        asyncModuleOptions.staticConfiguration.minioFeatureName
      );
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: asyncModuleOptions.staticConfiguration?.minioFeatureName,
        },
      });
    }
    return { asyncModuleOptions };
  },
});
