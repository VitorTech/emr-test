import { ApiProperty } from '@nestjs/swagger';

export class CreateHospitalMedicDTO {
  @ApiProperty({ name: 'medicId', type: String })
  medicId: string;

  @ApiProperty({ name: 'hospitalId', type: String })
  hospitalId: string;
}
