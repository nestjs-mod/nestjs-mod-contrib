import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';

import { KeyvModule } from '@nestjs-mod/keyv';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  moduleCategory: NestModuleCategory.feature,
  imports: [KeyvModule.forFeature({ featureModuleName: 'AppModule' })],
  controllers: [AppController],
  providers: [AppService],
});
