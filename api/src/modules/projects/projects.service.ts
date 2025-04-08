import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsRepositories } from 'src/shared/database/repositories/projects.repositories';
import { UsersService } from '../users/users.service';
import { UsersProjectsService } from '../users-projects/users-projects.service';
import { StatusProject } from './entities/status.project.entity';
import { EvaluationsCriteriaRepositories } from 'src/shared/database/repositories/evaluations-criteria.repositories';
import { Prisma } from '@prisma/client';

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    usersProjects: {
      select: {
        user: {
          select: {
            id: true;
            name: true;
            email: true;
            role: true;
            cpf: true;
            position: true;
            baseId: true;
          };
        };
      };
    };
    files: true;
    evaluations: {
      select: {
        id: true;
        comments: true;
        criteria: {
          select: {
            id: true;
            name: true;
            score: true;
          };
        };
      };
    };
    questions: true;
  };
}>;

@Injectable()
export class ProjectsService {
  constructor(
    private readonly usersProjectsService: UsersProjectsService,
    private readonly usersService: UsersService,
    private readonly projectsRepo: ProjectsRepositories,
    private readonly evaluationsCriteriaRepo: EvaluationsCriteriaRepositories,
  ) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const { name, description, status, department } = createProjectDto;

    const userExists = await this.usersService.findOne(userId);

    if (!userExists) {
      throw new ConflictException('Usuário não encontrado');
    }

    const nameExists = await this.projectsRepo.findFirst({
      where: {
        name,
      },
    });

    if (nameExists) {
      throw new ConflictException('Esse projeto já existe!');
    }

    const project = await this.projectsRepo.create({
      data: {
        name,
        description,
        status,
        department,
      },
    });

    await this.usersProjectsService.create({
      projectId: project.id,
      userId: userId,
    });

    return project;
  }

  async findAll({ status }: { status: StatusProject }) {
    let whereClause = {};

    if (status) {
      whereClause = {
        ...whereClause,
        status: status,
      };
    }

    //@ts-ignore
    const projects: ProjectWithRelations[] = await this.projectsRepo.findMany({
      where: whereClause,
      include: {
        usersProjects: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                cpf: true,
                position: true,
                baseId: true,
              },
            },
          },
        },
        files: true,
        evaluations: {
          select: {
            id: true,
            comments: true,
            criteria: {
              select: {
                id: true,
                name: true,
                score: true,
              },
            },
          },
        },
        questions: true,
      },
    });

    const projectsWithAverages = projects.map((project) => {
      const criteriaScores: Record<string, number[]> = {};

      project.evaluations.forEach((evaluation) => {
        evaluation.criteria.forEach((criterion) => {
          if (!criteriaScores[criterion.name]) {
            criteriaScores[criterion.name] = [];
          }
          criteriaScores[criterion.name].push(criterion.score);
        });
      });

      const averageScores = Object.entries(criteriaScores).reduce(
        (acc, [name, scores]) => {
          acc[name] =
            scores.reduce((sum, score) => sum + score, 0) / scores.length;
          return acc;
        },
        {} as Record<string, number>,
      );

      return {
        id: project.id,
        name: project.name,
        averageScores,
      };
    });

    return projects.map((project) => {
      const averageScoreFound = projectsWithAverages.find(
        (avg) => avg.id === project.id,
      );

      if (!averageScoreFound) {
        return project;
      }

      return { ...project, averageScore: averageScoreFound.averageScores };
    });
  }

  async findByProjectId(projectId: string) {
    return await this.projectsRepo.findUnique({
      where: {
        id: projectId,
      },
    });
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    const { name, description, status, department } = updateProjectDto;

    const projectIdExists = await this.projectsRepo.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!projectIdExists) {
      throw new NotFoundException('Esse projeto não existe!');
    }

    return await this.projectsRepo.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        description,
        status,
        department,
      },
    });
  }

  async remove(projectId: string) {
    return await this.projectsRepo.remove({
      where: {
        id: projectId,
      },
    });
  }
}
