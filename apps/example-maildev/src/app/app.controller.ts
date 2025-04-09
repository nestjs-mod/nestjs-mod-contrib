import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('/send-email/:recipient/:message')
  async sendEmail(@Param('recipient') recipient: string, @Param('message') message: string) {
    await this.appService.sendEmail({
      sender: 'robot@fake-email.server',
      recipient,
      message,
      subject: 'Message from robot',
    });
    return { status: 'OK' };
  }

  @Get('/get-email-message/:recipient')
  getEmailMessage(@Param('recipient') recipient: string) {
    return this.appService.getEmailMessage(recipient);
  }
}
