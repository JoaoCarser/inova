import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepositories } from 'src/shared/database/repositories/questions.repositories';
import { UsersService } from '../users/users.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionsRepo: QuestionsRepositories,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, createQuestionDto: CreateQuestionDto) {
    const { projectId, sentToId, text } = createQuestionDto;

    const userExists = await this.usersService.findOne(sentToId);

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // TODO: Validar se o projeto existe

    return await this.questionsRepo.create({
      data: { ...createQuestionDto, createdById: userId },
    });
  }

  async findAll() {
    return await this.questionsRepo.findMany({});
  }

  async findAllByUserId(userId: string) {
    return await this.questionsRepo.findMany({
      where: { sentToId: userId },
    });
  }

  async findFirstById(userId: string, questionId: string) {
    const questionExists = await this.questionsRepo.findFirstById({
      where: {
        AND: {
          id: questionId,
          sentToId: userId,
        },
      },
      include: {
        sentTo: true,
      },
    });

    /*  console.log('question exists', questionExists);
    console.log('question ID', questionId); */

    if (!questionExists) {
      throw new NotFoundException('Essa pergunta não existe!');
    }

    return await this.questionsRepo.findFirstById({
      where: {
        sentToId: userId,
        id: questionId,
      },
    });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
