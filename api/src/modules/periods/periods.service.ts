import { Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodsRepository } from 'src/shared/database/repositories/periods.repositories';

@Injectable()
export class PeriodsService {
  constructor(private readonly periodsRepo: PeriodsRepository) {}
  async create(createPeriodDto: CreatePeriodDto) {
    return await this.periodsRepo.create({
      data: {
        ...createPeriodDto,
      },
    });
  }

  async findAll() {
    return await this.periodsRepo.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} period`;
  }

  update(id: number, updatePeriodDto: UpdatePeriodDto) {
    return `This action updates a #${id} period`;
  }

  async remove(periodId: string) {
    return await this.periodsRepo.remove({
      where: {
        id: periodId,
      }
    });
  }
}
