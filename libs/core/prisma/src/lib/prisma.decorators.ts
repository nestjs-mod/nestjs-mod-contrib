import { getNestModuleDecorators } from '@nestjs-mod/common';
import { Inject } from '@nestjs/common';
import { PRISMA_MODULE_NAME } from './prisma.constants';

export const {
  InjectFeatures: InjectPrismaFeatures,
  InjectAllFeatures: InjectAllPrismaFeatures,
  InjectFeatureEnvironments: InjectPrismaFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllPrismaFeatureEnvironments,
  InjectAllModuleSettings: InjectAllPrismaModuleSettings,
  InjectModuleSettings: InjectPrismaModuleSettings,
} = getNestModuleDecorators({
  moduleName: PRISMA_MODULE_NAME,
});

// todo: add support get prisma client instance by prismaFeatureName
export function getPrismaFeatureToken() {
  return `PrismaClient`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InjectPrismaClient = (): any => Inject(getPrismaFeatureToken());
