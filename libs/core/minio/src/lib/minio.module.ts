import { NestModuleCategory, createNestModule, isInfrastructureMode } from '@nestjs-mod/common';
import { NestMinioModule, NestMinioService } from 'nestjs-minio';
import { MinioFilesBootstrapService } from './minio-files-bootstrap.service';
import { MinioFilesService } from './minio-files.service';
import { MinioConfiguration } from './minio.configuration';
import { MINIO_MODULE_NAME } from './minio.constants';
import { MinioEnvironments } from './minio.environments';
import { MinioService } from './minio.service';

export const { MinioModule } = createNestModule({
  moduleName: MINIO_MODULE_NAME,
  moduleCategory: NestModuleCategory.feature,
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
                ...staticConfiguration,
                ...staticEnvironments,
                endPoint: staticEnvironments.serverHost,
                port: +staticEnvironments.serverPort!,
                useSSL: String(staticEnvironments.useSSL) === 'true',
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
});
