import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { BasesRepositories } from 'src/shared/database/repositories/bases.repositories';

@Injectable()
export class BasesService {
  constructor(private readonly basesRepo: BasesRepositories) {}
  async create(createBaseDto: CreateBaseDto) {
    const { name, state } = createBaseDto;

    const baseExist = await this.basesRepo.findFirst({
      where: { name },
    });

    if (baseExist) {
      throw new ConflictException('Essa Base já existe');
    }

    return await this.basesRepo.create({
      data: { name },
    });
  }

  async findMany() {
    return await this.basesRepo.findMany({});
  }

  async findOne(baseId: string) {
    return await this.basesRepo.findFirst({
      where: { id: baseId },
    });
  }

  async update(baseId: string, updateBaseDto: UpdateBaseDto) {
    const { name, state } = updateBaseDto;

    const baseIdExists = await this.basesRepo.findFirst({
      where: { id: baseId },
    });

    if (!baseIdExists) {
      throw new NotFoundException('Base não encontrada');
    }

    const baseExist = await this.basesRepo.findFirst({
      where: { name },
    });

    if (baseExist) {
      throw new ConflictException('Essa Base já existe');
    }

    return await this.basesRepo.update({
      where: { id: baseId },
      data: updateBaseDto,
    });
  }

  async remove(baseId: string) {
    return await this.basesRepo.delete({
      where: { id: baseId },
    });
  }
}
