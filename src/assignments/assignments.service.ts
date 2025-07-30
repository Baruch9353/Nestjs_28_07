import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  private assignments: Array<CreateAssignmentDto & { id: number }> = [];

  // Create a new assignment
  create(createAssignmentDto: CreateAssignmentDto) {
    const newAssignment = {
      id: this.assignments.length + 1,
      ...createAssignmentDto,
    };
    this.assignments.push(newAssignment);
    return newAssignment;
  }

  // Return all assignments
  findAll() {
    return this.assignments;
  }

  // Return one assignment by id
  findOne(id: number, user: any) {
    const assignment = this.assignments.find(a => a.id === id);
    if (!assignment) throw new NotFoundException('Assignment not found');

    // Allow commanders or the soldier himself
    if (user.role !== 'commander' && user.userId !== assignment.userId) {
      throw new ForbiddenException('You are not allowed to view this assignment');
    }

    return assignment;
  }
}
