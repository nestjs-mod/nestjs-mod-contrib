import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/users/:externalUserId')
  createUser(@Param('externalUserId') externalUserId: string) {
    return this.appService.createUser({ externalUserId });
  }

  @Get('/users')
  getUsers() {
    return this.appService.getUsers();
  }
}
