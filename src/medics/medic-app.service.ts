import { Certificate } from './entities/certificate.entity';
import { CreateMedicCertificateDTO } from './dto/create-medic-certificate.dto';
import { CreateMedicDTO } from './dto/create-medic.dto';
import { CreateMedicScheduleDTO } from './dto/create-medic-schedule.dto';
import { Injectable } from '@nestjs/common';
import { Medic } from './entities/medic.entity';
import { MedicDomainService } from './medic-domain.service';
import { Schedule } from './entities/schedule.entity';
@Injectable()
export class MedicAppService {
  constructor(private medicDomainService: MedicDomainService) {}

  async listMedics(): Promise<Medic[]> {
    return await this.medicDomainService.listMedics();
  }

  async createMedic(createMedicDto: CreateMedicDTO): Promise<Medic> {
    return await this.medicDomainService.createMedic(createMedicDto);
  }

  async createMedicCertificate(
    medicId: string,
    createMedicCertificateDto: CreateMedicCertificateDTO,
  ): Promise<Certificate> {
    return await this.medicDomainService.createMedicCertificate(
      medicId,
      createMedicCertificateDto,
    );
  }

  async createMedicSchedule(
    medicId: string,
    createMedicScheduleDto: CreateMedicScheduleDTO,
  ): Promise<Schedule> {
    return await this.medicDomainService.createMedicSchedule(
      medicId,
      createMedicScheduleDto,
    );
  }
}
