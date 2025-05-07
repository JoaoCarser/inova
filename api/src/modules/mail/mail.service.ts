import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(email: string[], subject: string, html: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      html: html,
    });
  }
}
