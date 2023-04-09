import { ApiProperty } from '@nestjs/swagger';
import { CreateMedicResponseDTO } from './create-medic-response.dto';
import { Medic } from '../entities/medic.entity';

export class CreateMedicCertificateResponseDTO {
  @ApiProperty({ name: 'id', type: String })
  id: string;

  @ApiProperty({ name: 'registerNumber', type: String })
  registerNumber: string;

  @ApiProperty({ name: 'expirationDate', type: Date })
  expirationDate: Date;

  @ApiProperty({ name: 'medic', type: CreateMedicResponseDTO })
  medic: Medic;
}
