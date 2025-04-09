import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersProjectsRepositories {
  constructor(private readonly prismaService: PrismaService) {}
  async findMany(findManyDto: Prisma.User$usersProjectsArgs) {
    return await this.prismaService.usersProjects.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.UsersProjectsFindFirstArgs) {
    return await this.prismaService.usersProjects.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.UsersProjectsFindUniqueArgs) {
    return await this.prismaService.usersProjects.findUnique(findUniqueDto);
  }

  async create(createDto: Prisma.UsersProjectsCreateArgs) {
    return await this.prismaService.usersProjects.create(createDto);
  }
  async createMany(createManyDto: Prisma.UsersProjectsCreateManyArgs) {
    return await this.prismaService.usersProjects.createMany(createManyDto);
  }

  async update(updateDto: Prisma.UsersProjectsUpdateArgs) {
    return await this.prismaService.usersProjects.update(updateDto);
  }

  async delete(deleteDto: Prisma.UsersProjectsDeleteArgs) {
    return await this.prismaService.usersProjects.delete(deleteDto);
  }
}
