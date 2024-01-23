import { kebabCase } from 'case-anything';

export enum DockerComposeServiceType {
  'PostgreSQL' = 'PostgreSQL',
}

export const getDockerComposeServiceName = (projectName?: string, serviceType?: DockerComposeServiceType | string) =>
  kebabCase([projectName, serviceType].filter(Boolean).join('_'));
