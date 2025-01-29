import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluationsRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.EvaluationFindManyArgs) {
    return await this.prismaService.evaluation.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.EvaluationFindFirstArgs) {
    return await this.prismaService.evaluation.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.EvaluationFindUniqueArgs) {
    return await this.prismaService.evaluation.findUnique(findUniqueDto);
  }

  async create(createDto: Prisma.EvaluationCreateArgs) {
    return await this.prismaService.evaluation.create(createDto);
  }

  async update(updateDto: Prisma.EvaluationUpdateArgs) {
    return await this.prismaService.evaluation.update(updateDto);
  }

  async delete(deleteDto: Prisma.EvaluationDeleteArgs) {
    return await this.prismaService.evaluation.delete(deleteDto);
  }
}
