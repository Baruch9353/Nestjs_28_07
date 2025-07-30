import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';

// Represents a shift in memory
export type Shift = {
  id: number;
  date: string;
  time: string;
  assignedSoldiers: number[]; // array of soldier IDs
};

@Injectable()
export class ShiftsService {
  private shifts: Shift[] = [];

  // Creates a new shift
  create(dto: CreateShiftDto): Shift {
    const newShift: Shift = {
      id: this.shifts.length + 1,
      date: dto.date,
      time: dto.time,
      assignedSoldiers: dto.assignedSoldiers || [],
    };
    this.shifts.push(newShift);
    return newShift;
  }

  // Returns all shifts
  findAll(): Shift[] {
    return this.shifts;
  }

  // Returns a shift only if the user is allowed to view it
  findOne(id: number, user: { id: number; role: string }): Shift {
    const shift = this.shifts.find((s) => s.id === id);
    if (!shift) {
      throw new NotFoundException('Shift not found');
    }

    if (user.role === 'commander') {
      return shift;
    }

    if (shift.assignedSoldiers.includes(user.id)) {
      return shift;
    }

    throw new ForbiddenException('Access denied');
  }
}
