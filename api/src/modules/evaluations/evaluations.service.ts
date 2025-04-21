import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { EvaluationsRepositories } from 'src/shared/database/repositories/evaluations.repositories';
import { ProjectsService } from '../projects/projects.service';
import { EvaluationsCriteriaRepositories } from 'src/shared/database/repositories/evaluations-criteria.repositories';
import { UsersService } from '../users/users.service';
import { Role } from '../users/entities/Role';
import { StatusProject } from '../projects/entities/status.project.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    private readonly evaluationsRepository: EvaluationsRepositories,
    private readonly projectsService: ProjectsService,
    private readonly evaluationsCriteriaRepository: EvaluationsCriteriaRepositories,
    private readonly userService: UsersService,
  ) {}

  async create(userId: string, createEvaluationDto: CreateEvaluationDto) {
    const { projectId, criteria, comments } = createEvaluationDto;

    const project = await this.projectsService.findByProjectId(
      userId,
      projectId,
    );
    if (!project) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    const hasAlreadyEvaluated = await this.evaluationsRepository.findFirst({
      where: {
        projectId,
        evaluatorId: userId,
      },
    });

    if (hasAlreadyEvaluated) {
      throw new ConflictException('Você já avaliou este projeto.');
    }

    // Cria a nova avaliação
    await this.evaluationsRepository.create({
      data: {
        projectId,
        evaluatorId: userId,
        criteria: {
          create: criteria,
        },
        comments,
      },
    });

    // Recarrega as avaliações do projeto após inserção
    const updatedProject = await this.projectsService.findByProjectId(
      userId,
      projectId,
    );

    const evaluationCommittee = await this.userService.findAll({
      where: { role: Role.EVALUATION_COMMITTEE },
    });

    const totalEvaluators = evaluationCommittee.length;
    const totalEvaluations = updatedProject.evaluations.length;

    // Atualiza status do projeto conforme progresso das avaliações
    if (
      project.status !== StatusProject.REVIEWED &&
      totalEvaluations > 0 &&
      totalEvaluations < totalEvaluators
    ) {
      await this.projectsService.updateStatus(projectId, {
        status: StatusProject.UNDER_REVIEW,
      });
    }

    if (totalEvaluations === totalEvaluators) {
      await this.projectsService.updateStatus(projectId, {
        status: StatusProject.REVIEWED,
      });
    }

    return { message: 'Avaliação registrada com sucesso.' };
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

  async update(
    userId: string,
    evaluationId: string,
    updateEvaluationDto: UpdateEvaluationDto,
  ) {
    //Verifica se a avaliação existe

    const project = await this.projectsService.findByProjectId(
      userId,
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
