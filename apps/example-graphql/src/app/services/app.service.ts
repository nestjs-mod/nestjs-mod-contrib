import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  getData(): { message: string } {
    this.logger.log("rest:getData={ message: 'Hello API' }");
    return { message: 'Hello API' };
  }
}
