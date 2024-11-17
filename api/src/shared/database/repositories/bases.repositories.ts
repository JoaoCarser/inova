import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BasesRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.BaseCreateArgs) {
    return await this.prismaService.base.create(createDto);
  }

  async findMany(findManyDto: Prisma.BaseFindManyArgs) {
    return await this.prismaService.base.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.BaseFindFirstArgs) {
    return await this.prismaService.base.findFirst(findFirstDto);
  }

  async update(updateDto: Prisma.BaseUpdateArgs) {
    return await this.prismaService.base.update(updateDto);
  }

  async delete(deleteDto: Prisma.BaseDeleteArgs) {
    return await this.prismaService.base.delete(deleteDto);
  }
}