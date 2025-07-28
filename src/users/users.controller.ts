import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }
}

