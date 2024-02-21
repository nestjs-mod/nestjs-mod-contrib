import { ConfigModel, ConfigModelProperty, EnvModel, EnvModelProperty, NumberTransformer } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class DockerComposeMinioConfiguration {
  @ConfigModelProperty({
    description: 'Docker image name',
    default: 'bitnami/minio:2024.2.9',
  })
  image?: string;

  @ConfigModelProperty({
    description: 'Feature name for generate prefix to environments keys',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Network, if not set networkNames have project name and driver=bridge.',
  })
  networks?: { name: string; driver: string }[];

  @ConfigModelProperty({
    description: 'External port for S3 API operations on the default MinIO server port.',
    default: 9000,
    transform: new NumberTransformer()
  })
  externalPort?: number;

  @ConfigModelProperty({
    description: 'External console for browser access on the MinIO Console port.',
    default: 9001,
    transform: new NumberTransformer()
  })
  externalConsolePort?: number;

  @ConfigModelProperty({
    description: 'External port for proxy access over nginx (infrastructure, need for disable CORS errors)',
    transform: new NumberTransformer()
  })
  nginxPort?: number;

  @ConfigModelProperty({
    description: 'Folder for store nginx config and logs (infrastructure)',
  })
  nginxFilesFolder!: string;

  @ConfigModelProperty({
    description: 'Locations for proxy to minio (infrastructure)',
    default: ['files'],
  })
  nginxBucketsLocations?: string[];
}

@EnvModel()
export class DockerComposeMinioEnvironments {
  @EnvModelProperty({
    description: 'Minio root user.',
  })
  @IsNotEmpty()
  minioRootUser!: string;

  @EnvModelProperty({
    description: 'Minio root password.',
  })
  @IsNotEmpty()
  minioRootPassword!: string;
}
