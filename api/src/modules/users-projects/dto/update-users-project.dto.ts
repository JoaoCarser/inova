import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersProjectDto } from './create-users-project.dto';

export class UpdateUsersProjectDto extends PartialType(CreateUsersProjectDto) {}
