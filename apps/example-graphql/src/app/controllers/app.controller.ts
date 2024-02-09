import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Request } from '@nestjs-mod/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getData(@Request() req: any) {
    if (req.headers['x-throw-error']) {
      throw new Error('Error from query!');
    }
    return this.appService.getData();
  }
}
