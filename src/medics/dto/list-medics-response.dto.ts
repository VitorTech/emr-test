import { ApiProperty } from '@nestjs/swagger';

export class ListMedicsResponseDTO {
  @ApiProperty({ name: 'id', type: String })
  id: string;
  @ApiProperty({ name: 'fullName', type: String })
  fullName: string;
  @ApiProperty({ name: 'isActive', type: Boolean })
  isActive: boolean;
}
