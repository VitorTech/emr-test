import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicCertificateDTO {
  @ApiProperty({ name: 'registerNumber', type: String })
  registerNumber: string;

  @ApiProperty({ name: 'expirationDate', type: Date })
  expirationDate: Date;
}
