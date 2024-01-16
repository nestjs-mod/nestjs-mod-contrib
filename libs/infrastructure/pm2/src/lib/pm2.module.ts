/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestModuleCategory, ProjectUtils, createNestModule } from '@nestjs-mod/common';
import { Pm2EcosystemConfigFileService } from './pm2-ecosystem-config-file.service';
import { Pm2Configuration } from './pm2.configuration';
import { Pm2Service } from './pm2.service';

export const { Pm2 } = createNestModule({
  moduleName: 'Pm2',
  moduleDescription:
    'Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Wrapper for https://www.npmjs.com/package/pm2)',
  moduleCategory: NestModuleCategory.infrastructure,
  configurationModel: Pm2Configuration,
  imports: [ProjectUtils.forFeature()],
  providers: [Pm2EcosystemConfigFileService, Pm2Service],
});
