import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  // Only commander can create shifts
  @Post()
  @Roles('commander')
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  // Only commander can view all shifts
  @Get()
  @Roles('commander')
  findAll() {
    return this.shiftsService.findAll();
  }

  // Soldier can view only their shift. Commander can view all
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.shiftsService.findOne(+id, req.user);
  }
}
