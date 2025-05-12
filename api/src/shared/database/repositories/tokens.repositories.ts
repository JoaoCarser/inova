import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class TokensRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async findUnique(findUniqueDto: Prisma.TokenFindUniqueArgs) {
    return await this.prismaService.token.findUnique(findUniqueDto);
  }

  async create(createDto: Prisma.TokenCreateArgs) {
    return await this.prismaService.token.create(createDto);
  }

  async delete(deleteDto: Prisma.TokenDeleteArgs) {
    return await this.prismaService.token.delete(deleteDto);
  }

  async deleteMany(deleteManyDto: Prisma.TokenDeleteManyArgs) {
    return await this.prismaService.token.deleteMany(deleteManyDto);
  }
}
