import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/cache/:externalUserId')
  setCache(@Param('externalUserId') externalUserId: string) {
    return this.appService.setCache({ externalUserId });
  }

  @Get('/cache')
  getCache() {
    return this.appService.getCache();
  }
}
