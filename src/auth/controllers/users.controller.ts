import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE } from '../auth.constants';
import { UsersService } from '../services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(USER_SERVICE, 'CreateUser')
  @UsePipes(new ValidationPipe())
  createUser() {
    return this.usersService.create();
  }

  @GrpcMethod(USER_SERVICE, 'GetUser')
  @UsePipes(new ValidationPipe())
  getUser() {
    return this.usersService.update();
  }

  @GrpcMethod(USER_SERVICE, 'UpdateUser')
  @UsePipes(new ValidationPipe())
  updateUser() {
    return this.usersService.update();
  }

  @GrpcMethod(USER_SERVICE, 'DeleteUser')
  @UsePipes(new ValidationPipe())
  removeUser() {
    return this.usersService.remove();
  }
}
