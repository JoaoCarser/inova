import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentsRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.DepartmentFindManyArgs) {
    return await this.prismaService.department.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.DepartmentFindFirstArgs) {
    return await this.prismaService.department.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.DepartmentFindUniqueArgs) {
    return await this.prismaService.department.findUnique(findUniqueDto);
  }

  async create(createDto: Prisma.DepartmentCreateArgs) {
    return await this.prismaService.department.create(createDto);
  }

  async update(updateDto: Prisma.DepartmentUpdateArgs) {
    return await this.prismaService.department.update(updateDto);
  }

  async delete(deleteDto: Prisma.DepartmentDeleteArgs) {
    return await this.prismaService.department.delete(deleteDto);
  }
}
