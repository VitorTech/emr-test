import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicDTO } from './dto/create-medic.dto';
import { Certificate } from './entities/certificate.entity';
import { Medic } from './entities/medic.entity';
import { CreateMedicCertificateDTO } from './dto/create-medic-certificate.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateMedicScheduleDTO } from './dto/create-medic-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class MedicDomainService {
  constructor(
    @InjectRepository(Medic)
    private medicRepository: Repository<Medic>,
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async listMedics(): Promise<Medic[]> {
    return await this.medicRepository.find();
  }

  async createMedic(createMedicDto: CreateMedicDTO): Promise<Medic> {
    const medic = this.medicRepository.create(createMedicDto);

    return await this.medicRepository.save(medic);
  }

  async createMedicCertificate(
    medicId: string,
    createMedicCertificateDto: CreateMedicCertificateDTO,
  ): Promise<Certificate> {
    const medicExists = await this.medicRepository.findOne({
      where: { id: medicId },
    });

    if (!medicExists) {
      throw new NotFoundException('Medic not found.');
    }

    const medicHasCertificate = await this.certificateRepository.findOne({
      relations: ['medic'],
      where: {
        medic: { id: medicId },
      },
    });

    if (medicHasCertificate) {
      return await this.certificateRepository.save(
        Object.assign(medicHasCertificate, {
          registerNumber: createMedicCertificateDto.registerNumber,
        }),
      );
    }

    const newCertificate = this.certificateRepository.create({
      registerNumber: createMedicCertificateDto.registerNumber,
      expirationDate: createMedicCertificateDto.expirationDate,
      medic: medicExists,
    });

    return await this.certificateRepository.save(newCertificate);
  }

  async createMedicSchedule(
    medicId: string,
    createMedicScheduleDto: CreateMedicScheduleDTO,
  ): Promise<Schedule> {
    const medicExists = await this.medicRepository.findOne({
      where: { id: medicId },
    });

    if (!medicExists) {
      throw new NotFoundException('Medic not found.');
    }

    const newSchedule = this.scheduleRepository.create({
      date: createMedicScheduleDto.date,
      medic: medicExists,
    });

    return await this.scheduleRepository.save(newSchedule);
  }
}
