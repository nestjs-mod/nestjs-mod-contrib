import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';

import { CacheManagerModule } from '@nestjs-mod/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  moduleCategory: NestModuleCategory.feature,
  imports: [CacheManagerModule.forFeature({ featureModuleName: 'AppModule' })],
  controllers: [AppController],
  providers: [AppService],
});
