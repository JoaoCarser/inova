import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersProjectDto } from './dto/create-users-project.dto';
import { UsersProjectsRepositories } from 'src/shared/database/repositories/users-projects.repositories';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';
import { ProjectsRepositories } from 'src/shared/database/repositories/projects.repositories';
import { Participant } from '../projects/entities/Participant';

@Injectable()
export class UsersProjectsService {
  constructor(
    private readonly usersProjectsRepository: UsersProjectsRepositories,
    private readonly userRepository: UsersRepositories,
    private readonly projectRepository: ProjectsRepositories,
  ) {}

  async create(createUsersProjectDto: CreateUsersProjectDto) {
    return await this.usersProjectsRepository.create({
      data: {
        projectId: createUsersProjectDto.projectId,
        userId: createUsersProjectDto.userId,
      },
    });
  }

  async createMany(createManyUsersProjectDto: CreateUsersProjectDto[]) {
    const userIds = [
      ...new Set(createManyUsersProjectDto.map((item) => item.userId)),
    ];
    const projectIds = [
      ...new Set(createManyUsersProjectDto.map((item) => item.projectId)),
    ];

    const users = await this.userRepository.findMany({
      where: { id: { in: userIds } },
    });

    const projects = await this.projectRepository.findMany({
      where: { id: { in: projectIds } },
    });

    const existingUserIds = new Set(users.map((user) => user.id));
    const existingProjectIds = new Set(projects.map((project) => project.id));

    for (const { userId, projectId } of createManyUsersProjectDto) {
      if (!existingUserIds.has(userId)) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
      }

      if (!existingProjectIds.has(projectId)) {
        throw new NotFoundException(
          `Projeto com ID ${projectId} não encontrado`,
        );
      }
    }

    return this.usersProjectsRepository.createMany({
      data: createManyUsersProjectDto,
    });
  }

  async findByUserId(userId: string, projectId: string) {
    return await this.usersProjectsRepository.findFirst({
      where: { userId, projectId },
    });
  }

  async findMany(participants: Participant[]) {
    return await this.usersProjectsRepository.findMany({
      where: { userId: { in: participants.map((p) => p.id) } },
      include: { user: true },
    });
  }
}
