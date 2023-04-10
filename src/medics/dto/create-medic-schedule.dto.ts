import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicScheduleDTO {
  @ApiProperty({ name: 'date', type: Date })
  date: Date;
}
