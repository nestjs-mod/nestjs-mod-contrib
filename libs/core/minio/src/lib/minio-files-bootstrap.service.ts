import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { MinioFilesService } from './minio-files.service';

@Injectable()
export class MinioFilesBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MinioFilesBootstrapService.name);

  constructor(private readonly minioFilesService: MinioFilesService) {}

  onApplicationBootstrap() {
    this.logger.debug('onApplicationBootstrap');
    try {
      this.minioFilesService.creatAllBuckets().subscribe();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.logger.error(err, err.stack);
    }
  }
}
