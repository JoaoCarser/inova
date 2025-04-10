import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ProjectsService } from '../projects/projects.service';
import { FilesRepositories } from 'src/shared/database/repositories/files.repositories';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class FilesService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  private readonly awsBucketPath =
    'https://inova-file-uploader.s3.amazonaws.com/';

  constructor(
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService,
    private readonly configService: ConfigService,
    private readonly filesRepo: FilesRepositories,
  ) {}
  async uploadProjectFile(
    file: Express.Multer.File,
    userId: string,
    projectId: string,
  ) {
    const project = await this.projectsService.findByProjectId(projectId);

    if (!project) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    const awsKey = `${projectId}-${file.originalname}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'inova-file-uploader',
        Key: awsKey,
        Body: file.buffer,
      }),
    );

    await this.filesRepo.create({
      data: {
        path: `${this.awsBucketPath}${awsKey}`,
        userId,
        projectId,
        key: awsKey,
      },
    });
  }

  async deleteProjectFile(fileId: string, userId: string, projectId: string) {
    const project = await this.projectsService.findByProjectId(projectId);

    if (!project) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    await this.filesRepo.delete({
      where: {
        id: fileId,
        userId,
        projectId,
      },
    });
  }

  async deleteFileByKey(fileKey: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'inova-file-uploader',
        Key: fileKey,
      }),
    );
  }
}
