import { getNestModuleDecorators, getNestModuleInternalUtils } from '@nestjs-mod/common';
import { PRISMA_MODULE_NAME } from './prisma.constants';

export const {
  InjectService: InjectPrismaService,
  InjectFeatures: InjectPrismaFeatures,
  InjectAllFeatures: InjectAllPrismaFeatures,
  InjectFeatureEnvironments: InjectPrismaFeatureEnvironments,
  InjectAllFeatureEnvironments: InjectAllPrismaFeatureEnvironments,
  InjectAllModuleSettings: InjectAllPrismaModuleSettings,
  InjectModuleSettings: InjectPrismaModuleSettings,
} = getNestModuleDecorators({
  moduleName: PRISMA_MODULE_NAME,
});

export const { getServiceToken: getPrismaServiceToken } = getNestModuleInternalUtils({
  moduleName: PRISMA_MODULE_NAME,
});

export const PRISMA_CLIENT = 'PrismaClient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InjectPrismaClient = (contextName?: string): any => InjectPrismaService(PRISMA_CLIENT, contextName);
export const getPrismaClientToken = (contextName?: string): string => getPrismaServiceToken(PRISMA_CLIENT, contextName);
