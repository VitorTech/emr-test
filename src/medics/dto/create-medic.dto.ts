import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicDTO {
  @ApiProperty({ name: 'fullName', type: String })
  fullName: string;
}
