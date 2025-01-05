import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { unlink } from 'fs';
import { readFile } from 'fs/promises';
import { extname } from 'path';
import { Observable, bindCallback, forkJoin, from, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MinioConfiguration } from './minio.configuration';
import { MinioEnvironments } from './minio.environments';
import { MinioDownloadUrlIsWrongError, MinioError, MinioNoSuchBucketPolicyError } from './minio.errors';
import { MinioService } from './minio.service';

export class PresignedUrls {
  uploadUrl!: string;
  downloadUrl!: string;
}

export class PresignedUrlsRequest {
  ext!: string;
}

@Injectable()
export class MinioFilesService {
  private readonly logger = new Logger(MinioFilesService.name);

  constructor(
    private readonly minioEnvironments: MinioEnvironments,
    private readonly minioConfiguration: MinioConfiguration,
    private readonly minioService: MinioService
  ) {}

  creatAllBuckets() {
    return forkJoin(
      Object.entries(this.minioConfiguration.buckets ?? {}).map(([bucketName, bucketValue]) => {
        if (!this.minioConfiguration.region) {
          throw new MinioNoSuchBucketPolicyError(`Region not set`);
        }
        return this.createBucketIfNeed(this.minioConfiguration.region, bucketName, bucketValue.ext[0]);
      })
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catchError((err: any) => {
        this.logger.error(err, err.stack);
        return of(null);
      })
    );
  }

  getPresignedUrls({
    userId,
    bucketName,
    expiry,
    objectId,
    ext,
  }: {
    userId?: string;
    bucketName: string;
    expiry: number;
    objectId?: string;
    ext: string;
  }): Observable<PresignedUrls> {
    const { downloadUrl, fullObjectName } = this.getDownloadUrl({
      userId,
      bucketName,
      objectId,
      ext,
    });
    const projectUrl = `${this.minioEnvironments.minioUseSSL === 'true' ? 'https' : 'http'}://${
      this.minioEnvironments.minioServerHost
    }${this.minioEnvironments.minioServerPort ? `:${this.minioEnvironments.minioServerPort}` : ''}`;
    this.logger.debug(`getPresignedUrls: ${downloadUrl}`);

    if (!this.minioConfiguration.region) {
      throw new MinioNoSuchBucketPolicyError(`Region not set`);
    }

    return this.createBucketIfNeed(this.minioConfiguration.region, bucketName, ext).pipe(
      mergeMap(() => from(this.minioService.presignedPutObject(bucketName, fullObjectName, expiry))),
      map((uploadUrl: string) => {
        const url = new URL(uploadUrl);
        url.searchParams.delete('X-Amz-Credential');
        return {
          uploadUrl: `${url.toString().replace(projectUrl.toString(), '')}`,
          downloadUrl,
        };
      })
    );
  }

  deleteFile(downloadUrl: string) {
    const { objectName, bucketName } = this.getFromDownloadUrlWithoutBucketNames(downloadUrl);
    this.logger.debug(`deleteFile: ${objectName}`);
    return from(this.minioService.removeObject(bucketName, objectName));
  }

  uploadFile({
    userId,
    bucketName,
    objectId,
    ext,
    buffer,
  }: {
    userId?: string;
    bucketName: string;
    objectId?: string;
    ext: string;
    buffer: Buffer;
  }) {
    const { downloadUrl, fullObjectName } = this.getDownloadUrl({
      userId,
      bucketName,
      objectId,
      ext,
    });
    this.logger.debug(
      `uploadFile: ${downloadUrl}, options:${JSON.stringify({
        userId,
        bucketName,
        objectId,
        ext,
      })}`
    );
    if (!this.minioConfiguration.region) {
      throw new MinioNoSuchBucketPolicyError(`Region not set`);
    }
    return this.createBucketIfNeed(this.minioConfiguration.region, bucketName, ext).pipe(
      mergeMap(() => from(this.minioService.putObject(bucketName, fullObjectName, buffer))),
      map(() => downloadUrl)
    );
  }

  getDownloadUrl({
    userId,
    bucketName,
    objectId,
    ext,
  }: {
    userId: string | undefined;
    bucketName: string;
    objectId: string | undefined;
    ext: string;
  }) {
    this.getPoliceAsString(bucketName, ext);

    const fullObjectName = `${userId ?? this.minioEnvironments.minioDefaultUserId}/${bucketName}_${
      objectId ?? randomUUID()
    }.${ext}`;
    const downloadUrl = `/${bucketName}/${fullObjectName}`;
    return { downloadUrl, fullObjectName };
  }

  getFile(downloadUrl: string) {
    const { objectName, bucketName } = this.getFromDownloadUrlWithoutBucketNames(downloadUrl);
    const ext = extname(downloadUrl);
    const fileName = `${(+new Date()).toString()}${ext}`;
    return from(this.minioService.fGetObject(bucketName, objectName, fileName)).pipe(
      mergeMap(() => from(readFile(fileName))),
      mergeMap((result) => bindCallback(unlink)(fileName).pipe(map(() => result))),
      map((blob) => ({
        ext,
        blob,
      }))
    );
  }

  createBucketIfNeed(bucketRegion: string, bucketName: string, ext: string) {
    return from(this.minioService.bucketExists(bucketName)).pipe(
      catchError((err) => {
        this.logger.error(err, err.stack);
        return throwError(() => err);
      }),
      mergeMap((bucketExists) =>
        !bucketExists ? from(this.minioService.makeBucket(bucketName, bucketRegion)) : of(null)
      ),
      mergeMap(() =>
        from(this.minioService.getBucketPolicy(bucketName)).pipe(
          mergeMap((currentPolicy) => {
            return currentPolicy !== this.getPoliceAsString(bucketName, ext)
              ? from(this.minioService.setBucketPolicy(bucketName, this.getPoliceAsString(bucketName, ext)))
              : of(null);
          }),
          catchError((err) => {
            if (err instanceof MinioNoSuchBucketPolicyError || err.code === 'NoSuchBucketPolicy') {
              return from(this.minioService.setBucketPolicy(bucketName, this.getPoliceAsString(bucketName, ext)));
            }
            this.logger.error(err, err.stack);
            return throwError(() => err);
          })
        )
      )
    );
  }

  getPoliceAsString(bucketName: string, ext: string) {
    const bucket = this.minioConfiguration.buckets?.[bucketName];
    if (!bucket) {
      throw new MinioNoSuchBucketPolicyError(`Bucket with name "${bucketName}" not set`);
    }
    if (!bucket.ext.includes(ext)) {
      throw new MinioError(`Bucket with name "${bucketName}" not allow extension "${ext}"`);
    }
    return JSON.stringify(bucket.policy);
  }

  getFromDownloadUrlWithoutBucketNames(downloadUrl: string) {
    const bucketNames = Object.keys(this.minioConfiguration.buckets ?? {});
    for (const bucketName of bucketNames) {
      const sep = `/${bucketName}/`;
      const downloadUrlArr = downloadUrl.split(sep);
      if (downloadUrlArr.length > 1) {
        return {
          bucketName,
          objectName: downloadUrlArr.slice(1).join(sep),
        };
      }
    }
    throw new MinioDownloadUrlIsWrongError(`Download url "${downloadUrl}" is wrong`);
  }
}
