import { ApiProperty } from '@nestjs/swagger';

export class CreateHospitalMedicResponseDTO {
  @ApiProperty({ name: 'id', type: String })
  id: string;

  @ApiProperty({ name: 'hospitalId', type: String })
  hospitalId: string;

  @ApiProperty({ name: 'medicId', type: String })
  medicId: string;
}
