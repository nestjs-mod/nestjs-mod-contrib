import { getNestModuleDecorators, getNestModuleInternalUtils } from '@nestjs-mod/common';
import { KEYV_MODULE_NAME } from './keyv.constants';

export const { InjectService: InjectKeyvService } = getNestModuleDecorators({
  moduleName: KEYV_MODULE_NAME,
});

export const { getServiceToken: getKeyvServiceToken,
  getEnvironmentsLoaderToken: getKeyvEnvironmentsLoaderToken } = getNestModuleInternalUtils({
    moduleName: KEYV_MODULE_NAME,
  });