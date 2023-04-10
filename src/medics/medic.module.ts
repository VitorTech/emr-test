import { Certificate } from './entities/certificate.entity';
import { Medic } from './entities/medic.entity';
import { MedicAppService } from './medic-app.service';
import { MedicController } from './medic.controller';
import { MedicDomainService } from './medic-domain.service';
import { Module } from '@nestjs/common';
import { Schedule } from './entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entities/hospital.entity';
import { HospitalMedic } from './entities/hospital-medic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Medic,
      Certificate,
      Schedule,
      Hospital,
      HospitalMedic,
    ]),
  ],
  controllers: [MedicController],
  providers: [MedicAppService, MedicDomainService],
})
export class MedicModule {}
