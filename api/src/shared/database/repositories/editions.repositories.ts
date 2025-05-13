import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EditionsRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.EditionFindManyArgs) {
    return await this.prismaService.edition.findMany(findManyDto);
  }
  async findFirst(findFirstDto: Prisma.EditionFindFirstArgs) {
    return await this.prismaService.edition.findFirst(findFirstDto);
  }

  async create(createDto: Prisma.EditionCreateArgs) {
    return await this.prismaService.edition.create(createDto);
  }

  async createMany(createDto: Prisma.EditionCreateManyArgs) {
    return await this.prismaService.edition.createMany(createDto);
  }

  async update(updateDto: Prisma.EditionUpdateArgs) {
    return await this.prismaService.edition.update(updateDto);
  }

  async remove(deleteDto: Prisma.EditionDeleteArgs) {
    return await this.prismaService.edition.delete(deleteDto);
  }
}
