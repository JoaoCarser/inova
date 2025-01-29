import { Injectable } from '@nestjs/common';
import { CreateUsersProjectDto } from './dto/create-users-project.dto';
import { UpdateUsersProjectDto } from './dto/update-users-project.dto';
import { UsersProjectsRepositories } from 'src/shared/database/repositories/users-projects.repositories';

@Injectable()
export class UsersProjectsService {
  constructor(
    private readonly usersProjectsRepository: UsersProjectsRepositories,
  ) {}

  async create(createUsersProjectDto: CreateUsersProjectDto) {
    return await this.usersProjectsRepository.create({
      data: {
        projectId: createUsersProjectDto.projectId,
        userId: createUsersProjectDto.userId,
      },
    });
  }

  findAll() {
    return `This action returns all usersProjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersProject`;
  }

  update(id: number, updateUsersProjectDto: UpdateUsersProjectDto) {
    return `This action updates a #${id} usersProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersProject`;
  }
}
