import { getNestModuleDecorators } from '@nestjs-mod/common';
import { CACHE_MANAGER_MODULE_NAME } from './cache-manager.constants';

export const { InjectService: InjectCacheManagerService } = getNestModuleDecorators({
  moduleName: CACHE_MANAGER_MODULE_NAME,
});
