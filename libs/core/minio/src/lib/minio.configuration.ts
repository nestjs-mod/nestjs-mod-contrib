/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { Agent } from 'http';
import { NestMinioOptions } from 'nestjs-minio';

export type MinioModuleBucket = Record<
  string,
  {
    policy: any;
    ext: string[];
  }
>;

export enum DefaultBucketNames {
  images = 'images',
  video = 'video',
  documents = 'documents',
}

@ConfigModel()
export class MinioConfiguration
  implements Omit<NestMinioOptions, 'endPoint' | 'accessKey' | 'secretKey' | 'useSSL' | 'port'>
{
  @ConfigModelProperty({
    description: 'Region',
    default: 'us-east-1',
  })
  region?: string;

  @ConfigModelProperty({
    description: 'Transport',
  })
  transport?: any;

  @ConfigModelProperty({
    description: 'Session token',
  })
  sessionToken?: string;

  @ConfigModelProperty({
    description: 'Part size',
  })
  partSize?: number;

  @ConfigModelProperty({
    description: 'Config options name',
    default: true,
  })
  pathStyle?: boolean;

  @ConfigModelProperty({
    description: 'Credentials provider',
  })
  credentialsProvider?: any;

  @ConfigModelProperty({
    description: 'S3 accelerate endpoint',
  })
  s3AccelerateEndpoint?: string;

  @ConfigModelProperty({
    description: 'Transport agent',
  })
  transportAgent?: Agent;

  @ConfigModelProperty({
    description: 'Buckets with policy',
    default: {
      [DefaultBucketNames.images]: {
        policy: {
          Version: '2012-10-17',
          Statement: [
            /*{
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: ['s3:ListBucketMultipartUploads' , 's3:GetBucketLocation', 's3:ListBucket'],
                    Resource: [`arn:aws:s3:::${bucketName}`],
                },*/
            {
              Effect: 'Allow',
              Principal: {
                AWS: ['*'],
              },
              Action: [
                's3:PutObject',
                's3:AbortMultipartUpload',
                's3:DeleteObject',
                's3:GetObject' /*, 's3:ListMultipartUploadParts'*/,
              ],
              Resource: ['jpg', 'jpeg', 'png', 'gif'].map((ext) => `arn:aws:s3:::images/*.${ext}`),
            },
          ],
          Conditions: [['content-length-range', 1024 * 1024 * 5]],
        },
        ext: ['jpg', 'jpeg', 'png', 'gif'],
      },
      [DefaultBucketNames.video]: {
        policy: {
          Version: '2012-10-17',
          Statement: [
            /*{
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: ['s3:ListBucketMultipartUploads' , 's3:GetBucketLocation', 's3:ListBucket'],
                    Resource: [`arn:aws:s3:::${bucketName}`],
                },*/
            {
              Effect: 'Allow',
              Principal: {
                AWS: ['*'],
              },
              Action: [
                's3:PutObject',
                's3:AbortMultipartUpload',
                's3:DeleteObject',
                's3:GetObject' /*, 's3:ListMultipartUploadParts'*/,
              ],
              Resource: ['mp4'].map((ext) => `arn:aws:s3:::video/*.${ext}`),
            },
          ],
          Conditions: [['content-length-range', 1024 * 1024 * 50]],
        },
        ext: ['mp4'],
      },
      [DefaultBucketNames.documents]: {
        policy: {
          Version: '2012-10-17',
          Statement: [
            /*{
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: ['s3:ListBucketMultipartUploads' , 's3:GetBucketLocation', 's3:ListBucket'],
                    Resource: [`arn:aws:s3:::${bucketName}`],
                },*/
            {
              Effect: 'Allow',
              Principal: {
                AWS: ['*'],
              },
              Action: [
                's3:PutObject',
                's3:AbortMultipartUpload',
                's3:DeleteObject',
                's3:GetObject' /*, 's3:ListMultipartUploadParts'*/,
              ],
              Resource: ['doc', 'docx', 'xls', 'md', 'odt', 'txt', 'xml', 'rtf', 'csv'].map(
                (ext) => `arn:aws:s3:::documents/*.${ext}`
              ),
            },
          ],
          Conditions: [['content-length-range', 1024 * 1024 * 10]],
        },
        ext: ['doc', 'docx', 'xls', 'md', 'odt', 'txt', 'xml', 'rtf', 'csv'],
      },
    } as MinioModuleBucket,
  })
  buckets?: MinioModuleBucket;
}
