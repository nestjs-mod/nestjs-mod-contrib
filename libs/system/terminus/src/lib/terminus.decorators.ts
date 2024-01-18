import { getNestModuleDecorators } from '@nestjs-mod/common';
import { TERMINUS_MODULE_NAME } from './terminus.constants';

export const {
  InjectFeatures: InjectTerminusHealthCheckFeatures,
  InjectAllFeatures: InjectAllTerminusHealthCheckFeatures,
  InjectAllFeatureEnvironments: InjectTerminusAllHealthCheckFeatureEnvironments,
  InjectFeatureEnvironments: InjectTerminusHealthCheckFeatureEnvironments,
  InjectService: InjectTerminusHealthCheckService,
} = getNestModuleDecorators({
  moduleName: TERMINUS_MODULE_NAME,
});
