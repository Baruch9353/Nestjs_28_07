// DTO for creating a shift
export class CreateShiftDto {
  date: string;
  time: string;
  assignedSoldiers?: number[];
}