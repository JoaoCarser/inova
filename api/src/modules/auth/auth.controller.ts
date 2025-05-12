import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { MailService } from '../mail/mail.service';
import { ConfirmEmailDto } from './dto/confirmEmail.dto';
import { ForgotPasswordDto } from './dto/forgotPasswordDto';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: SignUpDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('/signin')
  signin(@Body() createUserDto: SigninDto) {
    return this.authService.signin(createUserDto);
  }

  @Post('/confirm-email')
  confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    return this.authService.confirmEmail(confirmEmailDto);
  }

  @Post('/forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
