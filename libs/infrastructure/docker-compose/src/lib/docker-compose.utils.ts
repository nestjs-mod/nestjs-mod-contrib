import { kebabCase } from 'case-anything';

export enum DockerComposeServiceType {
  'PostgreSQL' = 'PostgreSQL',
}

export const createDockerComposeServiceName = (projectName?: string, serviceType?: DockerComposeServiceType | string) =>
  kebabCase([projectName, serviceType].filter(Boolean).join('_'));
