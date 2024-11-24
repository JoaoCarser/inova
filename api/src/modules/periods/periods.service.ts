import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodsRepository } from 'src/shared/database/repositories/periods.repositories';

@Injectable()
export class PeriodsService {
  constructor(private readonly periodsRepo: PeriodsRepository) {}
  async create(createPeriodDto: CreatePeriodDto) {
    const { title } = createPeriodDto;

    const titleExists = await this.periodsRepo.findFirst({
      where: { title },
    });

    if (titleExists) {
      throw new ConflictException('Esse Período já existe');
    }

    return await this.periodsRepo.create({
      data: {
        ...createPeriodDto,
      },
    });
  }

  async findAll() {
    return await this.periodsRepo.findMany({});
  }

  async findPeriodById(periodId: string) {
    return await this.periodsRepo.findFirst({
      where:{
        id: periodId
      }
    });
  }

  async update(periodId: string, updatePeriodDto: UpdatePeriodDto) {
    
    const { title } = updatePeriodDto;

    const titleExists = await this.periodsRepo.findFirst({
      where: { title },
    });

    if (titleExists) {
      throw new ConflictException('Esse Período já existe');
    }
    
    return await this.periodsRepo.update({
      where: {
        id: periodId,
      },
      data: updatePeriodDto,
    });
  }

  async remove(periodId: string) {
    return await this.periodsRepo.remove({
      where: {
        id: periodId,
      },
    });
  }
}
