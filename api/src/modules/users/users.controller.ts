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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userid')
  findFirst(@Param('userid') userid: string) {
    return this.usersService.findOne(userid);
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
