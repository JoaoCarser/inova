import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(findManyDto: Prisma.FileFindManyArgs) {
    return await this.prismaService.file.findMany(findManyDto);
  }

  async findFirst(findFirstDto: Prisma.FileFindFirstArgs) {
    return await this.prismaService.file.findFirst(findFirstDto);
  }

  async findUnique(findUniqueDto: Prisma.FileFindUniqueArgs) {
    return await this.prismaService.file.findUnique(findUniqueDto);
  }

  async create(createDto: Prisma.FileCreateArgs) {
    return await this.prismaService.file.create(createDto);
  }

  async update(updateDto: Prisma.FileUpdateArgs) {
    return await this.prismaService.file.update(updateDto);
  }

  async delete(deleteDto: Prisma.FileDeleteArgs) {
    return await this.prismaService.file.delete(deleteDto);
  }
}
