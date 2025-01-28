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

@Injectable()
export class ProjectsService {
  constructor(
    private readonly usersProjectsService: UsersProjectsService,
    private readonly usersService: UsersService,
    private readonly projectsRepo: ProjectsRepositories,
  ) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const { name, description, status } = createProjectDto;

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
      },
    });

    await this.usersProjectsService.create({
      projectId: project.id,
      userId: userId,
    });

    return project;
  }

  async findAll() {
    return await this.projectsRepo.findMany({});
  }

  async findOne(projectId: string) {
    return await this.projectsRepo.findUnique({
      where: {
        id: projectId,
      },
    });
  }

  async update(projectId: string, updateProjectDto: UpdateProjectDto) {
    const { name, description, status } = updateProjectDto;

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
