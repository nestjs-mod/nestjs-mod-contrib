import { getNestModuleDecorators, getNestModuleInternalUtils } from '@nestjs-mod/common';
import { CACHE_MANAGER_MODULE_NAME } from './cache-manager.constants';

export const { InjectService: InjectCacheManagerService } = getNestModuleDecorators({
  moduleName: CACHE_MANAGER_MODULE_NAME,
});

export const { getServiceToken: getCacheManagerServiceToken,
  getEnvironmentsLoaderToken: getCacheManagerEnvironmentsLoaderToken } = getNestModuleInternalUtils({
    moduleName: CACHE_MANAGER_MODULE_NAME,
  });