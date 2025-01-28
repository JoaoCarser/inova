import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluationsCriteriaRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.EvaluationCriteriaFindManyArgs) {
    return await this.prismaService.evaluationCriteria.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.EvaluationCriteriaFindFirstArgs) {
    return await this.prismaService.evaluationCriteria.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.EvaluationCriteriaFindUniqueArgs) {
    return await this.prismaService.evaluationCriteria.findUnique(
      findUniqueDto,
    );
  }

  async create(createDto: Prisma.EvaluationCriteriaCreateArgs) {
    return await this.prismaService.evaluationCriteria.create(createDto);
  }

  async update(updateDto: Prisma.EvaluationCriteriaUpdateArgs) {
    return await this.prismaService.evaluationCriteria.update(updateDto);
  }

  async delete(deleteDto: Prisma.EvaluationCriteriaDeleteArgs) {
    return await this.prismaService.evaluationCriteria.delete(deleteDto);
  }

  async deleteMany(deleteManyDto: Prisma.EvaluationCriteriaDeleteManyArgs) {
    return await this.prismaService.evaluationCriteria.deleteMany(
      deleteManyDto,
    );
  }
}
