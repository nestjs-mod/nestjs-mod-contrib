import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';

@ConfigModel()
export class DockerComposeNginxConfiguration {
  @ConfigModelProperty({
    description: 'Docker image name',
    default: 'nginx:alpine',
  })
  image?: string;

  @ConfigModelProperty({
    description: 'Config content',
  })
  @IsNotEmpty()
  configContent!: string;

  @ConfigModelProperty({
    description: 'Config folder for map volume to /etc/nginx/conf.d',
  })
  @IsNotEmpty()
  configFolder?: string;

  @ConfigModelProperty({
    description: 'Logs folder for map volume to /var/log/nginx/',
  })
  logsFolder?: string;

  @ConfigModelProperty({
    description: 'Depends on services',
  })
  dependsOnServiceNames?: Record<string, 'service_started' | 'service_healthy' | 'service_completed_successfully'>;

  @ConfigModelProperty({
    description: 'Ports',
  })
  ports?: Record<number, number>;

  @ConfigModelProperty({
    description: 'Network, if not set networkNames have project name and driver=bridge.',
  })
  networks?: { name: string; driver: string }[];
}
