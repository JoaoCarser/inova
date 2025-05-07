import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/shared/config/env';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService],
})
export class AuthModule {}
