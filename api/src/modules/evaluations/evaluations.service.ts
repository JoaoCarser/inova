import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { EvaluationsRepositories } from 'src/shared/database/repositories/evaluations.repositories';
import { ProjectsService } from '../projects/projects.service';
import { EvaluationsCriteriaRepositories } from 'src/shared/database/repositories/evaluations-criteria.repositories';

@Injectable()
export class EvaluationsService {
  constructor(
    private readonly evaluationsRepository: EvaluationsRepositories,
    private readonly projectsService: ProjectsService,
    private readonly evaluationsCriteriaRepository: EvaluationsCriteriaRepositories,
  ) {}

  async create(userId: string, createEvaluationDto: CreateEvaluationDto) {
    //Verifica se o projeto existe
    const project = await this.projectsService.findByProjectId(
      createEvaluationDto.projectId,
    );

    if (!project) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    return await this.evaluationsRepository.create({
      data: {
        projectId: createEvaluationDto.projectId,
        evaluatorId: userId,
        criteria: {
          create: createEvaluationDto.criteria,
        },
        comments: createEvaluationDto.comments,
      },
    });
  }

  async findAll() {
    return await this.evaluationsRepository.findMany({});
  }

  async findOne(evaluationId: string) {
    return await this.evaluationsRepository.findUnique({
      where: {
        id: evaluationId,
      },
    });
  }

  async update(evaluationId: string, updateEvaluationDto: UpdateEvaluationDto) {
    //Verifica se a avaliação existe

    const project = await this.projectsService.findByProjectId(
      updateEvaluationDto.projectId,
    );

    if (!project) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    const evaluation = await this.evaluationsRepository.findUnique({
      where: {
        id: evaluationId,
      },
    });

    if (!evaluation) {
      throw new NotFoundException('Avaliação não encontrada!');
    }

    await this.evaluationsCriteriaRepository.deleteMany({
      where: {
        evaluationId: evaluationId,
      },
    });

    return await this.evaluationsRepository.update({
      where: {
        id: evaluationId,
      },
      data: {
        projectId: updateEvaluationDto.projectId,
        evaluatorId: evaluation.evaluatorId,
        criteria: {
          create: updateEvaluationDto.criteria,
        },
        comments: updateEvaluationDto.comments,
      },
    });
  }

  async remove(evaluationId: string) {
    await this.evaluationsRepository.delete({
      where: {
        id: evaluationId,
      },
    });
  }
}
