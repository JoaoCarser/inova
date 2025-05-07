import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { MailService } from '../mail/mail.service';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  signup(@Body() createUserDto: SignUpDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('/signin')
  signin(@Body() createUserDto: SigninDto) {
    return this.authService.signin(createUserDto);
  }


}
