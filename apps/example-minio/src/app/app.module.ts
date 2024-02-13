import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinioModule } from '@nestjs-mod/minio';

export const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  moduleCategory: NestModuleCategory.feature,
  imports: [MinioModule.forFeature()],
  controllers: [AppController],
  providers: [AppService],
});
