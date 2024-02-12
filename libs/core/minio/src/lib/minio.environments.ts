import { EnvModel, EnvModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';
import { NestMinioOptions } from 'nestjs-minio';

@EnvModel()
export class MinioEnvironments implements Pick<NestMinioOptions, 'accessKey' | 'secretKey' | 'useSSL'> {
  @EnvModelProperty({
    description: 'Server host',
  })
  @IsNotEmpty()
  serverHost!: string;

  @EnvModelProperty({
    description: 'Server port',
  })
  serverPort?: number;

  @EnvModelProperty({
    description: 'Access key',
  })
  @IsNotEmpty()
  accessKey!: string;

  @EnvModelProperty({
    description: 'Secret key',
  })
  @IsNotEmpty()
  secretKey!: string;

  @EnvModelProperty({
    description: 'Use SSL',
    default: false,
  })
  useSSL?: boolean;

  @EnvModelProperty({
    description: 'Default user id',
    default: 'default',
  })
  defaultUserId?: string;
}
