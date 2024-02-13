A simple example of generating a link to upload and download a picture.

```typescript
import { NestFactory } from '@nestjs/core';

import { DefaultBucketNames, MinioFilesService, MinioModule, PresignedUrlsRequest } from '@nestjs-mod/minio';
import { Controller, Get, Module, Query } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

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

process.env.MINIO_SERVER_HOST = 'localhost';
process.env.MINIO_SERVER_PORT = '9000';
process.env.MINIO_ACCESS_KEY = 'minioadmin';
process.env.MINIO_SECRET_KEY = '6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq';
process.env.MINIO_USE_SSL = 'false';
process.env.MINIO_DEFAULT_USER_ID = 'default';

@Module({
  imports: [MinioModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

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

bootstrap();
```
