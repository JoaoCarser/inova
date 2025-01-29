import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionsRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.QuestionCreateArgs) {
    return await this.prismaService.question.create(createDto);
  }

  async update(updateDto: Prisma.QuestionUpdateArgs) {
    return await this.prismaService.question.update(updateDto);
  }

  async findMany(findAllDto: Prisma.QuestionFindManyArgs) {
    return await this.prismaService.question.findMany(findAllDto);
  }

  async findUniqueById(findOneByIdDto: Prisma.QuestionFindUniqueArgs) {
    return await this.prismaService.question.findUnique(findOneByIdDto);
  }
  async findFirstById(findOneByIdDto: Prisma.QuestionFindFirstArgs) {
    return await this.prismaService.question.findFirst(findOneByIdDto);
  }
}
