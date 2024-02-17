import { EnvModel, EnvModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@EnvModel()
export class MinioEnvironments {
  @EnvModelProperty({
    description: 'Server host',
  })
  @IsNotEmpty()
  minioServerHost!: string;

  @EnvModelProperty({
    description: 'Server port',
    hidden: true,
  })
  minioServerPort?: number;

  @EnvModelProperty({
    description: 'Access key',
  })
  @IsNotEmpty()
  minioAccessKey!: string;

  @EnvModelProperty({
    description: 'Secret key',
  })
  @IsNotEmpty()
  minioSecretKey!: string;

  @EnvModelProperty({
    description: 'Use SSL',
    default: 'false',
    hidden: true,
  })
  minioUseSSL?: string;

  @EnvModelProperty({
    description: 'Default user id',
    default: 'default',
    hidden: true,
  })
  minioDefaultUserId?: string;
}
