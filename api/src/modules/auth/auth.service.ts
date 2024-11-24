import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './entities/Role';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepositories,
    private readonly jtwService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { email, cpf } = signUpDto;

    const emailExists = await this.usersRepository.findUnique({
      where: {
        email,
      },
    });

    const cpfExists = await this.usersRepository.findUnique({
      where: {
        cpf,
      },
    });

    if (emailExists || cpfExists) {
      throw new ConflictException('Usuário já existe');
    }

    const hashedPassword = await hash(signUpDto.password, 12);

    const user = await this.usersRepository.create({
      data: { ...signUpDto, password: hashedPassword },
    });

    const accessToken = await this.generateAccessToken(
      user.id,
      user.role as Role,
    );

    return { accessToken };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    // Generate JWT
    const accessToken = await this.generateAccessToken(
      user.id,
      user.role as Role,
    );

    return { accessToken };
  }

  private async generateAccessToken(userId: string, userRole: Role) {
    return await this.jtwService.signAsync({ sub: userId, role: userRole });
  }
}
