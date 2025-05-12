import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
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
import { FilesService } from '../files/files.service';
import { ProjectDepartment } from './entities/project.department.entity';
import { Role } from '../users/entities/Role';

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
        evaluatorId: true;
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
    @Inject(forwardRef(() => FilesService))
    private readonly filesService: FilesService,
  ) {}

  private readonly includeClause = {
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
        createdAt: true,
        evaluatorId: true,
        criteria: {
          select: {
            id: true,
            name: true,
            score: true,
          },
        },
      },
    },
    questions: {
      include: {
        author: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
    },
  };

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const {
      name,
      description,
      status,
      department,
      videoLink,
      participants,
      editionId,
    } = createProjectDto;

    const userExists = await this.usersService.findByUserId(userId);

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
        editionId,
        name,
        description,
        status,
        department,
        videoLink,
      },
    });

    await this.usersProjectsService.createMany(
      participants.map((participant) => ({
        projectId: project.id,
        userId: participant.id,
      })),
    );

    return project;
  }

  async findAll({
    status,
    department,
    userId,
    title,
  }: {
    status?: StatusProject[];
    department?: ProjectDepartment[];
    userId?: string;
    title?: string;
  }) {
    const whereClause: Prisma.ProjectWhereInput = {
      ...(status?.length && { status: { in: status } }),
      ...(department?.length && { department: { in: department } }),
      ...(title && { name: { contains: title, mode: 'insensitive' } }),
      ...(userId && { usersProjects: { some: { userId } } }),
    };

    //@ts-ignore
    const projects: ProjectWithRelations[] = await this.projectsRepo.findMany({
      where: whereClause,
      include: this.includeClause,
    });

    // cálculo de médias (como já está)
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
      if (!averageScoreFound) return project;
      return { ...project, averageScore: averageScoreFound.averageScores };
    });
  }

  async findByProjectId(userId: string, projectId: string) {
    const user = await this.usersService.findByUserId(userId);

    const userProject = await this.usersProjectsService.findByUserId(
      userId,
      projectId,
    );

    if (
      !userProject &&
      user.role !== Role.EVALUATION_COMMITTEE &&
      user.role !== Role.MARKETING
    ) {
      throw new ForbiddenException(
        'Você não tem permissão para visualizar esse projeto!',
      );
    }

    //@ts-ignore
    const projects: ProjectWithRelations = await this.projectsRepo.findUnique({
      where: {
        id: projectId,
      },
      include: this.includeClause,
    });

    return projects;
  }

  async update(
    userId: string,
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ) {
    const { name, description, status, department, videoLink } =
      updateProjectDto;

    const projectIdExists = await this.projectsRepo.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!projectIdExists) {
      throw new NotFoundException('Esse projeto não existe!');
    }

    if (projectIdExists.status !== StatusProject.DRAFT) {
      throw new ConflictException('Esse projeto não pode ser editado!');
    }

    const userProject = await this.usersProjectsService.findByUserId(
      userId,
      projectId,
    );

    if (!userProject) {
      throw new NotFoundException('Você não tem acesso a esse projeto!');
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
        videoLink,
      },
    });
  }

  async updateStatus(
    projectId: string,
    updateStatusDto: { status: StatusProject },
  ) {
    await this.projectsRepo.update({
      where: {
        id: projectId,
      },
      data: updateStatusDto,
    });
  }

  async remove(projectId: string, userId: string) {
    const userProject = await this.usersProjectsService.findByUserId(
      userId,
      projectId,
    );

    if (!userProject) {
      throw new NotFoundException('Projeto não encontrado ao usuário');
    }

    //@ts-ignore
    const projectFound: ProjectWithRelations = await this.findByProjectId(
      userId,
      projectId,
    );

    for (const file of projectFound.files) {
      await this.filesService.deleteFileByKey(file.key);
    }

    return await this.projectsRepo.remove({
      where: {
        id: projectFound.id,
      },
    });
  }
}
