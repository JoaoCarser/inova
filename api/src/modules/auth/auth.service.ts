import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './entities/Role';
import { BasesRepositories } from 'src/shared/database/repositories/bases.repositories';
import { formatCpf } from 'src/shared/utils/formatCpf';
import { TokensRepositories } from 'src/shared/database/repositories/tokens.repositories';
import { ConfirmEmailDto } from './dto/confirmEmail.dto';
import { randomUUID } from 'crypto';
import { addHours } from 'date-fns';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepositories,
    private readonly basesRepo: BasesRepositories,
    private readonly jtwService: JwtService,
    private readonly tokensRepository: TokensRepositories,
    private readonly mailService: MailService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { email, cpf, baseId } = signUpDto;

    const formattedCpf = formatCpf(cpf);

    const phoneExists = await this.usersRepository.findFirst({
      where: { phone: signUpDto.phone },
    });
    if (phoneExists)
      throw new ConflictException('O Telefone já está sendo usado');

    const emailExists = await this.usersRepository.findUnique({
      where: { email },
    });
    if (emailExists) throw new ConflictException('O E-mail já está em uso!');

    const cpfExists = await this.usersRepository.findUnique({
      where: { cpf: formattedCpf },
    });
    if (cpfExists) throw new ConflictException('O CPF já está cadastrado!');

    const baseIdExists = await this.basesRepo.findUnique({
      where: { id: baseId },
    });
    if (!baseIdExists) throw new NotFoundException('Essa Base não existe');

    const hashedPassword = await hash(signUpDto.password, 12);
    const user = await this.usersRepository.create({
      data: { ...signUpDto, password: hashedPassword },
    });

    const token = randomUUID();
    await this.tokensRepository.create({
      data: {
        token,
        type: 'CONFIRM_EMAIL',
        userId: user.id,
        expiresAt: addHours(new Date(), 24),
      },
    });

    await this.mailService.sendEmailConfirmation(user.email, token);

    return {
      message:
        'Cadastro realizado com sucesso. Verifique seu e-mail para ativar sua conta.',
    };
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

  async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    const { token } = confirmEmailDto;

    const record = await this.tokensRepository.findUnique({ where: { token } });

    if (!record || record.expiresAt < new Date()) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    await this.usersRepository.update({
      where: { id: record.userId },
      data: { isEmailConfirmed: true },
    });

    await this.tokensRepository.delete({ where: { token } });

    return { message: 'E-mail confirmado com sucesso!' };
  }

  private async generateAccessToken(userId: string, userRole: Role) {
    return await this.jtwService.signAsync({ sub: userId, role: userRole });
  }
}
