import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositories) {}

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

  async remove(userId: string) {
    return await this.usersRepository.delete({
      where: { id: userId },
    });
  }
}
