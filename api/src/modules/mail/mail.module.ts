import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
import { env } from 'src/shared/config/env';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Ou o servidor SMTP do seu provedor de email
        port: 465, // Porta 465 para SSL
        secure: true, // Use SSL
        auth: {
          user: env.emailAccount, // Seu e-mail
          pass: env.emailPasswordPass, // Sua senha ou senha de app
        },
      },
      defaults: {
        from: `"Inova Conterp" <${env.emailAccount}>`,
      },
      template: {
        dir: join(process.cwd(), 'src', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
