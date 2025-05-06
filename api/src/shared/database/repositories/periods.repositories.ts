import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PeriodsRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.PeriodFindManyArgs) {
    return await this.prismaService.period.findMany(findManyDto);
  }
  async findFirst(findFirstDto: Prisma.PeriodFindFirstArgs) {
    return await this.prismaService.period.findFirst(findFirstDto);
  }

  async create(createDto: Prisma.PeriodCreateArgs) {
    return await this.prismaService.period.create(createDto);
  }

  async createMany(createDto: Prisma.PeriodCreateManyArgs) {
    return await this.prismaService.period.createMany(createDto);
  }

  async update(updateDto: Prisma.PeriodUpdateArgs) {
    return await this.prismaService.period.update(updateDto);
  }

  async remove(deleteDto: Prisma.PeriodDeleteArgs) {
    return await this.prismaService.period.delete(deleteDto);
  }

  async deleteMany(deleteManyDto: Prisma.PeriodDeleteManyArgs) {
    return await this.prismaService.period.deleteMany(deleteManyDto);
  }
}
