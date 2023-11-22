export class CreateRequestDto {
  title: string;
  description?: string;
  status?: string;
  createdById: number;
  assignedToId?: number;
}
