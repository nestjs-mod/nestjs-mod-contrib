import { AuthorizerModule } from '@nestjs-mod/authorizer';
import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

export const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  imports: [AuthorizerModule.forFeature()],
  moduleCategory: NestModuleCategory.feature,
  controllers: [AppController],
  providers: [AppService],
});
