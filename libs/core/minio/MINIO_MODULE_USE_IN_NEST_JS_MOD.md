An example of using Minio, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-minio and frontend on Angular here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-minio-angular.

For work with Minio, you must first connect the Docker Compose module and the Docker Compose module to work with the Minio.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  createNestModule,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DefaultBucketNames, MinioFilesService, MinioModule, PresignedUrlsRequest } from '@nestjs-mod/minio';
import { Controller, Get, Query } from '@nestjs/common';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
import { userFeatureName } from './app/app.constants';

import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeMinio } from '@nestjs-mod/docker-compose';

@Controller()
export class AppController {
  constructor(private readonly minioFilesService: MinioFilesService) {}

  @Get('images-presigned-url')
  getImagesPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.images,
      expiry: 60,
      ext: request.ext,
    });
  }

  @Get('video-presigned-url')
  getVideoPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.video,
      expiry: 60,
      ext: request.ext,
    });
  }

  @Get('documents-presigned-url')
  getDocumentsPresignedUrl(@Query() request: PresignedUrlsRequest) {
    return this.minioFilesService.getPresignedUrls({
      bucketName: DefaultBucketNames.documents,
      expiry: 60,
      ext: request.ext,
    });
  }
}

const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  imports: [MinioModule.forFeature()],
  controllers: [AppController],
});

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-minio');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot({
        staticConfiguration: {
          bufferLogs: true,
        },
      }),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
          postListen: async ({ app }) => {
            if (app) {
              const appController = app.get<AppController>(AppController);
              console.log(await lastValueFrom(appController.getImagesPresignedUrl({ ext: 'png' })));
              /**
               * output:
               * {
               *   uploadUrl: '/images/default/images_ac98618c-f2ec-4a2f-a4a8-a4690e8fd543.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240213T071934Z&X-Amz-Expires=60&X-Amz-SignedHeaders=host&X-Amz-Signature=ea5c4246876c0c15a57e7c6cb0035fb3122c4887b052d2138d643f3e88e8a4c3',
               *   downloadUrl: '/images/default/images_ac98618c-f2ec-4a2f-a4a8-a4690e8fd543.png'
               * }
               */
            }
          },
        },
      }),
    ],
    core: [MinioModule.forRoot()],
    feature: [AppModule.forRoot()],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(appFolder, 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposeMinio.forRoot({
        staticConfiguration: {
          nginxPort: 1111,
          nginxFilesFolder: join(appFolder, 'ngnix'),
          featureName: userFeatureName,
        },
      }),
    ],
  },
});
```

New environment variable

```bash
EXAMPLE_MINIO_MINIO_SERVER_HOST=localhost
EXAMPLE_MINIO_MINIO_SERVER_PORT=9000
EXAMPLE_MINIO_MINIO_ACCESS_KEY=minioadmin
EXAMPLE_MINIO_MINIO_SECRET_KEY=6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq
EXAMPLE_MINIO_MINIO_USE_SSL=false
EXAMPLE_MINIO_MINIO_DEFAULT_USER_ID=default
EXAMPLE_MINIO_PORT=3006
EXAMPLE_MINIO_HOSTNAME=
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.
