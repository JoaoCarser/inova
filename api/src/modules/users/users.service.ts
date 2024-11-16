import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositories) {}

  async create(createUserDto: CreateUserDto) {
    const { email, cpf } = createUserDto;

    const emailExists = await this.usersRepository.findFirst({
      where: {
        email,
      },
    });

    const cpfExists = await this.usersRepository.findFirst({
      where: {
        cpf,
      },
    });

    if (emailExists || cpfExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await hash(createUserDto.password, 12);

    return await this.usersRepository.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  async findAll() {
    return await this.usersRepository.findMany({});
  }

  async findOne(userId: string) {
    return await this.usersRepository.findFirst({
      where: { id: userId },
    });
  }

  async update(userid: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findFirst({
      where: { id: userid },
    });

    if (!user) {
      throw new ConflictException('Usuário não encontrado');
    }

    const emailExists = await this.usersRepository.findFirst({
      where: {
        email: updateUserDto.email,
      },
    });

    if (emailExists) {
      throw new ConflictException('O Email já está sendo usado');
    }

    const cpfExists = await this.usersRepository.findFirst({
      where: {
        cpf: updateUserDto.cpf,
      },
    });

    if (cpfExists) {
      throw new ConflictException('O CPF já está sendo usado');
    }

    return await this.usersRepository.update({
      where: { id: userid },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
