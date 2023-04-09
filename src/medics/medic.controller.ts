import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';

import { CreateMedicDTO } from './dto/create-medic.dto';
import { ListMedicsResponseDTO } from './dto/list-medics-response.dto';
import { Medic } from './entities/medic.entity';
import { MedicAppService } from './medic-app.service';
import { CreateMedicCertificateDTO } from './dto/create-medic-certificate.dto';
import { CreateMedicCertificateResponseDTO } from './dto/create-medic-certificate-response.dto';
import { CreateMedicResponseDTO } from './dto/create-medic-response.dto';
import { Certificate } from './entities/certificate.entity';

@Controller('medics')
@ApiTags('medics')
export class MedicController {
  constructor(private readonly medicAppService: MedicAppService) {}

  @Get()
  @ApiResponse({
    description: 'Medics list response.',
    type: ListMedicsResponseDTO,
  })
  async listMedics(): Promise<Medic[]> {
    return await this.medicAppService.listMedics();
  }

  @Post()
  @ApiResponse({
    description: 'Add a new medic.',
    type: CreateMedicResponseDTO,
  })
  async createMedic(@Body() medicDto: CreateMedicDTO): Promise<Medic> {
    return await this.medicAppService.createMedic(medicDto);
  }

  @Post(':medicId/certificate')
  @ApiResponse({
    description: 'Add or update a certificate from the specified medic.',
    type: CreateMedicCertificateResponseDTO,
  })
  async createMedicCertificate(
    @Param('medicId') medicId: string,
    @Body() createMedicCertificateDto: CreateMedicCertificateDTO,
  ): Promise<Certificate> {
    return await this.medicAppService.createMedicCertificate(
      medicId,
      createMedicCertificateDto,
    );
  }
}
