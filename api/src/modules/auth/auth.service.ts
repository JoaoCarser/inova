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
import { ForgotPasswordDto } from './dto/forgotPasswordDto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { env } from 'src/shared/config/env';
import { DepartmentsRepositories } from 'src/shared/database/repositories/departments.repositories';
import { AdminSignupDto } from './dto/adminSignup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepositories,
    private readonly basesRepo: BasesRepositories,
    private readonly jtwService: JwtService,
    private readonly tokensRepository: TokensRepositories,
    private readonly mailService: MailService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly departmentsRepository: DepartmentsRepositories,
  ) {}

  private async getEmployeeByCpf(cpf: string) {
    const token = env.feedzApiToken;

    try {
      const { data } = await this.httpService.axiosRef.get(
        `https://app.feedz.com.br/v2/integracao/employees?cpf=${cpf}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!data) {
        throw new BadRequestException(
          'Ocorreu um erro ao tentar verificar o CPF no feedz!',
        );
      }
      return data.data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Ocorreu um erro ao tentar verificar o CPF no feedz!',
      );
    }
  }

  async signup(signUpDto: SignUpDto) {
    const { email, cpf } = signUpDto;
    const formattedCpf = formatCpf(cpf);
    const [employee] = await this.getEmployeeByCpf(formattedCpf);

    if (!employee) {
      throw new BadRequestException(
        'O Você precisa ser colaborador da empresa para realizar o cadastro!',
      );
    }

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

    let baseExists = null;
    let departmenExists = null;

    if (employee.branch.name) {
      baseExists = await this.basesRepo.findUnique({
        where: { name: employee.branch.name },
      });

      if (!baseExists) {
        baseExists = await this.basesRepo.create({
          data: {
            name: employee.branch.name,
          },
        });
      }
    }

    if (employee.department) {
      departmenExists = await this.departmentsRepository.findUnique({
        where: { name: employee.department },
      });

      if (!departmenExists) {
        departmenExists = await this.departmentsRepository.create({
          data: { name: employee.department },
        });
      }
    }

    if (!employee.job_description.title) {
      throw new BadRequestException(
        'O Você precisa ser colaborador da empresa para realizar o cadastro!',
      );
    }

    const hashedPassword = await hash(signUpDto.password, 12);
    const user = await this.usersRepository.create({
      data: {
        ...signUpDto,
        cpf: formattedCpf,
        password: hashedPassword,
        baseId: baseExists?.id,
        position: employee.job_description.title,
        departmentId: departmenExists?.id,
        cpf: formattedCpf,
      },
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

  async adminSignup(signUpDto: AdminSignupDto) {
    const { email, cpf, name, password, phone } = signUpDto;
    const formattedCpf = formatCpf(cpf);

    const emailExists = await this.usersRepository.findUnique({
      where: { email },
    });
    if (emailExists) throw new ConflictException('O E-mail já está em uso!');

    const phoneExists = await this.usersRepository.findFirst({
      where: { phone: phone },
    });
    if (phoneExists)
      throw new ConflictException('O Telefone já está sendo usado');

    const cpfExists = await this.usersRepository.findUnique({
      where: { cpf: formattedCpf },
    });
    if (cpfExists) throw new ConflictException('O CPF já está cadastrado!');

    const hashedPassword = await hash(signUpDto.password, 12);
    const user = await this.usersRepository.create({
      data: {
        ...signUpDto,
        password: hashedPassword,
        position: 'Comitê Avaliativo',
        role: 'EVALUATION_COMMITTEE',
        cpf: formattedCpf,
      },
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
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException(
        'Email ainda não foi confirmado, por favor, verifique seu e-mail!',
      );
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

    const user = await this.usersRepository.findUnique({
      where: { id: record.userId },
    });

    // Generate JWT
    const accessToken = await this.generateAccessToken(
      user.id,
      user.role as Role,
    );

    return { accessToken };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    await this.tokensRepository.deleteMany({
      where: {
        AND: [{ userId: user.id }, { type: 'RESET_PASSWORD' }],
      },
    });
    const token = randomUUID();
    await this.tokensRepository.create({
      data: {
        token,
        type: 'RESET_PASSWORD',
        userId: user.id,
        expiresAt: addHours(new Date(), 24),
      },
    });

    await this.mailService.sendEmailForgotPassword(user.email, token);

    return {
      message:
        'Um email foi enviado com um link para recuperar a senha. Por favor, verifique sua caixa de entrada!',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, password } = resetPasswordDto;

    const record = await this.tokensRepository.findUnique({ where: { token } });

    if (!record || record.expiresAt < new Date()) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const user = await this.usersRepository.findUnique({
      where: { id: record.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const hashedPassword = await hash(password, 12);

    await this.usersRepository.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await this.tokensRepository.deleteMany({
      where: {
        AND: [{ userId: user.id }, { type: 'RESET_PASSWORD' }],
      },
    });

    return {
      message: 'Senha atualizada com sucesso!',
    };
  }

  private async generateAccessToken(userId: string, userRole: Role) {
    return await this.jtwService.signAsync({ sub: userId, role: userRole });
  }
}
