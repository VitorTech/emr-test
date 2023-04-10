import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';

import { CreateMedicDTO } from './dto/create-medic.dto';
import { ListMedicsResponseDTO } from './dto/list-medics-response.dto';
import { Medic } from './entities/medic.entity';
import { MedicAppService } from './medic-app.service';
import { CreateMedicCertificateDTO } from './dto/create-medic-certificate.dto';
import { CreateMedicCertificateResponseDTO } from './dto/create-medic-certificate-response.dto';
import { CreateMedicResponseDTO } from './dto/create-medic-response.dto';
import { Certificate } from './entities/certificate.entity';
import { CreateMedicScheduleDTO } from './dto/create-medic-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { CreateMedicScheduleResponseDTO } from './dto/create-medic-schedule-response.dto';
import { HospitalMedic } from './entities/hospital-medic.entity';
import { CreateHospitalMedicDTO } from './dto/create-hospital-medic.dto';

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
    @Param(
      'medicId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    medicId: string,
    @Body() createMedicCertificateDto: CreateMedicCertificateDTO,
  ): Promise<Certificate> {
    return await this.medicAppService.createMedicCertificate(
      medicId,
      createMedicCertificateDto,
    );
  }

  @Post(':medicId/schedule')
  @ApiResponse({
    description: 'Create medic schedule.',
    type: CreateMedicScheduleResponseDTO,
  })
  async createMedicSchedule(
    @Param(
      'medicId',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    medicId: string,
    @Body() createMedicScheduleDto: CreateMedicScheduleDTO,
  ): Promise<Schedule> {
    return this.medicAppService.createMedicSchedule(
      medicId,
      createMedicScheduleDto,
    );
  }

  @Post('hospital-medic')
  async createHospitalMedic(
    @Body() createMedicHospitalsDto: CreateHospitalMedicDTO,
  ): Promise<HospitalMedic> {
    return await this.medicAppService.createHospitalMedic(
      createMedicHospitalsDto,
    );
  }
}
