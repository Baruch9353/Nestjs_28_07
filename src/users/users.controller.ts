import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Only commander can get all users
  @Get()
  @Roles('commander')
  findAll() {
    return this.usersService.findAll();
  }

  // Only commander can get user by ID
  @Get(':id')
  @Roles('commander')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }
}

