import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto'

// Controller to handle shift-related routes
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  // Create a new shift
  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  // Get all shifts
  @Get()
  findAll() {
    return this.shiftsService.findAll();
  }

  // Get a specific shift by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(+id);
  }
}
