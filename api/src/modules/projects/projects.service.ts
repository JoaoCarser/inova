import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsRepositories } from 'src/shared/database/repositories/projects.repositories';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepo: ProjectsRepositories) {}

  async create(createProjectDto: CreateProjectDto) {
    const { name, description, status } = createProjectDto;

    const nameExists = this.projectsRepo.findFirst({
      where: { name },
    });

    if (nameExists){
      throw new ConflictException("Já existe um projeto com esse nome!")
    }

    return await this.projectsRepo.create({
      data: {
        name,
        description,
        status,
      },
    });
  }

  async findAll() {
    return await this.projectsRepo.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
