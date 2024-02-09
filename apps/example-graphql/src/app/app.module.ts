import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';
import { AppController } from './controllers/app.controller';
import { BalanceOfUserResolver } from './resolvers/balance-of-user.resolver';
import { StatusResolvers } from './resolvers/status.resolvers';
import { UsersResolvers } from './resolvers/users.resolvers';
import { AppService } from './services/app.service';
import { BalanceOfUserDataloader } from './services/balance-of-user.data-loader';
import { BalanceOfUserService } from './services/balance-of-user.service';

export const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  moduleCategory: NestModuleCategory.feature,
  controllers: [AppController],
  providers: [
    AppService,
    StatusResolvers,
    BalanceOfUserService,
    UsersResolvers,
    BalanceOfUserDataloader,
    BalanceOfUserResolver,
  ],
});
