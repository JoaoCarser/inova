import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepositories {
  constructor(private readonly prismaService: PrismaService) {}
  async findMany(findManyDto: Prisma.UserFindManyArgs) {
    return await this.prismaService.user.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.UserFindFirstArgs) {
    return await this.prismaService.user.findFirst(findFirstDto);
  }
  async create(createDto: Prisma.UserCreateArgs) {
    return await this.prismaService.user.create(createDto);
  }

  async update(updateDto: Prisma.UserUpdateArgs) {
    return await this.prismaService.user.update(updateDto);
  }

  async delete(deleteDto: Prisma.UserDeleteArgs) {
    return await this.prismaService.user.delete(deleteDto);
  }
}
