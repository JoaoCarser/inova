import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectsRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.ProjectFindManyArgs) {
    return await this.prismaService.project.findMany(findManyDto);
  }
  async findFirst(findFirstDto: Prisma.ProjectFindFirstArgs) {
    return await this.prismaService.project.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.ProjectFindUniqueArgs) {
    return await this.prismaService.project.findUnique(findUniqueDto);
  }

  async create(createDto: Prisma.ProjectCreateArgs) {
    return await this.prismaService.project.create(createDto);
  }

  async update(updateDto: Prisma.ProjectUpdateArgs) {
    return await this.prismaService.project.update(updateDto);
  }

  async remove(deleteDto: Prisma.ProjectDeleteArgs) {
    return await this.prismaService.project.delete(deleteDto);
  }
}
