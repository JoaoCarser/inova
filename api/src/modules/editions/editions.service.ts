import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEditionDto } from './dto/create-edition.dto';
import { UpdateEditionDto } from './dto/update-edition.dto';
import { EditionsRepositories } from 'src/shared/database/repositories/editions.repositories';
import { formatDate } from 'src/shared/utils/formatDate';
import { CreatePeriodDto } from '../periods/dto/create-period.dto';
import { PeriodsRepositories } from 'src/shared/database/repositories/periods.repositories';

@Injectable()
export class EditionsService {
  constructor(
    private readonly editionsRepo: EditionsRepositories,
    private readonly periodsRepo: PeriodsRepositories,
  ) {}

  validatePeriods({
    periods,
    editionStartDate,
    editionEndDate,
  }: {
    periods: CreatePeriodDto[];
    editionStartDate: string;
    editionEndDate: string;
  }) {
    if (periods && periods.length > 0) {
      // 1. Ordenar os períodos por startDate
      const sortedPeriods = periods.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );

      // 2. Verificar sobreposição entre períodos
      for (let i = 0; i < sortedPeriods.length - 1; i++) {
        const current = sortedPeriods[i];
        const next = sortedPeriods[i + 1];

        const currentEnd = new Date(current.endDate).getTime();
        const nextStart = new Date(next.startDate).getTime();

        if (currentEnd > nextStart) {
          throw new BadRequestException(
            `O período '${next.title}' (${formatDate(next.startDate)} a ${formatDate(next.endDate)}) se sobrepõe com o período '${current.title}' (${formatDate(current.startDate)} a ${formatDate(current.endDate)}).`,
          );
        }
      }

      // 3. Garantir que todos os períodos estão dentro do intervalo da edição
      const editionStart = new Date(editionStartDate).getTime();
      const editionEnd = new Date(editionEndDate).getTime();

      for (const period of periods) {
        const periodStart = new Date(period.startDate).getTime();
        const periodEnd = new Date(period.endDate).getTime();

        if (periodStart < editionStart || periodEnd > editionEnd) {
          throw new BadRequestException(
            `O período '${period.title}' (${formatDate(period.startDate)} a ${formatDate(period.endDate)}) está fora do intervalo da edição (${formatDate(editionStartDate)} a ${formatDate(editionEndDate)}).`,
          );
        }
      }
    }
  }

  async create(createEditionDto: CreateEditionDto) {
    const { periods, ...editionData } = createEditionDto;

    this.validatePeriods({
      periods,
      editionEndDate: editionData.endDate,
      editionStartDate: editionData.startDate,
    });

    // Se passou pelas validações
    const createdEdition = await this.editionsRepo.create({
      data: {
        ...editionData,
        startDate: new Date(editionData.startDate).toISOString(),
        endDate: new Date(editionData.endDate).toISOString(),
        periods:
          periods && periods.length > 0
            ? {
                create: periods.map((period) => ({
                  ...period,
                  startDate: new Date(period.startDate).toISOString(),
                  endDate: new Date(period.endDate).toISOString(),
                })),
              }
            : undefined,
      },
      include: {
        periods: true,
      },
    });

    return createdEdition;
  }

  async findAll() {
    const editions = await this.editionsRepo.findMany({
      include: {
        periods: true,
      },
    });
    return editions;
  }

  findOne(id: number) {
    return `This action returns a #${id} edition`;
  }

  async findCurrent() {
    const today = new Date();
    return await this.editionsRepo.findFirst({
      where: {
        startDate: { lte: today },
        endDate: { gte: today },
      },
      include: {
        periods: true,
      },
    });
  }

  async update(editionId: string, updateEditionDto: UpdateEditionDto) {
    const { periods, ...editionData } = updateEditionDto;

    this.validatePeriods({
      periods,
      editionEndDate: editionData.endDate,
      editionStartDate: editionData.startDate,
    });

    // Se passou pelas validações

    await this.periodsRepo.deleteMany({
      where: {
        editionId,
      },
    });
    const updatedEdition = await this.editionsRepo.update({
      where: { id: editionId },
      data: {
        ...editionData,
        startDate: new Date(editionData.startDate).toISOString(),
        endDate: new Date(editionData.endDate).toISOString(),
        periods:
          periods && periods.length > 0
            ? {
                create: periods.map((period) => ({
                  ...period,
                  startDate: new Date(period.startDate).toISOString(),
                  endDate: new Date(period.endDate).toISOString(),
                })),
              }
            : undefined,
      },
      include: {
        periods: true,
      },
    });

    console.log('updatedEdition', updatedEdition);

    return updatedEdition;
  }

  remove(id: number) {
    return `This action removes a #${id} edition`;
  }
}
