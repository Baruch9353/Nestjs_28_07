import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';

@Module({
  imports: [AuthModule, UsersModule, ShiftsModule, AssignmentsModule]
})
export class AppModule {}
