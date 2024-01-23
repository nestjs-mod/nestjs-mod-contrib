import { getNestModuleDecorators } from '@nestjs-mod/common';
import { TERMINUS_MODULE_NAME } from './terminus.constants';

export const {
  InjectFeatures: InjectTerminusHealthCheckFeatures,
  InjectAllFeatures: InjectAllTerminusHealthCheckFeatures,
  InjectAllFeatureEnvironments: InjectTerminusAllHealthCheckFeatureEnvironments,
  InjectFeatureEnvironments: InjectTerminusHealthCheckFeatureEnvironments,
  InjectService: InjectTerminusHealthCheckService,
  InjectAllModuleSettings: InjectAllTerminusHealthCheckModuleSettings,
  InjectModuleSettings: InjectTerminusHealthCheckModuleSettings,
} = getNestModuleDecorators({
  moduleName: TERMINUS_MODULE_NAME,
});
