import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PeriodsRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createDto: Prisma.PeriodCreateArgs) {
    return await this.prismaService.period.create(createDto);
  }

  async findMany(findManyDto: Prisma.PeriodFindManyArgs) {
    return await this.prismaService.period.findMany(findManyDto);
  }
  async remove(deleteDto: Prisma.PeriodDeleteArgs) {
    return await this.prismaService.period.delete(deleteDto);
  }
}
