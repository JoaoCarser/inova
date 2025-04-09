import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';
import { formatCpf } from 'src/shared/utils/formatCpf';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepositories) {}

  async findAll() {
    return await this.usersRepository.findMany({});
  }

  async findByUserId(userId: string) {
    return await this.usersRepository.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        cpf: true,
        position: true,
        base: true,
        phone: true,
        usersProjects: {
          select: {
            project: {
              include: {
                usersProjects: {
                  select: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        cpf: true,
                        position: true,
                        baseId: true,
                      },
                    },
                  },
                },
                files: true,
                evaluations: {
                  select: {
                    id: true,
                    comments: true,
                    criteria: {
                      select: {
                        id: true,
                        name: true,
                        score: true,
                      },
                    },
                  },
                },
                questions: true,
              },
            },
          },
        },
      },
    });
  }

  async findByCpf(cpf: string) {
    const formattedCpf = formatCpf(cpf);

    const user = await this.usersRepository.findUnique({
      where: { cpf: formattedCpf },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        cpf: true,
        position: true,
        base: true,
        phone: true,
        usersProjects: {
          select: {
            project: {
              include: {
                usersProjects: {
                  select: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        cpf: true,
                        position: true,
                        baseId: true,
                      },
                    },
                  },
                },
                files: true,
                evaluations: {
                  select: {
                    id: true,
                    comments: true,
                    criteria: {
                      select: {
                        id: true,
                        name: true,
                        score: true,
                      },
                    },
                  },
                },
                questions: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(userid: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findFirst({
      where: { id: userid },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const phoneExists = await this.usersRepository.findFirst({
      where: {
        phone: updateUserDto.phone,
      },
    });

    if (phoneExists) {
      throw new ConflictException('O Telefone já está sendo usado');
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
        cpf: formatCpf(updateUserDto.cpf),
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
