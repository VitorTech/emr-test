import { ApiProperty } from '@nestjs/swagger';
import { CreateMedicResponseDTO } from './create-medic-response.dto';
import { Medic } from '../entities/medic.entity';

export class CreateMedicScheduleResponseDTO {
  @ApiProperty({ name: 'id', type: String })
  id: string;

  @ApiProperty({ name: 'date', type: Date })
  date: Date;

  @ApiProperty({ name: 'isActive', type: Boolean })
  isActive: boolean;

  @ApiProperty({ name: 'medic', type: CreateMedicResponseDTO })
  medic: Medic;
}
