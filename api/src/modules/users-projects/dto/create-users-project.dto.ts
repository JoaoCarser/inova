import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUsersProjectDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
