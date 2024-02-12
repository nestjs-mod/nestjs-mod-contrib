import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { DefaultBucketNames, MinioFilesService, PresignedUrlsRequest } from '@nestjs-mod/minio';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly minioFilesService: MinioFilesService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

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
