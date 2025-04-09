import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { createTransport, Transporter } from 'nodemailer';
import { map } from 'rxjs';
@Injectable()
export class AppService {
  private mailTransporter: Transporter;

  constructor(private readonly httpService: HttpService) {
    this.mailTransporter = createTransport('smtp://localhost:1025');
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async sendEmail({
    sender,
    recipient,
    message,
    subject,
  }: {
    sender: string;
    recipient: string;
    message: string;
    subject: string;
  }) {
    await this.mailTransporter.sendMail({
      from: sender,
      to: recipient,
      subject,
      text: message,
      html: message,
    });
  }

  getEmailMessage(recipient: string) {
    return this.httpService
      .get(`http://localhost:1080/email?to.address=${recipient}`)
      .pipe(map((result) => result.data));
  }
}
