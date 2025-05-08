import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsAdmUser } from 'src/shared/decorators/IsAdmUser';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(
    @IsAdmUser() _isAdmUser: boolean,
    @Query('name') name: string,
    @Query('base') base: string[] | string,
  ) {
    const normalizedBased = Array.isArray(base) ? base : base ? [base] : [];
    return this.usersService.findAll({
      base: normalizedBased,
      name,
    });
  }

  @Get('/cpf/:cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.usersService.findByCpf(cpf);
  }

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    console.log("userId", userId);
    return this.usersService.findByUserId(userId);
  }

  @Get(':userid')
  findFirst(@Param('userid') userid: string) {
    return this.usersService.findByUserId(userid);
  }

  @Put(':userid')
  update(
    @Param('userid', ParseUUIDPipe) userid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userid, updateUserDto);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.remove(userId);
  }
}
