import { kebabCase } from 'case-anything';

export enum DockerComposeServiceType {
  'PostgreSQL' = 'PostgreSQL',
  'Redis' = 'Redis',
  'Minio' = 'Minio',
  'Nats' = 'Nats',
  'Nginx' = 'Nginx',
  'Authorizer' = 'Authorizer',
}

export const getDockerComposeServiceName = (projectName?: string, serviceType?: DockerComposeServiceType | string) =>
  kebabCase([projectName, serviceType].filter(Boolean).join('_'));
