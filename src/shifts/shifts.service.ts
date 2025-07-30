import { Injectable } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto'

// Service to handle shift logic
@Injectable()
export class ShiftsService {
  private shifts: Array<CreateShiftDto & { id: number }> = [];

  // Create a new shift
  create(createShiftDto: CreateShiftDto) {
    const newShift = {
      id: this.shifts.length + 1,
      ...createShiftDto,
    };
    this.shifts.push(newShift);
    return newShift;
  }

  // Return all shifts
  findAll() {
    return this.shifts;
  }

  // Return one shift by id
  findOne(id: number) {
    return this.shifts.find(shift => shift.id === id);
  }
}
