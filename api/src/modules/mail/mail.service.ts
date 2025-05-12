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

  async sendEmailConfirmation(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/confirm-email?token=${token}`;

    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
          <h2>Confirmação de E-mail</h2>
          <p>Olá,</p>
          <p>Obrigado por se registrar. Clique no botão abaixo para confirmar seu e-mail:</p>
          <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Confirmar E-mail</a>
          <p style="margin-top: 30px; font-size: 12px; color: #6c757d;">Se você não criou esta conta, pode ignorar este e-mail.</p>
        </div>
      </div>
    `;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirme seu e-mail',
      html,
    });
  }

  async sendEmailForgotPassword(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
          <h2>Recuperação de Senha</h2>
          <p>Olá,</p>
          <p>Clique no botão abaixo para recuperar sua senha:</p>          
          <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Recuperar Senha</a>
          <p style="margin-top: 30px; font-size: 12px; color: #6c757d;">Se você não criou esta conta, pode ignorar este e-mail.</p>
        </div>
      </div>
    `;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperação de Senha',
      html,
    });
  }
}
