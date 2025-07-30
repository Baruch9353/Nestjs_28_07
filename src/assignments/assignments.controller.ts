import { Controller, Get, Post, Body,  Param, UseGuards,  Request } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // Only commander can create assignments
  @Post()
  @Roles('commander')
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  // Only commander can view all assignments
  @Get()
  @Roles('commander')
  findAll() {
    return this.assignmentsService.findAll();
  }

  // Soldier can view only his assignment. Commander can view all
  @Get(':id')
  @Roles('soldier', 'commander') 
  findOne(@Param('id') id: string, @Request() req) {
    return this.assignmentsService.findOne(+id, req.user);
  }
}
