import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepositories } from 'src/shared/database/repositories/questions.repositories';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepo: QuestionsRepositories,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {}

  async create(userId: string, createQuestionDto: CreateQuestionDto) {
    const { recipientId, projectId } = createQuestionDto;

    const userExists = await this.usersService.findByUserId(recipientId);

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const projectExists = await this.projectsService.findByProjectId(projectId);

    if (!projectExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    // TODO: Validar se o projeto existe

    return await this.questionsRepo.create({
      data: { ...createQuestionDto, authorId: userId },
    });
  }

  async createResponse(questionId: string, response: string) {
    return await this.questionsRepo.update({
      where: { id: questionId },
      data: { response },
    });
  }

  async findAll() {
    return await this.questionsRepo.findMany({});
  }

  async findAllByUserId(userId: string) {
    return await this.questionsRepo.findMany({
      where: { recipientId: userId },
    });
  }

  async findFirstById(userId: string, questionId: string) {
    const questionExists = await this.questionsRepo.findFirstById({
      where: {
        AND: {
          id: questionId,
          recipientId: userId,
        },
      },
      include: {
        recipient: true,
      },
    });

    /*  console.log('question exists', questionExists);
    console.log('question ID', questionId); */

    if (!questionExists) {
      throw new NotFoundException('Essa pergunta não existe!');
    }

    return await this.questionsRepo.findFirstById({
      where: {
        recipientId: userId,
        id: questionId,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
