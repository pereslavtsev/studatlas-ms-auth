import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE } from '../auth.constants';
import { UsersService } from '../services/users.service';
import { GetUserDto } from '../dto/get-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import * as camelcaseKeys from 'camelcase-keys';
import { RemoveUserDto } from '../dto/remove-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(USER_SERVICE, 'CreateUser')
  @UsePipes(new ValidationPipe())
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create();
  }

  @GrpcMethod(USER_SERVICE, 'GetUser')
  @UsePipes(new ValidationPipe())
  async getUser({ id }: GetUserDto) {
    const user = await this.usersService.getById(id);
    return { data: [camelcaseKeys(user)] };
  }

  @GrpcMethod(USER_SERVICE, 'UpdateUser')
  @UsePipes(new ValidationPipe())
  updateUser() {
    return this.usersService.update();
  }

  @GrpcMethod(USER_SERVICE, 'DeleteUser')
  @UsePipes(new ValidationPipe())
  remove({ id }: RemoveUserDto) {
    return this.usersService.remove(id);
  }
}
